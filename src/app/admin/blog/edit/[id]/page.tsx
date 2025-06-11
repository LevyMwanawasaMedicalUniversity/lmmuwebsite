"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import AdminLayout from '@/components/layout/AdminLayout';
import Image from 'next/image';
// Import admin styles
import '@/styles/admin.css';
// Import our custom components
import CategorySelector from '@/components/blog/CategorySelector';
import TagSelector from '@/components/blog/TagSelector';
import MultiImageUpload from '@/components/blog/MultiImageUpload';

// Custom styles for this page
const styles = {
  gradientGoldButton: {
    background: 'linear-gradient(135deg, #ffd133 0%, #ffc600 100%)',
    color: '#333333',
    border: 'none',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    minWidth: '120px',
    position: 'relative' as const,  /* Ensure button is visible */
    zIndex: 1              /* Ensure button is above other elements */
  }
};

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
          <span className="visually-hidden"></span>
        </div>
      </div>
    </div>
  ),
});

export default function EditBlogPost({ params }: { params: { id: string } }) {  // Properly unwrap params using React.use()
  const unwrappedParams = React.use(params as any) as { id: string };
  const postId = parseInt(unwrappedParams.id);
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  const [post, setPost] = useState<any>(null);  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Fetch the post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }        const data = await response.json();
        setPost(data);
        setContent(data.content || '');
        setIsPublished(Boolean(data.published));
        console.log('Fetched post published status:', data.published);

        // Set image preview for backward compatibility
        if (data.image) {
          setImagePreview(data.image);
        }
        
        // Handle multiple images
        if (data.images && Array.isArray(data.images)) {
          const formattedImages = data.images.map(img => ({
            id: `existing-${img.id}`,
            url: img.url,
            caption: img.caption || '',
            order: img.order || 0,
            isUploaded: true
          }));
          setImages(formattedImages);
        } else if (data.image) {
          // Create a single image from the legacy image field
          setImages([{
            id: `legacy-${Date.now()}`,
            url: data.image,
            caption: '',
            order: 0,
            isUploaded: true
          }]);
        }

        // Handle categories
        if (data.categoryRelations && Array.isArray(data.categoryRelations)) {
          const categories = data.categoryRelations.map(relation => relation.category).filter(Boolean);
          setSelectedCategories(categories);
        } else if (data.categories) {
          // For backward compatibility, we'll fetch categories by name
          const categoryNames = data.categories.split(',').map(name => name.trim()).filter(Boolean);
          if (categoryNames.length > 0) {
            try {
              const response = await fetch('/api/categories');
              const allCategories = await response.json();
              const matchingCategories = allCategories.filter(cat => 
                categoryNames.some(name => cat.name.toLowerCase() === name.toLowerCase())
              );
              setSelectedCategories(matchingCategories);
            } catch (err) {
              console.error("Error fetching categories:", err);
            }
          }
        }

        // Handle tags
        if (data.tagRelations && Array.isArray(data.tagRelations)) {
          const tags = data.tagRelations.map(relation => relation.tag).filter(Boolean);
          setSelectedTags(tags);
        } else if (data.tags) {
          // For backward compatibility, we'll fetch tags by name
          const tagNames = data.tags.split(',').map(name => name.trim()).filter(Boolean);
          if (tagNames.length > 0) {
            try {
              const response = await fetch('/api/tags');
              const allTags = await response.json();
              const matchingTags = allTags.filter(tag => 
                tagNames.some(name => tag.name.toLowerCase() === name.toLowerCase())
              );
              setSelectedTags(matchingTags);
            } catch (err) {
              console.error("Error fetching tags:", err);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setAlert({ message: 'Failed to load blog post', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    if (postId && !isNaN(postId)) {
      fetchPost();
    } else {
      setAlert({ message: 'Invalid post ID', type: 'error' });
      setIsLoading(false);
    }
  }, [postId]);

  // Redirect if not authenticated or not admin
  if (status === 'loading' || isLoading) {
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
    router.push(`/auth/signin?callbackUrl=/admin/blog/edit/${postId}`);
    return (
      <AdminLayout>
        <div className="alert alert-danger">
          You must be logged in as an administrator to access this page.
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout>
        <div className="alert alert-danger">
          Blog post not found.
        </div>
      </AdminLayout>
    );
  }  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  const handleImagesChange = (updatedImages: any[]) => {
    setImages(updatedImages);
    console.log('Images updated:', updatedImages.length);
  };const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    const formData = new FormData(formRef.current);
      // Create a data object from FormData
    const formDataObj: Record<string, any> = {};
    formData.forEach((value, key) => {
      // Skip the image input field - we'll handle image separately
      if (key === 'image') {
        return;
      }
      
      // Handle checkboxes
      if (key === 'published') {
        formDataObj[key] = value === 'on' || value === 'true';
      } else {
        formDataObj[key] = value;
      }
    });
    
    // Update slug only if title has changed
    const currentTitle = formDataObj.title;
    if (currentTitle && currentTitle !== post.title) {
      // Generate a new slug based on the updated title and timestamp
      const timestamp = new Date().getTime().toString().slice(-6); // Last 6 digits of timestamp
      const titleSlug = currentTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const uniqueSlug = `${titleSlug}-${timestamp}`;
      
      formDataObj.slug = uniqueSlug;
      console.log('Title changed - generating new slug:', uniqueSlug);
    }// Always include the published status from our controlled state
    // This ensures it's included whether checkbox is checked or not
    // The isPublished state contains the current publication status
    // This approach fixes the HTML form issue where unchecked checkboxes don't submit values
    formDataObj.published = isPublished;
    console.log('Saving post with publication status:', isPublished);
      // Add content from the editor
    formDataObj.content = content;
    
    // Add categories and tags
    formDataObj.categoryIds = selectedCategories.map(category => category.id);
    formDataObj.tagIds = selectedTags.map(tag => tag.id);
    
    // For backward compatibility, also include comma-separated strings
    if (selectedCategories.length > 0) {
      formDataObj.categories = selectedCategories.map(c => c.name).join(',');
    }
    
    if (selectedTags.length > 0) {
      formDataObj.tags = selectedTags.map(t => t.name).join(',');
    }
    
    // Process all images
    const uploadedImages = [];
    
    // Iterate through images that have files to upload
    const imagesToUpload = images.filter(img => img.file);
    
    if (imagesToUpload.length > 0) {
      try {
        // Upload each image with a file
        for (const image of imagesToUpload) {
          const imageFormData = new FormData();
          imageFormData.append('file', image.file);
          
          console.log(`Uploading image: ${image.id}`);
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
          
          // Add to our array of processed images
          uploadedImages.push({
            id: image.id,
            url: imageData.url,
            caption: image.caption || '',
            order: image.order || 0
          });
        }
        
        // Add already uploaded images (those without files)
        images.filter(img => !img.file && img.url).forEach(image => {
          uploadedImages.push({
            id: image.id.startsWith('existing-') ? image.id.substring(9) : undefined, // Extract real ID if it's from the database
            url: image.url,
            caption: image.caption || '',
            order: image.order || 0
          });
        });
        
        // Sort images by order
        uploadedImages.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        // Add images to form data object
        formDataObj.images = uploadedImages;
        
        // For backward compatibility, use the first image as the featured image
        if (uploadedImages.length > 0) {
          formDataObj.image = uploadedImages[0].url;
        } else {
          formDataObj.image = null;
        }
      } catch (error) {
        console.error('Error uploading images:', error);
        setAlert({ message: 'Failed to upload one or more images. Please try again.', type: 'error' });
        setIsSubmitting(false);
        return;
      }
    } else if (images.length > 0) {
      // If no new images to upload, but we have existing images
      const processedImages = images.map(image => ({
        id: image.id.startsWith('existing-') ? image.id.substring(9) : undefined,
        url: image.url,
        caption: image.caption || '',
        order: image.order || 0
      }));
      
      formDataObj.images = processedImages;
      
      // For backward compatibility
      if (processedImages.length > 0) {
        formDataObj.image = processedImages[0].url;
      } else {
        formDataObj.image = null;
      }
    } else {
      // No images at all
      formDataObj.image = null;
      formDataObj.images = [];
    }try {
      console.log('Sending data:', JSON.stringify(formDataObj, null, 2)); // Debug log in formatted JSON
      console.log('Published status:', formDataObj.published);
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', response.status, errorText);
        
        let errorMessage = `Failed to update blog post (${response.status} ${response.statusText})`;
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
      setAlert({ message: 'Blog post updated successfully!', type: 'success' });
      setTimeout(() => {
        router.push(`/blog/${data.id}`);
      }, 1500); // Give user time to see the success message
    } catch (error: any) {
      setAlert({ message: error.message || 'An error occurred while updating the blog post', type: 'error' });
      console.error('Error updating blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete blog post');
      }

      setAlert({ message: 'Blog post deleted successfully!', type: 'success' });
      setTimeout(() => {
        router.push('/admin/blog');
      }, 1500); // Give user time to see the success message
    } catch (error: any) {
      setAlert({ message: error.message || 'An error occurred while deleting the blog post', type: 'error' });
      console.error('Error deleting blog post:', error);
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
              <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                <h1 className="h3 mb-0 fw-bold">Edit Blog Post</h1>
                <button 
                  type="button" 
                  className="btn btn-outline-danger" 
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  <i className="fas fa-trash-alt me-2"></i> Delete
                </button>
              </div>
              <div className="card-body p-4">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="mb-3">                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="title" 
                      name="title" 
                      required 
                      defaultValue={post.title}
                      placeholder="Enter blog post title"
                    />
                    <small className="text-muted">
                      Note: Changing the title will automatically generate a new URL slug.
                    </small>
                  </div>{/* Hidden slug field - slug is auto-generated */}
                  <input 
                    type="hidden" 
                    id="slug" 
                    name="slug" 
                    value={post.slug}
                  />

                  <div className="mb-3">
                    <label htmlFor="summary" className="form-label fw-bold">Summary</label>
                    <textarea 
                      className="form-control" 
                      id="summary" 
                      name="summary" 
                      rows={3} 
                      required 
                      defaultValue={post.summary}
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
                  </div>                  <div className="row mb-3">
                    <div className="col-md-6">
                      <CategorySelector 
                        selectedCategories={selectedCategories}
                        onChange={setSelectedCategories}
                        allowCreate={true}
                      />
                    </div>
                    <div className="col-md-6">
                      <TagSelector
                        selectedTags={selectedTags}
                        onChange={setSelectedTags}
                        allowCreate={true}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Images</label>
                    <MultiImageUpload
                      existingImages={images}
                      onChange={handleImagesChange}
                      maxImages={5}
                    />
                  </div>                  <div className="mb-4 p-3 border rounded bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-0">Publication Status</h5>
                        <p className="text-muted mb-0 small">Control whether this post is visible to visitors</p>
                      </div>                      <div className="d-flex align-items-center">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="published"
                            name="published"
                            checked={isPublished}
                            onChange={(e) => {
                              setIsPublished(e.target.checked);
                              console.log("Published status toggled to:", e.target.checked);
                            }}
                            style={{ width: '3em', height: '1.5em' }}
                          />
                          <label className="form-check-label ms-3" htmlFor="published">
                            {isPublished ? 
                              <span className="badge bg-success">Published</span> : 
                              <span className="badge bg-secondary">Unpublished</span>
                            }
                            <small className="d-block text-muted mt-1">
                              {isPublished ? 
                                "This post is visible to all visitors" : 
                                "This post is only visible to admins"
                              }
                            </small>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary px-4 py-2" 
                      onClick={() => router.back()}
                      disabled={isSubmitting}
                      style={{ minWidth: '120px' }}
                    >
                      Cancel
                    </button>                    <button 
                      type="submit" 
                      className="btn px-4 py-2" 
                      disabled={isSubmitting}
                      style={styles.gradientGoldButton}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>                      ) : (                        <>
                          Update Post 
                          {isPublished ? 
                            <span className="ms-1 badge bg-success" style={{fontSize: '0.7em'}}>Published</span> : 
                            <span className="ms-1 badge bg-secondary" style={{fontSize: '0.7em'}}>Unpublished</span>
                          }
                        </>
                      )}
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
