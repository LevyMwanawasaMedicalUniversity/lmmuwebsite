// src/app/api/post-images/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET all images for a specific post
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get('postId');
    
    if (!postId || isNaN(parseInt(postId))) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }
    
    const images = await prisma.postImage.findMany({
      where: {
        postId: parseInt(postId)
      },
      orderBy: {
        order: "asc"
      }
    });
    
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching post images:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// UPDATE image order
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await req.json();
    
    if (!data.images || !Array.isArray(data.images)) {
      return NextResponse.json(
        { error: "Invalid image order data" },
        { status: 400 }
      );
    }
    
    // Update each image order
    const updates = data.images.map(async (image: { id: number, order: number }) => {
      return prisma.postImage.update({
        where: { id: image.id },
        data: { order: image.order }
      });
    });
    
    await Promise.all(updates);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating image order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// CREATE a new image
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await req.json();
    
    if (!data.url || !data.postId || isNaN(parseInt(data.postId))) {
      return NextResponse.json(
        { error: "URL and Post ID are required" },
        { status: 400 }
      );
    }
    
    // Get highest order value
    const highestOrder = await prisma.postImage.findFirst({
      where: {
        postId: parseInt(data.postId)
      },
      orderBy: {
        order: "desc"
      },
      select: {
        order: true
      }
    });
    
    const newOrder = highestOrder ? highestOrder.order + 1 : 0;
    
    const image = await prisma.postImage.create({
      data: {
        url: data.url,
        caption: data.caption || null,
        order: newOrder,
        postId: parseInt(data.postId)
      }
    });
    
    return NextResponse.json(image);
  } catch (error) {
    console.error("Error creating image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
