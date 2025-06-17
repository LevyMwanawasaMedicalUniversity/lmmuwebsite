"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MissionVisionPage() {
  return (
    <React.Fragment>
      {/* Page Banner - Improved Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '350px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 0px 0px' }}>
          <Image 
            src="/assets/images/university/mission-vision/page-banner.svg" 
            alt="Mission, Vision and Motto" 
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
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
        </div>
        <div className="container position-relative" style={{ marginTop: '-120px' }}>
          <div className="row">
            <div className="col-12">
              <motion.div 
                className="hero-content bg-white shadow-lg rounded-3 p-4 p-md-5 text-center position-relative"
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
                <motion.h1 
                  className="mb-2 fw-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{ color: '#07294d' }}
                >
                  Mission, Vision, Organizational Goals and Motto
                </motion.h1>
                <motion.nav 
                  aria-label="breadcrumb"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/" className="text-primary">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/university" className="text-primary">The University</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Mission & Vision</li>
                  </ol>
                </motion.nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Goals Section */}
      <section className="py-5 py-md-6 section-spacing">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="pe-lg-4"
              >
                <h2 className="section-title mb-4">Organizational Goals</h2>
                <p className="lead mb-4">
                  The LMMU organizational framework is anchored on the following five goals:
                </p>
                <ul className="list-unstyled">
                  <motion.li 
                    className="d-flex align-items-center mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>1</div>
                    <div className="goal-content">
                      <p className="mb-0 fw-medium">Health Workforce Expansion</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    className="d-flex align-items-center mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>2</div>
                    <div className="goal-content">
                      <p className="mb-0 fw-medium">National Reference Enhanced Standards</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    className="d-flex align-items-center mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>3</div>
                    <div className="goal-content">
                      <p className="mb-0 fw-medium">Excellence in Education</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    className="d-flex align-items-center mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>4</div>
                    <div className="goal-content">
                      <p className="mb-0 fw-medium">Strong Strategic Partnerships</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    className="d-flex align-items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>5</div>
                    <div className="goal-content">
                      <p className="mb-0 fw-medium">Decentralized Distributed Multi-Centre Training Model</p>
                    </div>
                  </motion.li>
                </ul>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                className="mt-5 mt-lg-0"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="rounded-4 overflow-hidden shadow-lg">
                  <Image 
                    src="/assets/images/university/mission-vision/goals-image.svg" 
                    width={600}
                    height={400}
                    alt="LMMU Organizational Goals" 
                    className="img-fluid w-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Motto Cards */}
      <section className="py-5 py-md-6 bg-light section-spacing">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="section-title"
              >
                <h2>Our Foundation</h2>
                <div className="divider mx-auto mb-4"></div>
                <p className="lead">The guiding principles that drive our institution forward</p>
              </motion.div>
            </div>
          </div>
          <div className="row g-4">
            {/* Mission Card */}
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <motion.div
                className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="fas fa-bullseye fa-lg"></i>
                    </div>
                    <h3 className="card-title mb-0">Mission</h3>
                  </div>
                  <p className="card-text">
                    "To educate and train health professionals using hands-on and competence-based training that is administered through a distributed network of academic health complexes in order to contribute towards Universal Health Coverage in Zambia."
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Vision Card */}
            <div className="col-lg-4 col-md-6">
              <motion.div
                className="card h-100 border-0 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="fas fa-eye fa-lg"></i>
                    </div>
                    <h3 className="card-title mb-0">Vision</h3>
                  </div>
                  <p className="card-text">
                    "A leading centre of health professions' education, training and research in Zambia and beyond"
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Motto Card */}
            <div className="col-lg-4 col-md-6 mx-auto">
              <motion.div
                className="card h-100 border-0 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="fas fa-quote-right fa-lg"></i>
                    </div>
                    <h3 className="card-title mb-0">Motto</h3>
                  </div>
                  <p className="card-text">
                    "Let No One Be Left Behind."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5" style={{ backgroundColor: '#07294d' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <motion.div
                className="text-white"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3>Want to learn more about LMMU?</h3>
                <p className="mb-0">Explore our university background and history.</p>
              </motion.div>
            </div>
            <div className="col-lg-4 text-center text-lg-end mt-4 mt-lg-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/university/background" className="btn btn-light px-4 py-2">
                  <i className="fas fa-history me-2"></i> University Background
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
