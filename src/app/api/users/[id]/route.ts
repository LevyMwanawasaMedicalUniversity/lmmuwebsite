import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { hashPassword } from "@/lib/auth/password";

// GET a single user by ID (admin only, or self)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(params.id);
    const isAdmin = session.user.role === "admin";
    const isSelf = parseInt(session.user.id) === userId;

    // Only allow admins or users accessing their own profile
    if (!isAdmin && !isSelf) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Include post count and a few recent posts
        _count: {
          select: { posts: true }
        },
        posts: {
          take: 5,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            slug: true,
            published: true,
            createdAt: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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

// UPDATE a user (admin only, or self for limited fields)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(params.id);
    const isAdmin = session.user.role === "admin";
    const isSelf = parseInt(session.user.id) === userId;

    // Only allow admins or users updating their own profile
    if (!isAdmin && !isSelf) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    const updateData: any = {};

    // Fields that both admins and users can update
    if (data.name !== undefined) updateData.name = data.name;
    
    // Fields that only admins can update
    if (isAdmin) {
      if (data.email !== undefined) updateData.email = data.email;
      if (data.username !== undefined) updateData.username = data.username;
      if (data.role !== undefined) updateData.role = data.role;
    }
    
    // Handle password update - require old password for non-admins
    if (data.password) {
      // Only admins can change password without old password
      if (isAdmin || (isSelf && data.oldPassword)) {
        updateData.password = await hashPassword(data.password);
      } else {
        return NextResponse.json(
          { error: "Current password is required" },
          { status: 400 }
        );
      }
    }

    // Update the user
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
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

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE a user (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(params.id);
    
    // Don't allow admins to delete themselves
    if (parseInt(session.user.id) === userId) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Delete the user
    await prisma.user.delete({
      where: { id: userId }
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
