"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useLoading from '@/hooks/useLoading';
import { usePathname } from 'next/navigation';
import ImageCarousel from './ImageCarousel.tsx';
import { getPostMainImage, getPostUrl, getPostCategories, getPostTags, getPostImages, getCategoriesString, getTagsString } from '@/lib/postUtils';

// Define type for post object
interface PostImage {
  id: number;
  url: string;
  caption?: string;
  order: number;
  postId: number;
}

interface Author {
  id: number;
  name: string;
  email: string;
  image?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryRelation {
  id: number;
  postId: number;
  categoryId: number;
  category: Category;
}

interface TagRelation {
  id: number;
  postId: number;
  tagId: number;
  tag: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Post {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  summary?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  published?: boolean;
  featured?: boolean;
  viewCount?: number;
  authorId?: number;
  author?: Author;
  images?: PostImage[];
  categoryRelations?: CategoryRelation[];
  tagRelations?: TagRelation[];
}

interface RelatedPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  createdAt: Date;
  images?: PostImage[];
  categoryRelations?: CategoryRelation[];
}

interface BlogPostDetailProps {
  post: Post;
}

export default function BlogPostDetail({ post }: BlogPostDetailProps): React.ReactNode {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fullUrl, setFullUrl] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { withLoading } = useLoading();
  const pathname = usePathname();
  
  // Set up the full URL for sharing after component mounts (client-side only)
  useEffect(() => {
    setFullUrl(window.location.origin + pathname);
  }, [pathname]);
  
  // Format the date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Fetch related posts when component mounts
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true);
        
        // Identify categories to find related posts
        const categories = getPostCategories(post)
          .filter(cat => typeof cat === 'object' && cat !== null)
          .map(cat => cat.name)
          .join(',');
        
        // Skip if no categories found
        if (!categories) {
          setRelatedPosts([]);
          return;
        }
        
        // Fetch related posts by categories
        const response = await fetch(`/api/posts?category=${encodeURIComponent(categories)}&limit=3&exclude=${post.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch related posts');
        }
        
        const data = await response.json();
        setRelatedPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching related posts:', error);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    withLoading(fetchRelatedPosts);
  }, [post.id, withLoading, post]);
  
  // Get all images for the post
  const postImages = getPostImages(post);
  
  // Handle image navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : postImages.length - 1));
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < postImages.length - 1 ? prev + 1 : 0));
  };
  
  // Handle sharing
  const handleShare = (platform: string) => {
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(post.title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(post.title)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + fullUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(fullUrl)}`, '_blank');
        break;
      default:
        break;
    }
  };

  // Motion variants for animation
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };
  
  return (
    <div className="blog-post-detail py-5">
      <div className="container">
        <motion.div 
          className="row"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="col-lg-8 mx-auto">
            {/* Back Button */}
            <div className="mb-4">
              <Link href="/blog" className="btn btn-outline-primary">
                <i className="fas fa-arrow-left me-2"></i> Back to Blog
              </Link>
            </div>
            
            {/* Post Title */}
            <h1 className="display-5 fw-bold mb-4">{post.title}</h1>
            
            {/* Post Meta */}
            <div className="d-flex flex-wrap align-items-center mb-4 post-meta">
              {/* Author */}
              <div className="me-4 mb-2">
                <i className="fas fa-user-circle me-1 text-muted"></i>
                <span className="text-muted">{post.author?.name || 'LMMU Staff'}</span>
              </div>
              
              {/* Date */}
              <div className="me-4 mb-2">
                <i className="far fa-calendar-alt me-1 text-muted"></i>
                <span className="text-muted">{formattedDate}</span>
              </div>
              
              {/* Categories */}
              {getCategoriesString(post) && (
                <div className="me-4 mb-2">
                  <i className="fas fa-folder me-1 text-muted"></i>
                  <span className="text-muted">{getCategoriesString(post)}</span>
                </div>
              )}
              
              {/* Views */}
              {post.viewCount !== undefined && (
                <div className="mb-2">
                  <i className="fas fa-eye me-1 text-muted"></i>
                  <span className="text-muted">{post.viewCount} view{post.viewCount !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
            
            {/* Post Images */}
            {postImages.length > 0 && (
              <div className="post-images mb-4">
                <div className="position-relative rounded overflow-hidden shadow-sm">
                  {postImages.length === 1 ? (
                    <div className="position-relative" style={{ height: '500px' }}>
                      <Image
                        src={postImages[0].url}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                        priority
                      />
                    </div>
                  ) : (
                    <ImageCarousel images={postImages} />
                  )}
                </div>
                
                {/* Image caption */}
                {postImages[currentImageIndex]?.caption && (
                  <div className="text-center mt-2 text-muted fst-italic">
                    <small>{postImages[currentImageIndex].caption}</small>
                  </div>
                )}
              </div>
            )}
            
            {/* Content */}
            <div className="post-content mb-5">
              <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            </div>
            
            {/* Tags */}
            {getTagsString(post) && (
              <div className="post-tags mb-4">
                <h5>Tags</h5>
                <div>
                  {getTagsString(post).split(',').map((tag, index) => (
                    <span key={index} className="badge bg-light text-dark me-2 mb-2 p-2">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Share */}
            <div className="post-share mb-5">
              <h5>Share this post</h5>
              <div className="d-flex flex-wrap">
                <button 
                  className="btn btn-primary me-2 mb-2" 
                  onClick={() => handleShare('facebook')}
                >
                  <i className="fab fa-facebook-f me-1"></i> Facebook
                </button>
                <button 
                  className="btn btn-info me-2 mb-2 text-white" 
                  onClick={() => handleShare('twitter')}
                >
                  <i className="fab fa-twitter me-1"></i> Twitter
                </button>
                <button 
                  className="btn btn-secondary me-2 mb-2" 
                  onClick={() => handleShare('linkedin')}
                >
                  <i className="fab fa-linkedin-in me-1"></i> LinkedIn
                </button>
                <button 
                  className="btn btn-success me-2 mb-2" 
                  onClick={() => handleShare('whatsapp')}
                >
                  <i className="fab fa-whatsapp me-1"></i> WhatsApp
                </button>
                <button 
                  className="btn btn-danger me-2 mb-2" 
                  onClick={() => handleShare('email')}
                >
                  <i className="fas fa-envelope me-1"></i> Email
                </button>
              </div>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="related-posts mt-5">
                <h3 className="mb-4">Related Posts</h3>
                <div className="row g-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="col-md-4">
                      <div className="card h-100 border-0 shadow-sm">
                        {/* Related post image */}
                        <Link href={getPostUrl(relatedPost)} className="card-img-top overflow-hidden">
                          <div className="position-relative" style={{ height: '200px' }}>
                            <Image
                              src={getPostMainImage(relatedPost)}
                              alt={relatedPost.title}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="img-fluid"
                            />
                          </div>
                        </Link>
                        
                        <div className="card-body">
                          <h5 className="card-title">
                            <Link href={getPostUrl(relatedPost)} className="text-decoration-none text-dark">
                              {relatedPost.title}
                            </Link>
                          </h5>
                          
                          {relatedPost.excerpt && (
                            <p className="card-text text-muted small">
                              {relatedPost.excerpt.length > 100 ? 
                                `${relatedPost.excerpt.substring(0, 100)}...` : 
                                relatedPost.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
