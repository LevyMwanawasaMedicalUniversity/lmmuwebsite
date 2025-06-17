"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function UniversitySenatePage() {
  return (
    <main>
      {/* Page Banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 8px 8px' }}>
          <Image 
            src="/assets/images/university/senate/page-banner.svg" 
            alt="University Senate" 
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
                  University Senate
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
                    <li className="breadcrumb-item active" aria-current="page">University Senate</li>
                  </ol>
                </motion.nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Senate Overview Section */}
      <section className="senate-overview py-5 section-spacing">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div 
                className="senate-content pe-lg-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="section-title mb-4">
                  <h2 className="mb-3">University Senate</h2>
                  <div className="divider mb-3"></div>
                </div>
                <p className="mb-4">
                  The responsibility for regulating all teaching, research and academic functions of the University 
                  is vested in the Senate, as set out in the Higher Education Act of 2013. The Senate serves as the 
                  highest academic committee and performs academic senate functions to superintend over the LMMU 
                  degrees and awards.
                </p>
                <div className="senate-highlights mb-4">
                  <motion.div 
                    className="highlight-card bg-light p-3 rounded mb-3"
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  >
                    <h5 className="mb-0 d-flex align-items-center">
                      <i className="fas fa-graduation-cap text-primary me-2"></i>
                      Highest Academic Authority
                    </h5>
                  </motion.div>
                  <motion.div 
                    className="highlight-card bg-light p-3 rounded mb-3"
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  >
                    <h5 className="mb-0 d-flex align-items-center">
                      <i className="fas fa-book text-primary me-2"></i>
                      Regulates Teaching & Research
                    </h5>
                  </motion.div>
                  <motion.div 
                    className="highlight-card bg-light p-3 rounded"
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  >
                    <h5 className="mb-0 d-flex align-items-center">
                      <i className="fas fa-award text-primary me-2"></i>
                      Oversees Degrees & Awards
                    </h5>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div 
                className="senate-image"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image 
                  src="/assets/images/university/senate/senate-image.jpg" 
                  alt="LMMU University Senate" 
                  width={600} 
                  height={400}
                  className="img-fluid rounded shadow"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Composition Section */}
      <section className="composition-section py-5 bg-light section-spacing">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <motion.div 
                className="section-title mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-3">Composition</h2>
                <div className="divider mx-auto mb-4"></div>
                <p>Members of the University Senate</p>
              </motion.div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <motion.div 
                className="composition-card bg-white p-4 rounded shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <ul className="member-list list-unstyled">
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-user-tie text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">Vice Chancellor</h6>
                          <p className="mb-0 text-muted">Chairperson</p>
                        </div>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-user-tie text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">Deputy Vice Chancellor (Academic Affairs)</h6>
                          <p className="mb-0 text-muted">Vice Chairperson</p>
                        </div>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-user-tie text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">Deputy Vice Chancellor (Administration)</h6>
                        </div>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-user-tie text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">Registrar</h6>
                        </div>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-book text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">University Librarian</h6>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="member-list list-unstyled">
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-user-graduate text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">Deans of Schools</h6>
                        </div>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-user-graduate text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">Associate Deans</h6>
                        </div>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-chalkboard-teacher text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">Elected Representatives (Professors/Associate Professors)</h6>
                          <p className="mb-0 text-muted">2 Members</p>
                        </div>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-chalkboard-teacher text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">Elected Representatives (Non-Professorial)</h6>
                          <p className="mb-0 text-muted">2 Members</p>
                        </div>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <i className="fas fa-user-friends text-primary me-3 mt-1"></i>
                        <div>
                          <h6 className="mb-1">Elected Student Representatives</h6>
                          <p className="mb-0 text-muted">2 Members</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandate Section */}
      <section className="mandate-section py-5 section-spacing">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <motion.div 
                className="section-title mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-3">Mandate</h2>
                <div className="divider mx-auto mb-4"></div>
                <p>This is the highest body for academic affairs. The Senate is responsible for all academic activities which include:</p>
              </motion.div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <motion.div 
                className="mandate-card bg-white p-4 rounded shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <ul className="mandate-list list-unstyled">
                      <li className="mb-4 d-flex align-items-start">
                        <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                          <i className="fas fa-check"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Approval of Final Examinations</h6>
                          <p className="text-muted">Approval of final examinations and results.</p>
                        </div>
                      </li>
                      <li className="mb-4 d-flex align-items-start">
                        <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                          <i className="fas fa-check"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">External Examiners</h6>
                          <p className="text-muted">Appointment of external examiners.</p>
                        </div>
                      </li>
                      <li className="mb-4 d-flex align-items-start">
                        <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                          <i className="fas fa-check"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Academic Programs</h6>
                          <p className="text-muted">Approval of new academic programmes.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="mandate-list list-unstyled">
                      <li className="mb-4 d-flex align-items-start">
                        <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                          <i className="fas fa-check"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Academic Calendars</h6>
                          <p className="text-muted">Approval of academic calendars.</p>
                        </div>
                      </li>
                      <li className="mb-4 d-flex align-items-start">
                        <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                          <i className="fas fa-check"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Convocations</h6>
                          <p className="text-muted">Convocations of LMMU and affiliate institutions.</p>
                        </div>
                      </li>
                      <li className="mb-4 d-flex align-items-start">
                        <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                          <i className="fas fa-check"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Quality Assurance</h6>
                          <p className="text-muted">Quality assurance of educational programmes.</p>
                        </div>
                      </li>
                      <li className="mb-4 d-flex align-items-start">
                        <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                          <i className="fas fa-check"></i>
                        </div>
                        <div>
                          <h6 className="mb-2">Staff Development</h6>
                          <p className="text-muted">To promote academic staff development.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-primary section-spacing">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <motion.div 
                className="cta-content text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-4">Discover More About LMMU</h2>
                <p className="mb-4">Learn more about our academic programs, research initiatives, and university governance.</p>
                <div className="cta-buttons">
                  <Link href="/academics" className="btn btn-light btn-lg me-3 mb-2 mb-md-0">
                    Academic Programs
                  </Link>
                  <Link href="/research" className="btn btn-outline-light btn-lg">
                    Research Initiatives
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
