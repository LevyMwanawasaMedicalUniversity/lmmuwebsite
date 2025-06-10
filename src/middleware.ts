import { NextResponse, NextRequest } from 'next/server';

// Regex pattern to match blog slug URLs but not blog ID URLs
// This pattern matches /blog/anything-that-is-not-a-number
export const blogSlugPattern = /\/blog\/(?![0-9]+$)[^\/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for exact /blog path and numeric IDs
  if (pathname === '/blog' || /\/blog\/\d+$/.test(pathname)) {
    return NextResponse.next();
  }
  
  // Check if the path matches a blog slug pattern
  if (pathname.startsWith('/blog/')) {
    // Extract the slug from the URL
    const slug = pathname.split('/').pop();
    if (slug) {
      // Redirect to our dedicated API route that will handle the database lookup
      return NextResponse.redirect(
        new URL(`/api/blog-redirect?slug=${encodeURIComponent(slug)}`, request.url)
      );
    }
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  // Only run on blog paths that might have slugs
  matcher: '/blog/:path*',
};
