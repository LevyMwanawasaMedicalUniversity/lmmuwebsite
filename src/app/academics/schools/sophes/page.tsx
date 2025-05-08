import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'School of Public Health & Environmental Sciences | Levy Mwanawasa Medical University',
  description: 'Learn about the School of Public Health & Environmental Sciences at LMMU, addressing public health challenges through education, research, and community engagement.',
};

export default function SchoolOfPublicHealthPage(): React.ReactNode {
  const programs = [
    {
      id: 1,
      title: "Bachelor of Science in Public Health",
      level: "Undergraduate",
      duration: "4 years",
      description: "Comprehensive program focusing on public health principles, disease prevention, and health promotion."
    },
    {
      id: 2,
      title: "Bachelor of Science in Environmental Health",
      level: "Undergraduate",
      duration: "4 years",
      description: "Training in environmental factors affecting human health and strategies for environmental protection."
    },
    {
      id: 3,
      title: "Bachelor of Science in Health Promotion",
      level: "Undergraduate",
      duration: "4 years",
      description: "Focus on strategies and interventions to promote health and prevent disease in communities."
    },
    {
      id: 4,
      title: "Master of Public Health (MPH)",
      level: "Postgraduate",
      duration: "2 years",
      description: "Advanced study in public health practice, research methods, and specialized tracks."
    },
    {
      id: 5,
      title: "Master of Science in Epidemiology",
      level: "Postgraduate",
      duration: "2 years",
      description: "Specialized training in disease surveillance, outbreak investigation, and public health research."
    },
    {
      id: 6,
      title: "Master of Science in Environmental Health",
      level: "Postgraduate",
      duration: "2 years",
      description: "Advanced study of environmental factors affecting health and environmental management strategies."
    },
    {
      id: 7,
      title: "PhD in Public Health",
      level: "Doctoral",
      duration: "3-5 years",
      description: "Research-focused program addressing complex public health issues through rigorous scientific inquiry."
    }
  ];

  const departments = [
    {
      id: 1,
      name: "Department of Epidemiology and Biostatistics",
      description: "Focuses on disease patterns, causes, and control in populations, and statistical methods for public health research.",
      image: "/assets/images/dept-epi.jpg"
    },
    {
      id: 2,
      name: "Department of Environmental Health Sciences",
      description: "Studies environmental factors affecting human health, including air and water quality, food safety, and environmental toxicology.",
      image: "/assets/images/dept-env.jpg"
    },
    {
      id: 3,
      name: "Department of Health Policy and Management",
      description: "Focuses on healthcare systems, health policy analysis, and management of healthcare organizations.",
      image: "/assets/images/dept-policy.jpg"
    },
    {
      id: 4,
      name: "Department of Health Promotion and Education",
      description: "Specializes in community health education, behavior change communication, and health promotion strategies.",
      image: "/assets/images/dept-health-edu.jpg"
    }
  ];

  const researchAreas = [
    {
      id: 1,
      title: "Infectious Disease Epidemiology",
      description: "Research on HIV/AIDS, malaria, tuberculosis, and emerging infectious diseases."
    },
    {
      id: 2,
      title: "Environmental Health and Climate Change",
      description: "Studies on climate change impacts on health, water and sanitation, and air pollution."
    },
    {
      id: 3,
      title: "Maternal and Child Health",
      description: "Research focusing on improving maternal and child health outcomes in resource-limited settings."
    },
    {
      id: 4,
      title: "Non-Communicable Diseases",
      description: "Studies on chronic diseases such as diabetes, hypertension, cancer, and mental health."
    },
    {
      id: 5,
      title: "Health Systems and Policy Research",
      description: "Analysis of health systems, healthcare access, and policy development and implementation."
    },
    {
      id: 6,
      title: "One Health",
      description: "Integrated research approach addressing human, animal, and environmental health connections."
    }
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/sophes-banner.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>School of Public Health & Environmental Sciences</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/academics">Academics</Link></li>
                  <li><Link href="/academics/schools">Schools</Link></li>
                  <li>School of Public Health & Environmental Sciences</li>
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
                  The School of Public Health & Environmental Sciences at Levy Mwanawasa Medical 
                  University is dedicated to improving population health through education, research, 
                  and community engagement. We address the pressing public health challenges facing 
                  Zambia and the region through innovative approaches and evidence-based solutions.
                </p>
                <p>
                  Our school offers comprehensive programs in public health, environmental health, 
                  epidemiology, and health promotion, preparing students for careers in various public 
                  health sectors. Our curriculum combines theoretical knowledge with practical skills, 
                  emphasizing field experience and community-based learning.
                </p>
                <p>
                  At the School of Public Health & Environmental Sciences, we pride ourselves on our 
                  commitment to research that addresses local and global health challenges. Our faculty 
                  and students engage in interdisciplinary research across various public health domains, 
                  contributing to the development of evidence-based policies and interventions.
                </p>
                <p>
                  We work closely with government agencies, non-governmental organizations, and 
                  international partners to translate research into practice and policy, making a real 
                  difference in the health of communities. Our community engagement initiatives reflect 
                  our commitment to serving the public health needs of our society.
                </p>
              </div>
              
              <div className="dean-message p-4 bg-light rounded mb-5">
                <div className="row">
                  <div className="col-md-3">
                    <Image 
                      src="/assets/images/dean-sophes.jpg" 
                      alt="Dean of School of Public Health & Environmental Sciences" 
                      width={150} 
                      height={150} 
                      className="img-fluid rounded-circle mb-3"
                    />
                  </div>
                  <div className="col-md-9">
                    <h4>Dean's Message</h4>
                    <p>
                      "Welcome to the School of Public Health & Environmental Sciences at Levy 
                      Mwanawasa Medical University. Our School is committed to addressing the complex 
                      public health challenges of our time through innovative education, research, 
                      and community engagement. We invite you to join us in our mission to improve 
                      the health and well-being of communities in Zambia and beyond."
                    </p>
                    <p className="mb-0">
                      <strong>Prof. Mary Mumba, PhD, MPH</strong><br />
                      Dean, School of Public Health & Environmental Sciences
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
                        <strong>2016</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Students:</span>
                        <strong>800+</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Faculty:</span>
                        <strong>60+</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Departments:</span>
                        <strong>4</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Programs:</span>
                        <strong>7</strong>
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
                        <i className="fa fa-map-marker me-2"></i> School of Public Health & Environmental Sciences,<br />
                        Levy Mwanawasa Medical University,<br />
                        Lusaka, Zambia
                      </li>
                      <li className="mb-3">
                        <i className="fa fa-envelope me-2"></i> sophes@lmmu.ac.zm
                      </li>
                      <li className="mb-3">
                        <i className="fa fa-phone me-2"></i> +260 211 123468
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
                <p>The School of Public Health & Environmental Sciences comprises the following academic departments</p>
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
                <p>The School of Public Health & Environmental Sciences offers the following programs</p>
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
      
      {/* Research Areas */}
      <section className="research-areas bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Research Focus Areas</h2>
                <p>Our faculty and students conduct research addressing critical public health challenges</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {researchAreas.map((area) => (
              <div className="col-lg-4 col-md-6 mb-4" key={area.id}>
                <div className="research-card h-100">
                  <div className="card h-100">
                    <div className="card-body">
                      <h4 className="card-title">{area.title}</h4>
                      <p className="card-text">{area.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community Engagement */}
      <section className="community-engagement py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Community Engagement</h2>
                <p>Our community engagement initiatives address public health challenges in partnership with communities</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="engagement-card h-100">
                <div className="card h-100">
                  <Image 
                    src="/assets/images/community-engagement1.jpg" 
                    alt="Community Health Education" 
                    width={600} 
                    height={300} 
                    className="card-img-top" 
                  />
                  <div className="card-body">
                    <h4>Community Health Education</h4>
                    <p>
                      Our students and faculty conduct health education sessions in communities 
                      across Zambia, empowering individuals with knowledge about disease prevention, 
                      health promotion, and healthy living practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="engagement-card h-100">
                <div className="card h-100">
                  <Image 
                    src="/assets/images/community-engagement2.jpg" 
                    alt="Public Health Campaigns" 
                    width={600} 
                    height={300} 
                    className="card-img-top" 
                  />
                  <div className="card-body">
                    <h4>Public Health Campaigns</h4>
                    <p>
                      We organize and participate in various public health campaigns addressing 
                      issues such as immunization, water and sanitation, nutrition, and infectious 
                      disease prevention in collaboration with local and international partners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="engagement-card h-100">
                <div className="card h-100">
                  <Image 
                    src="/assets/images/community-engagement3.jpg" 
                    alt="Health Needs Assessment" 
                    width={600} 
                    height={300} 
                    className="card-img-top" 
                  />
                  <div className="card-body">
                    <h4>Health Needs Assessment</h4>
                    <p>
                      Our faculty and students conduct community health needs assessments to 
                      identify public health priorities and develop evidence-based interventions 
                      tailored to community needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="engagement-card h-100">
                <div className="card h-100">
                  <Image 
                    src="/assets/images/community-engagement4.jpg" 
                    alt="Policy Advocacy" 
                    width={600} 
                    height={300} 
                    className="card-img-top" 
                  />
                  <div className="card-body">
                    <h4>Policy Advocacy</h4>
                    <p>
                      We engage in policy advocacy efforts to promote public health policies 
                      that address social determinants of health, health equity, and access 
                      to healthcare services.
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
