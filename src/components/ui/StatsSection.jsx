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
            <div className="stats-item text-center p-4 h-100 rounded shadow" style={{ 
              background: 'linear-gradient(135deg, #1a3a8f 0%, #0f2557 100%)',
              borderRadius: '15px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative circle */}
              <div style={{ 
                position: 'absolute', 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'rgba(255,255,255,0.1)', 
                top: '-20px', 
                right: '-20px' 
              }}></div>
              
              <div className="icon mb-3" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto' 
              }}>
                <i className="fa fa-users fa-2x text-white"></i>
              </div>
              <motion.h3 
                className="counter fw-bold text-white" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >3,500+</motion.h3>
              <p className="text-white mb-0">Students</p>
            </div>
          </motion.div>
          
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center p-4 h-100 rounded shadow" style={{ 
              background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
              borderRadius: '15px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative circle */}
              <div style={{ 
                position: 'absolute', 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'rgba(255,255,255,0.1)', 
                top: '-20px', 
                right: '-20px' 
              }}></div>
              
              <div className="icon mb-3" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto' 
              }}>
                <i className="fa fa-graduation-cap fa-2x text-white"></i>
              </div>
              <motion.h3 
                className="counter fw-bold text-white" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >25+</motion.h3>
              <p className="text-white mb-0">Programs</p>
            </div>
          </motion.div>
          
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center p-4 h-100 rounded shadow" style={{ 
              background: 'linear-gradient(135deg, #fd7e14 0%, #e65c00 100%)',
              borderRadius: '15px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative circle */}
              <div style={{ 
                position: 'absolute', 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'rgba(255,255,255,0.1)', 
                top: '-20px', 
                right: '-20px' 
              }}></div>
              
              <div className="icon mb-3" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto' 
              }}>
                <i className="fa fa-flask fa-2x text-white"></i>
              </div>
              <motion.h3 
                className="counter fw-bold text-white" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >150+</motion.h3>
              <p className="text-white mb-0">Research Publications</p>
            </div>
          </motion.div>
          
          <motion.div className="col-md-3 col-sm-6" variants={fadeIn}>
            <div className="stats-item text-center p-4 h-100 rounded shadow" style={{ 
              background: 'linear-gradient(135deg, #c41230 0%, #8a0c22 100%)',
              borderRadius: '15px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative circle */}
              <div style={{ 
                position: 'absolute', 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'rgba(255,255,255,0.1)', 
                top: '-20px', 
                right: '-20px' 
              }}></div>
              
              <div className="icon mb-3" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto' 
              }}>
                <i className="fa fa-hospital fa-2x text-white"></i>
              </div>
              <motion.h3 
                className="counter fw-bold text-white" 
                variants={counterAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >100+</motion.h3>
              <p className="text-white mb-0">Staff</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
