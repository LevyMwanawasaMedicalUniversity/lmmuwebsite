"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
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

// Import our advanced editor component
const BlogEditor = dynamic(() => import('@/components/blog/TipTapEditor'), {
  ssr: false,
  loading: () => (
    <div className="p-3 border rounded">
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading editor...</span>
        </div>
      </div>
    </div>
  ),
});

export default function CreateBlogPost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
    router.push('/auth/signin?callbackUrl=/admin/blog/create');
    return (
      <AdminLayout>
        <div className="alert alert-danger">
          You must be logged in as an administrator to access this page.
        </div>
      </AdminLayout>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected new image file:', file.name, 'Size:', (file.size / 1024).toFixed(2), 'KB');
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        console.log('Image preview generated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    const formData = new FormData(formRef.current);
    
    // Get the title for slug generation
    const title = formData.get('title') as string;
    
    // Add content from the editor
    formData.append('content', content);
    
    // Generate a slug based on title and timestamp
    const timestamp = new Date().getTime().toString().slice(-6); // Last 6 digits of timestamp
    const titleSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const uniqueSlug = `${titleSlug}-${timestamp}`;
    
    // Replace any manually entered slug with our auto-generated one
    formData.delete('slug');
    formData.append('slug', uniqueSlug);
    
    // Add image if selected
    if (imageFile) {
      // Create a new FormData for the image upload
      const imageFormData = new FormData();
      imageFormData.append('file', imageFile);
      
      try {
        console.log('Uploading new image for blog post');
        // First upload the image
        const imageResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });
        
        if (!imageResponse.ok) {
          const errorText = await imageResponse.text();
          console.error('Image upload error:', errorText);
          throw new Error('Failed to upload image');
        }
        
        const imageData = await imageResponse.json();
        console.log('Image uploaded successfully:', imageData);
        formData.append('image', imageData.url);
      } catch (error) {
        console.error('Error uploading image:', error);
        setAlert({ message: 'Failed to upload image. Please try again.', type: 'error' });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // Convert formData to a regular object
      const formDataObj: Record<string, any> = {};
      formData.forEach((value, key) => {
        // Handle checkbox for published field - convert from string to boolean
        if (key === 'published') {
          formDataObj[key] = value === 'on' || value === 'true';
        } else {
          formDataObj[key] = value;
        }
      });
      
      console.log('Sending post data:', JSON.stringify(formDataObj, null, 2));
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', response.status, errorText);
        
        let errorMessage = `Failed to create blog post (${response.status} ${response.statusText})`;
        try {
          const errorData = JSON.parse(errorText);
          if (errorData && typeof errorData === 'object' && 'error' in errorData) {
            errorMessage = errorData.error as string;
          }
        } catch (e) {
          // If not valid JSON, use the text as is
          if (errorText) {
            errorMessage += `: ${errorText}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setAlert({ message: 'Blog post created successfully!', type: 'success' });
      setTimeout(() => {
        router.push(`/blog/${data.slug}`);
      }, 1500); // Give user time to see the success message
    } catch (error: any) {
      setAlert({ message: error.message || 'An error occurred while creating the blog post', type: 'error' });
      console.error('Error creating blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {alert && (
              <Alert 
                message={alert.message} 
                type={alert.type} 
                onClose={() => setAlert(null)} 
              />
            )}
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-white py-3 border-0">
                <h1 className="h3 mb-0 fw-bold text-center">Create New Blog Post</h1>
              </div>
              <div className="card-body p-4">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="title" 
                      name="title" 
                      required 
                      placeholder="Enter blog post title"
                    />
                  </div>

                  {/* Slug is auto-generated from title and timestamp */}

                  <div className="mb-3">
                    <label htmlFor="summary" className="form-label fw-bold">Summary</label>
                    <textarea 
                      className="form-control" 
                      id="summary" 
                      name="summary" 
                      rows={3} 
                      required 
                      placeholder="Brief summary of the blog post"
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="content" className="form-label fw-bold">Content</label>
                    <div className="bg-white border rounded">
                      <BlogEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Write your blog post content here..."
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="categories" className="form-label fw-bold">Categories</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="categories" 
                        name="categories" 
                        placeholder="Events, News, Academic (comma separated)"
                      />
                      <small className="text-muted">Separate categories with commas</small>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="tags" className="form-label fw-bold">Tags</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="tags" 
                        name="tags" 
                        placeholder="university, medicine, research (comma separated)"
                      />
                      <small className="text-muted">Separate tags with commas</small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label fw-bold">Featured Image</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="image" 
                      name="image" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="img-thumbnail" 
                          style={{ maxHeight: '200px' }} 
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-3 form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="published" 
                      name="published" 
                      defaultChecked 
                    />
                    <label className="form-check-label" htmlFor="published">Publish immediately</label>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary px-4" 
                      onClick={() => router.back()}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn gradient-gold text-white px-4" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : 'Create Post'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
