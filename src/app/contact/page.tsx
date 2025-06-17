"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  submitting: boolean;
  success: boolean;
  error: boolean;
}

export default function ContactPage(): React.ReactNode {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitting: false,
    success: false,
    error: false
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false });
    
    // In a real implementation, you would send this data to a server
    // For this example, we'll simulate a successful submission
    setTimeout(() => {
      setFormStatus({ submitting: false, success: true, error: false });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <main>
      {/* Page Banner - Improved Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '350px', overflow: 'hidden', position: 'relative', borderRadius: '0 0 0px 0px' }}>
          <Image 
            src="/assets/images/page-banner-6.jpg" 
            alt="LMMU Contact Us" 
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
                  Contact Us
                </motion.h1>
                <motion.nav 
                  aria-label="breadcrumb"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Contact</li>
                  </ol>
                </motion.nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info pt-40 pb-30">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>Here's how you can reach us</p>
              </div>
            </div>
          </div>
          <motion.div 
            className="row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="contact-box text-center p-4 mb-4 bg-white shadow-sm rounded-3"
                variants={cardVariants}
                transition={{ duration: 0.5 }}
              >
                <div className="contact-icon mb-3">
                  <i className="fa fa-map-marker fa-2x text-primary"></i>
                </div>
                <div className="contact-content">
                  <h4 className="mb-2">Address</h4>
                  <p className="mb-0">Plot L/Lusaka/3170151 <br /> P.O. Box 33991, Lusaka, Zambia</p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="contact-box text-center p-4 mb-4 bg-white shadow-sm rounded-3"
                variants={cardVariants}
                transition={{ duration: 0.5 }}
              >
                <div className="contact-icon mb-3">
                  <i className="fa fa-phone fa-2x text-primary"></i>
                </div>
                <div className="contact-content">
                  <h4 className="mb-2">Phone</h4>
                  <p className="mb-0">+260974330519 <br /> +260953821693</p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4 col-md-6">
              <motion.div 
                className="contact-box text-center p-4 mb-4 bg-white shadow-sm rounded-3"
                variants={cardVariants}
                transition={{ duration: 0.5 }}
              >
                <div className="contact-icon mb-3">
                  <i className="fa fa-envelope fa-2x text-primary"></i>
                </div>
                <div className="contact-content">
                  <h4 className="mb-2">Email</h4>
                  <p className="mb-0">info@lmmu.ac.zm</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-form-area pt-40 pb-60 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <div className="section-title">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible</p>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <motion.div 
                className="contact-form bg-white p-4 p-md-5 rounded-3 shadow-sm"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input 
                          type="text" 
                          name="name" 
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Your Name" 
                          required 
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input 
                          type="email" 
                          name="email" 
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Your Email" 
                          required 
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating mb-3">
                        <input 
                          type="text" 
                          name="subject" 
                          id="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Subject" 
                          required 
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating mb-3">
                        <textarea 
                          name="message" 
                          id="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Your Message" 
                          style={{ height: '150px' }}
                          required
                        ></textarea>
                        <label htmlFor="message">Your Message</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="d-grid gap-2">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg"
                          disabled={formStatus.submitting}
                        >
                          {formStatus.submitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                      {formStatus.success && (
                        <div className="alert alert-success mt-3">
                          <i className="fa fa-check-circle me-2"></i>
                          Your message has been sent successfully!
                        </div>
                      )}
                      {formStatus.error && (
                        <div className="alert alert-danger mt-3">
                          <i className="fa fa-exclamation-circle me-2"></i>
                          There was an error sending your message. Please try again.
                        </div>
                      )}
                    </div>
                  </div>
                </form>                            
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div 
                className="contact-map h-100 rounded-3 overflow-hidden shadow-sm"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.4837777061837!2d28.366906015200715!3d-15.44780566383655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1940fde8fffffffd%3A0x4a1d0b68f6e28ae2!2sLevy%20Mwanawasa%20Medical%20University!5e0!3m2!1sen!2szm!4v1650290571960!5m2!1sen!2szm" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '400px' }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="visit-cta py-5 bg-white">
        <div className="container">
          <motion.div 
            className="row justify-content-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-lg-10 col-xl-8 text-center">
              <div className="p-4 p-md-5 rounded-3 shadow-sm border border-light">
                <h3 className="mb-3">Visit Our Campus</h3>
                <p className="mb-4 lead">We invite you to visit our campus to learn more about our programs and facilities.</p>
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-2">
                  <div className="d-flex align-items-center">
                    <i className="fa fa-calendar text-primary me-2"></i>
                    <span><strong>Days:</strong> Monday to Saturday</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fa fa-clock-o text-primary me-2"></i>
                    <span><strong>Hours:</strong> 8:00 AM to 5:00 PM</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/about" className="btn btn-outline-primary">
                    Learn More About LMMU
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media */}
      <section className="social-connect pt-60 pb-60 bg-light">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-8 text-center">
              <div className="section-title">
                <h2>Connect With Us</h2>
                <p>Follow us on social media to stay updated with the latest news and events</p>
              </div>
            </div>
          </div>
          <motion.div 
            className="row justify-content-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <div className="col-lg-8">
              <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4">
                <motion.a 
                  href="https://www.facebook.com/LevyMwanawasaMedicalUniversity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-item text-center p-3 rounded-circle bg-white shadow-sm"
                  style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    <i className="fa fa-facebook-f fa-2x text-primary mb-2"></i>
                    <p className="small mb-0">Facebook</p>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="https://www.linkedin.com/company/levy-mwanawasa-medical-univerisity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-item text-center p-3 rounded-circle bg-white shadow-sm"
                  style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    <i className="fa fa-linkedin fa-2x text-primary mb-2"></i>
                    <p className="small mb-0">LinkedIn</p>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="https://youtube.com/@lmmuict?si=32-5IdcWMFGgmcFt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-item text-center p-3 rounded-circle bg-white shadow-sm"
                  style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    <i className="fa fa-youtube fa-2x text-primary mb-2"></i>
                    <p className="small mb-0">YouTube</p>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="https://www.instagram.com/levymwanawasamedicauniversity/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-item text-center p-3 rounded-circle bg-white shadow-sm"
                  style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    <i className="fa fa-instagram fa-2x text-primary mb-2"></i>
                    <p className="small mb-0">Instagram</p>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}