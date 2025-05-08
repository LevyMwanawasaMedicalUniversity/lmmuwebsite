"use client";

import Link from 'next/link';

export default function ApplySection() {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <h6 className="text-white text-uppercase fw-bold">Join Our Community</h6>
          <h2 className="display-5 fw-bold text-white mb-4">Apply Now for 2025 Intake</h2>
          <p className="lead text-white-75 mb-0">
            Be part of Zambia's premier medical university and contribute to improving healthcare for all.
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="mb-4">
                <span className="badge bg-primary mb-3 rounded-pill px-3 py-2">Study at LMMU</span>
                <h3 className="card-title fw-bold mb-4">Begin Your Healthcare Career</h3>
                <p className="card-text text-muted mb-4">
                  Join the LMMU community of students, departments, and staff who all share one commitment through our motto "Let no one be left behind"
                </p>
              </div>
              
              <div className="d-grid gap-3">
                <Link href="/assets/files/LMMU 2025 ADVERT.pdf" className="btn btn-primary rounded-pill py-3" target="_blank">
                  <i className="fa fa-info-circle me-2"></i> How to Apply
                </Link>
                
                <Link href="/assets/files/LMMU 2025 APPLICATION FORM  FINAL.pdf" className="btn btn-outline-primary rounded-pill py-3" target="_blank">
                  <i className="fa fa-file-pdf me-2"></i> Download Application Form
                </Link>
                
                <Link href="/schools" className="btn btn-outline-primary rounded-pill py-3">
                  <i className="fa fa-money-bill me-2"></i> Tuition Fees Structure
                </Link>
                
                <a href="https://edurole.lmmu.ac.zm" className="btn btn-success rounded-pill py-3" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-edit me-2"></i> Apply Online
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-body p-5">
              <span className="badge bg-secondary mb-3 rounded-pill px-3 py-2">Requirements & Process</span>
              <h3 className="card-title fw-bold mb-4">Application Information</h3>
              <p className="card-text text-muted mb-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}