"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
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
    <motion.div 
      className="testimonials-slider"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="row">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            className="col-lg-4 col-md-6 mb-4" 
            key={testimonial.id}
            variants={fadeIn}
            animate={index === activeIndex ? { scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="testimonial-card h-100 p-4 bg-white rounded shadow-sm" 
              style={{ 
                borderLeft: index === activeIndex ? "4px solid var(--bs-primary)" : "4px solid transparent",
                transition: "all 0.3s ease"
              }}
            >
              <div className="testimonial-content">
                <motion.div 
                  className="quote-icon text-primary mb-3"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <i className="fa fa-quote-left fa-2x"></i>
                </motion.div>
                <p className="mb-4" style={{ fontStyle: "italic", lineHeight: "1.6" }}>"{testimonial.quote}"</p>
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
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-5">
        <div className="testimonial-indicators mb-4">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className={`btn btn-sm rounded-circle mx-1 ${index === activeIndex ? 'btn-primary' : 'btn-outline-primary'}`}
              style={{ width: '12px', height: '12px', padding: 0 }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Testimonial ${index + 1}`}
            />
          ))}
        </div>
        <motion.a 
          href="/testimonials" 
          className="btn btn-primary px-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Read More Stories
        </motion.a>
      </div>
    </motion.div>
  );
}
