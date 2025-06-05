"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function UniversityOfficersPage() {
  return (
    <main>
      {/* Page Banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 8px 8px' }}>
          <Image 
            src="/assets/images/university/officers/page-banner.svg" 
            alt="University Officers" 
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
                  Principal Officers
                </motion.h1>
                <motion.nav 
                  aria-label="breadcrumb"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
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
      </section>

      {/* Officers Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-3">University Leadership</h2>
            <div className="divider mx-auto mb-4"></div>
            <p className="lead">Meet the principal officers who lead Levy Mwanawasa Medical University</p>
          </motion.div>

          <div className="row g-4 justify-content-center">
            {/* Vice Chancellor */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="position-relative" style={{ height: '300px' }}>
                  <Image 
                    src="/assets/images/university/officers/vc.png" 
                    alt="Prof. Elwyn Chomba" 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h4 className="card-title mb-1">Prof. Elwyn Chomba</h4>
                  <p className="text-primary fw-bold mb-3">Vice Chancellor</p>
                  <p className="card-text text-muted">Leading the university's strategic vision and academic excellence.</p>
                </div>
              </motion.div>
            </div>

            {/* Deputy Vice Chancellor (Administration) */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="position-relative" style={{ height: '300px' }}>
                  <Image 
                    src="/assets/images/university/officers/dvc-admin.jpg" 
                    alt="Prof. Laston Chikoya" 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h4 className="card-title mb-1">Prof. Laston Chikoya</h4>
                  <p className="text-primary fw-bold mb-3">Deputy Vice Chancellor (Administration)</p>
                  <p className="card-text text-muted">Overseeing administrative functions and institutional operations.</p>
                </div>
              </motion.div>
            </div>

            {/* Acting Deputy Vice Chancellor (Academic Affairs) */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="position-relative" style={{ height: '300px' }}>
                  <Image 
                    src="/assets/images/university/officers/dvc-academic.jpg" 
                    alt="Prof. Yusuf Ahmed" 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h4 className="card-title mb-1">Prof. Yusuf Ahmed</h4>
                  <p className="text-primary fw-bold mb-3">Acting Deputy Vice Chancellor (Academic Affairs)</p>
                  <p className="card-text text-muted">Leading academic programs, research initiatives, and faculty development.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

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
