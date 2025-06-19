"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useLoading from '@/hooks/useLoading';
import BlogPostCard from './BlogPostCard';
import FeaturedPostCard from './FeaturedPostCard';
import { getPostCategories } from '@/lib/postUtils';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const postsPerPage = 9;
  const { withLoading } = useLoading();

  // Extract unique categories from posts
  useEffect(() => {
    if (posts.length > 0) {
      const allCategories = posts.reduce((acc, post) => {
        // Get categories for each post using our utility function
        const postCategories = getPostCategories(post);
        
        postCategories.forEach(category => {
          // Check if this category name is already in our accumulator
          // Ensure we're only working with valid category objects
          if (category && typeof category === 'object' && category.name && !acc.includes(category.name)) {
            acc.push(category.name);
          } else if (category && typeof category === 'string' && !acc.includes(category)) {
            // Handle case where category might be a string
            acc.push(category);
          }
        });
        return acc;
      }, []);
      setCategories(allCategories);
    }
  }, [posts]);
  
  // Fetch all categories separately to ensure dropdown has options
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          console.warn('Could not fetch categories, using post-derived categories only');
          return;
        }
        
        const data = await response.json();
        if (Array.isArray(data)) {
          const categoryNames = data.map(cat => cat.name).filter(Boolean);
          setCategories(prevCats => {
            // Combine with any categories we already have
            const uniqueCategories = [...new Set([...prevCats, ...categoryNames])];
            return uniqueCategories;
          });
        }
      } catch (err) {
        console.warn('Error fetching all categories:', err);
      }
    };
    
    fetchAllCategories();
  }, []);

  // Fetch posts with filters and pagination
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', postsPerPage);
        params.append('published', 'true'); // Only fetch published posts
        
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        
        if (selectedCategory) {
          // Ensure category is properly encoded
          params.append('category', encodeURIComponent(selectedCategory));
        }
        
        // Add timestamp to prevent caching issues
        params.append('ts', Date.now().toString());
        
        console.log(`Fetching posts with params: ${params.toString()}`);
        const response = await fetch(`/api/posts?${params.toString()}`);
        if (!response.ok) {
          console.error(`API responded with status: ${response.status}`);
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Ensure we're using the correct data format
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
          setTotalPages(Math.ceil(data.total / postsPerPage));
        } else if (Array.isArray(data)) {
          setPosts(data);
          // Estimate based on current data
          setTotalPages(Math.max(page, data.length < postsPerPage ? page : page + 1));
        } else {
          // If data is in unexpected format, set empty array
          console.error('Unexpected data format:', data);
          setPosts([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message || 'Failed to fetch posts');
        setPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    
    // Use try-catch around fetchPosts for extra error handling
    try {
      fetchPosts();
    } catch (outerError) {
      console.error('Outer error in fetchPosts:', outerError);
      setError('Failed to execute posts fetch: ' + (outerError.message || 'Unknown error'));
      setLoading(false);
    }
  }, [page, searchTerm, selectedCategory, postsPerPage]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
    
    // Reset any existing error when changing search
    if (error) {
      setError(null);
    }
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPosts([]); // Clear current posts
    setLoading(true);
  };
  
  // Handle category selection
  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    console.log(`Category selected: "${categoryValue}"`);
    setSelectedCategory(categoryValue);
    setPage(1); // Reset to first page on category change
    setPosts([]); // Clear current posts to avoid showing incorrect ones
    
    // Reset any existing error when changing categories
    if (error) {
      setError(null);
    }
    
    // Show loading state immediately
    setLoading(true);
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex flex-column align-items-center" role="alert">
        <p className="mb-3">
          <i className="fa fa-exclamation-triangle me-2"></i>
          Error loading blog posts: {error}
        </p>
        <div className="d-flex gap-3">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setError(null);
              setLoading(true);
              // Force a retry by changing a dependency
              setPage(prevPage => prevPage);
            }}
          >
            <i className="fa fa-refresh me-2"></i> Try Again
          </button>
          
          {/* Reset all filters button */}
          <button 
            className="btn btn-outline-secondary"
            onClick={() => {
              setError(null);
              setSelectedCategory('');
              setSearchTerm('');
              setPage(1);
              setLoading(true);
            }}
          >
            <i className="fa fa-times-circle me-2"></i> Clear All Filters
          </button>
        </div>
      </div>
    );
  }

  // Filter featured post (first post or marked as featured)
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const otherPosts = posts.length > 0 ? posts.slice(1) : [];

  return (
    <>
      {/* Search and Filter Bar */}
      <motion.div 
        className="row mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="col-md-6 mb-3 mb-md-0">
          <form onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control rounded-pill-start border-gold" 
                placeholder="Search blog posts..." 
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search blog posts"
              />
              <button 
                className="btn gradient-gold text-white rounded-pill-end" 
                type="submit"
                aria-label="Search"
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <select 
            className="form-select border-gold rounded-pill" 
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div 
        className="row g-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      {/* Featured Post */}
      {featuredPost && (
        <FeaturedPostCard post={featuredPost} itemVariants={itemVariants} />
      )}

      {/* Other Posts */}
      {otherPosts.map((post) => (
        <BlogPostCard key={post.id} post={post} itemVariants={itemVariants} />
      ))}

      {posts.length === 0 && (
        <div className="col-12 text-center py-5">
          <h3 className="text-muted">No blog posts found</h3>
          <p>Check back soon for new content!</p>
        </div>
      )}
    </motion.div>

    {/* Pagination */}
    {totalPages > 1 && (
      <motion.div 
        className="row mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="col-12">
          <nav aria-label="Blog pagination">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link rounded-pill me-2 border-gold" 
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
              </li>
              
              {/* First page */}
              {page > 2 && (
                <li className="page-item">
                  <button 
                    className="page-link rounded-pill border-gold" 
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </button>
                </li>
              )}
              
              {/* Ellipsis */}
              {page > 3 && (
                <li className="page-item disabled">
                  <span className="page-link border-0 bg-transparent">...</span>
                </li>
              )}
              
              {/* Previous page */}
              {page > 1 && (
                <li className="page-item">
                  <button 
                    className="page-link rounded-pill border-gold" 
                    onClick={() => handlePageChange(page - 1)}
                  >
                    {page - 1}
                  </button>
                </li>
              )}
              
              {/* Current page */}
              <li className="page-item active">
                <span className="page-link rounded-pill gradient-gold border-0">
                  {page}
                </span>
              </li>
              
              {/* Next page */}
              {page < totalPages && (
                <li className="page-item">
                  <button 
                    className="page-link rounded-pill border-gold" 
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </button>
                </li>
              )}
              
              {/* Ellipsis */}
              {page < totalPages - 2 && (
                <li className="page-item disabled">
                  <span className="page-link border-0 bg-transparent">...</span>
                </li>
              )}
              
              {/* Last page */}
              {page < totalPages - 1 && (
                <li className="page-item">
                  <button 
                    className="page-link rounded-pill border-gold" 
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                </li>
              )}
              
              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link rounded-pill ms-2 border-gold" 
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </motion.div>
    )}
    </>
  );
}
