"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const quickLinks = [
  {
    icon: '/assets/icons/student.svg',
    iconColor: '#1e88e5',
    gradientClass: 'gradient-primary',
    title: 'The University',
    description: "Learn about our history, mission and vision",
    link: '/university'
  },
  {
    icon: '/assets/icons/academic.svg',
    iconColor: '#43a047',
    gradientClass: 'gradient-success',
    title: 'Academic Programs',
    description: 'Explore our diverse range of medical and health science programs',
    link: '/academics/schools'
  },
  {
    icon: '/assets/icons/calendar.svg',
    iconColor: '#00896c', // Updated to match our green gradient-success color
    gradientClass: 'gradient-neutral',
    title: 'LM-UTH',
    description: 'Deatails about the Levy Mwanawasa University Teaching Hospital',
    link: '/facilities/uth'
  },
  {
    icon: '/assets/icons/tour.svg',
    iconColor: '#ffc600', // Updated to match LMMU's institutional gold color
    gradientClass: 'gradient-accent',
    title: 'Portals',
    description: 'Access student, staff and alumni resources',
    link: '/portals/student'
  }
];

const quickLinkVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Add some custom styles
const styles = {
  quickLinksContainer: {
    background: 'transparent',
    paddingTop: '30px',
    paddingBottom: '20px',
    borderRadius: '24px 24px 0 0',
    maxWidth: '1200px',
    margin: '0 auto',
    backdropFilter: 'none'
  }
};

export default function QuickLinks() {
  return (
    <div className="quick-links-container" style={styles.quickLinksContainer}>
      <div className="container px-4">
        <div className="row gy-4 gx-4 justify-content-center">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              className="col-6 col-md-6 col-lg-3 mb-4"
              variants={quickLinkVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              custom={index}
            >
              <Link href={link.link} className="quick-link-card text-decoration-none mb-4">
                <div className={`card h-100 border-0 shadow gradient-container ${link.gradientClass}`} style={{ borderRadius: '12px' }}>
                  <div className="circle-decoration circle-small top-right-corner"></div>
                  <div className="card-body d-flex flex-column p-3 p-md-4">
                    <div className="d-flex align-items-center mb-3">
                      <div 
                        className="icon-wrapper me-3" 
                        style={{ 
                          backgroundColor: link.iconColor,
                          width: 'clamp(32px, 4vw, 42px)',
                          height: 'clamp(32px, 4vw, 42px)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Image
                          src={link.icon}
                          alt={link.title}
                          width={28}
                          height={28}
                          className="quick-link-icon"
                          style={{ filter: 'brightness(0) invert(1)' }}
                        />
                      </div>
                      <h3 className="h6 mb-0 fw-bold gradient-text-primary" style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1rem)' }}>{link.title}</h3>
                    </div>
                    <p className="gradient-text-primary small mb-1 mb-md-2" style={{ fontSize: 'clamp(0.7rem, 1.3vw, 0.8rem)', lineHeight: '1.3' }}>{link.description}</p>
                    <div className="mt-auto text-end">
                      <span className="small fw-bold gradient-text-primary" style={{ fontSize: 'clamp(0.7rem, 1.3vw, 0.8rem)' }}>Learn More →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
