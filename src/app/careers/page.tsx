import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Careers | Levy Mwanawasa Medical University (LMMU)',
  description: 'Explore career opportunities at Levy Mwanawasa Medical University. Join our team of educators, researchers, and staff dedicated to healthcare education and innovation.',
};

export default function CareersPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-5.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Careers</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li>Careers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Introduction */}
      <section className="career-intro pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title pb-30">
                <h2>Join Our Team</h2>
                <p>
                  At Levy Mwanawasa Medical University, we believe that our success depends on 
                  the talented individuals who make up our community. We are committed to 
                  attracting, developing, and retaining the best talent to contribute to our 
                  mission of educating the next generation of healthcare professionals and 
                  advancing healthcare in Zambia and beyond.
                </p>
                <p className="mt-3">
                  Whether you are an experienced academic, a healthcare professional, or someone 
                  passionate about supporting educational excellence, LMMU offers exciting career 
                  opportunities across various fields.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="career-image mt-30">
                <Image 
                  src="/assets/images/about/careers.jpg" 
                  alt="Careers at LMMU" 
                  width={400} 
                  height={300} 
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Categories */}
      <section className="career-categories pt-70 pb-70 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-50">
                <h2>Career Opportunities</h2>
                <p>Explore opportunities in different areas of our university</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="career-box text-center mb-30">
                <div className="career-icon">
                  <i className="fa fa-graduation-cap"></i>
                </div>
                <h4>Academic Positions</h4>
                <p>
                  Join our faculty as a professor, lecturer, or researcher and contribute to 
                  academic excellence in healthcare education.
                </p>
                <ul className="mt-3">
                  <li>Professors</li>
                  <li>Associate Professors</li>
                  <li>Senior Lecturers</li>
                  <li>Lecturers</li>
                  <li>Research Fellows</li>
                  <li>Clinical Instructors</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="career-box text-center mb-30">
                <div className="career-icon">
                  <i className="fa fa-cogs"></i>
                </div>
                <h4>Administrative Positions</h4>
                <p>
                  Support the university's operations through various administrative and 
                  management roles.
                </p>
                <ul className="mt-3">
                  <li>Department Managers</li>
                  <li>Program Coordinators</li>
                  <li>Administrative Assistants</li>
                  <li>Financial Officers</li>
                  <li>Human Resources Specialists</li>
                  <li>Student Affairs Officers</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="career-box text-center mb-30">
                <div className="career-icon">
                  <i className="fa fa-flask"></i>
                </div>
                <h4>Technical Positions</h4>
                <p>
                  Provide technical expertise to support academic and research activities.
                </p>
                <ul className="mt-3">
                  <li>Laboratory Technicians</li>
                  <li>IT Specialists</li>
                  <li>Library Specialists</li>
                  <li>Research Assistants</li>
                  <li>Technical Support Staff</li>
                  <li>Multimedia Specialists</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="current-openings pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-50">
                <h2>Current Openings</h2>
                <p>Explore our current job opportunities</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="job-listing">
                <div className="job-item">
                  <div className="job-title">
                    <h4>Transport Officer</h4>
                    <span className="job-type">Full-time</span>
                  </div>
                  <div className="job-details">
                    <p>
                      We are seeking a qualified Transport Officer to manage the university's 
                      fleet operations, maintenance schedules, and logistical requirements.
                    </p>
                    <ul className="job-meta">
                      <li><i className="fa fa-map-marker"></i> Lusaka Campus</li>
                      <li><i className="fa fa-calendar"></i> Posted: April 15, 2024</li>
                      <li><i className="fa fa-clock-o"></i> Deadline: May 10, 2024</li>
                    </ul>
                    <Link href="/assets/files/Advert for Transport Officer (1).pdf" target="_blank" className="main-btn mt-3">View Details</Link>
                  </div>
                </div>
                <div className="job-item">
                  <div className="job-title">
                    <h4>Senior Lecturer - Public Health</h4>
                    <span className="job-type">Full-time</span>
                  </div>
                  <div className="job-details">
                    <p>
                      The School of Public Health and Environmental Sciences is seeking a Senior 
                      Lecturer to teach courses in epidemiology, health policy, and global health.
                    </p>
                    <ul className="job-meta">
                      <li><i className="fa fa-map-marker"></i> Lusaka Campus</li>
                      <li><i className="fa fa-calendar"></i> Posted: April 10, 2024</li>
                      <li><i className="fa fa-clock-o"></i> Deadline: May 15, 2024</li>
                    </ul>
                    <a href="#" className="main-btn mt-3">View Details</a>
                  </div>
                </div>
                <div className="job-item">
                  <div className="job-title">
                    <h4>Laboratory Technician - Biochemistry</h4>
                    <span className="job-type">Full-time</span>
                  </div>
                  <div className="job-details">
                    <p>
                      We are looking for a Laboratory Technician with experience in biochemistry 
                      to support practical classes and research activities in our laboratories.
                    </p>
                    <ul className="job-meta">
                      <li><i className="fa fa-map-marker"></i> Lusaka Campus</li>
                      <li><i className="fa fa-calendar"></i> Posted: April 5, 2024</li>
                      <li><i className="fa fa-clock-o"></i> Deadline: April 30, 2024</li>
                    </ul>
                    <a href="#" className="main-btn mt-3">View Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="why-work-with-us pt-70 pb-70 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-50">
                <h2>Why Work With Us</h2>
                <p>Discover the benefits of joining the LMMU community</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="benefit-box text-center mb-30">
                <div className="benefit-icon">
                  <i className="fa fa-line-chart"></i>
                </div>
                <h4>Professional Growth</h4>
                <p>Opportunities for continuous learning, professional development, and career advancement</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="benefit-box text-center mb-30">
                <div className="benefit-icon">
                  <i className="fa fa-users"></i>
                </div>
                <h4>Collaborative Environment</h4>
                <p>Work alongside talented colleagues in a supportive and inclusive community</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="benefit-box text-center mb-30">
                <div className="benefit-icon">
                  <i className="fa fa-lightbulb-o"></i>
                </div>
                <h4>Innovation & Research</h4>
                <p>Contribute to groundbreaking research and educational innovation</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="benefit-box text-center mb-30">
                <div className="benefit-icon">
                  <i className="fa fa-heart"></i>
                </div>
                <h4>Meaningful Impact</h4>
                <p>Make a difference in healthcare education and the lives of future professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="application-process pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-50">
                <h2>How to Apply</h2>
                <p>Follow these steps to apply for positions at LMMU</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Browse Openings</h4>
                    <p>Find a position that matches your qualifications and interests.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Prepare Documents</h4>
                    <p>Get your CV, cover letter, academic/professional certificates, and references ready.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Submit Application</h4>
                    <p>Send your complete application package to <strong>careers@lmmu.ac.zm</strong> or through our online application system.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Selection Process</h4>
                    <p>Shortlisted candidates will be contacted for interviews and assessments.</p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-50">
                <p>For any inquiries about our recruitment process, please contact:</p>
                <p><strong>Email:</strong> careers@lmmu.ac.zm</p>
                <p><strong>Phone:</strong> +260974330519</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="career-cta py-5" style={{ backgroundColor: '#07294d' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 text-white">
              <h3>Ready to Join LMMU?</h3>
              <p>Be part of our mission to transform healthcare education in Zambia</p>
            </div>
            <div className="col-lg-4 text-center">
              <a href="mailto:careers@lmmu.ac.zm" className="main-btn">Apply Now</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}