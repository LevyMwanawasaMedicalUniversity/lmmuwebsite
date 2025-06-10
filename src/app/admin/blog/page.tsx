"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '@/components/layout/AdminLayout';

// Alert component for notifications
const Alert = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  const bgColor = type === 'success' ? 'rgba(255, 198, 0, 0.15)' : 'rgba(220, 53, 69, 0.15)';
  const borderColor = type === 'success' ? '#ffc600' : '#dc3545';
  const textColor = type === 'success' ? '#664d00' : '#721c24';
  
  return (
    <div 
      className="alert alert-dismissible fade show mb-4" 
      role="alert"
      style={{
        backgroundColor: bgColor,
        borderLeft: `4px solid ${borderColor}`,
        color: textColor,
        borderRadius: '0.375rem',
      }}
    >
      <div className="d-flex align-items-center">
        <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
        <div>{message}</div>
      </div>
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
    </div>
  );
};

export default function BlogManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch posts with filters and pagination
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', currentPage.toString());
        params.append('limit', '10');
        
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
        
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
          setTotalPages(Math.ceil(data.total / 10));
          
          // Extract unique categories
          const allCategories = data.posts
            .map((post: any) => post.categories?.split(',').map((cat: string) => cat.trim()))
            .flat()
            .filter((cat): cat is string => Boolean(cat));
          
          setCategories([...new Set(allCategories)] as string[]);
        } else {
          setPosts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setAlert({ message: 'Failed to load blog posts', type: 'error' });
        setPosts([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, searchTerm, selectedCategory]);

  // Redirect if not authenticated or not admin
  if (status === 'loading') {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (status === 'unauthenticated' || !session?.user?.role || session.user.role !== 'admin') {
    router.push('/auth/signin?callbackUrl=/admin/blog');
    return (
      <AdminLayout>
        <div className="alert alert-danger">
          You must be logged in as an administrator to access this page.
        </div>
      </AdminLayout>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete blog post');
      }

      setAlert({ message: 'Blog post deleted successfully!', type: 'success' });
      
      // Refresh the posts list
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error: any) {
      setAlert({ message: error.message || 'An error occurred while deleting the blog post', type: 'error' });
      console.error('Error deleting blog post:', error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page on category change
  };

  const handlePublishToggle = async (post: any) => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !post.published,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update post status');
      }

      const updatedPost = await response.json();
      
      // Update the post in the local state
      setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
      
      setAlert({ 
        message: `Post ${updatedPost.published ? 'published' : 'unpublished'} successfully!`, 
        type: 'success' 
      });
    } catch (error: any) {
      setAlert({ 
        message: error.message || 'An error occurred while updating the post status', 
        type: 'error' 
      });
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="container py-4">
        {alert && (
          <Alert 
            message={alert.message} 
            type={alert.type} 
            onClose={() => setAlert(null)} 
          />
        )}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 fw-bold mb-0">Blog Management</h1>
          <Link href="/admin/blog/create" className="btn gradient-gold text-white">
            <i className="fas fa-plus me-2"></i> New Post
          </Link>
        </div>

        <div className="card shadow-sm border-0 rounded-4 mb-4">
          <div className="card-body p-3">
            <div className="row g-3">
              <div className="col-md-6">
                <form onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="alert alert-info">
            No blog posts found. {searchTerm || selectedCategory ? 'Try adjusting your search criteria.' : 'Create your first post!'}
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '50px' }}>#</th>
                    <th style={{ width: '80px' }}>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th style={{ width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr key={post.id}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>
                        {post.image ? (
                          <div style={{ width: '60px', height: '60px', position: 'relative' }}>
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="60px"
                              style={{ objectFit: 'cover' }}
                              className="rounded"
                            />
                          </div>
                        ) : (
                          <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                            <i className="fas fa-image text-muted"></i>
                          </div>
                        )}
                      </td>
                      <td>
                        <Link href={`/blog/${post.id}`} className="text-decoration-none fw-bold text-dark">
                          {post.title}
                        </Link>
                        <div className="small text-muted">{post.summary.substring(0, 60)}...</div>
                      </td>
                      <td>
                        {post.categories?.split(',').map((category: string, i: number) => (
                          <span key={i} className="badge bg-light text-dark me-1 mb-1">
                            {category.trim()}
                          </span>
                        ))}
                      </td>
                      <td>
                        <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                        <small className="text-muted">
                          {post.author?.name || 'Unknown'}
                        </small>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={post.published}
                            onChange={() => handlePublishToggle(post)}
                            id={`publish-toggle-${post.id}`}
                          />
                          <label className="form-check-label" htmlFor={`publish-toggle-${post.id}`}>
                            {post.published ? 'Published' : 'Draft'}
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Link href={`/admin/blog/edit/${post.id}`} className="btn btn-sm btn-outline-primary">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(post.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                          <Link href={`/blog/${post.id}`} className="btn btn-sm btn-outline-secondary">
                            <i className="fas fa-eye"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Blog pagination" className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
