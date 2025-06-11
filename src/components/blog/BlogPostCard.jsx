"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getPostMainImage, getPostUrl, getCategoriesString } from '@/lib/postUtils';

const BlogPostCard = ({ post, itemVariants }) => {
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
            <div className="position-absolute top-0 end-0 bg-dark bg-opacity-50 px-2 py-1 m-3 rounded">
              <small className="text-white">
                <i className="fas fa-images me-1"></i> {post.images.length}
              </small>
            </div>
          )}
        </div>
        
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted small">
              <i className="fa fa-calendar me-2"></i>
              {formattedDate}
            </span>
            
            <span className="text-muted small">
              <i className="fa fa-eye me-2"></i>
              {post.viewCount || 0}
            </span>
          </div>
          
          {getCategoriesString(post) && (
            <div className="mb-2">
              <small className="text-muted">
                <i className="fa fa-folder me-1"></i> 
                {getCategoriesString(post)}
              </small>
            </div>
          )}
          
          <h5 className="card-title mb-3">
            <Link href={getPostUrl(post)} className="text-decoration-none text-dark stretched-link">
              {post.title}
            </Link>
          </h5>
          
          {post.summary && (
            <p className="card-text text-muted mb-3 small">
              {post.summary.length > 120 
                ? `${post.summary.substring(0, 120)}...` 
                : post.summary}
            </p>
          )}
          
          <div className="d-flex justify-content-end mt-3">
            <Link href={getPostUrl(post)} className="btn btn-sm btn-outline-primary rounded-pill px-3">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(BlogPostCard, (prevProps, nextProps) => {
  // Only re-render if post id changes
  return prevProps.post.id === nextProps.post.id;
});
