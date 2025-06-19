"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getPostMainImage, getPostUrl, getCategoriesString, getTagsString } from '@/lib/postUtils';

interface Post {
  id: string;
  title: string;
  createdAt: string;
  excerpt?: string;
  slug?: string;
  content?: string;
  images?: any[];
  categories?: any[];
  tags?: any[];
  author?: {
    name: string;
    image?: string;
  };
}

interface FeaturedPostCardProps {
  post: Post;
  itemVariants?: any;
}

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post, itemVariants }) => {
  if (!post) return null;
  
  // Format the date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <motion.div className="col-lg-12 mb-4" variants={itemVariants}>
      <div className="card border-0 shadow-sm overflow-hidden rounded-4 bg-white">
        <div className="row g-0">
          <div className="col-md-6">
            <div className="position-relative h-100" style={{ minHeight: '350px' }}>
              <Image 
                src={getPostMainImage(post)} 
                alt={post.title} 
                fill
                className="img-fluid object-cover"
              />
              
              {post.categories && post.categories.length > 0 && (
                <span className="position-absolute top-0 start-0 m-3 badge bg-primary-subtle text-primary rounded-pill">
                  {getCategoriesString(post)}
                </span>
              )}
              
              {post.images && post.images.length > 1 && (
                <div className="position-absolute bottom-0 end-0 m-3 bg-white rounded-pill px-2 py-1">
                  <small><i className="fas fa-images me-1"></i> {post.images.length}</small>
                </div>
              )}
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card-body h-100 d-flex flex-column p-4 p-xl-5">
              <div className="mb-2">
                <span className="text-primary small">FEATURED</span>
              </div>
              
              <h3 className="card-title h4 fw-bold mb-3">
                <Link href={getPostUrl(post)} className="text-dark text-decoration-none hover-text-primary">
                  {post.title}
                </Link>
              </h3>
              
              <p className="card-text mb-4">
                {post.excerpt ? post.excerpt : 'Read more about this article...'}
              </p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="mb-3">
                  {getTagsString(post).split(',').map((tag, index) => (
                    <span key={index} className="badge bg-light text-dark me-2 mb-2">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="d-flex align-items-center mt-auto">
                {post.author?.image ? (
                  <Image 
                    src={post.author.image} 
                    alt={post.author.name} 
                    width={40} 
                    height={40} 
                    className="rounded-circle me-2"
                  />
                ) : (
                  <div 
                    className="bg-light rounded-circle me-2 d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <i className="fas fa-user text-muted"></i>
                  </div>
                )}
                <div>
                  <p className="mb-0 fw-medium">{post.author?.name || 'LMMU Staff'}</p>
                  <small className="text-muted">{formattedDate}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(FeaturedPostCard);
