import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET list of roles (admin only)
export async function GET(req: NextRequest) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const page = parseInt(url.searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Get roles with pagination and include permissions count
    const roles = await prisma.role.findMany({
      skip,
      take: limit,
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { 
            users: true,
            rolePermissions: true 
          }
        }
      }
    });

    // Get total count for pagination
    const totalRoles = await prisma.role.count();

    return NextResponse.json({
      roles,
      pagination: {
        total: totalRoles,
        page,
        limit,
        pages: Math.ceil(totalRoles / limit)
      }
    });
  } catch (error: any) {
    console.error("Error fetching roles:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE a new role (admin only)
export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: "Role name is required" }, { status: 400 });
    }

    // Check if role already exists
    const existingRole = await prisma.role.findUnique({
      where: { name: body.name }
    });

    if (existingRole) {
      return NextResponse.json({ error: "Role with this name already exists" }, { status: 400 });
    }

    // Create new role
    const role = await prisma.role.create({
      data: {
        name: body.name,
        description: body.description || null,
      }
    });

    // If permissions are provided, assign them to the role
    if (body.permissions && Array.isArray(body.permissions) && body.permissions.length > 0) {
      const permissionConnections = body.permissions.map((permissionId: number) => ({
        permissionId,
        roleId: role.id
      }));
      
      await prisma.rolePermission.createMany({
        data: permissionConnections,
        skipDuplicates: true
      });
    }

    // Return the created role with its permissions
    const roleWithPermissions = await prisma.role.findUnique({
      where: { id: role.id },
      include: {
        rolePermissions: {
          include: {
            permission: true
          }
        }
      }
    });

    return NextResponse.json(roleWithPermissions, { status: 201 });
  } catch (error: any) {
    console.error("Error creating role:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
