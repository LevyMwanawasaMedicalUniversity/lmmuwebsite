"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ApplySection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="apply-section py-5 my-5">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <motion.div 
          className="row mb-5" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="col-lg-8 mx-auto text-center">
            <motion.h6 variants={itemVariants} className="text-uppercase fw-bold mb-3 text-on-dark" style={{ letterSpacing: '2px' }}>Join Our Community</motion.h6>
            <motion.h2 variants={itemVariants} className="display-4 fw-bold mb-4 text-on-dark">Apply Now for 2025 Intake</motion.h2>
            <motion.div variants={itemVariants} className="title-underline mx-auto mb-4" style={{ width: '80px', height: '4px', backgroundColor: '#ffc600' }}></motion.div>
            <motion.p variants={itemVariants} className="lead mb-0 text-secondary-on-dark">
              Be part of Zambia's premier medical university and contribute to improving healthcare for all.
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          className="row g-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <div className="col-lg-6">
            <motion.div variants={itemVariants} className="card h-100 border-0 gradient-container gradient-lmmu-gold pattern-container pattern-dots" style={{ borderRadius: '15px' }}>
              <div className="circle-decoration circle-small pos-top-right"></div>
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex align-items-center mb-4">
                  <span className="badge bg-white text-primary rounded-pill px-3 py-2 me-3 fw-bold">Study at LMMU</span>
                </div>
                <h3 className="card-title fw-bold mb-4 text-on-gold">Begin Your Healthcare Career</h3>
                <p className="card-text mb-4 text-secondary-on-gold">
                  Join the LMMU community of students, departments, and staff who all share one commitment through our motto "Let no one be left behind"
                </p>
                
                <div className="d-grid gap-3">
                  <Link href="/assets/files/LMMU 2025 ADVERT.pdf" className="btn btn-primary rounded-pill py-2 fw-bold" target="_blank">
                    <i className="fa fa-info-circle me-2"></i> How to Apply
                  </Link>
                  
                  <Link href="/assets/files/LMMU 2025 APPLICATION FORM  FINAL.pdf" className="btn btn-outline-primary rounded-pill py-2" target="_blank">
                    <i className="fa fa-file-pdf me-2"></i> Download Application Form
                  </Link>
                  
                  <Link href="/academics/schools" className="btn btn-outline-primary rounded-pill py-2">
                    <i className="fa fa-money-bill me-2"></i> Tuition Fees Structure
                  </Link>
                  
                  <a href="https://edurole.lmmu.ac.zm" className="btn btn-success rounded-pill py-2 fw-bold" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-edit me-2"></i> Apply Online
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="col-lg-6">
            <motion.div variants={itemVariants} className="card h-100 border-0 gradient-container gradient-primary pattern-container pattern-lines" style={{ borderRadius: '15px' }}>
              <div className="circle-gold circle-medium pos-bottom-left"></div>
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex align-items-center mb-4">
                  <span className="badge bg-white text-primary rounded-pill px-3 py-2 me-3 fw-bold">Requirements & Process</span>
                </div>
                <h3 className="card-title fw-bold mb-4 text-on-dark">Application Information</h3>
                <p className="card-text mb-4 text-secondary-on-dark">
                  Learn more about application requirements, deadlines, and procedures in our informational video.
                </p>
                <div className="ratio ratio-16x9 rounded overflow-hidden shadow">
                  <iframe 
                    src="https://www.youtube.com/embed/nKO3NFUzvZ8?si=wea4mQBNJz0s8yQY" 
                    title="LMMU Application Requirements Video" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}