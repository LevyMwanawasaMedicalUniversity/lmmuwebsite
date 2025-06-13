import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET user roles (admin only)
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

    // Get user's roles
    const userRoles = await prisma.userRole.findMany({
      where: { userId },
      include: {
        role: true
      },
      orderBy: {
        role: {
          name: "asc"
        }
      }
    });

    return NextResponse.json({
      user,
      roles: userRoles
    });
  } catch (error: any) {
    console.error("Error fetching user roles:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Assign roles to a user (admin only)
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
    if (!body.roleIds || !Array.isArray(body.roleIds)) {
      return NextResponse.json({ error: "Role IDs array is required" }, { status: 400 });
    }

    // Delete existing role assignments
    await prisma.userRole.deleteMany({
      where: { userId }
    });

    // Only proceed with assignments if there are role IDs
    if (body.roleIds.length > 0) {
      // Create new role assignments
      const roleAssignments = body.roleIds.map((roleId: number) => ({
        userId,
        roleId
      }));

      await prisma.userRole.createMany({
        data: roleAssignments,
        skipDuplicates: true
      });
    }

    // Get updated user roles
    const updatedUserRoles = await prisma.userRole.findMany({
      where: { userId },
      include: {
        role: true
      }
    });

    return NextResponse.json({
      user: { id: user.id, name: user.name },
      roles: updatedUserRoles
    });
  } catch (error: any) {
    console.error("Error updating user roles:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
