"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function StaffPortalPage(): React.ReactNode {
  return (
    <>
      <main>
        {/* Page banner */}
        <section className="hero-section position-relative">
          <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
            <Image 
              src="/assets/images/page-banner-3.jpg" 
              alt="LMMU Staff Portal" 
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
                >
                  <h1 className="mb-3">Staff Portal</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center mb-0">
                      <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                      <li className="breadcrumb-item"><Link href="/portals">Portals</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Staff Portal</li>
                    </ol>
                  </nav>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Resources Introduction */}
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="section-title mb-4">Staff Resources</h2>
                  <p className="lead mb-0">
                    Access all the digital tools and resources you need as a staff member at LMMU.
                    These platforms provide support for teaching, research, and administrative processes.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Staff Resources Grid */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row">
              {/* Office 365 */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="https://www.office.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/Microsoft_Office_logo_(2019–present).svg_.png" 
                        alt="Office 365" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">Office 365</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* E-logbook */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="#" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/log book.png" 
                        alt="E-logbook" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">E-logbook</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* Research for Life */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="https://portal.research4life.org/signin" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/researchforlife.png" 
                        alt="Research for Life" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">Research for Life</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* SpiceWorks */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="https://lmmuhelpdesk.on.spiceworks.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/SpiceWorks.png" 
                        alt="SpiceWorks" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">SpiceWorks</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* Student Information System */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="https://edurole.lmmu.ac.zm" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/Edurole logo.png" 
                        alt="Student Information System" 
                        width={150} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">Student Information System</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* Amboss */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="https://next.amboss.com/us/login" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/Amboss_logo_0.png" 
                        alt="Amboss" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">Amboss</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* E-learning */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="https://lmmuelearning.lmmu.ac.zm" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/Small Logo.png" 
                        alt="E-learning" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">E-learning</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* Koha */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="#" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/koha-logo.png" 
                        alt="Koha" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">Koha</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>
              
              {/* D-Space */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="#" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/Dspace.png" 
                        alt="D-Space" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">D-Space</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>
              
              {/* Up-To-Date */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="https://www.uptodate.com/login" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/up-to-date-icon-0.jpg" 
                        alt="Up-To-Date" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">Up-To-Date</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>
              
              {/* SIS Reports */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="https://sisreports.lmmu.ac.zm" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/Logo White Background.png" 
                        alt="SIS Reports" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">SIS Reports</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>
              
              {/* Astria Learning */}
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <motion.div 
                  className="card h-100 shadow-sm border-0 text-center" 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <a 
                    href="#" 
                    className="card-body d-flex flex-column justify-content-between text-decoration-none"
                  >
                    <div className="mb-3 py-4">
                      <Image 
                        src="/assets/images/portals/astria logo.png" 
                        alt="Astria Learning" 
                        width={170} 
                        height={120} 
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title text-dark">Astria Learning</h5>
                      <span className="d-block text-primary mt-2">Access Portal</span>
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Staff Tutorials Section */}
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center mb-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="section-title mb-4">Staff Tutorials</h2>
                  <p className="lead mb-0">
                    Watch helpful tutorials to get started with university resources and services.
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="row justify-content-center mb-5">
              <div className="col-lg-8">
                <motion.div
                  className="ratio ratio-16x9 shadow-lg rounded overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <iframe 
                    src="https://www.youtube.com/embed/Msn2PJmIJuE?si=k4w43FQSWL0JISTW" 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </motion.div>
              </div>
            </div>

            {/* WiFi Connection Instructions */}
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h2 className="section-title mb-4">Staff WiFi Connection Guide</h2>
                  <p className="lead mb-4">
                    Follow our step-by-step guide for staff to connect to the university WiFi network.
                  </p>
                  <a 
                    href="/assets/files/HOW TO CONNECT TO LEVY MWANAWASA MEDICAL UNIVERSITY.pdf" 
                    download 
                    className="btn btn-primary btn-lg"
                  >
                    <i className="fas fa-download me-2"></i>
                    Download WiFi Connection Instructions
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
