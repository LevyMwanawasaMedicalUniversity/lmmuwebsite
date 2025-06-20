"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import UniversityOfficers from '../../../components/university/UniversityOfficers';

export default function UniversityOfficersPage() {
  return (
    <main>      {/* Page Banner - Improved Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '350px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 0px 0px' }}>
          <Image 
            src="/assets/images/university/officers/banner-principle - new.jpg" 
            alt="University Officers" 
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
                  Principal Officers
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
                    <li className="breadcrumb-item active" aria-current="page">Principal Officers</li>
                  </ol>
                </motion.nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>{/* Officers Section */}
      <UniversityOfficers showTitle={true} />

      {/* Officer Responsibilities Section */}
      <section className="py-5">
        <div className="container py-4">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-3">Leadership Responsibilities</h2>
            <div className="divider mx-auto mb-4"></div>
            <p>The principal officers are responsible for the strategic direction and day-to-day operations of the university</p>
          </motion.div>

          <div className="row g-4">
            <div className="col-lg-4">
              <motion.div 
                className="p-4 bg-light rounded-3 h-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-box bg-primary text-white rounded-circle p-3 me-3">
                    <i className="fas fa-university"></i>
                  </div>
                  <h4 className="mb-0">Vice Chancellor</h4>
                </div>
                <ul className="list-unstyled">
                  <li className="mb-2">• Overall leadership of the university</li>
                  <li className="mb-2">• Strategic planning and implementation</li>
                  <li className="mb-2">• Institutional representation</li>
                  <li className="mb-2">• Chairperson of the University Senate</li>
                  <li className="mb-2">• Resource mobilization and allocation</li>
                </ul>
              </motion.div>
            </div>

            <div className="col-lg-4">
              <motion.div 
                className="p-4 bg-light rounded-3 h-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-box bg-primary text-white rounded-circle p-3 me-3">
                    <i className="fas fa-building"></i>
                  </div>
                  <h4 className="mb-0">DVC (Administration)</h4>
                </div>
                <ul className="list-unstyled">
                  <li className="mb-2">• Administrative management</li>
                  <li className="mb-2">• Financial oversight</li>
                  <li className="mb-2">• Human resource management</li>
                  <li className="mb-2">• Infrastructure development</li>
                  <li className="mb-2">• Support services coordination</li>
                </ul>
              </motion.div>
            </div>

            <div className="col-lg-4">
              <motion.div 
                className="p-4 bg-light rounded-3 h-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-box bg-primary text-white rounded-circle p-3 me-3">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <h4 className="mb-0">DVC (Academic Affairs)</h4>
                </div>
                <ul className="list-unstyled">
                  <li className="mb-2">• Academic program development</li>
                  <li className="mb-2">• Research and innovation</li>
                  <li className="mb-2">• Faculty development</li>
                  <li className="mb-2">• Quality assurance</li>
                  <li className="mb-2">• Student academic affairs</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mb-3">Discover More About LMMU</h2>
                <p className="lead mb-0">Learn about our academic programs, research initiatives, and community engagement.</p>
              </motion.div>
            </div>
            <div className="col-lg-4 text-lg-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/academics" className="btn btn-light btn-lg me-2 mb-2 mb-md-0">
                  Explore Academics
                </Link>
                <Link href="/university" className="btn btn-outline-light btn-lg">
                  About University
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
