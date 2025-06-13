import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET list of permissions (admin only)
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

    // Get permissions with pagination and include roles count
    const permissions = await prisma.permission.findMany({
      skip,
      take: limit,
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { 
            roles: true,
            users: true
          }
        }
      }
    });

    // Get total count for pagination
    const totalPermissions = await prisma.permission.count();

    return NextResponse.json({
      permissions,
      pagination: {
        total: totalPermissions,
        page,
        limit,
        pages: Math.ceil(totalPermissions / limit)
      }
    });
  } catch (error: any) {
    console.error("Error fetching permissions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE a new permission (admin only)
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
      return NextResponse.json({ error: "Permission name is required" }, { status: 400 });
    }

    // Check if permission already exists
    const existingPermission = await prisma.permission.findUnique({
      where: { name: body.name }
    });

    if (existingPermission) {
      return NextResponse.json({ error: "Permission with this name already exists" }, { status: 400 });
    }

    // Create new permission
    const permission = await prisma.permission.create({
      data: {
        name: body.name,
        description: body.description || null,
      }
    });

    // If roles are provided, assign this permission to those roles
    if (body.roles && Array.isArray(body.roles) && body.roles.length > 0) {
      const roleConnections = body.roles.map((roleId: number) => ({
        roleId,
        permissionId: permission.id
      }));
      
      await prisma.rolePermission.createMany({
        data: roleConnections,
        skipDuplicates: true
      });
    }

    return NextResponse.json(permission, { status: 201 });
  } catch (error: any) {
    console.error("Error creating permission:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}