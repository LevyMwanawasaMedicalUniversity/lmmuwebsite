"use client";

import React from 'react';
import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Catherine Mwale",
      role: "MBChB Graduate, 2023",
      image: "/images/testimonials/testimonial-1.jpg",
      quote: "My experience at LMMU was transformative. The faculty's commitment to excellence and the hands-on clinical experience prepared me well for my medical career."
    },
    {
      id: 2,
      name: "James Banda",
      role: "BSc Nursing Student",
      image: "/images/testimonials/testimonial-2.jpg",
      quote: "The nursing program at LMMU combines theoretical knowledge with practical skills in a way that builds confidence. The simulation labs and clinical rotations are outstanding."
    },
    {
      id: 3,
      name: "Dr. Elizabeth Tembo",
      role: "MPH Graduate, 2022",
      image: "/images/testimonials/testimonial-3.jpg",
      quote: "The Master of Public Health program gave me the tools to address real public health challenges in Zambia. The faculty mentorship was exceptional."
    }
  ];

  return (
    <div className="testimonials-slider">
      <div className="row">
        {testimonials.map((testimonial) => (
          <div className="col-lg-4 col-md-6 mb-4" key={testimonial.id}>
            <div className="testimonial-card h-100 p-4 bg-white rounded shadow-sm">
              <div className="testimonial-content">
                <div className="quote-icon text-primary mb-3">
                  <i className="fa fa-quote-left fa-2x"></i>
                </div>
                <p className="mb-4">{testimonial.quote}</p>
                <div className="testimonial-author d-flex align-items-center">
                  <div className="author-image me-3">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-circle"
                      // Fallback image if the testimonial image is not available
                      onError={(e) => {
                        e.currentTarget.src = "/images/testimonials/default-avatar.jpg";
                      }}
                    />
                  </div>
                  <div className="author-info">
                    <h5 className="mb-0">{testimonial.name}</h5>
                    <p className="text-muted mb-0">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <a href="/testimonials" className="btn btn-primary">Read More Stories</a>
      </div>
    </div>
  );
}
