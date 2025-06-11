"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import toast from 'react-hot-toast';

type Category = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminCategoriesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchCategories();
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/admin/categories');
    }
  }, [session, status, router, refreshKey]);

  // Handle creating a new category
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newCategory })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create category');
      }

      toast.success('Category created successfully');
      setNewCategory('');
      setRefreshKey(prev => prev + 1); // Refresh the list
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error(error.message || 'Failed to create category');
    }
  };

  // Handle updating a category
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editCategory || !editCategory.name.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    try {
      const response = await fetch(`/api/categories/${editCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: editCategory.name })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update category');
      }

      toast.success('Category updated successfully');
      setEditCategory(null);
      setRefreshKey(prev => prev + 1); // Refresh the list
    } catch (error: any) {
      console.error('Error updating category:', error);
      toast.error(error.message || 'Failed to update category');
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete category');
      }

      toast.success('Category deleted successfully');
      setRefreshKey(prev => prev + 1); // Refresh the list
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast.error(error.message || 'Failed to delete category');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (status === 'loading' || (status === 'authenticated' && loading)) {
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

  if (status === 'authenticated' && session?.user?.role !== 'admin') {
    return (
      <AdminLayout>
        <div className="alert alert-danger">
          You do not have permission to access this page.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Manage Categories</h1>
        </div>

        <div className="row">
          {/* Create Category Form */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-gradient-primary text-white">
                <h5 className="card-title mb-0">Create New Category</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleCreateCategory}>
                  <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoryName"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter category name"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-plus-circle me-1"></i> Create Category
                  </button>
                </form>
              </div>
            </div>

            {/* Edit Category Form (shown when editing) */}
            {editCategory && (
              <div className="card shadow-sm mt-4">
                <div className="card-header bg-gradient-warning text-white">
                  <h5 className="card-title mb-0">Edit Category</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleUpdateCategory}>
                    <div className="mb-3">
                      <label htmlFor="editCategoryName" className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editCategoryName"
                        value={editCategory.name}
                        onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                        placeholder="Enter category name"
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn btn-warning">
                        <i className="fas fa-save me-1"></i> Update
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => setEditCategory(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Categories List */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-gradient-success text-white">
                <h5 className="card-title mb-0">All Categories</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="d-flex justify-content-center py-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="alert alert-info mb-0">
                    No categories have been created yet.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Slug</th>
                          <th>Created</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td>{formatDate(category.createdAt)}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary me-1"
                                onClick={() => setEditCategory(category)}
                                title="Edit category"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteCategory(category.id)}
                                title="Delete category"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
