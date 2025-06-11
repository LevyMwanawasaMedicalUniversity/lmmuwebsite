// src/app/api/tags/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Helper function to create a URL-friendly slug
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// GET all tags
export async function GET(req: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" }
    });
    
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// CREATE a new tag
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await req.json();
    
    if (!data.name) {
      return NextResponse.json(
        { error: "Tag name is required" },
        { status: 400 }
      );
    }
    
    const slug = data.slug || createSlug(data.name);
    
    // Check if tag with name or slug already exists
    const existingTag = await prisma.tag.findFirst({
      where: {
        OR: [
          { name: data.name },
          { slug: slug }
        ]
      }
    });
    
    if (existingTag) {
      return NextResponse.json(
        { error: "A tag with this name or slug already exists" },
        { status: 400 }
      );
    }
    
    const tag = await prisma.tag.create({
      data: {
        name: data.name,
        slug: slug
      }
    });
    
    return NextResponse.json(tag);
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
