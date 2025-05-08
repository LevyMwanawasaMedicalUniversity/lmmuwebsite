"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function NewsSection() {
  const news = [
    {
      id: 1,
      title: "2024 Trade Fair",
      excerpt: "LMMU and LMMU-UTH Stand at the 2024 Trade Fair held in Ndola, Zambia at the Trade Fair Grounds.",
      image: "/assets/images/news/n-1.jpeg",
      date: "June 12, 2024",
      author: "Admin",
      link: "/tradefair",
      featured: true
    },
    {
      id: 2,
      title: "Graduation Ceremony",
      excerpt: "LMMU hosted its 4th Graduation Ceremony celebrating the achievements of graduates and sending forth trained professionals into the workforce.",
      image: "/assets/images/news/ns-1.jpg",
      date: "June 5, 2024",
      author: "Admin",
      link: "/graduation",
      featured: false
    },
    {
      id: 3,
      title: "Induction Ceremony",
      excerpt: "LMMU hosted its first ever induction ceremony for The Bachelor of Medicine and The Bachelor of Surgery program in The School of Medicine and Clinical Sciences.",
      image: "/assets/images/news/ns-2.jpeg",
      date: "May 20, 2024",
      author: "Admin",
      link: "/induction",
      featured: false
    },
    {
      id: 4,
      title: "International Labour Day",
      excerpt: "LMMU joined the rest of the world in commemorating the annual Labour Day celebration.",
      image: "/assets/images/news/ns-3.jpeg",
      date: "May 1, 2024",
      author: "Admin",
      link: "/labour",
      featured: false
    }
  ];

  // Filter featured news item
  const featuredNews = news.find(item => item.featured);
  const otherNews = news.filter(item => !item.featured);

  return (
    <div className="row g-4">
      {/* Featured News (Larger Column) */}
      <div className="col-lg-6">
        <div className="featured-news-card h-100 rounded overflow-hidden shadow-sm">
          <div className="position-relative">
            <Image 
              src={featuredNews.image} 
              alt={featuredNews.title} 
              width={600}
              height={400}
              className="img-fluid w-100 object-cover"
              style={{ height: '350px' }}
            />
            <div className="position-absolute top-0 start-0 bg-primary text-white px-3 py-2 m-3">
              <small>Featured</small>
            </div>
          </div>
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">
                <i className="fa fa-calendar me-2"></i>
                {featuredNews.date}
              </span>
              <span className="text-muted">
                <i className="fa fa-user me-2"></i>
                {featuredNews.author}
              </span>
            </div>
            <Link href={featuredNews.link} className="text-decoration-none">
              <h3 className="mb-3 fw-bold text-dark">{featuredNews.title}</h3>
            </Link>
            <p className="text-muted mb-3">{featuredNews.excerpt}</p>
            <Link href={featuredNews.link} className="btn btn-outline-primary rounded-pill px-4">
              Read More
            </Link>
          </div>
        </div>
      </div>

      {/* Other News (Right Column) */}
      <div className="col-lg-6">
        {otherNews.map(newsItem => (
          <div className="news-item mb-4" key={newsItem.id}>
            <div className="card border-0 shadow-sm">
              <div className="row g-0">
                <div className="col-md-4">
                  <Image 
                    src={newsItem.image} 
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
                        {newsItem.date}
                      </small>
                    </div>
                    <Link href={newsItem.link} className="text-decoration-none">
                      <h5 className="card-title mb-2 fw-bold text-dark">{newsItem.title}</h5>
                    </Link>
                    <p className="card-text text-muted small mb-2">{newsItem.excerpt}</p>
                    <Link href={newsItem.link} className="btn btn-link text-primary p-0">
                      Read More <i className="fa fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}