"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import '../../styles/university-page.css';
import ProgramsSections from './components/ProgramsSections';

// Metadata is now in a separate metadata.ts file

export default function UniversityPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 8px 8px' }}>
          <Image 
            src="/assets/images/university/main/page-banner.svg" 
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
                whileHover={{ boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)' }}
              >
                <motion.h1 
                  className="mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  The University
                </motion.h1>
                <motion.nav 
                  aria-label="breadcrumb"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/" className="text-primary">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">The University</li>
                  </ol>
                </motion.nav>
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
                <Link href="/about" className="main-btn mt-3">Learn More</Link>
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
                  src="/assets/images/university/main/about-university.svg" 
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
      <section className="leadership py-5 section-spacing">
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
                <h2>University Leadership</h2>
                <p className="mt-3">Meet the dedicated team guiding our institution</p>
              </motion.div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <motion.div 
                className="leadership-card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="leadership-image mb-3">
                  <Image 
                    src="/assets/images/university/main/leadership.svg" 
                    alt="Vice Chancellor" 
                    width={180} 
                    height={180}
                    className="img-fluid"
                  />
                </div>
                <div className="leadership-content">
                  <h4>Prof. John Doe</h4>
                  <span>Vice Chancellor</span>
                  <p>Leading the university with over 20 years of experience in medical education and research.</p>
                  <Link href="/university/leadership" className="btn btn-sm btn-outline-primary mt-2">
                    <i className="fas fa-user me-1"></i> View Profile
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4 mb-4">
              <motion.div 
                className="leadership-card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="leadership-image mb-3">
                  <Image 
                    src="/assets/images/university/main/leadership.svg" 
                    alt="Deputy Vice Chancellor" 
                    width={180} 
                    height={180}
                    className="img-fluid"
                  />
                </div>
                <div className="leadership-content">
                  <h4>Dr. Jane Smith</h4>
                  <span>Deputy Vice Chancellor</span>
                  <p>Overseeing academic affairs with expertise in public health and healthcare management.</p>
                  <Link href="/university/leadership" className="btn btn-sm btn-outline-primary mt-2">
                    <i className="fas fa-user me-1"></i> View Profile
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4 mb-4">
              <motion.div 
                className="leadership-card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="leadership-image mb-3">
                  <Image 
                    src="/assets/images/university/main/leadership.svg" 
                    alt="Registrar" 
                    width={180} 
                    height={180}
                    className="img-fluid"
                  />
                </div>
                <div className="leadership-content">
                  <h4>Dr. Michael Johnson</h4>
                  <span>Registrar</span>
                  <p>Managing administrative functions with a background in educational administration and policy.</p>
                  <Link href="/university/leadership" className="btn btn-sm btn-outline-primary mt-2">
                    <i className="fas fa-user me-1"></i> View Profile
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link href="/university/leadership" className="main-btn">
                  <i className="fas fa-users me-2"></i> View All Leadership
                </Link>
              </motion.div>
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
                      <Link href="/university/leadership" className="d-flex align-items-center">
                        <i className="fas fa-user-tie me-2 text-primary"></i>
                        Principal Officers
                      </Link>
                    </li>
                  </ul>
                  <div className="mt-auto text-center">
                    <Link href="/university/governance" className="btn btn-outline-primary">
                      <i className="fas fa-arrow-right me-2"></i> View All
                    </Link>
                  </div>
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
                      <Link href="/schools/ibbs" className="d-flex align-items-center">
                        <i className="fas fa-flask me-2 text-primary"></i>
                        Institute of Basic and Biomedical Sciences
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/schools/nursing" className="d-flex align-items-center">
                        <i className="fas fa-heartbeat me-2 text-primary"></i>
                        School of Nursing
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/schools/health-sciences" className="d-flex align-items-center">
                        <i className="fas fa-stethoscope me-2 text-primary"></i>
                        School of Health Sciences
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/schools/medicine" className="d-flex align-items-center">
                        <i className="fas fa-user-md me-2 text-primary"></i>
                        School of Medicine and Clinical Sciences
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/schools/public-health" className="d-flex align-items-center">
                        <i className="fas fa-globe-africa me-2 text-primary"></i>
                        School of Public Health and Environmental Sciences
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="/schools/graduate-studies" className="d-flex align-items-center">
                        <i className="fas fa-graduation-cap me-2 text-primary"></i>
                        Directorate of Research and Graduate Studies
                      </Link>
                    </li>
                  </ul>
                  <div className="mt-auto text-center">
                    <Link href="/schools" className="btn btn-outline-primary">
                      <i className="fas fa-arrow-right me-2"></i> View All Schools
                    </Link>
                  </div>
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
                  <div className="mt-auto text-center">
                    <Link href="/facilities" className="btn btn-outline-primary">
                      <i className="fas fa-arrow-right me-2"></i> View All Facilities
                    </Link>
                  </div>
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