import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { hashPassword } from "@/lib/auth/password";

// GET list of users (admin only)
export async function GET(req: NextRequest) {  try {
    console.log("API: GET users - Starting API call");
    
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    console.log("API: GET users - Session check:", session ? "Session exists" : "No session");
    
    if (!session || session.user.role !== "admin") {
      console.log("API: GET users - Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const page = parseInt(url.searchParams.get("page") || "1");
    const skip = (page - 1) * limit;
    
    console.log("API: GET users - Query params:", { page, limit, skip });    // Get users with pagination
    console.log("API: GET users - Attempting to fetch users from database");
    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        userRoles: {
          select: {
            role: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        userPermissions: {
          select: {
            permission: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        _count: {
          select: { 
            posts: true,
            userRoles: true,
            userPermissions: true
          }
        }
      }
    });

    // Get total count for pagination
    const totalUsers = await prisma.user.count();

    return NextResponse.json({
      users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        pages: Math.ceil(totalUsers / limit)
      }
    });  } catch (error: any) {
    console.error("Error fetching users:", error);
    // Add more detailed error logging
    const errorDetail = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
      code: error.code
    };
    console.error("Detailed error:", JSON.stringify(errorDetail, null, 2));
    
    return NextResponse.json(
      { error: "Internal Server Error", detail: error.message },
      { status: 500 }
    );
  }
}

// CREATE a new user (admin only)
export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.username || !data.password) {
      return NextResponse.json(
        { error: "Name, email, username and password are required" },
        { status: 400 }
      );
    }

    // Check if email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email or username already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(data.password);    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: hashedPassword,
        role: data.role || "user",
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    // If roles are provided, assign them to the user
    if (data.roles && Array.isArray(data.roles) && data.roles.length > 0) {
      const roleConnections = data.roles.map((roleId: number) => ({
        userId: user.id,
        roleId
      }));
      
      await prisma.userRole.createMany({
        data: roleConnections,
        skipDuplicates: true
      });
    }
    
    // If permissions are provided, assign them directly to the user
    if (data.permissions && Array.isArray(data.permissions) && data.permissions.length > 0) {
      const permissionConnections = data.permissions.map((permissionId: number) => ({
        userId: user.id,
        permissionId
      }));
      
      await prisma.userPermission.createMany({
        data: permissionConnections,
        skipDuplicates: true
      });
    }
    
    // Fetch the updated user with roles and permissions
    const userWithRolesAndPermissions = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        userRoles: {
          select: {
            role: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        userPermissions: {
          select: {
            permission: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(userWithRolesAndPermissions);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
