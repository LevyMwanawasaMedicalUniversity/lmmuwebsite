// src/app/api/posts/route.ts - Updated for multiple images, categories and tags
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

// GET all posts with optional filtering, search, and pagination
export async function GET(req: NextRequest) {
  // Define variables at function scope to make them available in catch block  
  const url = new URL(req.url);
  const published = url.searchParams.get('published');
  const categoryId = url.searchParams.get('categoryId');
  const categoryName = url.searchParams.get('category'); // Legacy category parameter
  const tagId = url.searchParams.get('tagId');
  const search = url.searchParams.get('search');
  const pageParam = url.searchParams.get('page');
  const limitParam = url.searchParams.get('limit');
  const isRetry = url.searchParams.get('retry') === 'true';
  const basicInfoOnly = url.searchParams.get('basicInfo') === 'true';
  
  // Parse pagination parameters
  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 10;
  const skip = (page - 1) * limit;
    // Define where clause outside the try block to make it available in catch
  let where: any = {};
  let total = 0;
  
  try {
    // If this is a retry request, log it for monitoring
    if (isRetry) {
      console.log(`Retry request received at ${new Date().toISOString()}`);
    }
    
    // If basic info is requested, this is for fallback fetching of post IDs
    if (basicInfoOnly) {
      console.log(`Basic info request received for fallback mechanism`);
    }
    
    // Build the where clause based on query parameters
    
    if (published !== null) {
      where.published = published === 'true';
    }
      // Filter by category ID (using relations)
    if (categoryId && !isNaN(parseInt(categoryId))) {
      where.categoryRelations = {
        some: {
          categoryId: parseInt(categoryId)
        }
      };
    }
    
    // Legacy support - Filter by category name
    if (categoryName) {
      where.OR = [
        ...(where.OR || []),
        // Check in new relation structure by category name
        {
          categoryRelations: {
            some: {
              category: {
                name: {
                  contains: categoryName,
                  mode: 'insensitive'
                }
              }
            }
          }
        },
        // Check in legacy categories field for compatibility
        {
          categories: {
            contains: categoryName,
            mode: 'insensitive'
          }
        }
      ];
    }
    
    // Filter by tag ID (using relations)
    if (tagId && !isNaN(parseInt(tagId))) {
      where.tagRelations = {
        some: {
          tagId: parseInt(tagId)
        }
      };
    }
    
    // Add search functionality
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        // Legacy search in tags string field
        { tags: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count for pagination
    const total = await prisma.post.count({ where });    // Get posts with pagination - gracefully handling potential missing relations    // Determine include object based on request type
    let includeObject: any = { 
      author: { 
        select: { 
          id: true, 
          name: true, 
          email: true 
        } 
      }
    };
    
    // If basic info only, skip relations for faster response
    if (!basicInfoOnly) {
      includeObject = {
        ...includeObject,
        // Include images with proper error handling
        images: true,
        // Include category relations with proper error handling
        categoryRelations: {
          include: {
            category: true
          }
        },
        // Include tag relations with proper error handling
        tagRelations: {
          include: {
            tag: true
          }
        }
      };
    }
    
    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: includeObject,
      skip,
      take: limit
    });
    
    return NextResponse.json({
      posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });  } catch (error) {
    console.error("Error fetching posts:", error);
      // Better error handling with more details for debugging
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Analyze the error for common database schema issues
    const hasSchemaError = errorMessage.includes('Unknown field') || 
                          errorMessage.includes('does not exist in the current database');
    const hasRelationError = errorMessage.includes('relation') || 
                            errorMessage.includes('Foreign key constraint failed');
    const hasImageError = errorMessage.includes('images');
    const hasCategoryError = errorMessage.includes('categoryRelations');
    const hasTagError = errorMessage.includes('tagRelations');
    
    if (hasSchemaError || hasRelationError) {
      console.log(`Detected schema error: ${errorMessage}`);
      console.log(`Specific errors - Images: ${hasImageError}, Categories: ${hasCategoryError}, Tags: ${hasTagError}`);
      
      try {
        // Build a more tailored include object based on the error
        const includeObject: any = { 
          author: { 
            select: { 
              id: true, 
              name: true, 
              email: true 
            } 
          }
        };
        
        // Only include relations that didn't cause errors
        if (!hasImageError && !hasSchemaError) {
          includeObject.images = true;
        }
        
        if (!hasCategoryError && !hasSchemaError) {
          includeObject.categoryRelations = {
            include: {
              category: true
            }
          };
        }
        
        if (!hasTagError && !hasSchemaError) {
          includeObject.tagRelations = {
            include: {
              tag: true
            }
          };
        }
        
        // Fallback query with selective relations
        const posts = await prisma.post.findMany({
          where,
          orderBy: { createdAt: "desc" },
          include: includeObject,
          skip,
          take: limit
        });
        
        console.log("Fallback query succeeded with selective relations");
        
        return NextResponse.json({
          posts,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          warning: "Some relations couldn't be fetched due to database schema issues"
        });
      } catch (fallbackError) {
        console.error("Fallback with selective relations failed:", fallbackError);
        
        // Try one more time with no relations at all
        try {
          const basicPosts = await prisma.post.findMany({
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
            skip,
            take: limit
          });
          
          console.log("Basic fallback query succeeded with no relations");
          
          return NextResponse.json({
            posts: basicPosts,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            warning: "All relations were excluded due to database schema issues"
          });
        } catch (basicError) {
          console.error("Even basic fallback query failed:", basicError);
        }
      }
    }
      const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Final error in posts route:`, { 
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      hasSchemaError, 
      hasRelationError,
      hasImageError, 
      hasCategoryError, 
      hasTagError,
      isRetry
    });
    
    return NextResponse.json(
      { 
        error: "Failed to fetch posts", 
        message: errorMessage,
        timestamp,
        details: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    );
  }
}

// Helper function to process categories for a post
export async function processCategories(categoryData: any[], postId: number) {
  if (!categoryData || !Array.isArray(categoryData)) return;

  // Delete existing category relations for this post
  await prisma.postCategory.deleteMany({
    where: { postId }
  });

  // Add new category relations
  for (const categoryItem of categoryData) {
    let categoryId: number;
    
    if (typeof categoryItem === 'number') {
      // If ID is provided directly
      categoryId = categoryItem;
    } else if (typeof categoryItem === 'string') {
      // Try to parse as number first
      const parsedId = parseInt(categoryItem);
      if (!isNaN(parsedId)) {
        categoryId = parsedId;
      } else {
        // If it's a string but not a number, try to find by name or create
        const slug = createSlug(categoryItem);
        let category = await prisma.category.findFirst({
          where: { name: categoryItem }
        });
        
        if (!category) {
          category = await prisma.category.create({
            data: {
              name: categoryItem,
              slug
            }
          });
        }
        categoryId = category.id;
      }
    } else if (categoryItem.id) {
      // If an object with id is provided
      categoryId = typeof categoryItem.id === 'number' 
        ? categoryItem.id 
        : parseInt(categoryItem.id);
    } else {
      continue; // Skip invalid items
    }
    
    if (!isNaN(categoryId)) {
      await prisma.postCategory.create({
        data: {
          postId,
          categoryId
        }
      });
    }
  }
}

// Helper function to process tags for a post
export async function processTags(tagData: any[], postId: number) {
  if (!tagData || !Array.isArray(tagData)) return;

  // Delete existing tag relations for this post
  await prisma.postTag.deleteMany({
    where: { postId }
  });

  // Add new tag relations
  for (const tagItem of tagData) {
    let tagId: number;
    
    if (typeof tagItem === 'number') {
      // If ID is provided directly
      tagId = tagItem;
    } else if (typeof tagItem === 'string') {
      // Try to parse as number first
      const parsedId = parseInt(tagItem);
      if (!isNaN(parsedId)) {
        tagId = parsedId;
      } else {
        // If it's a string but not a number, try to find by name or create
        const slug = createSlug(tagItem);
        let tag = await prisma.tag.findFirst({
          where: { name: tagItem }
        });
        
        if (!tag) {
          tag = await prisma.tag.create({
            data: {
              name: tagItem,
              slug
            }
          });
        }
        tagId = tag.id;
      }
    } else if (tagItem.id) {
      // If an object with id is provided
      tagId = typeof tagItem.id === 'number' 
        ? tagItem.id 
        : parseInt(tagItem.id);
    } else {
      continue; // Skip invalid items
    }
    
    if (!isNaN(tagId)) {
      await prisma.postTag.create({
        data: {
          postId,
          tagId
        }
      });
    }
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
    
    // Use provided slug or generate one with timestamp for uniqueness
    let slug = data.slug;
    if (!slug) {
      const timestamp = new Date().getTime().toString().slice(-6);
      const titleSlug = createSlug(data.title);
      slug = `${titleSlug}-${timestamp}`;
    }
    
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

    // Extract categories and tags from request
    const { categoryIds, tagIds, images, ...postData } = data;
    
    // Create the post with basic data
    const post = await prisma.post.create({
      data: {
        title: postData.title,
        slug,
        summary: postData.summary || null,
        content: postData.content,
        image: postData.image || null,
        published: postData.published ?? true,
        categories: postData.categories || null, // Keep for backward compatibility
        tags: postData.tags || null, // Keep for backward compatibility
        author: { 
          connect: { 
            id: parseInt(session.user.id) 
          } 
        },
      },
    });

    // Process categories
    if (categoryIds) {
      await processCategories(categoryIds, post.id);
    }

    // Process tags
    if (tagIds) {
      await processTags(tagIds, post.id);
    }

    // Process images
    if (images && Array.isArray(images)) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        await prisma.postImage.create({
          data: {
            url: image.url,
            caption: image.caption || null,
            order: i,
            postId: post.id
          }
        });
      }
    } else if (postData.image) {
      // If using legacy single image, also create a PostImage entry
      await prisma.postImage.create({
        data: {
          url: postData.image,
          order: 0,
          postId: post.id
        }
      });
    }
    
    // Get the complete post with related data
    const completePost = await prisma.post.findUnique({
      where: { id: post.id },
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
    
    return NextResponse.json(completePost);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
