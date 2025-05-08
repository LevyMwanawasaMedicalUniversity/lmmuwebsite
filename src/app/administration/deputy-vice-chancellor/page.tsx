import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Deputy Vice Chancellor | Levy Mwanawasa Medical University',
  description: 'Meet the Deputy Vice Chancellor of Levy Mwanawasa Medical University, responsible for academic and administrative leadership.',
};

export default function DeputyViceChancellorPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-8.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Deputy Vice Chancellor</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/administration">Administration</Link></li>
                  <li>Deputy Vice Chancellor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DVC Profile */}
      <section className="dvc-profile pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <div className="profile-image mb-30">
                <Image 
                  src="/assets/images/dvc-portrait.jpg" 
                  alt="Deputy Vice Chancellor"
                  width={400}
                  height={500}
                  className="img-fluid rounded shadow"
                />
                <div className="contact-info mt-4 p-4 bg-light rounded">
                  <h5>Contact</h5>
                  <ul className="list-unstyled">
                    <li><i className="fa fa-envelope me-2"></i> dvc@lmmu.ac.zm</li>
                    <li><i className="fa fa-phone me-2"></i> +260 211 123457</li>
                    <li><i className="fa fa-map-marker me-2"></i> DVC's Office, LMMU</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-lg-8 col-md-7">
              <div className="profile-content">
                <div className="section-title mb-4">
                  <h2>Prof. Jane Smith, PhD</h2>
                  <span className="position d-block mb-3">Deputy Vice Chancellor</span>
                </div>
                
                <div className="biography mb-5">
                  <h4>Biography</h4>
                  <p>
                    Professor Jane Smith serves as the Deputy Vice Chancellor of Levy Mwanawasa Medical 
                    University, providing critical support to the Vice Chancellor in the academic and 
                    administrative leadership of the institution. With over 20 years of experience in 
                    higher education and healthcare, Prof. Smith brings valuable expertise to her role.
                  </p>
                  <p>
                    Prior to her appointment as Deputy Vice Chancellor, Prof. Smith was the Head of 
                    Department of Public Health at a leading medical institution and has extensive 
                    experience in curriculum development, academic administration, and healthcare 
                    policy. She has led several initiatives to enhance the quality of medical education 
                    and has been instrumental in establishing international partnerships.
                  </p>
                  <p>
                    As Deputy Vice Chancellor, Prof. Smith oversees the day-to-day academic operations 
                    of the university, coordinates faculty development initiatives, and plays a key role 
                    in strategic planning and quality assurance. She is committed to promoting excellence 
                    in teaching, research, and community service.
                  </p>
                </div>
                
                <div className="education mb-5">
                  <h4>Education</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">PhD in Public Health, University of Cape Town, South Africa</li>
                    <li className="list-group-item">Master of Science in Epidemiology, London School of Hygiene and Tropical Medicine, UK</li>
                    <li className="list-group-item">Bachelor of Medicine and Bachelor of Surgery, University of Zambia, Zambia</li>
                  </ul>
                </div>
                
                <div className="responsibilities mb-5">
                  <h4>Key Responsibilities</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Academic Leadership:</strong> Oversee academic programs, curriculum development, and quality assurance
                    </li>
                    <li className="list-group-item">
                      <strong>Faculty Affairs:</strong> Coordinate faculty recruitment, development, and performance evaluation
                    </li>
                    <li className="list-group-item">
                      <strong>Student Services:</strong> Supervise student affairs, including admissions, academic support, and student welfare
                    </li>
                    <li className="list-group-item">
                      <strong>Strategic Planning:</strong> Assist in developing and implementing the university's strategic plan
                    </li>
                    <li className="list-group-item">
                      <strong>Research and Innovation:</strong> Promote research activities and innovation across the university
                    </li>
                  </ul>
                </div>
                
                <div className="achievements">
                  <h4>Notable Achievements</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Led the development of innovative curriculum frameworks for medical education</li>
                    <li className="list-group-item">Established partnerships with international medical institutions for faculty and student exchange</li>
                    <li className="list-group-item">Secured significant research grants to support faculty research initiatives</li>
                    <li className="list-group-item">Implemented quality assurance systems that have enhanced the university's academic standards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* DVC's Initiatives */}
      <section className="dvc-initiatives bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center mb-50">
                <h2>Current Initiatives</h2>
                <p>Key initiatives led by the Deputy Vice Chancellor to enhance academic excellence</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="initiative-card mb-30">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon mb-3">
                      <i className="fa fa-graduation-cap fa-3x text-primary"></i>
                    </div>
                    <h4>Curriculum Innovation</h4>
                    <p>
                      Redesigning academic programs to integrate competency-based education, 
                      problem-based learning, and digital technologies to enhance student learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="initiative-card mb-30">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon mb-3">
                      <i className="fa fa-users fa-3x text-primary"></i>
                    </div>
                    <h4>Faculty Development</h4>
                    <p>
                      Implementing comprehensive faculty development programs to enhance 
                      teaching skills, research capabilities, and leadership qualities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="initiative-card mb-30">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon mb-3">
                      <i className="fa fa-globe fa-3x text-primary"></i>
                    </div>
                    <h4>International Partnerships</h4>
                    <p>
                      Establishing strategic partnerships with leading international 
                      institutions to enhance academic programs and research opportunities.
                    </p>
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
