import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

// GET a single role by ID
export async function GET(req: NextRequest, { params }: Params) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
    }

    // Get role with its permissions and users
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        rolePermissions: {
          include: {
            permission: {
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

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(role);
  } catch (error: any) {
    console.error(`Error fetching role with ID ${params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE a role
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
    }

    const body = await req.json();
    
    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { id }
    });

    if (!existingRole) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Check if updating to an existing name
    if (body.name && body.name !== existingRole.name) {
      const nameExists = await prisma.role.findUnique({
        where: { name: body.name }
      });
      
      if (nameExists) {
        return NextResponse.json({ error: "Role with this name already exists" }, { status: 400 });
      }
    }

    // Update role
    const updatedRole = await prisma.role.update({
      where: { id },
      data: {
        name: body.name || existingRole.name,
        description: body.description !== undefined ? body.description : existingRole.description,
      }
    });

    // Update permissions if provided
    if (body.permissions && Array.isArray(body.permissions)) {
      // Delete existing permissions
      await prisma.rolePermission.deleteMany({
        where: { roleId: id }
      });

      // Add new permissions
      if (body.permissions.length > 0) {
        const permissionConnections = body.permissions.map((permissionId: number) => ({
          permissionId,
          roleId: id
        }));
        
        await prisma.rolePermission.createMany({
          data: permissionConnections,
          skipDuplicates: true
        });
      }
    }

    // Return updated role with permissions
    const roleWithPermissions = await prisma.role.findUnique({
      where: { id },
      include: {
        rolePermissions: {
          include: {
            permission: true
          }
        }
      }
    });

    return NextResponse.json(roleWithPermissions);
  } catch (error: any) {
    console.error(`Error updating role with ID ${params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a role
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
    }

    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { id }
    });

    if (!existingRole) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Delete role (junction tables will be automatically deleted due to Cascade)
    await prisma.role.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Role deleted successfully" });
  } catch (error: any) {
    console.error(`Error deleting role with ID ${params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
