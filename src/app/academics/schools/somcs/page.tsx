import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'School of Medicine & Clinical Sciences | Levy Mwanawasa Medical University',
  description: 'Learn about the School of Medicine & Clinical Sciences at LMMU, training the next generation of medical doctors and clinical specialists.',
};

export default function SchoolOfMedicinePage(): React.ReactNode {
  const programs = [
    {
      id: 1,
      title: "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
      level: "Undergraduate",
      duration: "7 years",
      description: "Comprehensive medical program that prepares graduates to practice as medical doctors."
    },
    {
      id: 2,
      title: "Bachelor of Science in Biomedical Sciences",
      level: "Undergraduate",
      duration: "4 years",
      description: "Study of human biology and disease mechanisms to support medical research and healthcare."
    },
    {
      id: 3,
      title: "Bachelor of Science in Anatomy",
      level: "Undergraduate",
      duration: "4 years",
      description: "In-depth study of human anatomy, histology, and embryology for healthcare and research."
    },
    {
      id: 4,
      title: "Master of Medicine (MMed) in Internal Medicine",
      level: "Postgraduate",
      duration: "4 years",
      description: "Specialist training in the diagnosis and management of internal medical conditions."
    },
    {
      id: 5,
      title: "Master of Medicine (MMed) in Surgery",
      level: "Postgraduate",
      duration: "4 years",
      description: "Advanced surgical training for qualified medical doctors."
    },
    {
      id: 6,
      title: "Master of Medicine (MMed) in Pediatrics",
      level: "Postgraduate",
      duration: "4 years",
      description: "Specialist training in the medical care of infants, children, and adolescents."
    },
    {
      id: 7,
      title: "Master of Medicine (MMed) in Obstetrics & Gynecology",
      level: "Postgraduate",
      duration: "4 years",
      description: "Specialized training in women's reproductive health and maternal-fetal medicine."
    },
    {
      id: 8,
      title: "PhD in Medical Sciences",
      level: "Doctoral",
      duration: "3-5 years",
      description: "Advanced research program in various fields of medical and clinical sciences."
    }
  ];

  const departments = [
    {
      id: 1,
      name: "Department of Clinical Sciences",
      description: "Focuses on clinical teaching, patient care, and medical training across various specialties.",
      image: "/assets/images/dept-clinical.jpg"
    },
    {
      id: 2,
      name: "Department of Biomedical Sciences",
      description: "Covers basic medical sciences, including anatomy, physiology, biochemistry, and pathology.",
      image: "/assets/images/dept-biomedical.jpg"
    },
    {
      id: 3,
      name: "Department of Surgery",
      description: "Specializes in surgical education, techniques, and research across surgical subspecialties.",
      image: "/assets/images/dept-surgery.jpg"
    },
    {
      id: 4,
      name: "Department of Internal Medicine",
      description: "Focuses on the diagnosis and management of diseases affecting internal organs.",
      image: "/assets/images/dept-internal.jpg"
    },
    {
      id: 5,
      name: "Department of Pediatrics and Child Health",
      description: "Dedicated to the health and medical care of infants, children, and adolescents.",
      image: "/assets/images/dept-pediatrics.jpg"
    },
    {
      id: 6,
      name: "Department of Obstetrics and Gynecology",
      description: "Specializes in women's reproductive health, pregnancy, and childbirth.",
      image: "/assets/images/dept-obgyn.jpg"
    }
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/somcs-banner.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>School of Medicine & Clinical Sciences</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/academics">Academics</Link></li>
                  <li><Link href="/academics/schools">Schools</Link></li>
                  <li>School of Medicine & Clinical Sciences</li>
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
                  The School of Medicine & Clinical Sciences at Levy Mwanawasa Medical University 
                  is the cornerstone of our institution, dedicated to training the next generation 
                  of medical doctors and clinical specialists. As one of Zambia's premier medical 
                  schools, we are committed to excellence in medical education, research, and 
                  patient care.
                </p>
                <p>
                  Our school provides a comprehensive medical curriculum that integrates basic 
                  sciences, clinical skills, and professional development. Students benefit from 
                  state-of-the-art facilities, experienced faculty, and strong clinical partnerships 
                  with leading hospitals and healthcare institutions in Zambia.
                </p>
                <p>
                  The School of Medicine & Clinical Sciences is at the forefront of medical 
                  research, addressing key health challenges facing Zambia and the region. Our 
                  faculty and students engage in cutting-edge research across various medical 
                  disciplines, contributing to advancements in healthcare and medical knowledge.
                </p>
                <p>
                  We are committed to producing compassionate, competent, and ethical medical 
                  professionals who will contribute to improving healthcare delivery and addressing 
                  the healthcare needs of our communities.
                </p>
              </div>
              
              <div className="dean-message p-4 bg-light rounded mb-5">
                <div className="row">
                  <div className="col-md-3">
                    <Image 
                      src="/assets/images/dean-somcs.jpg" 
                      alt="Dean of School of Medicine & Clinical Sciences" 
                      width={150} 
                      height={150} 
                      className="img-fluid rounded-circle mb-3"
                    />
                  </div>
                  <div className="col-md-9">
                    <h4>Dean's Message</h4>
                    <p>
                      "Welcome to the School of Medicine & Clinical Sciences at Levy Mwanawasa 
                      Medical University. Our School is dedicated to training medical professionals 
                      who will lead the way in transforming healthcare in Zambia and beyond. We 
                      provide a supportive and challenging environment where students can develop 
                      the knowledge, skills, and attitudes needed to excel in the medical profession."
                    </p>
                    <p className="mb-0">
                      <strong>Prof. James Banda, MD, PhD</strong><br />
                      Dean, School of Medicine & Clinical Sciences
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
                        <strong>1,500+</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Faculty:</span>
                        <strong>120+</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Departments:</span>
                        <strong>6</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Programs:</span>
                        <strong>12</strong>
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
                        <i className="fa fa-map-marker me-2"></i> School of Medicine & Clinical Sciences,<br />
                        Levy Mwanawasa Medical University,<br />
                        Lusaka, Zambia
                      </li>
                      <li className="mb-3">
                        <i className="fa fa-envelope me-2"></i> somcs@lmmu.ac.zm
                      </li>
                      <li className="mb-3">
                        <i className="fa fa-phone me-2"></i> +260 211 123467
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
                <p>The School of Medicine & Clinical Sciences comprises the following academic departments</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {departments.map((department) => (
              <div className="col-lg-4 col-md-6 mb-4" key={department.id}>
                <div className="department-card h-100">
                  <div className="card h-100">
                    <Image 
                      src={department.image} 
                      alt={department.name} 
                      width={400} 
                      height={200} 
                      className="card-img-top" 
                    />
                    <div className="card-body">
                      <h4 className="card-title">{department.name}</h4>
                      <p className="card-text">{department.description}</p>
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
                <p>The School of Medicine & Clinical Sciences offers the following programs</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-12">
              <div className="program-tabs">
                <ul className="nav nav-tabs mb-4" id="programTabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="undergraduate-tab" data-bs-toggle="tab" href="#undergraduate" role="tab">
                      Undergraduate Programs
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="postgraduate-tab" data-bs-toggle="tab" href="#postgraduate" role="tab">
                      Postgraduate Programs
                    </a>
                  </li>
                </ul>
                
                <div className="tab-content" id="programTabsContent">
                  <div className="tab-pane fade show active" id="undergraduate" role="tabpanel">
                    <div className="row">
                      {programs.filter(p => p.level === "Undergraduate").map((program) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={program.id}>
                          <div className="program-card h-100">
                            <div className="card h-100">
                              <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">{program.title}</h5>
                              </div>
                              <div className="card-body">
                                <div className="program-meta d-flex justify-content-between mb-3">
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
                  </div>
                  
                  <div className="tab-pane fade" id="postgraduate" role="tabpanel">
                    <div className="row">
                      {programs.filter(p => p.level === "Postgraduate" || p.level === "Doctoral").map((program) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={program.id}>
                          <div className="program-card h-100">
                            <div className="card h-100">
                              <div className="card-header bg-secondary text-white">
                                <h5 className="mb-0">{program.title}</h5>
                              </div>
                              <div className="card-body">
                                <div className="program-meta d-flex justify-content-between mb-3">
                                  <span className="badge bg-info">{program.level}</span>
                                  <span><i className="fa fa-clock-o me-1"></i> {program.duration}</span>
                                </div>
                                <p className="card-text">{program.description}</p>
                                <a href="#" className="btn btn-outline-secondary btn-sm mt-2">Program Details</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link href="/academics/undergraduate" className="btn btn-primary me-2">Undergraduate Programs</Link>
            <Link href="/academics/postgraduate" className="btn btn-secondary">Postgraduate Programs</Link>
          </div>
        </div>
      </section>
      
      {/* Clinical Training */}
      <section className="clinical-training bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Clinical Training</h2>
                <p>Our students gain hands-on clinical experience through our extensive network of training hospitals</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6">
              <div className="training-content mb-4 mb-lg-0">
                <h4>Clinical Teaching Sites</h4>
                <p>
                  The School of Medicine & Clinical Sciences has established strong partnerships 
                  with leading hospitals and healthcare facilities to provide students with 
                  diverse clinical experiences. Our clinical teaching sites include:
                </p>
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item">University Teaching Hospital (UTH)</li>
                  <li className="list-group-item">Levy Mwanawasa University Teaching Hospital</li>
                  <li className="list-group-item">Cancer Diseases Hospital</li>
                  <li className="list-group-item">Chainama Hills College Hospital</li>
                  <li className="list-group-item">Various district and provincial hospitals</li>
                </ul>
                <p>
                  These partnerships enable our students to gain exposure to a wide range of 
                  clinical cases, from common conditions to complex and rare diseases, under 
                  the supervision of experienced clinical faculty.
                </p>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="training-features">
                <h4>Clinical Training Features</h4>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="feature-item d-flex">
                      <div className="icon me-3">
                        <i className="fa fa-user-md fa-2x text-primary"></i>
                      </div>
                      <div>
                        <h5>Patient Care</h5>
                        <p>Direct patient interaction under supervision</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <div className="feature-item d-flex">
                      <div className="icon me-3">
                        <i className="fa fa-stethoscope fa-2x text-primary"></i>
                      </div>
                      <div>
                        <h5>Clinical Skills</h5>
                        <p>Hands-on practice of diagnostic and therapeutic procedures</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <div className="feature-item d-flex">
                      <div className="icon me-3">
                        <i className="fa fa-users fa-2x text-primary"></i>
                      </div>
                      <div>
                        <h5>Team-Based Care</h5>
                        <p>Working with multidisciplinary healthcare teams</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <div className="feature-item d-flex">
                      <div className="icon me-3">
                        <i className="fa fa-comments fa-2x text-primary"></i>
                      </div>
                      <div>
                        <h5>Communication</h5>
                        <p>Developing effective patient communication skills</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
