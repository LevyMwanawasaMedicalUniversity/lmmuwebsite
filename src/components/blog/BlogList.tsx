"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useLoading from '@/hooks/useLoading';
import BlogPostCard from './BlogPostCard';
import FeaturedPostCard from './FeaturedPostCard';
import { getPostCategories } from '@/lib/postUtils';

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
    image?: string;
  };
  categories?: any[];
  featured?: boolean;
  featuredImage?: string;
  // Add other fields as needed
};

export default function BlogList(): React.ReactNode {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const postsPerPage = 9;
  const { withLoading } = useLoading();
  // Extract unique categories from posts
  useEffect(() => {
    if (posts.length > 0) {
      const allCategories = posts.reduce((acc: string[], post: Post) => {
        // Get categories for each post using our utility function
        const postCategories = getPostCategories(post);
        
        postCategories.forEach((category: any) => {
          // Handle both object and string category formats
          if (category && typeof category === 'object' && category.name && !acc.includes(category.name)) {
            acc.push(category.name);
          } else if (category && typeof category === 'string' && !acc.includes(category)) {
            acc.push(category);
          }
        });
        
        return acc;
      }, []);
      
      setCategories(allCategories);
    }
  }, [posts]);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts?page=${page}&limit=${postsPerPage}&search=${searchTerm}&category=${selectedCategory}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.total / postsPerPage));
      setError(null);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update posts when page, search term or category changes
  useEffect(() => {
    withLoading(() => fetchPosts());
  }, [page, searchTerm, selectedCategory]);

  // Featured posts (first 2 if they exist)
  const featuredPosts = posts.filter(post => post.featured).slice(0, 2);
  // Other posts (excluding featured ones)
  const regularPosts = posts.filter(post => !featuredPosts.includes(post));

  // Pagination controls
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Search handler
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  // Category filter handler
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page when changing category
  };

  return (
    <div className="blog-container">
      {/* Search and filters */}
      <div className="blog-filters mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <form onSubmit={handleSearch} className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>
          <div className="col-md-6">
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary dropdown-toggle w-100 text-start" 
                type="button" 
                id="categoryDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {selectedCategory || 'All Categories'}
              </button>
              <ul className="dropdown-menu w-100" aria-labelledby="categoryDropdown">
                <li>
                  <button 
                    className={`dropdown-item ${!selectedCategory ? 'active' : ''}`} 
                    onClick={() => handleCategoryChange('')}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((category, index) => (
                  <li key={index}>
                    <button 
                      className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`} 
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && !error && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading posts...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-5">
          <h3>No posts found</h3>
          <p className="text-muted">
            {searchTerm || selectedCategory ? 
              'Try changing your search criteria' : 
              'Check back soon for new content!'}
          </p>
        </div>
      )}

      {/* Blog content */}
      {!loading && !error && posts.length > 0 && (
        <>
          {/* Featured posts section (if any) */}
          {featuredPosts.length > 0 && (
            <section className="featured-posts mb-5">
              <h2 className="section-title mb-4">Featured Posts</h2>
              <div className="row g-4">
                {featuredPosts.map((post) => (
                  <div key={post.id} className="col-lg-6">
                    <FeaturedPostCard post={post} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Regular posts grid */}
          <section className="regular-posts">
            <h2 className="section-title mb-4">Latest Posts</h2>
            <div className="row g-4">
              {regularPosts.map((post) => (
                <motion.div 
                  key={post.id} 
                  className="col-lg-4 col-md-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlogPostCard post={post} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-5" aria-label="Blog pagination">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  >
                    &laquo; Previous
                  </button>
                </li>
                {/* Page number indicators */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <li key={pageNum} className={`page-item ${pageNum === page ? 'active' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                  >
                    Next &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
