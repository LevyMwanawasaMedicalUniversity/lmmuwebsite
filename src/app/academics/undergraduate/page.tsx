import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Undergraduate Programs | Levy Mwanawasa Medical University',
  description: 'Explore undergraduate degree programs in medicine, nursing, and health sciences at Levy Mwanawasa Medical University.',
};

export default function UndergraduatePage(): React.ReactNode {
  const programs = [
    {
      id: 1,
      title: 'Bachelor of Medicine and Bachelor of Surgery (MBChB)',
      duration: '7 years',
      school: 'School of Medicine & Clinical Sciences',
      description: 'A comprehensive medical program that prepares graduates to practice as medical doctors.',
      requirements: 'Five O level passes including English, Mathematics, Biology, Chemistry, and Physics with Grade 12 certificates.',
    },
    {
      id: 2,
      title: 'Bachelor of Science in Nursing',
      duration: '4 years',
      school: 'School of Health Sciences',
      description: 'Trains professional nurses with the knowledge and skills to provide comprehensive healthcare.',
      requirements: 'Five O level passes including English, Mathematics, Biology, Chemistry, and Physics with Grade 12 certificates.',
    },
    {
      id: 3,
      title: 'Bachelor of Science in Physiotherapy',
      duration: '4 years',
      school: 'School of Health Sciences',
      description: 'Focuses on physical rehabilitation and treatment of physical dysfunction or injury.',
      requirements: 'Five O level passes including English, Mathematics, Biology, Chemistry, and Physics with Grade 12 certificates.',
    },
    {
      id: 4,
      title: 'Bachelor of Science in Public Health',
      duration: '4 years',
      school: 'School of Public Health & Environmental Sciences',
      description: 'Prepares graduates to address public health challenges through research, education, and policy.',
      requirements: 'Five O level passes including English, Mathematics, Biology, Chemistry, and Physics with Grade 12 certificates.',
    },
    {
      id: 5,
      title: 'Bachelor of Science in Pharmacy',
      duration: '5 years',
      school: 'School of Health Sciences',
      description: 'Trains pharmacists to provide pharmaceutical care and medication management.',
      requirements: 'Five O level passes including English, Mathematics, Biology, Chemistry, and Physics with Grade 12 certificates.',
    },
    {
      id: 6,
      title: 'Bachelor of Science in Biomedical Sciences',
      duration: '4 years',
      school: 'School of Medicine & Clinical Sciences',
      description: 'Focuses on the study of human health and disease at the molecular and cellular level.',
      requirements: 'Five O level passes including English, Mathematics, Biology, Chemistry, and Physics with Grade 12 certificates.',
    },
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-2.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Undergraduate Programs</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/academics">Academics</Link></li>
                  <li>Undergraduate Programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="programs-section pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-45">
                <h2>Undergraduate Degree Programs</h2>
                <p>
                  Levy Mwanawasa Medical University offers a variety of undergraduate programs 
                  designed to prepare students for successful careers in healthcare and medical sciences. 
                  Our programs combine theoretical knowledge with hands-on practical experience.
                </p>
              </div>
            </div>
          </div>

          {/* Program Cards */}
          <div className="row">
            {programs.map((program) => (
              <div className="col-lg-6" key={program.id}>
                <div className="program-card mb-30">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
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
                      <div className="requirements mt-3">
                        <h5>Entry Requirements</h5>
                        <p>{program.requirements}</p>
                      </div>
                      <button className="btn btn-outline-primary mt-3">More Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="admission-section bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-30">
                <h2>Admission Process</h2>
                <p>Our admissions process is designed to identify capable and motivated students.</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="admission-steps">
                <div className="row">
                  <div className="col-md-3 text-center">
                    <div className="step-item">
                      <div className="step-number">1</div>
                      <h5>Application</h5>
                      <p>Complete and submit the online application form</p>
                    </div>
                  </div>
                  
                  <div className="col-md-3 text-center">
                    <div className="step-item">
                      <div className="step-number">2</div>
                      <h5>Document Submission</h5>
                      <p>Submit required documents and transcripts</p>
                    </div>
                  </div>
                  
                  <div className="col-md-3 text-center">
                    <div className="step-item">
                      <div className="step-number">3</div>
                      <h5>Entrance Exam</h5>
                      <p>Take the required entrance examination</p>
                    </div>
                  </div>
                  
                  <div className="col-md-3 text-center">
                    <div className="step-item">
                      <div className="step-number">4</div>
                      <h5>Interview</h5>
                      <p>Attend an interview with faculty members</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <Link href="/apply" className="btn btn-primary">Apply Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
