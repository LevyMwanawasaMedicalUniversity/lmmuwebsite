"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import CategorySection from '@/components/ui/CategorySection';
import NewsSection from '@/components/ui/NewsSection';
import ApplySection from '@/components/ui/ApplySection';
import StatsSection from '@/components/ui/StatsSection.jsx';
import TestimonialsSection from '@/components/ui/TestimonialsSection.jsx';
import UpcomingEventsSection from '@/components/ui/UpcomingEventsSection.jsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Dynamically import the Slider component to avoid hydration issues
const Slider = dynamic(() => import('@/components/ui/Slider'), {
  ssr: false,
  loading: () => (
    <div className="hero-section position-relative vh-100 bg-primary">
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    </div>
  ),
});

// Metadata moved to layout.tsx since it can't be exported from a client component

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
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

export default function HomePage(): React.ReactNode {
  // Add global styles for the page
  React.useEffect(() => {    const style = document.createElement('style');
    style.innerHTML = `
      .home-page {
        scroll-behavior: smooth;
      }
      
      .section-heading {
        position: relative;
        display: inline-block;
      }
      
      .section-heading:after {
        content: '';
        position: absolute;
        width: 60px;
        height: 3px;
        background: currentColor;
        left: 50%;
        bottom: -12px;
        transform: translateX(-50%);
        border-radius: 2px;
      }
      
      .modern-container {
        position: relative;
        background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,249,250,0.9));
        border-radius: 16px;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
        overflow: hidden;
      }
      
      .decorative-shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.05;
        z-index: 0;
      }
      
      .bg-gradient-primary-to-secondary {
        background: linear-gradient(135deg, var(--bs-primary), #0056b3);
        position: relative;
        overflow: hidden;
      }
      
      .bg-gradient-primary-to-secondary:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('/assets/images/pattern-dots.png');
        opacity: 0.05;
      }

      .mission-banner {
        background: linear-gradient(rgba(7, 41, 77, 0.85), rgba(7, 41, 77, 0.9)), url('/images/campus-life.jpg');
        background-size: cover;
        background-position: center;
        color: white;
        padding: 5rem 2rem;
        text-align: center;
      }
      
      /* Colorful section backgrounds inspired by Muhlenberg */
      .bg-red-gradient {
        background: linear-gradient(135deg, #c41230 0%, #8a0c22 100%);
        color: white;
      }
      
      .bg-blue-gradient {
        background: linear-gradient(135deg, #1a3a8f 0%, #0f2557 100%);
        color: white;
      }
      
      .bg-gray-gradient {
        background: linear-gradient(135deg, #5d5d5d 0%, #333333 100%);
        color: white;
      }
      
      .bg-green-gradient {
        background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
        color: white;
      }
      
      .bg-pattern {
        position: relative;
      }
      
      .bg-pattern:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('/assets/images/pattern-dots.png');
        opacity: 0.05;
        pointer-events: none;
      }

      .quick-link-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .quick-link-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      }

      .quick-link-img {
        height: 200px;
        width: 100%;
        object-fit: cover;
      }

      .stats-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        text-align: center;
        transition: transform 0.3s ease;
      }

      .stats-card:hover {
        transform: translateY(-5px);
      }

      .campus-highlight {
        position: relative;
        height: 600px;
        overflow: hidden;
      }

      .campus-highlight img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .campus-highlight-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 4rem 2rem;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        color: white;
      }

      .testimonial-card {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        margin: 1rem;
        transition: transform 0.3s ease;
      }

      .testimonial-card:hover {
        transform: translateY(-5px);
      }

      .impact-number {
        font-size: 3rem;
        font-weight: bold;
        color: var(--bs-primary);
        margin-bottom: 0.5rem;
      }

      .news-card {
        border: none;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        transition: transform 0.3s ease;
      }

      .news-card:hover {
        transform: translateY(-8px);
      }

      .cta-button {
        padding: 1rem 2rem;
        font-size: 1.1rem;
        border-radius: 50px;
        transition: all 0.3s ease;
      }

      .cta-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <main className="home-page overflow-hidden">
      {/* Hero Slider Section */}
      <Slider />
      
      {/* Mission Banner - Inspired by Zaytuna */}
      <motion.div 
        className="mission-banner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <h2 className="display-4 fw-bold mb-4">Educating Tomorrow's Healthcare Leaders</h2>
          <p className="university-motto mb-5">Let no one be left behind</p>
          <p className="lead mb-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
            To educate and train health professionals using hands-on and competence-based training that is administered 
            through a distributed network of academic health complexes in order to contribute towards 
            Universal Health Coverage in Zambia.
          </p>
          <Link href="/university/background">
            <motion.button 
              className="btn btn-light btn-lg px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn About LMMU
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Section - Using Unified Gradient System */}
      {/* <motion.div
        className="gradient-primary pattern-overlay py-5 gradient-container mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        
        <div className="circle-decoration circle-large top-right-corner"></div>
        <div className="circle-decoration circle-medium bottom-left-corner"></div>
        
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <motion.h6 
                className="gradient-text-primary text-uppercase fw-bold" 
                style={{ letterSpacing: "2px" }}
                variants={fadeIn}
              >
                By the Numbers
              </motion.h6>
              <h2 className="display-5 fw-bold mb-4 gradient-text-primary">LMMU Impact</h2>
              <p className="lead gradient-text-secondary mb-0">Discover how LMMU is making a difference in medical education and healthcare</p>
            </div>
          </div>
          <StatsSection />
        </div>
      </motion.div> */}
      
     
      
      <motion.section 
        className="position-relative py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="decorative-shape" style={{ 
          width: "400px", 
          height: "400px", 
          background: "var(--bs-primary)", 
          top: "-100px", 
          right: "-150px", 
          opacity: 0.03, 
          borderRadius: "0%" 
        }}></div>
        <div className="decorative-shape" style={{ 
          width: "300px", 
          height: "300px", 
          background: "#ffc600", 
          bottom: "-50px", 
          left: "-100px", 
          opacity: 0.03, 
          borderRadius: "0%" 
        }}></div>
        <CategorySection 
          customTitle="Academic Programs" 
          customDescription="Explore our diverse range of academic programs designed to prepare the next generation of healthcare professionals." 
        />
      </motion.section>
      {/* Application Section with Enhanced Gradient Background */}
      <motion.div 
        className="gradient-lmmu-blue-gold pattern-container pattern-gold-dots py-4 my-0 position-relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <ApplySection />
        
        {/* Standardized decorative elements */}
        <div className="circle-decoration circle-tiny pos-top-left"></div>
        <div className="circle-gold circle-medium pos-bottom-right"></div>
        <div className="triangle-gold triangle-small pos-center-right"></div>
      </motion.div>
        {/* News and Events Section - Modernized */}
      <motion.section 
        className="py-5 my-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container">
          <div className="gradient-success p-4 p-md-5 rounded-4 shadow-lg pattern-container pattern-gold-dots position-relative overflow-hidden">
            <div className="circle-decoration circle-large pos-top-right opacity-10"></div>
            <div className="circle-gold circle-medium pos-bottom-left"></div>
            <div className="triangle-gold triangle-small pos-center-right"></div>
          <div className="row mb-5 align-items-end">
            <motion.div className="col-lg-8" variants={fadeIn}>
              <motion.h6 
                className="text-white text-uppercase fw-bold"
                style={{ letterSpacing: "2px" }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Stay Informed
              </motion.h6>
              <h2 className="display-5 fw-bold position-relative text-dark">
                Latest News & Events
                <motion.span 
                  className="position-absolute"
                  style={{ 
                    height: "4px", 
                    background: "#ffc600", 
                    borderRadius: "2px", 
                    bottom: "-10px", 
                    left: 0
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </h2>
            </motion.div>
            <motion.div 
              className="col-lg-4 d-flex align-items-center justify-content-lg-end"
              variants={fadeIn}
            >
              <Link href="/blog" passHref>
                <motion.span 
                  className="btn gradient-lmmu-gold text-on-gold px-4 py-2"
                  style={{ borderRadius: "30px", borderWidth: "2px", cursor: 'pointer' }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All News <i className="fa fa-arrow-right ms-2"></i>
                </motion.span>
              </Link>
            </motion.div>
          </div>
          <motion.div 
            variants={fadeIn}
            className="modern-container p-4"
          >
            <NewsSection />
          </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Upcoming Events Section */}
      {/* <motion.div 
        className="bg-light py-5 my-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <UpcomingEventsSection />
      </motion.div> */}
      {/* Testimonials Section */}
      {/* <motion.section 
        className="container py-5 my-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="row mb-5" variants={fadeIn}>
          <div className="col-lg-8 mx-auto text-center">
            <motion.h6 
              className="text-primary text-uppercase fw-bold" 
              style={{ letterSpacing: "2px" }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Success Stories
            </motion.h6>
            <h2 className="display-5 fw-bold mb-4 position-relative">
              What Our Students Say
              <motion.div 
                className="mx-auto" 
                style={{ 
                  height: "4px", 
                  background: "var(--bs-primary)", 
                  width: "60px", 
                  borderRadius: "2px", 
                  marginTop: "15px" 
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </div>
        </motion.div>
        <TestimonialsSection />
      </motion.section> */}
    </main>
  );
}