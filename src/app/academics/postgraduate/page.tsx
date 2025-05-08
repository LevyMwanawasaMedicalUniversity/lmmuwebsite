import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Postgraduate Programs | Levy Mwanawasa Medical University',
  description: 'Explore postgraduate and graduate programs in medicine, public health, and specialized clinical sciences at Levy Mwanawasa Medical University.',
};

export default function PostgraduatePage(): React.ReactNode {
  const programs = [
    {
      id: 1,
      title: 'Master of Medicine (MMed)',
      duration: '4 years',
      school: 'School of Medicine & Clinical Sciences',
      specializations: ['Internal Medicine', 'Surgery', 'Pediatrics', 'Obstetrics & Gynecology'],
      description: 'Advanced clinical training program for medical doctors seeking specialization.',
      requirements: 'MBChB or equivalent medical degree and valid registration with the Health Professions Council of Zambia.',
    },
    {
      id: 2,
      title: 'Master of Public Health (MPH)',
      duration: '2 years',
      school: 'School of Public Health & Environmental Sciences',
      specializations: ['Epidemiology', 'Health Policy', 'Environmental Health', 'Health Promotion'],
      description: 'Prepares health professionals for leadership roles in public health practice, research, and policy development.',
      requirements: 'Bachelor\'s degree in medicine, nursing, or related health science field.',
    },
    {
      id: 3,
      title: 'Master of Science in Nursing',
      duration: '2 years',
      school: 'School of Health Sciences',
      specializations: ['Critical Care', 'Pediatric Nursing', 'Mental Health', 'Nursing Education'],
      description: 'Advanced education for nurses seeking specialized clinical expertise and leadership skills.',
      requirements: 'Bachelor\'s degree in Nursing and valid nursing practice license.',
    },
    {
      id: 4,
      title: 'PhD in Medical Sciences',
      duration: '3-5 years',
      school: 'School of Medicine & Clinical Sciences',
      specializations: ['Molecular Medicine', 'Clinical Research', 'Medical Education'],
      description: 'Research-focused doctoral program that prepares scholars for academic and research leadership.',
      requirements: 'Master\'s degree in relevant medical or health science field.',
    },
    {
      id: 5,
      title: 'Postgraduate Diploma in Health Professions Education',
      duration: '1 year',
      school: 'School of Health Sciences',
      specializations: [],
      description: 'Designed for health professionals who wish to enhance their teaching and educational leadership skills.',
      requirements: 'Bachelor\'s degree in a health-related field with at least 2 years of professional experience.',
    },
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-5 pb-4" style={{ backgroundImage: "url('/images/page-banner-5.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Postgraduate Programs</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/academics">Academics</Link></li>
                  <li>Postgraduate Programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="programs-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-4">
                <h2>Postgraduate Degree Programs</h2>
                <p>
                  Levy Mwanawasa Medical University offers comprehensive postgraduate programs 
                  designed to advance medical and health sciences knowledge and develop specialized skills.
                  Our programs combine research excellence with clinical expertise and professional development.
                </p>
              </div>
            </div>
          </div>

          {/* Program Cards */}
          <div className="row">
            {programs.map((program) => (
              <div className="col-lg-6" key={program.id}>
                <div className="program-card mb-4">
                  <div className="card">
                    <div className="card-header bg-secondary text-white">
                      <h4>{program.title}</h4>
                    </div>
                    <div className="card-body">
                      <div className="program-meta d-flex flex-wrap mb-3">
                        <div className="meta-item me-4">
                          <strong>Duration:</strong> {program.duration}
                        </div>
                        <div className="meta-item">
                          <strong>School:</strong> {program.school}
                        </div>
                      </div>
                      <p>{program.description}</p>
                      
                      {program.specializations.length > 0 && (
                        <div className="specializations mt-3">
                          <h5>Specializations</h5>
                          <ul className="list-group list-group-flush">
                            {program.specializations.map((spec, index) => (
                              <li key={index} className="list-group-item">{spec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="requirements mt-3">
                        <h5>Entry Requirements</h5>
                        <p>{program.requirements}</p>
                      </div>
                      <button className="btn btn-outline-secondary mt-3">More Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="research-section bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Research Focus Areas</h2>
                <p>Our postgraduate programs emphasize research excellence in key areas</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="research-area mb-4">
                <div className="icon">
                  <i className="fa fa-flask fa-3x"></i>
                </div>
                <h4>Infectious Diseases</h4>
                <p>Research on malaria, HIV/AIDS, tuberculosis, and emerging infections</p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="research-area mb-4">
                <div className="icon">
                  <i className="fa fa-heartbeat fa-3x"></i>
                </div>
                <h4>Non-Communicable Diseases</h4>
                <p>Research on cardiovascular diseases, diabetes, cancer, and mental health</p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="research-area mb-4">
                <div className="icon">
                  <i className="fa fa-users fa-3x"></i>
                </div>
                <h4>Public Health Systems</h4>
                <p>Research on healthcare delivery, health policy, and health economics</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link href="/research" className="btn btn-primary">View Research Projects</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
