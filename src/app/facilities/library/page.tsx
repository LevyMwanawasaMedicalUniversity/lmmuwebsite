'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LibraryPage() {
  // Library hours and information
  const libraryHours = "09:00 - 17:00 hours daily";
  
  // Library features
  const libraryFeatures = [
    { 
      title: "Short Loan Collection (CLOSED ACCESS)", 
      description: "Students access books through the librarian in charge of the section. Books can be borrowed for up to 3 hours for use within the section. Includes books deposited by teaching departments, single copies on demand, expensive books, and personal copies written by lecturers."
    },
    { 
      title: "General Stacks Collection (OPEN ACCESS)", 
      description: "Students have the freedom to browse and select books of their choice. Books can be borrowed for 2 weeks by students and 1 month by lecturers. Materials can be used anywhere within the prescribed time."
    },
    { 
      title: "Digital Resources", 
      description: "Access to medical and health-related materials in digital format, supporting modern research and learning methods."
    },
    { 
      title: "Reference Services", 
      description: "Professional librarians available to assist with research needs and information retrieval."
    }
  ];

  return (
    <React.Fragment>
      {/* Page banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
          <Image 
            src="/assets/images/facilities/library/page-banner.svg" 
            alt="The Zambia National Health Reference Library" 
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
                  The Zambia National Health Reference Library
                </motion.h1>
                <motion.nav 
                  aria-label="breadcrumb"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/facilities">Facilities</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                  </ol>
                </motion.nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pt-50 pb-50 bg-light">
        <div className="container">
          <div className="row">
            {/* Library Images */}
            <div className="col-lg-5 mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="position-relative rounded shadow-sm overflow-hidden mb-4" style={{ height: '300px' }}>
                  <Image 
                    src="/assets/images/facilities/library/images/0Q9A9907.png" 
                    alt="Library Entrance" 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="position-relative rounded shadow-sm overflow-hidden" style={{ height: '200px' }}>
                      <Image 
                        src="/assets/images/facilities/library/images/Main Library.jpg" 
                        alt="Main Library" 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="position-relative rounded shadow-sm overflow-hidden" style={{ height: '200px' }}>
                      <Image 
                        src="/assets/images/facilities/library/images/library2 books.jpg" 
                        alt="Library Books" 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Library Description */}
            <div className="col-lg-7">
              <motion.div
                className="bg-white p-4 p-md-5 rounded shadow-sm h-100"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-4">About Our Library</h2>
                <p className="mb-4">
                  The Zambia National Medical Reference Library is the national medical library with a mandate to collect, organize, 
                  disseminate and preserve all medical and health related library books, journals and information materials in the country. 
                  This library is a referral library that focuses on medicine and medical related materials. These library materials are 
                  accessible to students, faculty and the general public in both print and digital format.
                </p>
                
                {/* Library Hours Card */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-primary text-white py-3">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-clock-o fa-2x me-3"></i>
                      <h3 className="h5 mb-0">Library Hours</h3>
                    </div>
                  </div>
                  <div className="card-body py-3">
                    <p className="mb-0 fw-bold text-center fs-5">{libraryHours}</p>
                  </div>
                </div>

                {/* Library Collections */}
                <h4 className="mb-3">Library Collections</h4>
                <p className="mb-3">
                  The library consists of two main collections to serve different needs:
                </p>
                
                <div className="row mb-4">
                  {libraryFeatures.map((feature, index) => (
                    <div className="col-md-6 mb-3" key={index}>
                      <motion.div 
                        className="card h-100 border-0 shadow-sm"
                        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                      >
                        <div className="card-header bg-light py-3">
                          <h5 className="mb-0">{feature.title}</h5>
                        </div>
                        <div className="card-body">
                          <p className="card-text mb-0">{feature.description}</p>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Library Services Section */}
      <section className="pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Library Services
              </motion.h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4">
              <motion.div 
                className="card h-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <div className="card-body text-center">
                  <div className="mb-4">
                    <i className="fa fa-book fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Book Lending</h3>
                  <p className="card-text">
                    Borrow books from our extensive collection of medical and health-related materials.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <motion.div 
                className="card h-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <div className="card-body text-center">
                  <div className="mb-4">
                    <i className="fa fa-search fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Research Assistance</h3>
                  <p className="card-text">
                    Get help with research projects, literature reviews, and information retrieval.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <motion.div 
                className="card h-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <div className="card-body text-center">
                  <div className="mb-4">
                    <i className="fa fa-laptop fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Digital Resources</h3>
                  <p className="card-text">
                    Access online journals, e-books, and databases for comprehensive research.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <motion.div 
                className="card h-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <div className="card-body text-center">
                  <div className="mb-4">
                    <i className="fa fa-users fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Study Spaces</h3>
                  <p className="card-text">
                    Quiet and collaborative study areas designed for individual and group work.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="pt-40 pb-40 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-white mb-3">Visit Our Library</h2>
                <p className="lead mb-0">
                  Explore our extensive collection of medical and health resources to enhance your learning and research.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-4 col-md-5 text-md-end mt-4 mt-md-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link href="/contact" className="btn btn-light btn-lg">
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
