"use client";

import React from 'react';
import Slider from '@/components/ui/Slider';
import CategorySection from '@/components/ui/CategorySection';
import NewsSection from '@/components/ui/NewsSection';
import ApplySection from '@/components/ui/ApplySection';
// Import the new UI components we created
import StatsSection from '@/components/ui/StatsSection.jsx';
import TestimonialsSection from '@/components/ui/TestimonialsSection.jsx';
import UpcomingEventsSection from '@/components/ui/UpcomingEventsSection.jsx';
import { motion } from 'framer-motion';

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
  React.useEffect(() => {
    const style = document.createElement('style');
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
      
      {/* Quick Links/Stats Section */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <StatsSection />
      </motion.div> */}
      
      {/* Academic Programs Section - Modern Header */}
      <motion.section 
        className="container py-5 my-md-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto text-center">
            <motion.div variants={fadeIn}>
              <motion.h6 
                className="text-primary text-uppercase fw-bold" 
                style={{ letterSpacing: "2px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Excellence in Education
              </motion.h6>
              
              <h2 className="display-5 fw-bold mb-4 section-heading">Academic Excellence at LMMU</h2>
              
              <motion.p 
                className="lead text-muted"
                style={{ maxWidth: "800px", margin: "30px auto 0" }}
              >
                Discover our comprehensive range of programs designed to prepare healthcare professionals 
                for the challenges of modern medicine.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
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
          borderRadius: "50%" 
        }}></div>
        <div className="decorative-shape" style={{ 
          width: "300px", 
          height: "300px", 
          background: "#ffc600", 
          bottom: "-50px", 
          left: "-100px", 
          opacity: 0.03, 
          borderRadius: "50%" 
        }}></div>
        <CategorySection 
          customTitle="Academic Programs" 
          customDescription="Explore our diverse range of academic programs designed to prepare the next generation of healthcare professionals." 
        />
      </motion.section>
      {/* Application Section with Enhanced Gradient Background */}
      <motion.div 
        className="bg-gradient-primary-to-secondary py-4 my-0 position-relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <ApplySection />
        
        {/* Modern decorative elements */}
        <div className="position-absolute" style={{ 
          top: "20px", 
          left: "5%", 
          width: "40px", 
          height: "40px", 
          borderRadius: "50%", 
          background: "rgba(255,255,255,0.1)" 
        }}></div>
        <div className="position-absolute" style={{ 
          bottom: "30px", 
          right: "10%", 
          width: "60px", 
          height: "60px", 
          borderRadius: "50%", 
          background: "rgba(255,255,255,0.1)" 
        }}></div>
      </motion.div>
      
      {/* News and Events Section - Modernized */}
      <motion.section 
        className="container py-5 my-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="row mb-5 align-items-end">
          <motion.div className="col-lg-8" variants={fadeIn}>
            <motion.h6 
              className="text-primary text-uppercase fw-bold"
              style={{ letterSpacing: "2px" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Stay Informed
            </motion.h6>
            <h2 className="display-5 fw-bold position-relative">
              Latest News & Events
              <motion.span 
                className="position-absolute"
                style={{ 
                  height: "4px", 
                  background: "var(--bs-primary)", 
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
            <motion.a 
              href="/news" 
              className="btn btn-outline-primary px-4 py-2"
              style={{ borderRadius: "30px", borderWidth: "2px" }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All News
            </motion.a>
          </motion.div>
        </div>
        <motion.div 
          variants={fadeIn}
          className="modern-container p-4"
        >
          <NewsSection />
        </motion.div>
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