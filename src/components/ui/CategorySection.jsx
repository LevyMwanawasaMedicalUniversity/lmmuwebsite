"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/category-section.css';

export default function CategorySection({ customTitle, customDescription }) {
  // State for auto-scrolling functionality
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(0);
  const containerRef = useRef(null);
  
  // Auto-scrolling functionality
  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;
    
    const scrollInterval = setInterval(() => {
      const currentTime = Date.now();
      // Resume scrolling if 8 seconds have passed since last interaction
      if (isPaused && (currentTime - lastInteraction > 8000)) {
        setIsPaused(false);
      }
      
      // Only scroll if not paused
      if (!isPaused) {
        setActiveIndex(prevIndex => {
          // Cycle back to beginning when reaching the end
          return (prevIndex + 1) % 5; // 5 is the number of programs
        });
      }
    }, 5000); // Auto-scroll every 5 seconds
    
    return () => clearInterval(scrollInterval);
  }, [isPaused, lastInteraction]);
  
  // Handle user interaction
  const handleInteraction = () => {
    setIsPaused(true);
    setLastInteraction(Date.now());
  };
  
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
      link: "/academics/schools/ibbs",
      color: "#6f42c1"
    },
    {
      id: 5,
      title: "School of Nursing",
      description: "Programs in nursing education and research.",
      icon: "/assets/images/all-icon/ctg-5.png",
      link: "/academics/schools/son",
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
        
        {/* Navigation indicators */}
        <div className="d-flex justify-content-center mb-4">
          {academicPrograms.map((_, index) => (
            <button 
              key={index} 
              onClick={() => {
                setActiveIndex(index);
                handleInteraction();
              }}
              className="btn btn-sm mx-1 p-0" 
              style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: activeIndex === index ? '#ffc600' : '#ddd',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
              aria-label={`View program ${index + 1}`}
            />
          ))}
        </div>
        
        <div 
          className="position-relative academic-programs" 
          ref={containerRef}
          onMouseEnter={handleInteraction}
          onTouchStart={handleInteraction}
        >
          <motion.div 
            className="row g-4" 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {academicPrograms.map((program, index) => (
              <motion.div 
                className={`col-lg-4 col-md-6 col-sm-12 mb-4 ${index === activeIndex ? 'active-program' : ''}`}
                key={program.id}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={cardVariants}
                style={{
                  transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
                  zIndex: index === activeIndex ? 10 : 1,
                  transition: 'all 0.5s ease'  
                }}
              >
                <motion.div 
                  className="modern-card h-100 position-relative overflow-hidden" 
                  style={{
                    background: `linear-gradient(145deg, ${program.color}15, ${program.color}05)`,
                    borderRadius: '16px',
                    boxShadow: index === activeIndex ? '0 20px 40px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.08)'
                  }}
                  whileHover={{
                    y: -15,
                    transition: { duration: 0.3, ease: 'easeOut' },
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                  onClick={() => {
                    setActiveIndex(index);
                    handleInteraction();
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
                      animate={index === activeIndex ? { 
                        rotateY: [0, 10, 0], 
                        scale: [1, 1.05, 1],
                        transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } 
                      } : {}}
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
                        animate={index === activeIndex ? { width: '40%' } : { width: '20%' }}
                        transition={{ duration: 0.5 }}
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