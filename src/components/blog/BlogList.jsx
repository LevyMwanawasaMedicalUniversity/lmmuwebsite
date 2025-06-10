"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useLoading from '@/hooks/useLoading';

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
        if (post.categories) {
          const postCategories = typeof post.categories === 'string' 
            ? post.categories.split(',').map(cat => cat.trim()) 
            : post.categories;
          
          postCategories.forEach(category => {
            if (category && !acc.includes(category)) {
              acc.push(category);
            }
          });
        }
        return acc;
      }, []);
      setCategories(allCategories);
    }
  }, [posts]);

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
          params.append('category', selectedCategory);
        }
        
        const response = await fetch(`/api/posts?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
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
        setError(err.message);
        setPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    // Call directly instead of using withLoading
    fetchPosts();
  }, [page, searchTerm, selectedCategory, postsPerPage]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };
  
  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1); // Reset to first page on category change
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
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
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
          <div className="input-group">
            <input 
              type="text" 
              className="form-control rounded-pill-start border-gold" 
              placeholder="Search blog posts..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button 
              className="btn gradient-gold text-white rounded-pill-end" 
              type="button"
              onClick={() => setSearchTerm(searchTerm)} // Trigger search
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <select 
            className="form-select border-gold rounded-pill" 
            value={selectedCategory}
            onChange={handleCategoryChange}
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
        <motion.div className="col-lg-12 mb-4" variants={itemVariants}>
          <div className="card border-0 shadow-sm overflow-hidden rounded-4 bg-white">
            <div className="row g-0">
              <div className="col-md-6">
                <div className="position-relative h-100" style={{ minHeight: '350px' }}>
                  <Image 
                    src={featuredPost.image || '/assets/images/news/default-blog.jpg'} 
                    alt={featuredPost.title} 
                    fill
                    className="img-fluid object-cover"
                  />
                  <div className="position-absolute top-0 start-0 gradient-success text-white px-3 py-2 m-3 rounded-pill">
                    <small className="fw-bold">Featured</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-body p-4 p-lg-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">
                      <i className="fa fa-calendar me-2"></i>
                      {new Date(featuredPost.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-muted">
                      <i className="fa fa-user me-2"></i>
                      {featuredPost.author?.name || 'LMMU Staff'}
                    </span>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`} className="text-decoration-none">
                    <h2 className="card-title mb-3 fw-bold text-dark">{featuredPost.title}</h2>
                  </Link>
                  <p className="card-text text-muted mb-4">{featuredPost.summary}</p>
                  <Link href={`/blog/${featuredPost.slug}`} className="btn gradient-success text-white rounded-pill px-4 py-2">
                    Read More <i className="fa fa-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Other Posts */}
      {otherPosts.map((post) => (
        <motion.div className="col-md-6 col-lg-4" key={post.id} variants={itemVariants}>
          <div className="card h-100 border-0 shadow-sm rounded-4 bg-white">
            <div className="position-relative" style={{ height: '200px' }}>
              <Image 
                src={post.image || '/assets/images/news/default-blog.jpg'} 
                alt={post.title} 
                fill
                className="card-img-top object-cover rounded-top-4"
              />
            </div>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">
                  <i className="fa fa-calendar me-1"></i>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </small>
              </div>
              <Link href={`/blog/${post.slug}`} className="text-decoration-none">
                <h5 className="card-title mb-3 fw-bold text-dark">{post.title}</h5>
              </Link>
              <p className="card-text text-muted mb-3">{post.summary}</p>
            </div>
            <div className="card-footer bg-white border-0 p-4 pt-0">
              <Link href={`/blog/${post.slug}`} className="btn btn-sm gradient-success text-white rounded-pill px-3 py-1">
                Read More <i className="fa fa-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </motion.div>
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
