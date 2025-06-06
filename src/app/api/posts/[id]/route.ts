import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Helper function to create a URL-friendly slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// GET, UPDATE, DELETE a single post by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if id is numeric (assume it's DB id)
    if (!isNaN(Number(params.id))) {
      const post = await prisma.post.findUnique({
        where: { id: Number(params.id) },
        include: { author: { select: { id: true, name: true, email: true } } },
      });
      
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
      
      // Increment view count
      await prisma.post.update({
        where: { id: Number(params.id) },
        data: { viewCount: { increment: 1 } }
      });
      
      return NextResponse.json(post);
    } 
    // Otherwise assume it's a slug
    else {
      const post = await prisma.post.findUnique({
        where: { slug: params.id },
        include: { author: { select: { id: true, name: true, email: true } } },
      });
      
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
      
      // Increment view count
      await prisma.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } }
      });
      
      return NextResponse.json(post);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await req.json();
    const postId = Number(params.id);
    
    // Generate slug from title if provided and different from existing
    let slug = data.slug;
    
    if (data.title && !data.slug) {
      const existingPost = await prisma.post.findUnique({
        where: { id: postId }
      });
      
      // If title changed, generate new slug
      if (existingPost && existingPost.title !== data.title) {
        slug = createSlug(data.title);
      }
    }
    
    // Check slug uniqueness if it's changed
    if (slug) {
      const existingPost = await prisma.post.findUnique({
        where: { slug }
      });
      
      if (existingPost && existingPost.id !== postId) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }
    
    const updateData: any = {};
    
    // Only include fields that are provided in the request
    if (data.title !== undefined) updateData.title = data.title;
    if (slug !== undefined) updateData.slug = slug;
    if (data.summary !== undefined) updateData.summary = data.summary;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.published !== undefined) updateData.published = data.published;
    if (data.categories !== undefined) updateData.categories = data.categories;
    if (data.tags !== undefined) updateData.tags = data.tags;
    
    const post = await prisma.post.update({
      where: { id: postId },
      data: updateData,
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    await prisma.post.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
