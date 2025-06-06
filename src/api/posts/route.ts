import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET all posts
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { id: true, name: true, email: true } } },
  });
  return NextResponse.json(posts);
}

// CREATE a new post
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      image: data.image || null,
      published: true,
      author: { connect: { email: session.user.email } },
    },
  });
  return NextResponse.json(post);
}
