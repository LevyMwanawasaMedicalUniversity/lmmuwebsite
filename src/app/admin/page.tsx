"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    recentPosts: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchStats();
    }
  }, [session]);

  // Redirect if not authenticated or not admin
  if (status === 'loading') {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (status === 'unauthenticated' || !session?.user?.role || session.user.role !== 'admin') {
    router.push('/auth/signin?callbackUrl=/admin');
    return (
      <AdminLayout>
        <div className="alert alert-danger">
          You must be logged in as an administrator to access this page.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h1 className="h2 mb-4 fw-bold">Admin Dashboard</h1>
        
        <div className="row g-4 mb-4">
          {/* Total Posts Card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Posts</h6>
                    <h2 className="mb-0 fw-bold">
                      {isLoading ? (
                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                          <span className="visually-hidden"></span>
                        </div>
                      ) : stats.totalPosts}
                    </h2>
                  </div>
                  <div className="bg-light rounded-circle p-3">
                    <i className="fas fa-newspaper fa-2x text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Published Posts Card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Published Posts</h6>
                    <h2 className="mb-0 fw-bold">
                      {isLoading ? (
                        <div className="spinner-border spinner-border-sm text-success" role="status">
                          <span className="visually-hidden"></span>
                        </div>
                      ) : stats.publishedPosts}
                    </h2>
                  </div>
                  <div className="bg-light rounded-circle p-3">
                    <i className="fas fa-check-circle fa-2x text-success"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Draft Posts Card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Draft Posts</h6>
                    <h2 className="mb-0 fw-bold">
                      {isLoading ? (
                        <div className="spinner-border spinner-border-sm text-warning" role="status">
                          <span className="visually-hidden"></span>
                        </div>
                      ) : stats.draftPosts}
                    </h2>
                  </div>
                  <div className="bg-light rounded-circle p-3">
                    <i className="fas fa-edit fa-2x text-warning"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  
                  <div className="col-md-4 col-lg-2">
                    <Link href="/admin/blog" className="card text-center border-0 shadow-sm h-100 text-decoration-none">
                      <div className="card-body py-4">
                        <div className="mb-3">
                          <i className="fas fa-list fa-3x text-success"></i>
                        </div>
                        <h5>Manage Posts</h5>
                        <p className="text-muted small mb-0">Edit or publish posts</p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4 col-lg-2">
                    <Link href="/admin/categories" className="card text-center border-0 shadow-sm h-100 text-decoration-none">
                      <div className="card-body py-4">
                        <div className="mb-3">
                          <i className="fas fa-folder fa-3x text-warning"></i>
                        </div>
                        <h5>Categories</h5>
                        <p className="text-muted small mb-0">Manage post categories</p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4 col-lg-2">
                    <Link href="/admin/tags" className="card text-center border-0 shadow-sm h-100 text-decoration-none">
                      <div className="card-body py-4">
                        <div className="mb-3">
                          <i className="fas fa-tags fa-3x text-info"></i>
                        </div>
                        <h5>Tags</h5>
                        <p className="text-muted small mb-0">Manage post tags</p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4 col-lg-2">
                    <Link href="/admin/users" className="card text-center border-0 shadow-sm h-100 text-decoration-none">
                      <div className="card-body py-4">
                        <div className="mb-3">
                          <i className="fas fa-users fa-3x text-violet"></i>
                        </div>
                        <h5>Users</h5>
                        <p className="text-muted small mb-0">Manage user accounts</p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4 col-lg-2">
                    <Link href="/admin/roles" className="card text-center border-0 shadow-sm h-100 text-decoration-none">
                      <div className="card-body py-4">
                        <div className="mb-3">
                          <i className="fas fa-user-shield fa-3x text-secondary"></i>
                        </div>
                        <h5>Roles</h5>
                        <p className="text-muted small mb-0">Configure Roles</p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4 col-lg-2">
                    <Link href="/admin/permissions" className="card text-center border-0 shadow-sm h-100 text-decoration-none">
                      <div className="card-body py-4">
                        <div className="mb-3">
                          <i className="fas fa-key fa-3x text-primary"></i>
                        </div>
                        <h5>Permissions</h5>
                        <p className="text-muted small mb-0">Configure Permissions</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Recent Posts</h5>
                <Link href="/admin/blog" className="btn btn-sm gradient-gold text-white">
                  View All
                </Link>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <div className="d-flex justify-content-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden"></span>
                    </div>
                  </div>
                ) : stats.recentPosts && stats.recentPosts.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentPosts.map((post: any) => (
                          <tr key={post.id}>
                            <td>
                              <div className="fw-bold">{post.title}</div>
                              <div className="small text-muted">{post.summary.substring(0, 60)}...</div>
                            </td>
                            <td>
                              <span className={`badge ${post.published ? 'bg-success' : 'bg-warning'}`}>
                                {post.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                            <td>
                              <div className="btn-group">
                                <Link href={`/admin/blog/edit/${post.id}`} className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-edit"></i>
                                </Link>
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
                ) : (
                  <div className="alert alert-info">
                    No blog posts found. Create your first post!
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
