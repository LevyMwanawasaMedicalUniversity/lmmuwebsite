"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Program {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

interface ProgramsSectionsProps {
  programs?: Program[];
  columnsDesktop?: number;
}

export default function ProgramsSections({ 
  programs, 
  columnsDesktop = 3 
}: ProgramsSectionsProps) {
  // State for auto-scrolling functionality
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [interactionTimeout, setInteractionTimeout] = useState<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Default academic programs data if none provided
  const defaultPrograms = [
    {
      id: 1,
      title: "School of Medicine & Clinical Sciences",
      description: "Comprehensive medical programs including MBChB and specialized clinical training.",
      icon: "/assets/images/university/main/programs/medicine.svg",
      link: "/academics/schools/somcs",
      color: "#2a76dd"
    },
    {
      id: 2,
      title: "School of Health Sciences",
      description: "Programs in nursing, pharmacy, physiotherapy, and allied health professions.",
      icon: "/assets/images/university/main/programs/health-sciences.svg",
      link: "/academics/schools/soh",
      color: "#17a2b8"
    },
    {
      id: 3,
      title: "School of Public Health & Environmental Sciences",
      description: "Focused on public health, epidemiology, and environmental health sciences.",
      icon: "/assets/images/university/main/programs/public-health.svg",
      link: "/academics/schools/sophes",
      color: "#28a745"
    },
    {
      id: 4,
      title: "Institute of Basic and Biomedical Sciences",
      description: "Advanced research and education in basic and biomedical sciences.",
      icon: "/assets/images/university/main/programs/biomedical.svg",
      link: "/academics/schools/ibbs",
      color: "#6f42c1"
    },
    {
      id: 5,
      title: "School of Nursing",
      description: "Programs in nursing education and research.",
      icon: "/assets/images/university/main/programs/nursing.svg",
      link: "/academics/schools/son",
      color: "#dc3545"
    },
    {
      id: 6,
      title: "Directorate of Research and Postgraduate Studies",
      description: "Postgraduate studies and research.",
      icon: "/assets/images/university/main/programs/research.svg",
      link: "/academics/schools/drpgs",
      color: "#dc3895"
    },
  ];
  
  // Use provided programs or default ones
  const academicPrograms = programs || defaultPrograms;

  // Handle user interaction
  const handleInteraction = () => {
    setIsUserInteracting(true);
    
    // Clear any existing timeout
    if (interactionTimeout) {
      clearTimeout(interactionTimeout);
    }
    
    // Set a new timeout to resume auto-scrolling after 8 seconds of inactivity
    const timeout = setTimeout(() => {
      setIsUserInteracting(false);
    }, 8000);
    
    setInteractionTimeout(timeout);
  };

  // Auto-scroll effect
  useEffect(() => {
    // Only auto-scroll if user is not interacting
    if (!isUserInteracting) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % academicPrograms.length);
      }, 5000); // Auto-scroll every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [isUserInteracting, academicPrograms.length]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeout) {
        clearTimeout(interactionTimeout);
      }
    };
  }, [interactionTimeout]);

  // Define animation variants for cards
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Calculate column class based on columnsDesktop prop
  const columnClass = `col-lg-${12 / columnsDesktop} col-md-6 mb-4`;
  
  return (
    <div className="programs-container">
      {/* Desktop View */}
      <div className="row d-none d-lg-flex">
        {academicPrograms.map((program, index) => (
          <div key={program.id} className={columnClass}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`program-card ${index === activeIndex ? 'active' : ''}`}
              whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              onClick={() => {
                setActiveIndex(index);
                handleInteraction();
              }}
            >
              <Link href={program.link}>
                <div className="program-item text-center p-4 rounded h-100" style={{ backgroundColor: program.color }}>
                  <div className="icon mb-3">
                    <Image 
                      src={program.icon} 
                      alt={program.title} 
                      width={80} 
                      height={80}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="content text-white">
                    <h4>{program.title}</h4>
                    <p>{program.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
      
      {/* Mobile View with Slider */}
      <div className="d-lg-none">
        <div className="program-slider" ref={containerRef}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="program-slide"
            >
              <Link href={academicPrograms[activeIndex].link}>
                <div className="program-item text-center p-4 rounded" style={{ backgroundColor: academicPrograms[activeIndex].color }}>
                  <div className="icon mb-3">
                    <Image 
                      src={academicPrograms[activeIndex].icon} 
                      alt={academicPrograms[activeIndex].title} 
                      width={80} 
                      height={80}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="content text-white">
                    <h4>{academicPrograms[activeIndex].title}</h4>
                    <p>{academicPrograms[activeIndex].description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation dots */}
          <div className="slider-dots mt-4 text-center">
            {academicPrograms.map((_, index) => (
              <button 
                key={index}
                className={`dot mx-1 ${index === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  setActiveIndex(index);
                  handleInteraction();
                }}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === activeIndex ? '#07294d' : '#ccc',
                  padding: 0,
                  margin: '0 4px'
                }}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <div className="slider-nav-container d-flex justify-content-between mt-3">
            <button 
              className="slider-nav prev btn btn-sm btn-outline-primary"
              onClick={() => {
                setActiveIndex((prev) => (prev - 1 + academicPrograms.length) % academicPrograms.length);
                handleInteraction();
              }}
              aria-label="Previous slide"
            >
              <i className="fas fa-chevron-left"></i> Previous
            </button>
            <button 
              className="slider-nav next btn btn-sm btn-outline-primary"
              onClick={() => {
                setActiveIndex((prev) => (prev + 1) % academicPrograms.length);
                handleInteraction();
              }}
              aria-label="Next slide"
            >
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
