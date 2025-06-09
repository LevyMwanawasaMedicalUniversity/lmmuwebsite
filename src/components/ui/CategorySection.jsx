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
          return (prevIndex + 1) % academicPrograms.length;
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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  // Slider animation variants
  const sliderVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0 }
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
    },
    {
      id: 6,
      title: "Directorate of Research and Postgraduate Studies",
      description: "Postgraduate studies and research.",
      icon: "/assets/images/all-icon/ctg-5.png",
      link: "/academics/schools/drpgs",
      color: "#dc3895"
    },
  ];
  
  return (
    <section id="category-part" className="py-5">
      <div className="container">
        {/* Section Header */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="section-title">
                <h6 className="text-primary text-uppercase fw-bold mb-2" style={{ letterSpacing: '2px' }}>Explore</h6>
                <h2 className="display-5 fw-bold mb-3">{customTitle || "Our Academic Programs"}</h2>
                <div className="title-underline mx-auto mb-4" style={{ width: '80px', height: '4px', backgroundColor: 'var(--bs-primary)' }}></div>
                <p className="lead text-muted">{customDescription || "Discover our diverse range of academic programs designed to prepare you for a successful career in healthcare."}</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Desktop View */}
        <div className="d-none d-lg-block">
          <div className="row category-grid">
            {academicPrograms.map((program, index) => (
              <div key={program.id} className="col-lg-4 col-md-6 mb-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`category-card ${index === activeIndex ? 'active' : ''}`}
                  whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  onClick={() => {
                    setActiveIndex(index);
                    handleInteraction();
                  }}
                >
                  <Link href={program.link} className="text-decoration-none">
                    <div className="singel-category text-center rounded-lg overflow-hidden shadow-lg" style={{ borderTop: `4px solid ${program.color}`, backgroundColor: '#fff' }}>
                      <div className="icon p-4" style={{ backgroundColor: `${program.color}20` }}>
                        <Image 
                          src={program.icon} 
                          alt={program.title} 
                          width={100} 
                          height={100}
                          className="img-fluid rounded-circle shadow"
                          style={{ border: `3px solid ${program.color}` }}
                        />
                      </div>
                      <div className="cont p-4">
                        <h4 className="mb-3 fw-bold" style={{ color: program.color }}>{program.title}</h4>
                        <p className="text-muted mb-3">{program.description}</p>
                        <span className="btn btn-sm" style={{ backgroundColor: program.color, color: '#fff' }}>Learn More</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile View with Slider */}
        <div className="d-lg-none">
          <div className="category-slider" ref={containerRef}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="category-slide"
              >
                <Link href={academicPrograms[activeIndex].link} className="text-decoration-none">
                  <div className="singel-category text-center rounded-lg overflow-hidden shadow-lg" style={{ borderTop: `4px solid ${academicPrograms[activeIndex].color}`, backgroundColor: '#fff' }}>
                    <div className="icon p-4" style={{ backgroundColor: `${academicPrograms[activeIndex].color}20` }}>
                      <Image 
                        src={academicPrograms[activeIndex].icon} 
                        alt={academicPrograms[activeIndex].title} 
                        width={100} 
                        height={100}
                        className="img-fluid rounded-circle shadow"
                        style={{ border: `3px solid ${academicPrograms[activeIndex].color}` }}
                      />
                    </div>
                    <div className="cont p-4">
                      <h4 className="mb-3 fw-bold" style={{ color: academicPrograms[activeIndex].color }}>{academicPrograms[activeIndex].title}</h4>
                      <p className="text-muted mb-3">{academicPrograms[activeIndex].description}</p>
                      <span className="btn btn-sm" style={{ backgroundColor: academicPrograms[activeIndex].color, color: '#fff' }}>Learn More</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation controls */}
            <div className="navigation-controls mt-4 d-flex flex-column align-items-center">
              {/* Navigation arrows */}
              <div className="slider-nav-container d-flex justify-content-center mb-3">
                <button 
                  className="slider-nav prev me-2" 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bs-primary)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => {
                    setActiveIndex((prev) => (prev - 1 + academicPrograms.length) % academicPrograms.length);
                    handleInteraction();
                  }}
                  aria-label="Previous slide"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  className="slider-nav next" 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bs-primary)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => {
                    setActiveIndex((prev) => (prev + 1) % academicPrograms.length);
                    handleInteraction();
                  }}
                  aria-label="Next slide"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              
              {/* Navigation dots */}
              <div className="slider-dots d-flex justify-content-center">
                {academicPrograms.map((program, index) => (
                  <button 
                    key={index}
                    className={`dot mx-1`}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: index === activeIndex ? program.color : '#ccc',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => {
                      setActiveIndex(index);
                      handleInteraction();
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}