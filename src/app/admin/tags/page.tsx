"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import toast from 'react-hot-toast';

type Tag = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminTagsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState('');
  const [editTag, setEditTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch all tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
        toast.error('Failed to load tags');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchTags();
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/admin/tags');
    }
  }, [session, status, router, refreshKey]);

  // Handle creating a new tag
  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTag.trim()) {
      toast.error('Tag name cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newTag })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create tag');
      }

      toast.success('Tag created successfully');
      setNewTag('');
      setRefreshKey(prev => prev + 1); // Refresh the list
    } catch (error: any) {
      console.error('Error creating tag:', error);
      toast.error(error.message || 'Failed to create tag');
    }
  };

  // Handle updating a tag
  const handleUpdateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editTag || !editTag.name.trim()) {
      toast.error('Tag name cannot be empty');
      return;
    }

    try {
      const response = await fetch(`/api/tags/${editTag.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: editTag.name })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update tag');
      }

      toast.success('Tag updated successfully');
      setEditTag(null);
      setRefreshKey(prev => prev + 1); // Refresh the list
    } catch (error: any) {
      console.error('Error updating tag:', error);
      toast.error(error.message || 'Failed to update tag');
    }
  };

  // Handle deleting a tag
  const handleDeleteTag = async (id: number) => {
    if (!confirm('Are you sure you want to delete this tag?')) {
      return;
    }

    try {
      const response = await fetch(`/api/tags/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete tag');
      }

      toast.success('Tag deleted successfully');
      setRefreshKey(prev => prev + 1); // Refresh the list
    } catch (error: any) {
      console.error('Error deleting tag:', error);
      toast.error(error.message || 'Failed to delete tag');
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
          <h1 className="h3 mb-0">Manage Tags</h1>
        </div>

        <div className="row">
          {/* Create Tag Form */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-gradient-primary text-white">
                <h5 className="card-title mb-0">Create New Tag</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleCreateTag}>
                  <div className="mb-3">
                    <label htmlFor="tagName" className="form-label">Tag Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tagName"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Enter tag name"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-plus-circle me-1"></i> Create Tag
                  </button>
                </form>
              </div>
            </div>

            {/* Edit Tag Form (shown when editing) */}
            {editTag && (
              <div className="card shadow-sm mt-4">
                <div className="card-header bg-gradient-warning text-white">
                  <h5 className="card-title mb-0">Edit Tag</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleUpdateTag}>
                    <div className="mb-3">
                      <label htmlFor="editTagName" className="form-label">Tag Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editTagName"
                        value={editTag.name}
                        onChange={(e) => setEditTag({ ...editTag, name: e.target.value })}
                        placeholder="Enter tag name"
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
                        onClick={() => setEditTag(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Tags List */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-gradient-success text-white">
                <h5 className="card-title mb-0">All Tags</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="d-flex justify-content-center py-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : tags.length === 0 ? (
                  <div className="alert alert-info mb-0">
                    No tags have been created yet.
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
                        {tags.map((tag) => (
                          <tr key={tag.id}>
                            <td>{tag.id}</td>
                            <td>{tag.name}</td>
                            <td>{tag.slug}</td>
                            <td>{formatDate(tag.createdAt)}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary me-1"
                                onClick={() => setEditTag(tag)}
                                title="Edit tag"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteTag(tag.id)}
                                title="Delete tag"
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
