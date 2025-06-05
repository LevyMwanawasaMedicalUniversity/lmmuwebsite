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
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-title">
              <h5 className="text-primary mb-2">{customTitle || 'Our Schools'}</h5>
              <h2>Academic Programs</h2>
              <p>{customDescription || 'LMMU comprises several specialized schools and faculties, each focusing on different aspects of healthcare education and research.'}</p>
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
                  <Link href={program.link}>
                    <div className="singel-category text-center" style={{ backgroundColor: program.color }}>
                      <div className="icon">
                        <Image 
                          src={program.icon} 
                          alt={program.title} 
                          width={80} 
                          height={80}
                          className="img-fluid"
                        />
                      </div>
                      <div className="cont">
                        <h4>{program.title}</h4>
                        <p>{program.description}</p>
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
                <Link href={academicPrograms[activeIndex].link}>
                  <div className="singel-category text-center" style={{ backgroundColor: academicPrograms[activeIndex].color }}>
                    <div className="icon">
                      <Image 
                        src={academicPrograms[activeIndex].icon} 
                        alt={academicPrograms[activeIndex].title} 
                        width={80} 
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <div className="cont">
                      <h4>{academicPrograms[activeIndex].title}</h4>
                      <p>{academicPrograms[activeIndex].description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation dots */}
            <div className="slider-dots mt-4">
              {academicPrograms.map((_, index) => (
                <button 
                  key={index}
                  className={`dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => {
                    setActiveIndex(index);
                    handleInteraction();
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation arrows */}
            <div className="slider-nav-container">
              <button 
                className="slider-nav prev" 
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
                onClick={() => {
                  setActiveIndex((prev) => (prev + 1) % academicPrograms.length);
                  handleInteraction();
                }}
                aria-label="Next slide"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}