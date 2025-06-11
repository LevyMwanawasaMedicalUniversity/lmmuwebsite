"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useLoading from '@/hooks/useLoading';
import { getPostMainImage, getPostUrl, getCategoriesString, getTagsString } from '@/lib/postUtils';

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const { withLoading } = useLoading();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Add cache-busting parameter and headers to prevent stale data
        const response = await fetch('/api/posts?published=true&limit=4&ts=' + Date.now(), {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.message || data.error);
        }
        
        // Handle both formats: {posts, total} or just posts array
        setNews(data.posts || data);
        
        // If there's a warning, log it but don't fail
        if (data.warning) {
          console.warn("API Warning:", data.warning);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        
        // If we haven't tried individual loading yet, try it as a fallback
        if (retryCount === 0) {
          setRetryCount(1);
          try {
            console.log("Attempting to load posts individually as fallback...");
            // Try to get the latest 4 post IDs
            const idsResponse = await fetch('/api/posts?published=true&limit=4&basicInfo=true', {
              cache: 'no-store'
            });
            
            if (!idsResponse.ok) {
              throw new Error("Failed to fetch post IDs");
            }
            
            const idsData = await idsResponse.json();
            const postIds = (idsData.posts || []).map(p => p.id);
            
            if (postIds.length === 0) {
              throw new Error("No post IDs found");
            }
            
            // Try to fetch each post individually
            const individualPosts = [];
            for (const id of postIds) {
              try {
                const postResponse = await fetch(`/api/posts/${id}?retry=true`);
                if (postResponse.ok) {
                  const postData = await postResponse.json();
                  individualPosts.push(postData);
                }
              } catch (postErr) {
                console.error(`Failed to fetch individual post ${id}:`, postErr);
                // Continue trying other posts even if one fails
              }
            }
            
            if (individualPosts.length > 0) {
              console.log(`Successfully loaded ${individualPosts.length} posts individually`);
              setNews(individualPosts);
              setError(null);
              setLoading(false);
              return; // Exit early as we've handled the error
            } else {
              throw new Error("Failed to load any posts individually");
            }
          } catch (fallbackErr) {
            console.error("Fallback individual post loading failed:", fallbackErr);
            // Continue to regular error handling
          }
        }
        
        // Make the error message more user-friendly based on the error type
        let userFriendlyError = err.message || 'Failed to fetch posts';
        
        // If it seems like a schema error, provide a more helpful message
        if (err.message && (
            err.message.includes('relation') || 
            err.message.includes('schema') ||
            err.message.includes('Unknown field') ||
            err.message.includes('does not exist')
          )) {
          userFriendlyError = 'Database schema issue detected. Please contact the administrator.';
        }
        
        setError(userFriendlyError);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Call directly instead of using withLoading to prevent infinite loop
  }, [retryCount]);

  // If loading, show a loading spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  // If there's an error, show error message with retry button
  if (error) {
    return (
      <div className="alert alert-warning my-4">
        <h4 className="alert-heading">
          <i className="fa fa-exclamation-triangle me-2"></i> Unable to load news
        </h4>
        <p>{error}</p>
        <hr />
        <div className="d-flex">
          <button 
            className="btn btn-outline-primary me-2" 
            onClick={() => window.location.reload()}
          >
            <i className="fa fa-refresh me-1"></i> Refresh Page
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setLoading(true);
              setError(null);
              
              // Exponential backoff - wait longer for each retry
              const backoffDelay = retryCount === 0 ? 500 : Math.min(2000 * Math.pow(1.5, retryCount - 1), 5000);
              console.log(`Retrying with backoff delay of ${backoffDelay}ms (retry #${retryCount + 1})`);
              
              setTimeout(() => {
                // Reset retry count to force the useEffect to run again
                setRetryCount(count => count + 1);
              }, backoffDelay);
            }}
          >
            <i className="fa fa-sync me-1"></i> Try Again
          </button>
        </div>
      </div>
    );
  }

  // Using imported getCategoriesString and getTagsString functions from postUtils.js
  
  // Filter featured news item (first post is featured)
  const featuredNews = news.length > 0 ? news[0] : null;
  const otherNews = news.length > 0 ? news.slice(1) : [];

  return (
    <div className="row g-4">
      {/* Featured News (Larger Column) */}
      <div className="col-lg-6">
        {featuredNews && (
          <div className="featured-news-card h-100 rounded-4 overflow-hidden shadow bg-white">
            <div className="position-relative">
              <Image 
                src={getPostMainImage(featuredNews)} 
                alt={featuredNews.title} 
                width={600}
                height={400}
                className="img-fluid w-100 object-cover"
                style={{ height: '350px' }}
              />
              <div className="position-absolute top-0 start-0 gradient-success text-white px-3 py-2 m-3 rounded-pill">
                <small className="fw-bold">Featured</small>
              </div>
            </div>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">
                  <i className="fa fa-calendar me-2"></i>
                  {new Date(featuredNews.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="text-muted">
                  <i className="fa fa-user me-2"></i>
                  {featuredNews.author?.name || 'LMMU Staff'}
                </span>
              </div>
              {/* Display categories if available */}
              {getCategoriesString(featuredNews) && (
                <div className="mb-2">
                  <small className="text-muted">
                    <i className="fa fa-folder me-1"></i> {getCategoriesString(featuredNews)}
                  </small>
                </div>
              )}
              
              <Link href={getPostUrl(featuredNews)} className="text-decoration-none">
                <h3 className="mb-3 fw-bold text-dark">{featuredNews.title}</h3>
              </Link>
              <p className="text-muted mb-3">{featuredNews.summary}</p>
              
              {/* Display tags if available */}
              {getTagsString(featuredNews) && (
                <div className="mb-3">
                  <small className="text-muted">
                    <i className="fa fa-tags me-1"></i> {getTagsString(featuredNews)}
                  </small>
                </div>
              )}
              
              <Link href={getPostUrl(featuredNews)} className="btn gradient-success text-white rounded-pill px-4">
                Read More <i className="fa fa-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Other News (Right Column) */}
      <div className="col-lg-6">
        {otherNews.map(newsItem => (
          <div className="news-item mb-4" key={newsItem.id}>
            <div className="card border-0 shadow bg-white rounded-3 h-100">
              <div className="row g-0">
                <div className="col-md-4">
                  <Image 
                    src={getPostMainImage(newsItem)} 
                    alt={newsItem.title}
                    width={200}
                    height={140}
                    className="img-fluid rounded-start h-100 object-cover" 
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">
                        <i className="fa fa-calendar me-2"></i>
                        {new Date(newsItem.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </small>
                    </div>
                    <Link href={getPostUrl(newsItem)} className="text-decoration-none">
                      <h5 className="card-title mb-2 fw-bold text-dark">{newsItem.title}</h5>
                    </Link>
                    <p className="card-text text-muted small mb-2">{newsItem.summary}</p>
                    <Link href={getPostUrl(newsItem)} className="btn btn-sm gradient-success text-white rounded-pill px-3 py-1">
                      Read More <i className="fa fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {otherNews.length === 0 && (
          <div className="alert alert-info">
            No additional news posts available.
          </div>
        )}
      </div>
    </div>
  );
}