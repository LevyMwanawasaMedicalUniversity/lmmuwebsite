"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getPostMainImage, getPostUrl, getCategoriesString, getTagsString } from '@/lib/postUtils';

const FeaturedPostCard = ({ post, itemVariants }) => {
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
              <div className="position-absolute top-0 start-0 gradient-success text-white px-3 py-2 m-3 rounded-pill">
                <small className="fw-bold">Featured</small>
              </div>
              {post.images && post.images.length > 1 && (
                <div className="position-absolute top-0 end-0 bg-dark bg-opacity-50 px-2 py-1 m-3 rounded">
                  <small className="text-white">
                    <i className="fas fa-images me-1"></i> {post.images.length}
                  </small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">
                  <i className="fa fa-calendar me-2"></i>
                  {formattedDate}
                </span>
                <span className="text-muted">
                  <i className="fa fa-user me-2"></i>
                  {post.author?.name || 'LMMU Staff'}
                </span>
              </div>
              
              {/* Display categories if available */}
              {getCategoriesString(post) && (
                <div className="mb-2">
                  <small className="text-muted">
                    <i className="fa fa-folder me-1"></i> 
                    {getCategoriesString(post)}
                  </small>
                </div>
              )}
              
              <h3 className="card-title mb-3">
                <Link href={getPostUrl(post)} className="text-decoration-none text-dark stretched-link">
                  {post.title}
                </Link>
              </h3>
              
              {post.summary && (
                <p className="card-text text-muted mb-4">
                  {post.summary.length > 200 
                    ? `${post.summary.substring(0, 200)}...` 
                    : post.summary}
                </p>
              )}
              
              {/* Display tags if available */}
              {getTagsString(post) && (
                <div className="mb-3">
                  <small className="text-muted">
                    <i className="fa fa-tags me-1"></i> 
                    {getTagsString(post)}
                  </small>
                </div>
              )}
              
              <div className="d-flex justify-content-end mt-3">
                <Link href={getPostUrl(post)} className="btn btn-primary rounded-pill px-4">
                  Read More <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(FeaturedPostCard, (prevProps, nextProps) => {
  // Only re-render if post id changes
  return prevProps.post.id === nextProps.post.id;
});
