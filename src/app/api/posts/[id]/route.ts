import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Import helper functions from main posts route
import { processCategories, processTags } from "../route";

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
  const isRetry = new URL(req.url).searchParams.get('retry') === 'true';
  
  if (isRetry) {
    console.log(`Retry request for post ${id} received at ${new Date().toISOString()}`);
  }
  
  try {
    // Check if id is numeric (assume it's DB id)
    const idValue = !isNaN(Number(id)) ? Number(id) : id;
    const whereClause = typeof idValue === 'number' ? { id: idValue } : { slug: idValue };
    
    // Try with full relations first
    try {
      const post = await prisma.post.findUnique({
        where: whereClause,
        include: { 
          author: { select: { id: true, name: true, email: true } },
          images: { orderBy: { order: "asc" } },
          categoryRelations: { include: { category: true } },
          tagRelations: { include: { tag: true } }
        },
      });
      
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      
      // Increment view count
      await prisma.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } }
      });
      
      return NextResponse.json(post);
    } catch (relationsError) {
      // Handle schema errors with relations gracefully
      console.error("Error fetching post with relations:", relationsError);
      const errorMessage = relationsError instanceof Error ? relationsError.message : "Unknown error occurred";
      
      // Check for specific errors
      const hasSchemaError = errorMessage.includes('Unknown field') || 
                            errorMessage.includes('does not exist in the current database');
      const hasImageError = errorMessage.includes('images');
      const hasCategoryError = errorMessage.includes('categoryRelations');
      const hasTagError = errorMessage.includes('tagRelations');
      
      if (hasSchemaError) {
        console.log(`Detected schema error for post ${id}: ${errorMessage}`);
        
        // Build a selective include object based on error
        const includeObject: any = { 
          author: { select: { id: true, name: true, email: true } }
        };
        
        // Only include relations that didn't cause errors
        if (!hasImageError && !hasSchemaError) {
          includeObject.images = { orderBy: { order: "asc" } };
        }
        
        if (!hasCategoryError && !hasSchemaError) {
          includeObject.categoryRelations = { include: { category: true } };
        }
        
        if (!hasTagError && !hasSchemaError) {
          includeObject.tagRelations = { include: { tag: true } };
        }
        
        // Fallback query with selective relations
        try {
          const post = await prisma.post.findUnique({
            where: whereClause,
            include: includeObject,
          });
          
          if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
          }
          
          // Increment view count
          await prisma.post.update({
            where: { id: post.id },
            data: { viewCount: { increment: 1 } }
          });
          
          return NextResponse.json({
            ...post,
            _warning: "Some relations couldn't be fetched due to database schema issues"
          });
        } catch (fallbackError) {
          // Last resort - try with minimal fields
          console.error("Fallback with selective relations failed:", fallbackError);
          
          const basicPost = await prisma.post.findUnique({
            where: whereClause,
            include: { 
              author: { select: { id: true, name: true, email: true } }
            }
          });
          
          if (!basicPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
          }
          
          // Increment view count
          await prisma.post.update({
            where: { id: basicPost.id },
            data: { viewCount: { increment: 1 } }
          });
          
          return NextResponse.json({
            ...basicPost,
            _warning: "All relations were excluded due to database schema issues"
          });
        }
      }
      
      // If it's not a schema error, rethrow
      throw relationsError;
    }  } catch (error) {
    const timestamp = new Date().toISOString();
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    console.error(`[${timestamp}] Error fetching post ${id}:`, error);
    console.error(`[${timestamp}] Error details:`, { 
      id, 
      isRetry, 
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined 
    });
    
    return NextResponse.json({ 
      error: "Internal Server Error", 
      message: errorMessage,
      timestamp,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 });
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
    }    const updateData: any = {};
    
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
    
    // For backward compatibility
    if (data.categories !== undefined) updateData.categories = data.categories;
    if (data.tags !== undefined) updateData.tags = data.tags;
    
    // Extract and handle relations
    const { categoryIds, tagIds, images, ...restData } = data;
    
    console.log('Final update data:', JSON.stringify(updateData, null, 2));
    const post = await prisma.post.update({
      where: { id: postId },
      data: updateData,
    });
    
    // Process categories if provided
    if (categoryIds) {
      await processCategories(categoryIds, postId);
    }
    
    // Process tags if provided
    if (tagIds) {
      await processTags(tagIds, postId);
    }
    
    // Process images if provided
    if (images && Array.isArray(images)) {
      // Delete existing images
      await prisma.postImage.deleteMany({
        where: { postId }
      });
      
      // Add new images
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        await prisma.postImage.create({
          data: {
            id: image.id && !isNaN(parseInt(image.id)) ? parseInt(image.id) : undefined,
            url: image.url,
            caption: image.caption || null,
            order: i,
            postId
          }
        });
      }
    }
      // Fetch the complete post with all relations
    const completePost = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: { 
          select: { 
            id: true, 
            name: true, 
            email: true 
          } 
        },
        images: {
          orderBy: { order: "asc" }
        },
        categoryRelations: {
          include: {
            category: true
          }
        },
        tagRelations: {
          include: {
            tag: true
          }
        }
      }
    });
    
    console.log('Updated post published status:', post.published);
    return NextResponse.json(completePost);
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
