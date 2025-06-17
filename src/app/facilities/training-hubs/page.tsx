'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define the hub data structure
interface Hub {
  id: number;
  name: string;
  province: string;
  image: string;
}

export default function TrainingHubsPage() {
  // Hub data from the legacy site
  const hubs: Hub[] = [
    {
      id: 1,
      name: "Levy Mwanawasa Medical University",
      province: "Lusaka Province",
      image: "/assets/images/facilities/training-hubs/hubs/vidpic.jpg"
    },
    {
      id: 2,
      name: "Livingstone Central Hospital",
      province: "Southern Province",
      image: "/assets/images/facilities/training-hubs/hubs/hub4.png"
    },
    {
      id: 3,
      name: "Chinsali General Hospital",
      province: "Muchinga Province",
      image: "/assets/images/facilities/training-hubs/hubs/hub2.png"
    },
    {
      id: 4,
      name: "University Teaching Hospital",
      province: "Lusaka Province",
      image: "/assets/images/facilities/training-hubs/hubs/LMMU UTH.jpg"
    },
    {
      id: 5,
      name: "Solwezi General Hospital",
      province: "Northwestern Province",
      image: "/assets/images/facilities/training-hubs/hubs/solwezi.jpeg"
    },
    {
      id: 6,
      name: "Ndola Teaching Hospital",
      province: "Copperbelt Province",
      image: "/assets/images/facilities/training-hubs/hubs/Ndola Teaching Hospital.png"
    },
    {
      id: 7,
      name: "Mansa General Hospital",
      province: "Luapula Province",
      image: "/assets/images/facilities/training-hubs/hubs/mansa.jpeg"
    },
    {
      id: 8,
      name: "Lewanika General Hospital",
      province: "Western Province",
      image: "/assets/images/facilities/training-hubs/hubs/mongu.jpeg"
    },
    {
      id: 9,
      name: "Kabwe General Hospital",
      province: "Central Province",
      image: "/assets/images/facilities/training-hubs/hubs/Kabwe Hub.png"
    }
  ];

  return (
    <React.Fragment>
      {/* Page Banner - Improved Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '350px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 0px 0px' }}>
          <Image 
            src="/assets/images/facilities/training-hubs/page-banner.svg" 
            alt="Regional Training Hubs" 
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Enhanced gradient overlay with LMMU brand colors */}
          <div className="overlay position-absolute w-100 h-100 top-0 gradient-lmmu-blue-gold" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(7, 41, 77, 0.9) 0%, rgba(7, 41, 77, 0.8) 40%, rgba(255, 198, 0, 0.3) 100%)',
              mixBlendMode: 'multiply'
            }}>
          </div>
          
          {/* Decorative pattern overlay */}
          <div className="pattern-overlay position-absolute w-100 h-100 top-0" 
            style={{ 
              background: 'url("/assets/images/university/pattern-bg.png") repeat',
              opacity: '0.05',
              zIndex: 2
            }}>
          </div>
        </div>
        <div className="container position-relative" style={{ marginTop: '-120px' }}>
          <div className="row">
            <div className="col-12">
              <motion.div 
                className="hero-content bg-white shadow-lg rounded-3 p-4 p-md-5 text-center position-relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)' }}
                style={{ 
                  borderTop: '6px solid #ffc600',
                  borderRight: '1px solid rgba(7, 41, 77, 0.1)',
                  borderBottom: '1px solid rgba(7, 41, 77, 0.1)',
                  borderLeft: '1px solid rgba(7, 41, 77, 0.1)',
                  borderRadius: '12px'
                }}
              >                <motion.h1
                  className="mb-2 fw-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{ color: '#07294d' }}
                >
                  Regional Training Hubs
                </motion.h1>
                <motion.nav 
                  aria-label="breadcrumb"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/facilities">Facilities</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Regional Training Hubs</li>
                  </ol>
                </motion.nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="pt-50 pb-30">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <motion.div 
                className="text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4">Our Distributed Learning Network</h2>
                <p className="lead">
                  LMMU operates a distributed network of academic health complexes across Zambia's provinces. 
                  These regional training hubs serve as centers for medical education, clinical training, and healthcare service delivery.
                </p>
                <p>
                  The distributed learning model ensures that healthcare education reaches all parts of the country, 
                  helping to address the shortage of healthcare professionals in rural and underserved areas.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Hubs Grid Section */}
      <section className="pt-30 pb-50 bg-light">
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
                Provincial Training Centers
              </motion.h2>
            </div>
          </div>
          
          <div className="row">
            {hubs.map((hub) => (
              <div className="col-lg-4 col-md-6 mb-4" key={hub.id}>
                <motion.div 
                  className="card h-100 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: hub.id * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                >
                  <div className="card-img-top position-relative" style={{ height: '200px' }}>
                    <Image 
                      src={hub.image} 
                      alt={hub.name} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h3 className="card-title h5 mb-2">{hub.name}</h3>
                    <p className="card-text text-muted">{hub.province}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
                Benefits of Our Regional Hub Model
              </motion.h2>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
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
                    <i className="fa fa-graduation-cap fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Expanded Educational Access</h3>
                  <p className="card-text">
                    Students can receive quality medical education closer to their home regions, 
                    reducing the need to relocate to major cities for training.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
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
                    <i className="fa fa-hospital-o fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Improved Healthcare Access</h3>
                  <p className="card-text">
                    Regional hubs strengthen local healthcare systems by providing specialized services 
                    and expertise that might otherwise be unavailable in provincial areas.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
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
                    <i className="fa fa-users fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Community Integration</h3>
                  <p className="card-text">
                    Training hubs are integrated with local communities, allowing students to understand 
                    regional healthcare needs and develop culturally appropriate care approaches.
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
                <h2 className="text-white mb-3">Learn More About Our Programs</h2>
                <p className="lead mb-0">
                  Discover how LMMU is transforming healthcare education across Zambia through our innovative distributed learning model.
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
                <Link href="/academics" className="btn btn-light btn-lg">
                  Explore Programs
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
