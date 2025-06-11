"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check if user is authenticated and has admin role
  const isAdmin = session?.user?.role === 'admin';

  return (
    <div className="admin-layout">
      <Toaster position="top-right" />
      
      {/* Admin Header */}
      <header className="bg-dark text-white py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Link href="/" className="me-3">
                <Image 
                  src="/assets/images/logo.png" 
                  alt="LMMU Logo" 
                  width={50} 
                  height={35} 
                  className="img-fluid"
                />
              </Link>
              <h1 className="h4 mb-0">LMMU Admin</h1>
            </div>
            <div>
              {session?.user && (
                <span className="me-3">
                  <i className="fas fa-user-circle me-2"></i>
                  {session.user.name || 'Admin User'}
                </span>
              )}
              <Link href="/" className="btn btn-sm btn-outline-light">
                <i className="fas fa-home me-2"></i>
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 bg-light sidebar py-4" style={{ minHeight: 'calc(100vh - 62px)' }}>
            <div className="position-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link href="/admin" className="nav-link text-dark">
                    <i className="fas fa-tachometer-alt me-2"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/blog" className="nav-link text-dark">
                    <i className="fas fa-newspaper me-2"></i>
                    Blog Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/blog/create" className="nav-link text-dark">
                    <i className="fas fa-plus-circle me-2"></i>
                    New Blog Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/categories" className="nav-link text-dark">
                    <i className="fas fa-folder me-2"></i>
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/tags" className="nav-link text-dark">
                    <i className="fas fa-tags me-2"></i>
                    Tags
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/users" className="nav-link text-dark">
                    <i className="fas fa-users me-2"></i>
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/settings" className="nav-link text-dark">
                    <i className="fas fa-cog me-2"></i>
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-lg-10 px-md-4 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
