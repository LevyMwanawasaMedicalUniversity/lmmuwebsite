'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define the theatre data structure
interface Theatre {
  id: number;
  name: string;
  image: string;
  description: string;
}

export default function TeachingAreasPage() {
  // Theatre data from the legacy site
  const theatres: Theatre[] = [
    {
      id: 1,
      name: "Prof. Chifumbe Chintu Auditorium",
      image: "/assets/images/facilities/teaching-areas/theatres/4.jpg",
      description: "A state-of-the-art auditorium named after Professor Chifumbe Chintu, featuring modern audiovisual equipment and comfortable seating for large lectures and events."
    },
    {
      id: 2,
      name: "Ms. Kapelwa Sikota Lecture Theatre",
      image: "/assets/images/facilities/teaching-areas/theatres/16.JPG",
      description: "A spacious lecture theatre honoring Ms. Kapelwa Sikota, designed for interactive teaching with excellent acoustics and multimedia capabilities."
    },
    {
      id: 3,
      name: "Rev. Prof. Ann Bayley Lecture Theatre",
      image: "/assets/images/facilities/teaching-areas/theatres/DJI_0098.JPG",
      description: "Named after Reverend Professor Ann Bayley, this theatre provides a conducive learning environment with advanced presentation technology."
    },
    {
      id: 4,
      name: "Prof. Elwyn Chomba Lecture Theatre",
      image: "/assets/images/facilities/teaching-areas/theatres/DJI_0098.JPG",
      description: "Dedicated to Professor Elwyn Chomba, this modern lecture theatre supports diverse teaching methodologies with flexible seating arrangements."
    }
  ];

  return (
    <React.Fragment>
      {/* Page Banner - Improved Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '350px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 0px 0px' }}>
          <Image 
            src="/assets/images/facilities/teaching-areas/page-banner.svg" 
            alt="Lecture Theatres" 
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
              >
                <motion.h1 
                  className="mb-2 fw-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{ color: '#07294d' }}
                >
                  Lecture Theatres
                </motion.h1>
                <motion.nav 
                  aria-label="breadcrumb"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/facilities">Facilities</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Lecture Theatres</li>
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
                <h2 className="section-title mb-4">World-Class Teaching Facilities</h2>
                <p className="lead">
                  LMMU is proud to offer modern, well-equipped lecture theatres that provide optimal learning environments for our students.
                  These facilities are designed to support various teaching methodologies and enhance the educational experience.
                </p>
                <p>
                  Our lecture theatres are named after distinguished individuals who have made significant contributions to medical education and healthcare in Zambia.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Lecture Theatres Section */}
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
                Our Lecture Theatres
              </motion.h2>
            </div>
          </div>
          
          <div className="row">
            {theatres.map((theatre) => (
              <div className="col-lg-6 mb-4" key={theatre.id}>
                <motion.div 
                  className="card h-100 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: theatre.id * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                >
                  <div className="row g-0">
                    <div className="col-md-6">
                      <div className="position-relative" style={{ height: '100%', minHeight: '250px' }}>
                        <Image 
                          src={theatre.image} 
                          alt={theatre.name} 
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card-body h-100 d-flex flex-column">
                        <h3 className="card-title h5 mb-3">{theatre.name}</h3>
                        <p className="card-text">{theatre.description}</p>
                        <div className="mt-auto">
                          <ul className="list-unstyled mb-0">
                            <li><i className="fa fa-check-circle text-success me-2"></i> Modern audiovisual equipment</li>
                            <li><i className="fa fa-check-circle text-success me-2"></i> Comfortable seating</li>
                            <li><i className="fa fa-check-circle text-success me-2"></i> Excellent acoustics</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
                Teaching Area Features
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
                    <i className="fa fa-desktop fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Advanced Technology</h3>
                  <p className="card-text">
                    Our lecture theatres are equipped with high-definition projectors, 
                    interactive whiteboards, and integrated sound systems for enhanced learning experiences.
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
                    <i className="fa fa-users fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Flexible Seating</h3>
                  <p className="card-text">
                    Designed with ergonomic seating arrangements that can be configured for 
                    various teaching formats, from traditional lectures to interactive group discussions.
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
                    <i className="fa fa-wifi fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h5 mb-3">Connectivity</h3>
                  <p className="card-text">
                    High-speed internet access and power outlets throughout the theatres 
                    enable students to use digital learning resources and devices effectively.
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
                <h2 className="text-white mb-3">Experience Our Campus</h2>
                <p className="lead mb-0">
                  Visit LMMU to see our world-class teaching facilities and learn more about our educational programs.
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
