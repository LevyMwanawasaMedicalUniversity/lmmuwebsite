"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer(): React.ReactNode {
  return (
    <footer className="bg-dark text-white pt-4 pb-3">
      <div className="container">
        <div className="row g-4">
          {/* Logo and Mission */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-2">
              <Link href="/" className="d-inline-block">
                <Image 
                  src="/assets/images/logo-2.png" 
                  alt="LMMU Logo" 
                  height={50} 
                  width={75} 
                  priority 
                  className="mb-2" 
                />
              </Link>
              <span className="ms-2 fw-bold fs-5">Levy Mwanawasa Medical University</span>
            </div>
            <p className="small mb-3">To educate and train health professionals using competence-based training through a distributed network of academic health complexes towards Universal Health Coverage in Zambia.</p>
            <div className="social-icons d-flex gap-2 mb-3">
              <a href="https://www.facebook.com/LevyMwanawasaMedicalUniversity" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light rounded-circle">
                <i className="fa fa-facebook-f"></i>
              </a>
              <a href="https://www.linkedin.com/company/levy-mwanawasa-medical-univerisity" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light rounded-circle">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="https://youtube.com/@lmmuict?si=32-5IdcWMFGgmcFt" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light rounded-circle">
                <i className="fa fa-youtube"></i>
              </a>
              <a href="https://www.instagram.com/levymwanawasamedicauniversity/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light rounded-circle">
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links - Two columns */}
          <div className="col-lg-5 col-md-6">
            <h6 className="fw-bold mb-3 border-bottom border-warning pb-2" style={{ borderColor: '#ffc600 !important' }}>Quick Links</h6>
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled small">
                  <li className="mb-1"><Link href="/" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>Home</Link></li>
                  <li className="mb-1"><Link href="/university" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>The University</Link></li>
                  <li className="mb-1"><Link href="/academics" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>Academics</Link></li>
                  <li className="mb-1"><Link href="/portals" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>Portals</Link></li>
                  <li className="mb-1"><Link href="/contact" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>Contact</Link></li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled small">
                  <li className="mb-1"><Link href="/background" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>Background</Link></li>
                  <li className="mb-1"><Link href="/uth" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>LMMU-UTH</Link></li>
                  <li className="mb-1"><Link href="/officers" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>Management</Link></li>
                  <li className="mb-1"><Link href="/schools" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>Schools</Link></li>
                  <li className="mb-1"><Link href="/graduation" className="text-white text-decoration-none"><i className="fa fa-angle-right me-1 text-warning"></i>Gallery</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 border-bottom border-warning pb-2" style={{ borderColor: '#ffc600 !important' }}>Contact Us</h6>
            <ul className="list-unstyled small">
              <li className="d-flex mb-2">
                <i className="fa fa-map-marker text-warning me-2 mt-1"></i>
                <div>Plot L/Lusaka/3170151, P.O. Box 33991, Zambia</div>
              </li>
              <li className="d-flex mb-2">
                <i className="fa fa-phone text-warning me-2 mt-1"></i>
                <div>+260974330519 / +260953821693</div>
              </li>
              <li className="d-flex mb-2">
                <i className="fa fa-envelope text-warning me-2 mt-1"></i>
                <div>info@lmmu.ac.zm</div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-top mt-4 pt-3 small text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Levy Mwanawasa Medical University. All Rights Reserved.</p>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <a href="#" className="back-to-top btn btn-sm btn-warning rounded-circle position-fixed bottom-0 end-0 m-4" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className="fa fa-angle-up"></i>
      </a>
    </footer>
  );
}