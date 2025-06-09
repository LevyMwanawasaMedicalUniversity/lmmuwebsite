"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useLoading from '@/hooks/useLoading';
import { usePathname } from 'next/navigation';

export default function BlogPostDetail({ post }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { withLoading } = useLoading();
  const pathname = usePathname();
  
  // Get the full URL for sharing
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = `${baseUrl}${pathname}`;
  
  // Format the date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Parse categories and tags if they exist
  const categories = post.categories ? post.categories.split(',').map(cat => cat.trim()) : [];
  const tags = post.tags ? post.tags.split(',').map(tag => tag.trim()) : [];
  
  // Fetch related posts based on category
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        if (!post.categories) return;
        
        // Get the first category to find related posts
        const mainCategory = categories[0];
        if (!mainCategory) return;
        
        const response = await fetch(`/api/posts?category=${encodeURIComponent(mainCategory)}&limit=3`);
        if (!response.ok) throw new Error('Failed to fetch related posts');
        
        const data = await response.json();
        // Filter out the current post and get up to 3 related posts
        const filtered = (data.posts || data)
          .filter(relatedPost => relatedPost.id !== post.id)
          .slice(0, 3);
          
        setRelatedPosts(filtered);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    setLoading(true);
    withLoading(fetchRelatedPosts);
  }, [post.id, post.categories, categories]); // Removed withLoading from dependencies

  return (
    <div className="container py-5">
      <motion.div 
        className="row justify-content-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="col-lg-10">
          {/* Back to Blog */}
          <div className="mb-4">
            <Link href="/blog" className="btn btn-sm gradient-primary text-white rounded-pill">
              <i className="fa fa-arrow-left me-2"></i> Back to Blog
            </Link>
          </div>
          
          {/* Post Header */}
          <div className="mb-5">
            <h1 className="display-5 fw-bold mb-3">{post.title}</h1>
            <div className="d-flex flex-wrap align-items-center text-muted mb-4">
              <div className="me-4 mb-2">
                <i className="fa fa-calendar me-2"></i>
                {formattedDate}
              </div>
              <div className="me-4 mb-2">
                <i className="fa fa-user me-2"></i>
                {post.author?.name || 'LMMU Staff'}
              </div>
              <div className="mb-2">
                <i className="fa fa-eye me-2"></i>
                {post.viewCount} views
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="position-relative rounded-4 overflow-hidden mb-5" style={{ height: '500px' }}>
            <Image 
              src={post.image || '/assets/images/news/default-blog.jpg'} 
              alt={post.title}
              fill
              className="img-fluid object-cover"
              priority
            />
          </div>
          
          {/* Post Content */}
          <div className="blog-content mb-5">
            {post.summary && (
              <div className="lead mb-4 p-4 bg-light rounded-3 border-start border-5 border-primary">
                {post.summary}
              </div>
            )}
            
            <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Categories and Tags */}
          <div className="mb-5 py-4 border-top border-bottom">
            <div className="row">
              {categories.length > 0 && (
                <div className="col-md-6 mb-3 mb-md-0">
                  <h5 className="mb-2">Categories:</h5>
                  <div>
                    {categories.map((category, index) => (
                      <Link href={`/blog?category=${encodeURIComponent(category)}`} key={index}>
                        <span className="badge gradient-primary text-white me-2 mb-2 py-2 px-3 rounded-pill">
                          {category}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {tags.length > 0 && (
                <div className="col-md-6">
                  <h5 className="mb-2">Tags:</h5>
                  <div>
                    {tags.map((tag, index) => (
                      <Link href={`/blog?search=${encodeURIComponent(tag)}`} key={index}>
                        <span className="badge bg-light text-dark me-2 mb-2 py-2 px-3 rounded-pill">
                          #{tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Social Sharing */}
          <div className="mb-5">
            <h5 className="mb-3">Share This Post:</h5>
            <div className="d-flex flex-wrap">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-facebook me-2 mb-2"
                aria-label="Share on Facebook"
              >
                <i className="fab fa-facebook-f me-2"></i> Facebook
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-twitter me-2 mb-2"
                aria-label="Share on Twitter"
              >
                <i className="fab fa-twitter me-2"></i> Twitter
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-linkedin me-2 mb-2"
                aria-label="Share on LinkedIn"
              >
                <i className="fab fa-linkedin-in me-2"></i> LinkedIn
              </a>
              <a 
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: ${fullUrl}`)}`}
                className="btn btn-secondary me-2 mb-2"
                aria-label="Share via Email"
              >
                <i className="fa fa-envelope me-2"></i> Email
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(fullUrl);
                  alert('Link copied to clipboard!');
                }}
                className="btn btn-outline-dark mb-2"
                aria-label="Copy Link"
              >
                <i className="fa fa-link me-2"></i> Copy Link
              </button>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="col-lg-10 mt-5">
            <h3 className="mb-4 fw-bold">Related Posts</h3>
            <div className="row g-4">
              {relatedPosts.map((relatedPost) => (
                <div className="col-md-4" key={relatedPost.id}>
                  <motion.div 
                    className="card h-100 shadow border-0 rounded-4 overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="position-relative" style={{ height: '200px' }}>
                      <Image 
                        src={relatedPost.image || '/assets/images/news/default-blog.jpg'} 
                        alt={relatedPost.title}
                        fill
                        className="card-img-top object-cover"
                      />
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">
                          <i className="fa fa-calendar me-2"></i>
                          {new Date(relatedPost.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </small>
                      </div>
                      <Link href={`/blog/${relatedPost.slug}`} className="text-decoration-none">
                        <h5 className="card-title mb-3 fw-bold text-dark">{relatedPost.title}</h5>
                      </Link>
                      <p className="card-text text-muted mb-3">
                        {relatedPost.summary?.substring(0, 100)}...
                      </p>
                      <Link href={`/blog/${relatedPost.slug}`} className="btn btn-sm gradient-gold text-white rounded-pill px-4">
                        Read More <i className="fa fa-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Add custom styles for social sharing buttons */}
      <style jsx global>{`
        .btn-facebook {
          background-color: #3b5998;
          color: white;
        }
        .btn-twitter {
          background-color: #1da1f2;
          color: white;
        }
        .btn-linkedin {
          background-color: #0077b5;
          color: white;
        }
        .btn-facebook:hover, .btn-twitter:hover, .btn-linkedin:hover {
          opacity: 0.9;
          color: white;
        }
      `}</style>
    </div>
  );
}
