"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProgramsSections from '@/app/university/components/ProgramsSections';

export default function SchoolsPage(): React.ReactNode {
  return (
    <main>
    {/* Page Banner */}
    <section className="hero-section position-relative">
      <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 8px 8px' }}>
        <Image 
          src="/assets/images/schools/page-banner.svg" 
          alt="Schools" 
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
                Schools
              </motion.h1>
              <motion.nav 
                aria-label="breadcrumb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><Link href="/" className="text-primary">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Schools</li>
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
              <h2 className="mb-3">Schools</h2>
              <p>
                Levy Mwanawasa Medical University is structured into specialized schools and faculties,
                each dedicated to excellence in specific healthcare disciplines. Our schools provide
                comprehensive education through world-class facilities, experienced faculty, and
                innovative teaching methods. Each school offers unique programs that contribute to
                our mission of developing skilled healthcare professionals to serve Zambia and beyond.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Fee Structure Notice */}
        <motion.div 
          className="alert alert-info p-4 mb-5 shadow-sm border-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="d-flex align-items-center">
            <div className="alert-icon me-3">
              <i className="fas fa-info-circle fs-4 text-primary"></i>
            </div>
            <div className="alert-content">
              <h5 className="mb-2">Tuition Fee Information</h5>
              <p className="mb-0">
                Detailed tuition fee structures for all programs are available on the respective school pages. 
                Please select a school from the options below to view program-specific fee information and admission requirements.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Auto-scrolling Programs Section */}
        <ProgramsSections columnsDesktop={3} />
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
