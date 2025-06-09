"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useLoading from '@/hooks/useLoading';

export default function BlogPostDetail({ post }) {
  // Format the date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Parse categories and tags if they exist
  const categories = post.categories ? post.categories.split(',').map(cat => cat.trim()) : [];
  const tags = post.tags ? post.tags.split(',').map(tag => tag.trim()) : [];

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
                      <span key={index} className="badge gradient-primary text-white me-2 mb-2 py-2 px-3 rounded-pill">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {tags.length > 0 && (
                <div className="col-md-6">
                  <h5 className="mb-2">Tags:</h5>
                  <div>
                    {tags.map((tag, index) => (
                      <span key={index} className="badge bg-light text-dark me-2 mb-2 py-2 px-3 rounded-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
