"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BackgroundPage() {
  return (
    <React.Fragment>
      {/* Page banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
          <Image 
            src="/assets/images/university/background/page-banner.jpg" 
            alt="University Background" 
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
                <h1 className="mb-3">University Background</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/university">The University</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Background</li>
                  </ol>
                </nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Content Section */}
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
                <h2 className="section-title mb-4">University Background</h2>
                <div className="background-content">
                  <p className="mb-4">
                    The Levy Mwanawasa Medical University (LMMU) was established as a Public University on 22nd May, 2018 
                    under provisions of Section 132 of the Higher Education Act, No. 4 of 2013, by way of Statutory 
                    Instrument No. 39 and 40 of 2018. At its establishment, the LMMU became the fourth Public University 
                    and is the largest purpose-built health training institution in Zambia offering various education and 
                    training programmes for health professionals.
                  </p>
                  <p className="mb-4">
                    The LMMU national hub is a 3,000-student capacity campus including a 1,000 capacity National Health 
                    Reference Library, and 200 bed National Skills Laboratory Complex. The Chainama College of Health 
                    Sciences, Dental Training School, Levy Mwanawasa University Teaching Hospital and Chainama Hills 
                    College Hospital have been integrated into the LMMU.
                  </p>
                  <p className="mb-0">
                    The LMMU has 10 provincial training hubs and multiple satellite practicum sites constituting its 
                    nationwide network of academic health complexes. The university is situated approximately 10 Kilometers 
                    East of Lusaka on the Great East road in Chainama Area.
                  </p>
                </div>
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
                    src="/assets/images/university/background/campus-image.jpg" 
                    width={600}
                    height={400}
                    alt="LMMU Campus" 
                    className="img-fluid w-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts Section */}
      <section className="py-5 bg-light section-spacing">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Key Facts</h2>
                <p className="lead">Important milestones and statistics about LMMU</p>
              </motion.div>
            </div>
          </div>
          <div className="row g-4">
            {/* Fact 1 */}
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card h-100 border-0 shadow-sm text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4">
                  <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                    <i className="fas fa-calendar-alt fa-2x"></i>
                  </div>
                  <h3 className="counter-value h2 fw-bold mb-2">2018</h3>
                  <p className="card-text">Year Established</p>
                </div>
              </motion.div>
            </div>

            {/* Fact 2 */}
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card h-100 border-0 shadow-sm text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4">
                  <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                    <i className="fas fa-users fa-2x"></i>
                  </div>
                  <h3 className="counter-value h2 fw-bold mb-2">3,000</h3>
                  <p className="card-text">Student Capacity</p>
                </div>
              </motion.div>
            </div>

            {/* Fact 3 */}
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card h-100 border-0 shadow-sm text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4">
                  <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                    <i className="fas fa-book fa-2x"></i>
                  </div>
                  <h3 className="counter-value h2 fw-bold mb-2">1,000</h3>
                  <p className="card-text">Library Capacity</p>
                </div>
              </motion.div>
            </div>

            {/* Fact 4 */}
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="card h-100 border-0 shadow-sm text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-body p-4">
                  <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                    <i className="fas fa-map-marker-alt fa-2x"></i>
                  </div>
                  <h3 className="counter-value h2 fw-bold mb-2">10</h3>
                  <p className="card-text">Provincial Training Hubs</p>
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
                <h3>Want to learn more about our leadership?</h3>
                <p className="mb-0">Explore our university officers and management team.</p>
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
                <Link href="/university/officers" className="btn btn-light px-4 py-2">
                  <i className="fas fa-users me-2"></i> University Officers
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
