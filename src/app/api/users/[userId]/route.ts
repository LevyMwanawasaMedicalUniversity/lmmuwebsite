import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { hashPassword } from "@/lib/auth/password";

// GET a single user by userId (admin only, or self)
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userIdInt = parseInt(userId);
    const isAdmin = session.user.role === "admin";
    const isSelf = parseInt(session.user.id) === userIdInt;

    // Only allow admins or users accessing their own profile
    if (!isAdmin && !isSelf) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userIdInt },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        userPermissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT update a user (admin only, or self with restrictions)
export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userIdInt = parseInt(userId);
    const isAdmin = session.user.role === "admin";
    const isSelf = parseInt(session.user.id) === userIdInt;

    // Only allow admins or users updating their own profile
    if (!isAdmin && !isSelf) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await req.json();
    
    // Only admins can update roles
    if (!isAdmin && data.roles) {
      return NextResponse.json({ error: "You are not authorized to update roles" }, { status: 403 });
    }

    // Prepare update data
    const updateData: any = {};
    
    // Basic fields
    if (data.name) updateData.name = data.name;
    if (data.username) updateData.username = data.username;
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = await hashPassword(data.password);
    
    // Only admins can change the role field
    if (isAdmin && data.role) updateData.role = data.role;

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: userIdInt },
      data: updateData,
    });

    // Handle role assignments (admin only)
    if (isAdmin && Array.isArray(data.roles)) {
      // Delete existing role assignments
      await prisma.userRole.deleteMany({
        where: { userId: userIdInt },
      });
      
      // Create new role assignments if roles are provided
      if (data.roles.length > 0) {
        await prisma.userRole.createMany({
          data: data.roles.map((roleId: number) => ({
            userId: userIdInt,
            roleId,
          })),
        });
      }
    }

    return NextResponse.json({ 
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username,
        role: updatedUser.role
      }
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    
    // Handle specific errors
    if (error.code === "P2002") {
      return NextResponse.json({ 
        error: "This email or username is already taken" 
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: "Internal Server Error" 
    }, { status: 500 });
  }
}

// DELETE a user (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userIdInt = parseInt(userId);
    
    // Prevent self-deletion
    if (parseInt(session.user.id) === userIdInt) {
      return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userIdInt },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete user roles and permissions first to avoid foreign key constraints
    await prisma.userRole.deleteMany({
      where: { userId: userIdInt },
    });
    
    await prisma.userPermission.deleteMany({
      where: { userId: userIdInt },
    });
    
    // Delete the user
    await prisma.user.delete({
      where: { id: userIdInt },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
