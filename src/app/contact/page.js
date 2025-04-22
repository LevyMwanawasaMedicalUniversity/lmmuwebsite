"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Levy Mwanawasa Medical University (LMMU)',
  description: 'Get in touch with Levy Mwanawasa Medical University. Find our contact information, location, and send us a message.',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
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
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-6.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Contact</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info pt-70 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="contact-box text-center mt-30">
                <div className="contact-icon">
                  <i className="fa fa-map-marker"></i>
                </div>
                <div className="contact-content">
                  <h4>Address</h4>
                  <p>Plot L/Lusaka/3170151 <br /> P.O. Box 33991, Lusaka, Zambia</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="contact-box text-center mt-30">
                <div className="contact-icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="contact-content">
                  <h4>Phone</h4>
                  <p>+260974330519 <br /> +260953821693</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="contact-box text-center mt-30">
                <div className="contact-icon">
                  <i className="fa fa-envelope"></i>
                </div>
                <div className="contact-content">
                  <h4>Email</h4>
                  <p>info@lmmu.ac.zm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-form-area pt-70 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title pb-40">
                <h2>Get In Touch</h2>
                <p>Send us your inquiries and we'll get back to you as soon as possible.</p>
              </div>
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-4">
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Your Name" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-4">
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Your Email" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-4">
                        <input 
                          type="text" 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Subject" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-4">
                        <textarea 
                          name="message" 
                          value={formData.message}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Your Message" 
                          rows="6" 
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <button 
                          type="submit" 
                          className="main-btn" 
                          disabled={formStatus.submitting}
                        >
                          {formStatus.submitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                      {formStatus.success && (
                        <div className="alert alert-success mt-4">
                          Your message has been sent successfully!
                        </div>
                      )}
                      {formStatus.error && (
                        <div className="alert alert-danger mt-4">
                          There was an error sending your message. Please try again.
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-map mt-5 mt-lg-0">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.4837777061837!2d28.366906015200715!3d-15.44780566383655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1940fde8fffffffd%3A0x4a1d0b68f6e28ae2!2sLevy%20Mwanawasa%20Medical%20University!5e0!3m2!1sen!2szm!4v1650290571960!5m2!1sen!2szm" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="visit-cta py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-12">
              <h3>Visit Our Campus</h3>
              <p className="mb-4">We invite you to visit our campus to learn more about our programs and facilities.</p>
              <p><strong>Opening Hours:</strong> Monday to Saturday - 8 AM to 5 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="social-connect pt-60 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-title pb-30">
                <h3>Connect With Us</h3>
              </div>
              <ul className="social-links">
                <li>
                  <a href="https://www.facebook.com/LevyMwanawasaMedicalUniversity" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook-f"></i>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/levy-mwanawasa-medical-univerisity" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-linkedin"></i>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/@lmmuict?si=32-5IdcWMFGgmcFt" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-youtube"></i>
                    <span>YouTube</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/levymwanawasamedicauniversity/" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-instagram"></i>
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}