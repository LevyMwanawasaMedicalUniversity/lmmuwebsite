"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function UniversityCouncilPage() {
  return (
    <main>
      {/* Page Banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 8px 8px' }}>
          <Image 
            src="/assets/images/university/council/page-banner.svg" 
            alt="University Council" 
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
                  University Council
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
                    <li className="breadcrumb-item active" aria-current="page">University Council</li>
                  </ol>
                </motion.nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Council Overview Section */}
      <section className="council-overview py-5 section-spacing">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div 
                className="council-content pe-lg-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="section-title mb-4">
                  <h2 className="mb-3">University Council</h2>
                  <div className="divider mb-3"></div>
                </div>
                <p className="mb-4">
                  The governing body of the Levy Mwanawasa Medical University is the University Council. 
                  The Council delegates its main functions to the Management and to various commissions 
                  and committees. The significant activities of these commissions and committees are 
                  reported to the Council on a regular basis.
                </p>
                <div className="council-stats row g-4 mb-4">
                  <div className="col-6">
                    <motion.div 
                      className="stat-card bg-light p-3 rounded text-center h-100"
                      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    >
                      <h3 className="mb-2 text-primary">9-15</h3>
                      <p className="mb-0">Council Members</p>
                    </motion.div>
                  </div>
                  <div className="col-6">
                    <motion.div 
                      className="stat-card bg-light p-3 rounded text-center h-100"
                      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    >
                      <h3 className="mb-2 text-primary">3 Years</h3>
                      <p className="mb-0">Term Duration</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div 
                className="council-image"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image 
                  src="/assets/images/university/council/council-image.jpg" 
                  alt="LMMU University Council" 
                  width={600} 
                  height={400}
                  className="img-fluid rounded shadow"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Composition & Tenure Section */}
      <section className="composition-tenure py-5 bg-light section-spacing">
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
                <h2 className="mb-3">Composition & Tenure</h2>
                <div className="divider mx-auto mb-4"></div>
                <p>The structure and term duration of the University Council</p>
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
                <div className="composition-content">
                  <p className="mb-4">
                    The Council shall have a minimum of 9 members and a maximum of 15 members. The Council shall consist of part-time 
                    members appointed by the Minister of Health. The Vice Chancellor and the Deputy Vice Chancellors of LMMU shall be 
                    ex-officio members while the Registrar of the University shall be the Secretary of the Council.
                  </p>
                  <p>
                    Subject to the other provisions of the Higher Education Act No.4 of 2013, a member of the Council shall hold office 
                    for a period of three years but shall be eligible for reappointment for a further period of three years.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-lg-4 mb-4">
              <motion.div 
                className="member-type-card h-100 bg-white p-4 rounded shadow text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="icon-container mb-3">
                  <i className="fas fa-user-tie fa-3x text-primary"></i>
                </div>
                <h4>Part-time Members</h4>
                <p>Appointed by the Minister of Health to provide oversight and governance</p>
              </motion.div>
            </div>
            <div className="col-lg-4 mb-4">
              <motion.div 
                className="member-type-card h-100 bg-white p-4 rounded shadow text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="icon-container mb-3">
                  <i className="fas fa-user-graduate fa-3x text-primary"></i>
                </div>
                <h4>Ex-officio Members</h4>
                <p>Vice Chancellor and Deputy Vice Chancellors who serve by virtue of their positions</p>
              </motion.div>
            </div>
            <div className="col-lg-4 mb-4">
              <motion.div 
                className="member-type-card h-100 bg-white p-4 rounded shadow text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="icon-container mb-3">
                  <i className="fas fa-file-signature fa-3x text-primary"></i>
                </div>
                <h4>Council Secretary</h4>
                <p>The University Registrar serves as the Secretary to the Council</p>
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
                <p>The responsibilities and authority of the University Council</p>
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
                <div className="mandate-content">
                  <p className="mb-4">
                    The Council shall provide entrepreneurial leadership within a framework of prudent and effective controls. 
                    Its responsibilities shall include oversight of governance of LMMU, acting at all times, in the best interest 
                    of the institution and its stakeholders; guiding strategy, and overseeing the activities of management and 
                    ensuring that controls are in place. Additionally, the Council is the highest appellate body of the University.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-6 col-lg-3 mb-4">
              <motion.div 
                className="responsibility-card h-100 bg-white p-4 rounded shadow text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="icon-container mb-3">
                  <i className="fas fa-compass fa-2x text-primary"></i>
                </div>
                <h5>Strategic Leadership</h5>
                <p>Guiding the university's vision and long-term strategy</p>
              </motion.div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <motion.div 
                className="responsibility-card h-100 bg-white p-4 rounded shadow text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="icon-container mb-3">
                  <i className="fas fa-balance-scale fa-2x text-primary"></i>
                </div>
                <h5>Governance Oversight</h5>
                <p>Ensuring proper governance structures and policies</p>
              </motion.div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <motion.div 
                className="responsibility-card h-100 bg-white p-4 rounded shadow text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="icon-container mb-3">
                  <i className="fas fa-tasks fa-2x text-primary"></i>
                </div>
                <h5>Management Supervision</h5>
                <p>Overseeing university management activities</p>
              </motion.div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <motion.div 
                className="responsibility-card h-100 bg-white p-4 rounded shadow text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="icon-container mb-3">
                  <i className="fas fa-gavel fa-2x text-primary"></i>
                </div>
                <h5>Appellate Authority</h5>
                <p>Serving as the highest appellate body</p>
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
                <h3>Learn more about LMMU's governance</h3>
                <p className="mb-0">Explore other aspects of the university's leadership structure</p>
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
                <Link href="/university/senate" className="main-btn">
                  <i className="fas fa-university me-2"></i> Explore University Senate
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx>{`
        .divider {
          height: 4px;
          width: 70px;
          background-color: #ffc107;
        }
        .section-spacing {
          padding: 80px 0;
        }
        @media (max-width: 768px) {
          .section-spacing {
            padding: 50px 0;
          }
        }
      `}</style>
    </main>
  );
}
