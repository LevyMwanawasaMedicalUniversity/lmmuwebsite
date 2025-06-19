"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getPostMainImage, getPostUrl, getCategoriesString } from '@/lib/postUtils';

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

interface BlogPostCardProps {
  post: Post;
  itemVariants?: any;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, itemVariants }) => {
  if (!post) return null;
  
  // Format the date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <motion.div className="col-lg-4 col-md-6" variants={itemVariants}>
      <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4 bg-white">
        <div className="position-relative" style={{ height: '240px' }}>
          <Image
            src={getPostMainImage(post)}
            alt={post.title}
            fill
            className="img-fluid object-cover"
          />
          
          {post.images && post.images.length > 1 && (
            <div className="position-absolute bottom-0 end-0 m-2 bg-white rounded-pill px-2 py-1">
              <small><i className="fas fa-images me-1"></i> {post.images.length}</small>
            </div>
          )}
        </div>
        
        <div className="card-body d-flex flex-column">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-2">
              <span className="badge bg-primary-subtle text-primary rounded-pill">
                {getCategoriesString(post)}
              </span>
            </div>
          )}
          
          <h3 className="card-title h5 fw-bold mb-2">
            <Link href={getPostUrl(post)} className="text-dark text-decoration-none hover-text-primary">
              {post.title}
            </Link>
          </h3>
          
          <p className="card-text text-muted small mb-3">
            {post.excerpt ? post.excerpt.substring(0, 100) + '...' : 'Read more...'}
          </p>
          
          <div className="d-flex align-items-center mt-auto">
            {post.author?.image ? (
              <Image 
                src={post.author.image} 
                alt={post.author.name} 
                width={32} 
                height={32} 
                className="rounded-circle me-2"
              />
            ) : (
              <div 
                className="bg-light rounded-circle me-2 d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px' }}
              >
                <i className="fas fa-user text-muted"></i>
              </div>
            )}
            <div>
              <small className="text-muted d-block">{post.author?.name || 'LMMU Staff'}</small>
              <small className="text-muted">{formattedDate}</small>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(BlogPostCard);
