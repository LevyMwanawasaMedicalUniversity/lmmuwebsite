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
  // Await params in Next.js 15.3+
  const paramsObj = await params;
  const { id } = paramsObj;
  try {
    // Check if id is numeric (assume it's DB id)
    if (!isNaN(Number(id))) {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: { author: { select: { id: true, name: true, email: true } } },
      });
      
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
        // Increment view count
      await prisma.post.update({
        where: { id: Number(id) },
        data: { viewCount: { increment: 1 } }
      });
      
      return NextResponse.json(post);
    }    // Otherwise assume it's a slug
    else {
      const post = await prisma.post.findUnique({
        where: { slug: id },
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
  // Await params in Next.js 15.3+
  const paramsObj = await params;
  const { id } = paramsObj;
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
      const data = await req.json();
    console.log('PUT request data:', JSON.stringify(data, null, 2));
    console.log('Published status received:', data.published);
    const postId = Number(id);
    
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
    
    // Properly handle image field
    if (data.image !== undefined) {
      // If image is null, empty string, or object but not a proper URL string, set to null
      if (data.image === null || data.image === '' || (typeof data.image === 'object')) {
        updateData.image = null;
      } else {
        updateData.image = data.image;
      }
    }
      // Explicitly handle published status, ensuring it's always processed as a boolean
    if (data.published !== undefined) {
      updateData.published = Boolean(data.published);
      console.log('Setting published to:', updateData.published);
    }
    
    if (data.categories !== undefined) updateData.categories = data.categories;
    if (data.tags !== undefined) updateData.tags = data.tags;
    
    console.log('Final update data:', JSON.stringify(updateData, null, 2));
    const post = await prisma.post.update({
      where: { id: postId },
      data: updateData,
    });
    
    console.log('Updated post published status:', post.published);
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  // Await params in Next.js 15.3+
  const paramsObj = await params;
  const { id } = paramsObj;
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await req.json();
    const postId = Number(id);
    
    // For PATCH, we only update the fields that are provided
    const updateData: any = {};
    
    // Handle specific fields that can be updated via PATCH
    if (data.published !== undefined) updateData.published = data.published;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.categories !== undefined) updateData.categories = data.categories;
    if (data.tags !== undefined) updateData.tags = data.tags;
    
    const post = await prisma.post.update({
      where: { id: postId },
      data: updateData,
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error patching post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Await params in Next.js 15.3+
  const paramsObj = await params;
  const { id } = paramsObj;
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    await prisma.post.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
