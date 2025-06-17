"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProgramsSections from '../university/components/ProgramsSections';
import '../../styles/university-page.css';

// Metadata is now in a separate metadata.ts file

export default function AcademicsPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 8px 8px' }}>
          <Image 
            src="/assets/images/academics/page-banner.svg" 
            alt="Academics" 
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="overlay position-absolute w-100 h-100 top-0" 
            style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.4), rgba(7, 41, 77, 0.3))' }}>
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
                  Academics
                </motion.h1>
                <motion.nav 
                  aria-label="breadcrumb"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/" className="text-primary">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Academics</li>
                  </ol>
                </motion.nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Overview */}
      <section className="academic-overview py-5 section-spacing">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto text-center">
              <motion.div 
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-3">Academic Programs</h2>
                <p>
                  Levy Mwanawasa Medical University offers a wide range of academic programs 
                  designed to prepare students for successful careers in healthcare and related fields. 
                  Our programs combine theoretical knowledge with practical skills, ensuring that our 
                  graduates are well-equipped to meet the healthcare needs of Zambia and beyond.
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Auto-scrolling Programs Section */}
          <ProgramsSections programs={academicPrograms} columnsDesktop={3} />
        </div>
      </section>

      
   {/* Academic Resources */}
      <section className="academic-resources pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-50">
                <h2>Academic Resources</h2>
                <p>
                  LMMU provides various resources to support students' academic journey.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="resource-box text-center mb-20">
                <div className="resource-icon">
                  <i className="fa fa-book"></i>
                </div>
                <h4>Library</h4>
                <p>
                  Our modern library provides access to a wide range of books, journals, and digital resources.
                </p>
                <Link href="/library" className="main-btn mt-3">Explore Library</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="resource-box text-center mb-30">
                <div className="resource-icon">
                  <i className="fa fa-flask"></i>
                </div>
                <h4>Laboratories</h4>
                <p>
                  State-of-the-art laboratories for practical learning and research activities.
                </p>
                <Link href="/labs" className="main-btn mt-3">View Labs</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="resource-box text-center mb-30">
                <div className="resource-icon">
                  <i className="fa fa-laptop"></i>
                </div>
                <h4>E-Learning</h4>
                <p>
                  Online learning platforms and digital resources to support virtual learning.
                </p>
                <Link href="/odl" className="main-btn mt-3">E-Learning Portal</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now CTA */}
      <section className="apply-now-cta py-5" style={{ backgroundColor: '#07294d' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="cta-content text-white">
                <h3>Ready to Begin Your Journey at LMMU?</h3>
                <p>Apply now for our undergraduate and postgraduate programs.</p>
              </div>
            </div>
            <div className="col-lg-4 text-center text-lg-right">
              <a href="https://edurole.lmmu.ac.zm" className="main-btn" target="_blank" rel="noopener noreferrer">Apply Now</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Academic programs data
const academicPrograms = [
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