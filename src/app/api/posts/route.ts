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

// GET all posts with optional filtering
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const published = url.searchParams.get('published');
    const category = url.searchParams.get('category');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    
    // Build the where clause based on query parameters
    const where: any = {};
    
    if (published !== null) {
      where.published = published === 'true';
    }
    
    if (category) {
      where.categories = {
        contains: category
      };
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { 
        author: { 
          select: { 
            id: true, 
            name: true, 
            email: true 
          } 
        } 
      },
      take: limit
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// CREATE a new post
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await req.json();
    
    // Generate slug from title if not provided
    const slug = data.slug || createSlug(data.title);
    
    // Check if slug is unique
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });
    
    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }
    
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug,
        summary: data.summary || null,
        content: data.content,
        image: data.image || null,
        published: data.published ?? true,
        categories: data.categories || null,
        tags: data.tags || null,
        author: { 
          connect: { 
            id: parseInt(session.user.id) 
          } 
        },
      },
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
