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
    <section className="apply-section py-5 my-5" style={{ 
      background: 'linear-gradient(rgba(7, 41, 77, 0.85), rgba(7, 41, 77, 0.9))',
      borderRadius: '0px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    }}>
      {/* Background decoration elements */}
      <div className="decoration-circles" style={{ position: 'absolute', top: 0, right: 0, opacity: 0.15, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', position: 'absolute', top: '-100px', right: '-100px' }}></div>
        <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', position: 'absolute', top: '50px', right: '150px' }}></div>
      </div>
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <motion.div 
          className="row mb-5" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="col-lg-8 mx-auto text-center">
            <motion.h6 variants={itemVariants} className="text-uppercase fw-bold mb-3" style={{ letterSpacing: '2px', color: '#7cc6fe' }}>Join Our Community</motion.h6>
            <motion.h2 variants={itemVariants} className="display-4 fw-bold mb-4" style={{ color: 'white' }}>Apply Now for 2025 Intake</motion.h2>
            <motion.div variants={itemVariants} className="title-underline mx-auto mb-4" style={{ width: '80px', height: '4px', backgroundColor: '#7cc6fe' }}></motion.div>
            <motion.p variants={itemVariants} className="lead mb-0" style={{ color: 'rgba(255,255,255,0.9)' }}>
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
            <motion.div variants={itemVariants} className="card h-100 border-0" style={{ 
              borderRadius: '15px', 
              background: 'linear-gradient(135deg, #2a76dd 0%, #1a3a8f 100%)',
              boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
              overflow: 'hidden'
            }}>
              <div className="card-body p-4 p-lg-5 text-white">
                <div className="d-flex align-items-center mb-4">
                  <span className="badge bg-white text-primary rounded-pill px-3 py-2 me-3 fw-bold">Study at LMMU</span>
                </div>
                <h3 className="card-title fw-bold mb-4">Begin Your Healthcare Career</h3>
                <p className="card-text mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Join the LMMU community of students, departments, and staff who all share one commitment through our motto "Let no one be left behind"
                </p>
                
                <div className="d-grid gap-3">
                  <Link href="/assets/files/LMMU 2025 ADVERT.pdf" className="btn btn-light text-primary rounded-pill py-2 fw-bold" target="_blank">
                    <i className="fa fa-info-circle me-2"></i> How to Apply
                  </Link>
                  
                  <Link href="/assets/files/LMMU 2025 APPLICATION FORM  FINAL.pdf" className="btn btn-outline-light rounded-pill py-2" target="_blank">
                    <i className="fa fa-file-pdf me-2"></i> Download Application Form
                  </Link>
                  
                  <Link href="/schools" className="btn btn-outline-light rounded-pill py-2">
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
            <motion.div variants={itemVariants} className="card h-100 border-0" style={{ 
              borderRadius: '15px', 
              background: 'linear-gradient(135deg, #5d5d5d 0%, #333333 100%)',
              boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
              overflow: 'hidden'
            }}>
              <div className="card-body p-4 p-lg-5 text-white">
                <div className="d-flex align-items-center mb-4">
                  <span className="badge bg-white text-secondary rounded-pill px-3 py-2 me-3 fw-bold">Requirements & Process</span>
                </div>
                <h3 className="card-title fw-bold mb-4">Application Information</h3>
                <p className="card-text mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
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