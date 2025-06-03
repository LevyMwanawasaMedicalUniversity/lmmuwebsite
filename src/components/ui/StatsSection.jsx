"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const counterAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.5
      }
    }
  };

  return (
    <section className="stats-section py-5 bg-light">
      <div className="container">
        <motion.div 
          className="text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h6 className="text-primary text-uppercase fw-bold" style={{ letterSpacing: "2px" }}>University Stats</h6>
          <h2 className="display-5 fw-bold mb-3">LMMU By The Numbers</h2>
          <div className="mx-auto" style={{ maxWidth: "700px" }}>
            <p className="lead text-muted">Discover the impact and growth of Levy Mwanawasa Medical University through our key statistics</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="row g-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center bg-white p-4 h-100 rounded shadow-sm" style={{ borderTop: "3px solid var(--bs-primary)" }}>
              <div className="icon mb-3">
                <i className="fa fa-users fa-2x text-primary"></i>
              </div>
              <motion.h3 
                className="counter fw-bold" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >3,500+</motion.h3>
              <p className="text-muted mb-0">Students</p>
            </div>
          </motion.div>
          
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center bg-white p-4 h-100 rounded shadow-sm" style={{ borderTop: "3px solid var(--bs-primary)" }}>
              <div className="icon mb-3">
                <i className="fa fa-graduation-cap fa-2x text-primary"></i>
              </div>
              <motion.h3 
                className="counter fw-bold" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >25+</motion.h3>
              <p className="text-muted mb-0">Programs</p>
            </div>
          </motion.div>
          
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center bg-white p-4 h-100 rounded shadow-sm" style={{ borderTop: "3px solid var(--bs-primary)" }}>
              <div className="icon mb-3">
                <i className="fa fa-flask fa-2x text-primary"></i>
              </div>
              <motion.h3 
                className="counter fw-bold" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >150+</motion.h3>
              <p className="text-muted mb-0">Research Publications</p>
            </div>
          </motion.div>
          
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center bg-white p-4 h-100 rounded shadow-sm" style={{ borderTop: "3px solid var(--bs-primary)" }}>
              <div className="icon mb-3">
                <i className="fa fa-hospital fa-2x text-primary"></i>
              </div>
              <motion.h3 
                className="counter fw-bold" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >95%</motion.h3>
              <p className="text-muted mb-0">Graduate Employment Rate</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
