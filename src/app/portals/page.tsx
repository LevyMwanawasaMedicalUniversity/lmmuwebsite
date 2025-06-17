"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PortalsPage(): React.ReactNode {
  return (
    <>
      <main>
      {/* Page banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
          <Image 
            src="/assets/images/page-banner-4.jpg" 
            alt="LMMU Portals" 
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
              >
                <h1 className="mb-3">Online Portals</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Portals</li>
                  </ol>
                </nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Portals Overview */}
      <section className="py-5 section-spacing">
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
                <h2 className="section-title mb-4">University Online Portals</h2>
                <div className="background-content">
                  <p className="mb-4">
                    Levy Mwanawasa Medical University provides various online portals to facilitate easy access to information and services 
                    for students, staff, and other stakeholders. These portals are designed to enhance the learning 
                    experience and improve administrative efficiency.
                  </p>
                  <p className="mb-0">
                    Our digital platforms connect our university community, providing seamless access to academic resources, 
                    administrative services, and communication tools. Access your student or staff portal to manage your 
                    university experience online.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-5 mt-lg-0"
              >
                <div className="rounded-3 overflow-hidden shadow-sm">
                  <Image
                    src="/assets/images/portals/portal-access.jpg"
                    alt="LMMU Online Portals"
                    width={600}
                    height={400}
                    className="img-fluid w-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Portals Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Student Portals</h2>
                <p className="lead">Access your academic resources and services</p>
              </motion.div>
            </div>
          </div>
          
          <div className="row g-4">
            {/* Student Portal */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-4">
                    <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: 'rgba(42, 118, 221, 0.1)' }}>
                      <Image 
                        src="/assets/images/portals/student.jpg" 
                        alt="Student Portal" 
                        width={100} 
                        height={100} 
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                  <h3 className="card-title h4 mb-3">Student Portal</h3>
                  <p className="card-text mb-4">
                    Access your academic records, register for courses, view grades, check exam results, and manage your student profile.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href="https://edurole.lmmu.ac.zm" className="btn btn-primary px-4 py-2" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-sign-in-alt me-2"></i> Login to Student Portal
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* E-Learning Portal */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-4">
                    <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: 'rgba(7, 41, 77, 0.1)' }}>
                      <Image 
                        src="/assets/images/portals/elearning.jpg" 
                        alt="E-Learning Portal" 
                        width={100} 
                        height={100} 
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                  <h3 className="card-title h4 mb-3">E-Learning Portal</h3>
                  <p className="card-text mb-4">
                    Access course materials, participate in online classes, submit assignments, and interact with instructors.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href="https://elearning.lmmu.ac.zm" className="btn btn-primary px-4 py-2" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-laptop me-2"></i> Access E-Learning
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Library Portal */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-4">
                    <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: 'rgba(42, 118, 221, 0.1)' }}>
                      <Image 
                        src="/assets/images/portals/library.jpg" 
                        alt="Library Portal" 
                        width={100} 
                        height={100} 
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                  <h3 className="card-title h4 mb-3">Library Portal</h3>
                  <p className="card-text mb-4">
                    Search for books, access online journals, research papers, and other academic resources.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href="https://library.lmmu.ac.zm" className="btn btn-primary px-4 py-2" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-book me-2"></i> Access Library
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Portals Section */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Staff Portals</h2>
                <p className="lead">Tools and resources for university staff</p>
              </motion.div>
            </div>
          </div>
          
          <div className="row g-4">
            {/* Staff Portal */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-4">
                    <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: 'rgba(7, 41, 77, 0.1)' }}>
                      <Image 
                        src="/assets/images/portals/staff.jpg" 
                        alt="Staff Portal" 
                        width={100} 
                        height={100} 
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                  <h3 className="card-title h4 mb-3">Staff Portal</h3>
                  <p className="card-text mb-4">
                    Access staff records, payroll information, leave management, and other administrative tools for university staff.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href="https://staff.lmmu.ac.zm" className="btn btn-primary px-4 py-2" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-sign-in-alt me-2"></i> Login to Staff Portal
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Research Portal */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-4">
                    <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: 'rgba(42, 118, 221, 0.1)' }}>
                      <Image 
                        src="/assets/images/portals/research.jpg" 
                        alt="Research Portal" 
                        width={100} 
                        height={100} 
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                  <h3 className="card-title h4 mb-3">Research Portal</h3>
                  <p className="card-text mb-4">
                    Manage research projects, access funding information, submit research proposals, and share findings.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href="https://research.lmmu.ac.zm" className="btn btn-primary px-4 py-2" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-flask me-2"></i> Access Research Portal
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Email Portal */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-4">
                    <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: 'rgba(7, 41, 77, 0.1)' }}>
                      <Image 
                        src="/assets/images/portals/email.jpg" 
                        alt="Email Portal" 
                        width={100} 
                        height={100} 
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                  <h3 className="card-title h4 mb-3">Email Portal</h3>
                  <p className="card-text mb-4">
                    Access your official LMMU email account, manage messages, and communicate with colleagues and students.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href="https://mail.lmmu.ac.zm" className="btn btn-primary px-4 py-2" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-envelope me-2"></i> Check Email
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Finance Portal */}
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-4">
                    <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: 'rgba(42, 118, 221, 0.1)' }}>
                      <Image 
                        src="/assets/images/portals/finance.jpg" 
                        alt="Finance Portal" 
                        width={100} 
                        height={100} 
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                  <h3 className="card-title h4 mb-3">Finance Portal</h3>
                  <p className="card-text mb-4">
                    Make fee payments, check payment history, and access financial statements and receipts.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href="https://finance.lmmu.ac.zm" className="btn btn-primary px-4 py-2" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-money-bill-wave me-2"></i> Finance Login
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <motion.div 
                className="card border-0 shadow-sm p-4 p-md-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <div className="d-inline-block p-3 rounded-circle bg-primary bg-opacity-10">
                    <i className="fas fa-headset fa-3x text-primary"></i>
                  </div>
                </div>
                <h2 className="section-title mb-4">Need Help?</h2>
                <p className="mb-4">
                  If you're experiencing any issues accessing our portals or need assistance, 
                  please contact our technical support team.
                </p>
                <div className="support-contact mb-4">
                  <p className="mb-3">
                    <i className="fas fa-envelope me-2 text-primary"></i> 
                    <a href="mailto:support@lmmu.ac.zm" className="text-decoration-none">support@lmmu.ac.zm</a>
                  </p>
                  <p>
                    <i className="fas fa-phone me-2 text-primary"></i> 
                    <a href="tel:+260974330519" className="text-decoration-none">+260 974 330 519</a>
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="d-inline-block"
                >
                  <Link 
                    href="/files/HOW TO CONNECT TO LEVY MWANAWASA MEDICAL UNIVERSITY.pdf" 
                    className="btn btn-primary px-4 py-2" 
                    target="_blank"
                  >
                    <i className="fas fa-download me-2"></i> Download Connection Guide
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}