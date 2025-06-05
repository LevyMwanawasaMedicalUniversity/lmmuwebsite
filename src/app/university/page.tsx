"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/university-page.css';

// Metadata is now in a separate metadata.ts file

export default function UniversityPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner - Compact Style */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
          <Image 
            src="/assets/images/page-banner-1.jpg" 
            alt="The University" 
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="overlay position-absolute w-100 h-100 top-0" 
            style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.7))' }}>
          </div>
        </div>
        <div className="container position-relative" style={{ marginTop: '-150px' }}>
          <div className="row">
            <div className="col-12">
              <motion.div 
                className="hero-content bg-white shadow-lg rounded-3 p-4 p-md-5 text-center position-relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="mb-3">The University</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">The University</li>
                  </ol>
                </nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About University */}
      <section className="about-university pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title pb-30">
                <h2>About Levy Mwanawasa Medical University</h2>
              </div>
              <div className="about-content">
                <p>
                  Levy Mwanawasa Medical University (LMMU) is a public institution of higher learning 
                  that was established through the Higher Education Act No.4 of 2013. The University 
                  was officially opened on 13th May 2019 following the approval of the transformation 
                  of Levy Mwanawasa Medical University College (LMMUC) by President Edgar Chagwa Lungu.
                </p>
                <p>
                  Prior to its transformation to a University College in 2018, LMMU existed as the 
                  Chainama College of Health Sciences which was opened in 1936 as the Chainama Health 
                  Training Institution, making it one of the oldest health training institutions in 
                  the region. The establishment of the University was necessitated by the need to 
                  address the critical shortage of skilled health workers in the country.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-image mt-50">
                <Image 
                  src="/assets/images/about/about-univ.jpg" 
                  alt="About University" 
                  width={400} 
                  height={300} 
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision pt-70 pb-70 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="mission-box">
                <h3>Our Mission</h3>
                <p>
                  To educate and train health professionals using hands-on and competence-based 
                  training that is administered through a distributed network of academic health 
                  complexes in order to contribute towards Universal Health Coverage in Zambia.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="vision-box">
                <h3>Our Vision</h3>
                <p>
                  To be a leading centre of health professions, education, training and research 
                  in Zambia and beyond.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-50">
            <div className="col-lg-12">
              <div className="values-box">
                <h3>Our Core Values</h3>
                <ul>
                  <li><strong>Excellence:</strong> We strive for excellence in all our endeavors.</li>
                  <li><strong>Integrity:</strong> We uphold the highest ethical standards in all our actions.</li>
                  <li><strong>Innovation:</strong> We embrace creative and innovative approaches to teaching, learning, and research.</li>
                  <li><strong>Inclusion:</strong> We value diversity and ensure equal opportunities for all.</li>
                  <li><strong>Collaboration:</strong> We foster teamwork and partnerships to achieve our goals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="leadership pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-50">
                <h2>University Leadership</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="leadership-card text-center">
                <div className="leadership-image mb-30">
                  <Image 
                    src="/assets/images/officers/vc.jpg" 
                    alt="Vice Chancellor" 
                    width={250} 
                    height={250} 
                    className="img-fluid rounded-circle"
                  />
                </div>
                <div className="leadership-content">
                  <h4>Prof. Elwyn Chomba</h4>
                  <span>Vice Chancellor</span>
                  <Link href="/vc" className="main-btn mt-4">Read More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="leadership-card text-center">
                <div className="leadership-image mb-30">
                  <Image 
                    src="/assets/images/officers/dvc.jpg" 
                    alt="Deputy Vice Chancellor" 
                    width={250} 
                    height={250} 
                    className="img-fluid rounded-circle"
                  />
                </div>
                <div className="leadership-content">
                  <h4>Prof. Alick Nyirenda</h4>
                  <span>Deputy Vice Chancellor</span>
                  <Link href="/dvc" className="main-btn mt-4">Read More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="leadership-card text-center">
                <div className="leadership-image mb-30">
                  <Image 
                    src="/assets/images/officers/advc.jpg" 
                    alt="Associate Deputy Vice Chancellor" 
                    width={250} 
                    height={250} 
                    className="img-fluid rounded-circle"
                  />
                </div>
                <div className="leadership-content">
                  <h4>Dr. Ruth Mfune</h4>
                  <span>Associate Deputy Vice Chancellor</span>
                  <Link href="/advc" className="main-btn mt-4">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs with Auto-Scrolling */}
      <section className="programs-section py-5 bg-light">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12">
              <motion.div 
                className="section-title text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2>Our Academic Programs</h2>
                <p className="mt-3">Discover our diverse range of health education programs</p>
              </motion.div>
            </div>
          </div>
          
          {/* Auto-scrolling Program Cards */}
          <ProgramsAutoScroll />
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5" style={{ backgroundColor: '#07294d' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="cta-content text-white">
                <h3>Interested in becoming part of LMMU?</h3>
                <p>Learn about our programs and application process.</p>
              </div>
            </div>
            <div className="col-lg-4 text-center text-lg-right">
              <Link href="/academics" className="main-btn">Explore Programs</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Auto-scrolling Programs Component
function ProgramsAutoScroll() {
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
    <div className="programs-container">
      {/* Desktop View */}
      <div className="row d-none d-lg-flex">
        {academicPrograms.map((program, index) => (
          <div key={program.id} className="col-lg-4 col-md-6 mb-4">
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
                <div className="program-item text-center p-4 rounded" style={{ backgroundColor: program.color }}>
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