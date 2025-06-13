import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET user permissions (admin only)
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(params.userId);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's direct permissions
    const userPermissions = await prisma.userPermission.findMany({
      where: { userId },
      include: {
        permission: true
      },
      orderBy: {
        permission: {
          name: "asc"
        }
      }
    });

    // Get permissions from roles
    const rolePermissions = await prisma.rolePermission.findMany({
      where: {
        role: {
          users: {
            some: {
              userId
            }
          }
        }
      },
      include: {
        permission: true,
        role: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        permission: {
          name: "asc"
        }
      }
    });

    return NextResponse.json({
      user,
      directPermissions: userPermissions,
      rolePermissions: rolePermissions
    });
  } catch (error: any) {
    console.error("Error fetching user permissions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Assign direct permissions to a user (admin only)
export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(params.userId);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    
    // Validate request body
    if (!body.permissionIds || !Array.isArray(body.permissionIds)) {
      return NextResponse.json({ error: "Permission IDs array is required" }, { status: 400 });
    }

    // Delete existing direct permission assignments
    await prisma.userPermission.deleteMany({
      where: { userId }
    });

    // Only proceed with assignments if there are permission IDs
    if (body.permissionIds.length > 0) {
      // Create new permission assignments
      const permissionAssignments = body.permissionIds.map((permissionId: number) => ({
        userId,
        permissionId
      }));

      await prisma.userPermission.createMany({
        data: permissionAssignments,
        skipDuplicates: true
      });
    }

    // Get updated user permissions
    const updatedUserPermissions = await prisma.userPermission.findMany({
      where: { userId },
      include: {
        permission: true
      }
    });

    return NextResponse.json({
      user: { id: user.id, name: user.name },
      permissions: updatedUserPermissions
    });
  } catch (error: any) {
    console.error("Error updating user permissions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
