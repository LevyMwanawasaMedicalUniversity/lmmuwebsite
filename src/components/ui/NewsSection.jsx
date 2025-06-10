"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useLoading from '@/hooks/useLoading';

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { withLoading } = useLoading();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts?published=true&limit=4');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setNews(data.posts || data); // Handle both formats: {posts, total} or just posts array
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err.message);
        // Don't set fallback data, just show the error message
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Call directly instead of using withLoading to prevent infinite loop
  }, []);

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
                src={featuredNews.image || '/assets/images/news/default-blog.jpg'} 
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
              <Link href={`/blog/${featuredNews.slug}`} className="text-decoration-none">
                <h3 className="mb-3 fw-bold text-dark">{featuredNews.title}</h3>
              </Link>
              <p className="text-muted mb-3">{featuredNews.summary}</p>
              <Link href={`/blog/${featuredNews.slug}`} className="btn gradient-success text-white rounded-pill px-4">
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
                    src={newsItem.image || '/assets/images/news/default-blog.jpg'} 
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
                    <Link href={`/blog/${newsItem.slug}`} className="text-decoration-none">
                      <h5 className="card-title mb-2 fw-bold text-dark">{newsItem.title}</h5>
                    </Link>
                    <p className="card-text text-muted small mb-2">{newsItem.summary}</p>
                    <Link href={`/blog/${newsItem.slug}`} className="btn btn-sm gradient-success text-white rounded-pill px-3 py-1">
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