"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PostgradPage(): React.ReactNode {
  return (
    <React.Fragment>
      {/* Page banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
          <Image 
            src="/assets/images/academics/postgrad-banner.svg" 
            alt="Postgraduate Studies" 
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
                <h1 className="mb-3">Postgraduate Studies</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/academics">Academics</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Postgraduate Studies</li>
                  </ol>
                </nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Postgraduate Overview */}
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
                <h2 className="section-title mb-4">Directorate of Postgraduate Studies</h2>
                <div className="background-content">
                  <p className="mb-4">
                    The Directorate of Postgraduate Studies at Levy Mwanawasa Medical University 
                    offers advanced degree programs designed to develop specialized expertise in various 
                    healthcare disciplines. Our postgraduate programs combine rigorous academic training 
                    with practical clinical experience, preparing graduates to become leaders in their 
                    respective fields.
                  </p>
                  <p className="mb-0">
                    With a focus on research, innovation, and clinical excellence, our postgraduate 
                    programs are designed to address the healthcare needs of Zambia and beyond. 
                    Students benefit from state-of-the-art facilities, experienced faculty, and 
                    partnerships with leading healthcare institutions.
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
                    src="/assets/images/academics/postgrad-students.jpg"
                    alt="Postgraduate Students"
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

      {/* Postgraduate Programs by School */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-3">Our Postgraduate Programs</h2>
                <p className="mb-0">Explore our diverse range of postgraduate programs offered across different schools and faculties at LMMU.</p>
              </motion.div>
            </div>
          </div>

          {/* School of Medicine and Clinical Sciences */}
          <div className="mb-5">
            <motion.div 
              className="card border-0 shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="card-header bg-primary py-3">
                <h3 className="text-white m-0 fs-5">School of Medicine and Clinical Sciences</h3>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled mb-md-0">
                      <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>MSc. in Optometry</li>
                      <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>MMed. Paediatrics & Child Health</li>
                      <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>MMed. Obstetrics & Gynaecology</li>
                      <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>MMed. Internal Medicine</li>
                    </ul>
                  </div>
                  <div className="col-md-6 mt-3 mt-md-0">
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>MMed. General Surgery</li>
                      <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>MMed. Infectious Diseases</li>
                      <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>MMed. Clinical Ophthalmology</li>
                      <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>Post Graduate Dip. In Emergency Medicine</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="row">
            {/* School of Nursing */}
            <div className="col-lg-6 mb-4">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-header bg-primary py-3">
                  <h3 className="text-white m-0 fs-5">School of Nursing</h3>
                </div>
                <div className="card-body p-4">
                  <p className="mb-0"><em>Program list updating...</em></p>
                </div>
              </motion.div>
            </div>

            {/* School of Public Health and Environmental Sciences */}
            <div className="col-lg-6 mb-4">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-header bg-primary py-3">
                  <h3 className="text-white m-0 fs-5">School of Public Health and Environmental Sciences</h3>
                </div>
                <div className="card-body p-4">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>Master of Science in Public Health</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* School of Health Sciences */}
            <div className="col-lg-6 mb-4">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-header bg-primary py-3">
                  <h3 className="text-white m-0 fs-5">School of Health Sciences</h3>
                </div>
                <div className="card-body p-4">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>MSc. Health Professions Education</li>
                    <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>Doctor of Pharmacy (Pharm-D)</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Institute of Basic and Biomedical Sciences */}
            <div className="col-lg-6 mb-4">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-header bg-primary py-3">
                  <h3 className="text-white m-0 fs-5">Institute of Basic and Biomedical Sciences</h3>
                </div>
                <div className="card-body p-4">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>PhD. in Health Professions Education</li>
                    <li className="mb-2"><i className="fas fa-graduation-cap me-2 text-primary"></i>Post Graduate Dip. In Medical Education</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Open and Distance Learning (ODL) */}
            <div className="col-lg-6 mb-4 mx-auto">
              <motion.div 
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="card-header bg-primary py-3">
                  <h3 className="text-white m-0 fs-5">Open and Distance Learning (ODL)</h3>
                </div>
                <div className="card-body p-4">
                  <p className="mb-0"><em>Program list updating...</em></p>
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
                <h3>Ready to Advance Your Career?</h3>
                <p className="mb-0">Take the next step in your professional journey with our postgraduate programs.</p>
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
                <Link href="/admissions/apply" className="btn btn-light px-4 py-2">
                  <i className="fas fa-graduation-cap me-2"></i> Apply Now
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
