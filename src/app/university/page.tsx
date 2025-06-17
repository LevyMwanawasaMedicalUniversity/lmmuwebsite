"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import '../../styles/university-page.css';
import ProgramsSections from './components/ProgramsSections';
import UniversityOfficers from '@/components/university/UniversityOfficers';

// Metadata is now in a separate metadata.ts file

export default function UniversityPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner - Improved Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '350px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 0px 0px' }}>
          <Image 
            src="/assets/images/university/main/campus-image.jpg" 
            alt="The University" 
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          {/* Enhanced gradient overlay with LMMU brand colors */}
          <div className="overlay position-absolute w-100 h-100 top-0 gradient-lmmu-blue-gold" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(7, 41, 77, 0.9) 0%, rgba(7, 41, 77, 0.8) 40%, rgba(255, 198, 0, 0.3) 100%)',
              mixBlendMode: 'multiply'
            }}>
          </div>
          
          {/* Decorative pattern overlay */}
          <div className="pattern-overlay position-absolute w-100 h-100 top-0" 
            style={{ 
              background: 'url("/assets/images/university/pattern-bg.png") repeat',
              opacity: '0.05',
              zIndex: 2
            }}>
          </div>
          
          <motion.div 
            className="hero-text position-absolute text-white"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ top: '50%', left: '8%', transform: 'translateY(-50%)', maxWidth: '60%', zIndex: 5 }}
          >           
            
            
          </motion.div>
        </div>
        
        <div className="container position-relative" style={{ marginTop: '-100px' }}>
          <div className="row">
            <div className="col-12">
              <motion.div 
                className="hero-content bg-white shadow-lg rounded-3 p-4 p-md-5 position-relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)' }}
                style={{ 
                  borderTop: '6px solid #ffc600',
                  borderRight: '1px solid rgba(7, 41, 77, 0.1)',
                  borderBottom: '1px solid rgba(7, 41, 77, 0.1)',
                  borderLeft: '1px solid rgba(7, 41, 77, 0.1)',
                  borderRadius: '12px'
                }}
              >
                <div className="row align-items-center">
                  <div className="col-md-8 text-md-start text-center">
                    <motion.h2 
                      className="mb-2 fw-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      style={{ color: '#07294d' }}
                    >
                      The University
                    </motion.h2>
                    <motion.p
                      className="mb-0 text-muted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Excellence in health education, research, and service
                    </motion.p>
                  </div>
                  <div className="col-md-4 text-md-end text-center mt-3 mt-md-0">
                    <motion.nav 
                      aria-label="breadcrumb"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <ol className="breadcrumb justify-content-md-end justify-content-center mb-0">
                        <li className="breadcrumb-item"><Link href="/" className="text-primary">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">The University</li>
                      </ol>
                    </motion.nav>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About University */}
      <section className="about-university py-5 section-spacing">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <motion.div 
                className="about-content"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="section-title">
                  <h2>About Levy Mwanawasa Medical University</h2>
                </div>
                <p>
                  Levy Mwanawasa Medical University (LMMU) is a premier medical institution in Zambia dedicated to excellence in health education, research, and service. Established to address the critical shortage of healthcare professionals in the country, LMMU offers comprehensive programs in medicine, nursing, and allied health sciences.
                </p>
                <p>
                  Our university is committed to producing highly skilled healthcare professionals who contribute to improving health outcomes in Zambia and beyond. With state-of-the-art facilities and experienced faculty, we provide quality education that meets international standards.
                </p>
                <Link href="/university/mission-vision" className="main-btn mt-3">Learn More</Link>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div 
                className="about-image"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image 
                  src="/assets/images/university/main/about-logo.png" 
                  alt="About Levy Mwanawasa Medical University" 
                  width={600} 
                  height={400}
                  className="img-fluid rounded"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIi8+PC9zdmc+"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision py-5 bg-light section-spacing">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12 text-center">
              <motion.div 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2>Our Mission & Vision</h2>
                <p className="mt-3">Guiding principles that drive our institution forward</p>
              </motion.div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <motion.div 
                className="mission-box h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3>Our Mission</h3>
                <p>
                  To provide quality education and training in health sciences, conduct research, and provide specialized healthcare services that contribute to improving health outcomes in Zambia and beyond.
                </p>
                <div className="icon-box mt-4">
                  <i className="fas fa-bullseye fa-2x" style={{ color: '#07294d' }}></i>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6 mb-4">
              <motion.div 
                className="vision-box h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3>Our Vision</h3>
                <p>
                  To be a center of excellence in health sciences education, research, and specialized healthcare services.
                </p>
                <div className="icon-box mt-4">
                  <i className="fas fa-eye fa-2x" style={{ color: '#07294d' }}></i>
                </div>
              </motion.div>
            </div>
            <div className="col-12">
              <motion.div 
                className="values-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3>Our Core Values</h3>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="values-list">
                      <li>
                        <span className="value-icon"><i className="fas fa-star"></i></span>
                        <span className="value-text">Excellence</span>
                      </li>
                      <li>
                        <span className="value-icon"><i className="fas fa-shield-alt"></i></span>
                        <span className="value-text">Integrity</span>
                      </li>
                      <li>
                        <span className="value-icon"><i className="fas fa-user-tie"></i></span>
                        <span className="value-text">Professionalism</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="values-list">
                      <li>
                        <span className="value-icon"><i className="fas fa-lightbulb"></i></span>
                        <span className="value-text">Innovation</span>
                      </li>
                      <li>
                        <span className="value-icon"><i className="fas fa-users"></i></span>
                        <span className="value-text">Teamwork</span>
                      </li>
                      <li>
                        <span className="value-icon"><i className="fas fa-hands-helping"></i></span>
                        <span className="value-text">Compassion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <UniversityOfficers />

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
          <ProgramsSections programs={universityPrograms} columnsDesktop={3} />
        </div>
      </section>

      {/* University Categories */}
      <section className="university-categories py-5 section-spacing">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <motion.div 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2>Explore The University</h2>
                <p className="mt-3">Learn more about our university structure and facilities</p>
              </motion.div>
            </div>
          </div>
          
          <div className="row">
            {/* University Governance */}
            <div className="col-lg-4 mb-4">
              <motion.div 
                className="category-card h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-header bg-primary text-white">
                  <h3 className="mb-0">University Governance</h3>
                </div>
                <div className="card-body d-flex flex-column">
                  <ul className="list-group list-group-flush mb-4">
                    <li className="list-group-item">
                      <Link href="/university/mission-vision" className="d-flex align-items-center">
                        <i className="fas fa-bullseye me-2 text-primary"></i>
                        Mission, Vision and Motto
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/university/background" className="d-flex align-items-center">
                        <i className="fas fa-history me-2 text-primary"></i>
                        University Background
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/university/council" className="d-flex align-items-center">
                        <i className="fas fa-users-cog me-2 text-primary"></i>
                        University Council
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/university/senate" className="d-flex align-items-center">
                        <i className="fas fa-university me-2 text-primary"></i>
                        University Senate
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/university/officers" className="d-flex align-items-center">
                        <i className="fas fa-user-tie me-2 text-primary"></i>
                        Principal Officers 
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            {/* Schools / Faculties */}
            <div className="col-lg-4 mb-4">
              <motion.div 
                className="category-card h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-header bg-primary text-white">
                  <h3 className="mb-0">Schools / Faculties</h3>
                </div>
                <div className="card-body d-flex flex-column">
                  <ul className="list-group list-group-flush mb-4">
                    <li className="list-group-item">
                      <Link href="academics/schools/ibbs" className="d-flex align-items-center">
                        <i className="fas fa-flask me-2 text-primary"></i>
                        Institute of Basic and Biomedical Sciences
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="academics/schools/son" className="d-flex align-items-center">
                        <i className="fas fa-heartbeat me-2 text-primary"></i>
                        School of Nursing
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="academics/schools/soh" className="d-flex align-items-center">
                        <i className="fas fa-stethoscope me-2 text-primary"></i>
                        School of Health Sciences
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="academics/schools/somcs" className="d-flex align-items-center">
                        <i className="fas fa-user-md me-2 text-primary"></i>
                        School of Medicine and Clinical Sciences
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="academics/schools/sophes" className="d-flex align-items-center">
                        <i className="fas fa-globe-africa me-2 text-primary"></i>
                        School of Public Health and Environmental Sciences
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="academics/schools/drpgs" className="d-flex align-items-center">
                        <i className="fas fa-graduation-cap me-2 text-primary"></i>
                        Directorate of Research and Graduate Studies
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            {/* Institutional Bureaus */}
            <div className="col-lg-4 mb-4">
              <motion.div 
                className="category-card h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-header bg-primary text-white">
                  <h3 className="mb-0">Institutional Bureaus</h3>
                </div>
                <div className="card-body d-flex flex-column">
                  <ul className="list-group list-group-flush mb-4">
                    <li className="list-group-item">
                      <Link href="/facilities/uth" className="d-flex align-items-center">
                        <i className="fas fa-hospital me-2 text-primary"></i>
                        Levy Mwanawasa University Teaching Hospital
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/facilities/training-hubs" className="d-flex align-items-center">
                        <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                        Regional Training Hubs
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/facilities/teaching-areas" className="d-flex align-items-center">
                        <i className="fas fa-chalkboard-teacher me-2 text-primary"></i>
                        Teaching and Learning Areas
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/facilities/library" className="d-flex align-items-center">
                        <i className="fas fa-book me-2 text-primary"></i>
                        The Zambia National Health Reference Library
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="cta-section py-5" style={{ backgroundColor: '#07294d' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <motion.div 
                className="cta-content text-white"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3>Interested in becoming part of LMMU?</h3>
                <p className="mb-0">Learn about our programs and application process.</p>
              </motion.div>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/academics" className="main-btn">
                  <i className="fas fa-graduation-cap me-2"></i> Explore Programs
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// University-specific programs data
const universityPrograms = [
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