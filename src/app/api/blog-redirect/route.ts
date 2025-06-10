import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/blog';

export async function GET(request: NextRequest) {
  // Get slug from query parameter
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  if (!slug) {
    // No slug provided, redirect to blog listing
    return NextResponse.redirect(new URL('/blog', request.url));
  }

  try {
    // Get the post by slug
    const post = await getPostBySlug(slug);
    
    if (post) {
      // If post exists, redirect to the ID-based URL
      return NextResponse.redirect(new URL(`/blog/${post.id}`, request.url), {
        // Use permanent redirect for better SEO
        status: 301
      });
    }
    
    // Post not found with that slug, redirect to blog listing
    return NextResponse.redirect(new URL('/blog', request.url));
  } catch (error) {
    console.error('Error in blog redirect API route:', error);
    // In case of error, redirect to blog listing
    return NextResponse.redirect(new URL('/blog', request.url));
  }
}
