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
    <section className="stats-section py-4">
      <div className="container">
        
        <motion.div 
          className="row g-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center p-4 h-100 rounded shadow gradient-container gradient-primary">
              {/* Decorative circle */}
              <div className="circle-decoration circle-small top-right-corner"></div>
              
              <div className="stat-icon-container mb-3">
                <i className="fa fa-users fa-2x text-white"></i>
              </div>
              <motion.h3 
                className="counter fw-bold gradient-text-primary" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >6,000+</motion.h3>
              <p className="gradient-text-primary mb-0">Students</p>
            </div>
          </motion.div>
          
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center p-4 h-100 rounded shadow gradient-container gradient-success">
              {/* Decorative circle */}
              <div className="circle-decoration circle-small top-right-corner"></div>
              
              <div className="stat-icon-container mb-3">
                <i className="fa fa-graduation-cap fa-2x text-white"></i>
              </div>
              <motion.h3 
                className="counter fw-bold gradient-text-primary" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >50+</motion.h3>
              <p className="gradient-text-primary mb-0">Programs</p>
            </div>
          </motion.div>
          
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center p-4 h-100 rounded shadow gradient-container gradient-neutral">
              {/* Decorative circle */}
              <div className="circle-decoration circle-small top-right-corner"></div>
              
              <div className="stat-icon-container mb-3">
                <i className="fa fa-flask fa-2x text-white"></i>
              </div>
              <motion.h3 
                className="counter fw-bold gradient-text-primary" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >150+</motion.h3>
              <p className="gradient-text-primary mb-0">Research Publications</p>
            </div>
          </motion.div>
          
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center p-4 h-100 rounded shadow gradient-container gradient-accent">
              {/* Decorative circle */}
              <div className="circle-decoration circle-small top-right-corner"></div>
              
              <div className="stat-icon-container mb-3">
                <i className="fa fa-hospital fa-2x text-white"></i>
              </div>
              <motion.h3 
                className="counter fw-bold gradient-text-primary" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >100+</motion.h3>
              <p className="gradient-text-primary mb-0">Staff</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
