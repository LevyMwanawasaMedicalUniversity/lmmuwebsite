import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'School of Health Sciences | Levy Mwanawasa Medical University',
  description: 'Learn about the School of Health Sciences at LMMU, offering programs in Nursing, Pharmacy, Physiotherapy, and other allied health sciences.',
};

export default function SchoolOfHealthSciencesPage(): React.ReactNode {
  const programs = [
    {
      id: 1,
      title: "Bachelor of Science in Nursing",
      level: "Undergraduate",
      duration: "4 years",
      description: "Comprehensive program focusing on patient care, health promotion, and disease prevention."
    },
    {
      id: 2,
      title: "Bachelor of Science in Pharmacy",
      level: "Undergraduate",
      duration: "5 years",
      description: "Training in pharmaceutical sciences, drug therapy, and patient care services."
    },
    {
      id: 3,
      title: "Bachelor of Science in Physiotherapy",
      level: "Undergraduate",
      duration: "4 years",
      description: "Study of physical rehabilitation, therapeutic exercises, and injury management."
    },
    {
      id: 4,
      title: "Bachelor of Science in Medical Laboratory Sciences",
      level: "Undergraduate",
      duration: "4 years",
      description: "Training in laboratory techniques for diagnosis, treatment, and research."
    },
    {
      id: 5,
      title: "Master of Science in Nursing",
      level: "Postgraduate",
      duration: "2 years",
      description: "Advanced nursing practice, specialization, and leadership training."
    },
    {
      id: 6,
      title: "Master of Pharmacy",
      level: "Postgraduate",
      duration: "2 years",
      description: "Specialized pharmaceutical sciences and advanced clinical pharmacy practice."
    }
  ];

  const departments = [
    {
      id: 1,
      name: "Department of Nursing Sciences",
      description: "Focuses on nursing education, practice, and research across various specialties.",
      image: "/assets/images/dept-nursing.jpg"
    },
    {
      id: 2,
      name: "Department of Pharmaceutical Sciences",
      description: "Covers pharmaceutics, pharmacology, clinical pharmacy, and pharmaceutical technology.",
      image: "/assets/images/dept-pharmacy.jpg"
    },
    {
      id: 3,
      name: "Department of Physiotherapy",
      description: "Specializes in physical therapy education, rehabilitation techniques, and movement science.",
      image: "/assets/images/dept-physio.jpg"
    },
    {
      id: 4,
      name: "Department of Medical Laboratory Sciences",
      description: "Provides education in laboratory diagnostics, pathology, microbiology, and other clinical laboratory specialties.",
      image: "/assets/images/dept-lab.jpg"
    }
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/soh-banner.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>School of Health Sciences</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/academics">Academics</Link></li>
                  <li><Link href="/academics/schools">Schools</Link></li>
                  <li>School of Health Sciences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Overview */}
      <section className="school-overview pt-70 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="school-content mb-5">
                <div className="section-title pb-30">
                  <h2>About the School</h2>
                </div>
                <p>
                  The School of Health Sciences at Levy Mwanawasa Medical University is committed to 
                  excellence in education, research, and practice in the health sciences disciplines. 
                  Established to address the critical shortage of healthcare professionals in Zambia, 
                  the School offers comprehensive programs in nursing, pharmacy, physiotherapy, and 
                  medical laboratory sciences.
                </p>
                <p>
                  Our mission is to produce highly skilled, compassionate, and ethical healthcare 
                  professionals who will contribute to improving healthcare delivery in Zambia and 
                  beyond. The School emphasizes evidence-based practice, interdisciplinary collaboration, 
                  and community engagement in its teaching and research activities.
                </p>
                <p>
                  With state-of-the-art facilities, experienced faculty, and strong clinical partnerships, 
                  the School of Health Sciences provides students with the knowledge, skills, and practical 
                  experience needed to excel in their respective healthcare fields.
                </p>
              </div>
              
              <div className="dean-message p-4 bg-light rounded mb-5">
                <div className="row">
                  <div className="col-md-3">
                    <Image 
                      src="/assets/images/dean-soh.jpg" 
                      alt="Dean of School of Health Sciences" 
                      width={150} 
                      height={150} 
                      className="img-fluid rounded-circle mb-3"
                    />
                  </div>
                  <div className="col-md-9">
                    <h4>Dean's Message</h4>
                    <p>
                      "Welcome to the School of Health Sciences at Levy Mwanawasa Medical University. 
                      Our School is dedicated to providing quality education in health sciences disciplines 
                      to meet the healthcare needs of our nation and region. We are committed to 
                      excellence in teaching, research, and service, and we invite you to join us on 
                      this exciting journey of learning and discovery."
                    </p>
                    <p className="mb-0">
                      <strong>Prof. Rachel Mwanza, PhD</strong><br />
                      Dean, School of Health Sciences
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="school-sidebar">
                <div className="quick-info card mb-4">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Quick Information</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Established:</span>
                        <strong>2015</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Students:</span>
                        <strong>1,200+</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Faculty:</span>
                        <strong>80+</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Departments:</span>
                        <strong>4</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Programs:</span>
                        <strong>10</strong>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="contact-info card">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Contact Information</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <i className="fa fa-map-marker me-2"></i> School of Health Sciences,<br />
                        Levy Mwanawasa Medical University,<br />
                        Lusaka, Zambia
                      </li>
                      <li className="mb-3">
                        <i className="fa fa-envelope me-2"></i> soh@lmmu.ac.zm
                      </li>
                      <li className="mb-3">
                        <i className="fa fa-phone me-2"></i> +260 211 123466
                      </li>
                      <li>
                        <Link href="/contact" className="btn btn-primary btn-sm">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Departments */}
      <section className="departments-section bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Academic Departments</h2>
                <p>The School of Health Sciences comprises the following academic departments</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {departments.map((department) => (
              <div className="col-lg-6 col-md-6 mb-4" key={department.id}>
                <div className="department-card h-100">
                  <div className="card h-100">
                    <div className="row g-0 h-100">
                      <div className="col-md-4">
                        <Image 
                          src={department.image} 
                          alt={department.name} 
                          width={200} 
                          height={200} 
                          className="img-fluid rounded-start h-100" 
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h4 className="card-title">{department.name}</h4>
                          <p className="card-text">{department.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Academic Programs */}
      <section className="programs-section py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Academic Programs</h2>
                <p>The School of Health Sciences offers the following undergraduate and postgraduate programs</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {programs.map((program) => (
              <div className="col-lg-4 col-md-6 mb-4" key={program.id}>
                <div className="program-card h-100">
                  <div className="card h-100">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">{program.title}</h5>
                    </div>
                    <div className="card-body">
                      <div className="program-meta d-flex justify-content-between mb-3">
                        <span className="badge bg-secondary">{program.level}</span>
                        <span><i className="fa fa-clock-o me-1"></i> {program.duration}</span>
                      </div>
                      <p className="card-text">{program.description}</p>
                      <a href="#" className="btn btn-outline-primary btn-sm mt-2">Program Details</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Link href="/academics/undergraduate" className="btn btn-primary me-2">Undergraduate Programs</Link>
            <Link href="/academics/postgraduate" className="btn btn-secondary">Postgraduate Programs</Link>
          </div>
        </div>
      </section>
      
      {/* Facilities */}
      <section className="facilities-section bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Our Facilities</h2>
                <p>The School of Health Sciences is equipped with state-of-the-art facilities to support teaching and learning</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="facility-card text-center">
                <div className="icon mb-3">
                  <i className="fa fa-flask fa-3x text-primary"></i>
                </div>
                <h4>Laboratories</h4>
                <p>Modern laboratories for clinical skills, medical sciences, and research.</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="facility-card text-center">
                <div className="icon mb-3">
                  <i className="fa fa-user-md fa-3x text-primary"></i>
                </div>
                <h4>Simulation Center</h4>
                <p>Advanced simulation facilities for clinical training and practice.</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="facility-card text-center">
                <div className="icon mb-3">
                  <i className="fa fa-book fa-3x text-primary"></i>
                </div>
                <h4>Resource Center</h4>
                <p>Comprehensive library with digital and print resources for health sciences.</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="facility-card text-center">
                <div className="icon mb-3">
                  <i className="fa fa-desktop fa-3x text-primary"></i>
                </div>
                <h4>Computer Labs</h4>
                <p>Well-equipped computer laboratories with specialized software.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
