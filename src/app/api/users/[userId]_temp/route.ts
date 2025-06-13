import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { hashPassword } from "@/lib/auth/password";

// GET a single user by ID (admin only, or self)
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userIdInt },
      include: {
        userRoles: {
          include: {
            role: true
          }
        },
        userPermissions: {
          include: {
            permission: true
          }
        },
        _count: {
          select: { posts: true }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove sensitive fields for non-admin users
    if (!isAdmin) {
      // @ts-ignore
      delete user.password;
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// UPDATE a user (admin only, or self with restrictions)
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the request data
    const data = await req.json();
    
    // Setup an object for the fields to update
    const updateData: any = {};
    
    // Update basic fields (allowed for both admin and self)
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.username) updateData.username = data.username;

    // Update password if provided
    if (data.password) {
      updateData.password = await hashPassword(data.password);
    }

    // Admin-only fields
    if (isAdmin) {
      // Only admin can update role
      if (data.role) updateData.role = data.role;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userIdInt },
      data: updateData,
      include: {
        userRoles: {
          include: {
            role: true
          }
        },
        userPermissions: {
          include: {
            permission: true
          }
        }
      }
    });

    // Remove password from response
    // @ts-ignore
    delete updatedUser.password;

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("Error updating user:", error);
    
    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: `${error.meta?.target?.[0] || 'Field'} already exists` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE a user (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userIdInt = parseInt(userId);
    
    // Prevent self-deletion
    if (parseInt(session.user.id) === userIdInt) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userIdInt }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete user
    await prisma.user.delete({
      where: { id: userIdInt }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
