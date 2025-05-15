"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategorySection({ customTitle, customDescription }) {
  // Define animation variants for cards
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, staggerChildren: 0.15 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };
  
  // Staggered animation for children
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const academicPrograms = [
    {
      id: 1,
      title: "School of Medicine & Clinical Sciences",
      description: "Comprehensive medical programs including MBChB and specialized clinical training.",
      icon: "/assets/images/all-icon/ctg-1.jpeg",
      link: "/academics/schools/somcs",
      color: "#2a76dd"
    },
    {
      id: 2,
      title: "School of Health Sciences",
      description: "Programs in nursing, pharmacy, physiotherapy, and allied health professions.",
      icon: "/assets/images/all-icon/ctg-2.jpg",
      link: "/academics/schools/soh",
      color: "#17a2b8"
    },
    {
      id: 3,
      title: "School of Public Health & Environmental Sciences",
      description: "Focused on public health, epidemiology, and environmental health sciences.",
      icon: "/assets/images/all-icon/ctg-3.jpg",
      link: "/academics/schools/sophes",
      color: "#28a745"
    },
    {
      id: 4,
      title: "Institute of Basic and Biomedical Sciences",
      description: "Advanced research and education in basic and biomedical sciences.",
      icon: "/assets/images/all-icon/ctg-4.jpg",
      link: "/academics/ibbs",
      color: "#6f42c1"
    },
    {
      id: 5,
      title: "School of Nursing",
      description: "Programs in nursing education and research.",
      icon: "/assets/images/all-icon/ctg-5.png",
      link: "/academics/schools/ns",
      color: "#dc3545"
    }
  ];
  
  return (
    <section id="category-part" className="py-5" style={{ background: 'linear-gradient(145deg, #f8f9fa, #ffffff)' }}>
      <div className="container-fluid px-md-5">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h6 className="text-uppercase fw-bold" style={{ letterSpacing: '2px', color: '#ffc600' }}>{customTitle || 'Academic Programs'}</h6>
              <motion.h2 
                className="display-5 fw-bold mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Our Schools & Faculties
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '80px' }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ height: '4px', background: '#ffc600', margin: '0 auto 20px', borderRadius: '2px' }}
              />
              <p className="lead" style={{ maxWidth: '800px', margin: '0 auto' }}>{customDescription || 'Discover our specialized programs designed to prepare healthcare professionals for the future of medicine and public health.'}</p>
            </motion.div>
          </div>
        </div>
        
        <div className="position-relative academic-programs">
          
          <motion.div 
            className="row g-4" 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {academicPrograms.map((program) => (
              <motion.div 
                className="col-lg-4 col-md-6 col-sm-12 mb-4" 
                key={program.id}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={cardVariants}
              >
                <motion.div 
                  className="modern-card h-100 position-relative overflow-hidden" 
                  style={{
                    background: `linear-gradient(145deg, ${program.color}15, ${program.color}05)`,
                    borderRadius: '16px'
                  }}
                  whileHover={{
                    y: -15,
                    transition: { duration: 0.3, ease: 'easeOut' },
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Glass morphism top accent bar */}
                  <div 
                    className="glassmorphism-header" 
                    style={{ backgroundColor: program.color }}
                  >
                    <div className="glassmorphism-overlay"></div>
                    <div className="program-badge">
                      {program.id}
                    </div>
                  </div>
                  
                  {/* Icon with perspective effect */}
                  <div className="icon-perspective-container">
                    <motion.div 
                      className="icon-wrapper"
                      initial={{ rotateY: 0 }}
                      whileHover={{ rotateY: 15, scale: 1.05, z: 20 }}
                    >
                      <Image 
                        src={program.icon} 
                        alt={program.title} 
                        width={90} 
                        height={90}
                        className="modern-icon"
                        style={{ objectFit: 'contain' }}
                      />
                    </motion.div>
                  </div>
                  
                  <div className="card-content">
                    {/* School name with animated underline */}
                    <motion.div className="title-container">
                      <h4 className="school-title">{program.title}</h4>
                      <motion.div 
                        className="title-underline"
                        style={{ backgroundColor: program.color }}
                        initial={{ width: '0%' }}
                        whileInView={{ width: '40%' }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </motion.div>
                    
                    <p className="school-description">{program.description}</p>
                    
                    <motion.div 
                      whileTap={{ scale: 0.95 }}
                      className="learn-more-container"
                    >
                      <Link href={program.link} className="learn-more-link">
                        <span>Explore Programs</span>
                        <motion.span 
                          className="arrow-container"
                          animate={{
                            x: [0, 5, 0],
                            transition: { repeat: Infinity, duration: 1.5, repeatType: "loop" }
                          }}
                        >
                          <i className="fas fa-arrow-right"></i>
                        </motion.span>
                      </Link>
                    </motion.div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="decorative-shape shape1" style={{ backgroundColor: program.color }}></div>
                  <div className="decorative-shape shape2" style={{ backgroundColor: program.color }}></div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// CSS styling for animations and visual elements
// Add global styles
const styles = document.createElement('style');
styles.innerHTML = `
/* Modern Card Styling */
.modern-card {
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Glass Morphism Header */
.glassmorphism-header {
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 25px;
  overflow: hidden;
}

.glassmorphism-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(7px);
}

/* Badge with modern styling */
.program-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

/* Icon with perspective effect */
.icon-perspective-container {
  position: absolute;
  top: 60px;
  left: 30px;
  perspective: 1000px;
  z-index: 20;
}

.icon-wrapper {
  width: 90px;
  height: 90px;
  border-radius: 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transform-style: preserve-3d;
}

.modern-icon {
  border-radius: 12px;
  padding: 10px;
}

/* Content area */
.card-content {
  padding: 70px 25px 25px;
  z-index: 1;
}

/* Title with animated underline */
.title-container {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.school-title {
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 8px;
  color: #333;
}

.title-underline {
  height: 3px;
  border-radius: 2px;
}

.school-description {
  color: #555;
  font-size: 0.95rem;
  margin-bottom: 25px;
  line-height: 1.6;
}

/* Modern button styling */
.learn-more-container {
  margin-top: auto;
}

.learn-more-link {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 10px 0;
}

.learn-more-link:hover {
  color: inherit;
}

.arrow-container {
  display: inline-flex;
  margin-left: 8px;
}

/* Decorative shapes */
.decorative-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  z-index: 0;
}

.shape1 {
  width: 120px;
  height: 120px;
  bottom: -40px;
  right: -30px;
}

.shape2 {
  width: 80px;
  height: 80px;
  top: 20px;
  left: -20px;
  opacity: 0.05;
}

/* General styling */
.academic-programs .row {
  margin-left: -15px;
  margin-right: -15px;
}

/* Entrance animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styles);