import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

// GET a single permission by ID
export async function GET(req: NextRequest, { params }: Params) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid permission ID" }, { status: 400 });
    }

    // Get permission with its roles and users
    const permission = await prisma.permission.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: {
              select: {
                id: true,
                name: true,
                description: true
              }
            }
          }
        },
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                username: true
              }
            }
          }
        }
      }
    });

    if (!permission) {
      return NextResponse.json({ error: "Permission not found" }, { status: 404 });
    }

    return NextResponse.json(permission);
  } catch (error: any) {
    console.error(`Error fetching permission with ID ${params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE a permission
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid permission ID" }, { status: 400 });
    }

    const body = await req.json();
    
    // Check if permission exists
    const existingPermission = await prisma.permission.findUnique({
      where: { id }
    });

    if (!existingPermission) {
      return NextResponse.json({ error: "Permission not found" }, { status: 404 });
    }

    // Check if updating to an existing name
    if (body.name && body.name !== existingPermission.name) {
      const nameExists = await prisma.permission.findUnique({
        where: { name: body.name }
      });
      
      if (nameExists) {
        return NextResponse.json({ error: "Permission with this name already exists" }, { status: 400 });
      }
    }

    // Update permission
    const updatedPermission = await prisma.permission.update({
      where: { id },
      data: {
        name: body.name || existingPermission.name,
        description: body.description !== undefined ? body.description : existingPermission.description,
      }
    });

    // Update roles if provided
    if (body.roles && Array.isArray(body.roles)) {
      // Delete existing role connections
      await prisma.rolePermission.deleteMany({
        where: { permissionId: id }
      });

      // Add new role connections
      if (body.roles.length > 0) {
        const roleConnections = body.roles.map((roleId: number) => ({
          roleId,
          permissionId: id
        }));
        
        await prisma.rolePermission.createMany({
          data: roleConnections,
          skipDuplicates: true
        });
      }
    }

    // Return updated permission with its roles
    const permissionWithRoles = await prisma.permission.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    return NextResponse.json(permissionWithRoles);
  } catch (error: any) {
    console.error(`Error updating permission with ID ${params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a permission
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid permission ID" }, { status: 400 });
    }

    // Check if permission exists
    const existingPermission = await prisma.permission.findUnique({
      where: { id }
    });

    if (!existingPermission) {
      return NextResponse.json({ error: "Permission not found" }, { status: 404 });
    }

    // Delete permission (junction tables will be automatically deleted due to Cascade)
    await prisma.permission.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Permission deleted successfully" });
  } catch (error: any) {
    console.error(`Error deleting permission with ID ${params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
