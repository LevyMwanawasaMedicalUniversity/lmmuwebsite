import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'University Portals | Levy Mwanawasa Medical University',
  description: 'Access online systems and portals for students, faculty, and staff at Levy Mwanawasa Medical University.',
};

export default function PortalsPage(): React.ReactNode {
  const studentPortals = [
    {
      id: 1,
      title: "Student Information System (SIS)",
      description: "Access your academic records, course registration, examination results, and other student information.",
      icon: "fa-user-graduate",
      url: "https://sis.lmmu.ac.zm",
      buttonText: "Access SIS"
    },
    {
      id: 2,
      title: "Learning Management System (LMS)",
      description: "Access course materials, online assignments, discussions, and other learning resources.",
      icon: "fa-book-open",
      url: "https://lms.lmmu.ac.zm",
      buttonText: "Access LMS"
    },
    {
      id: 3,
      title: "Student Email",
      description: "Access your official university email account for academic communications.",
      icon: "fa-envelope",
      url: "https://mail.lmmu.ac.zm",
      buttonText: "Access Email"
    },
    {
      id: 4,
      title: "Library Portal",
      description: "Search the library catalog, access electronic resources, and manage your library account.",
      icon: "fa-book",
      url: "https://library.lmmu.ac.zm",
      buttonText: "Access Library"
    }
  ];

  const facultyPortals = [
    {
      id: 1,
      title: "Faculty Portal",
      description: "Manage course information, student grades, attendance, and other academic functions.",
      icon: "fa-chalkboard-teacher",
      url: "https://faculty.lmmu.ac.zm",
      buttonText: "Access Faculty Portal"
    },
    {
      id: 2,
      title: "Research Management System",
      description: "Manage research projects, access funding information, and track research outputs.",
      icon: "fa-flask",
      url: "https://research.lmmu.ac.zm",
      buttonText: "Access Research System"
    },
    {
      id: 3,
      title: "Staff Email",
      description: "Access your official university email account for professional communications.",
      icon: "fa-envelope",
      url: "https://mail.lmmu.ac.zm",
      buttonText: "Access Email"
    }
  ];

  const administrativePortals = [
    {
      id: 1,
      title: "Human Resource Management System",
      description: "Access employee information, leave management, and other HR functions.",
      icon: "fa-users",
      url: "https://hr.lmmu.ac.zm",
      buttonText: "Access HR Portal"
    },
    {
      id: 2,
      title: "Financial Management System",
      description: "Manage financial transactions, budgets, and financial reports.",
      icon: "fa-money-bill",
      url: "https://finance.lmmu.ac.zm",
      buttonText: "Access Finance Portal"
    },
    {
      id: 3,
      title: "Procurement Portal",
      description: "Manage procurement processes, vendor information, and procurement reports.",
      icon: "fa-shopping-cart",
      url: "https://procurement.lmmu.ac.zm",
      buttonText: "Access Procurement"
    }
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/portals-banner.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>University Portals</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/services">Services</Link></li>
                  <li>Portals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portals Overview */}
      <section className="portals-overview pt-70 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="portals-content mb-5">
                <div className="section-title pb-30">
                  <h2>University Online Systems</h2>
                  <p>
                    Levy Mwanawasa Medical University provides a range of online portals and systems 
                    to facilitate academic, administrative, and research activities. These secure 
                    platforms are designed to enhance efficiency, accessibility, and communication 
                    across the university community.
                  </p>
                  <p>
                    Access to specific portals is based on your role within the university. Students, 
                    faculty, and staff are provided with login credentials for relevant systems upon 
                    joining the university. If you experience any issues accessing these portals, 
                    please contact our IT Support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Portals */}
      <section className="student-portals bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Student Portals</h2>
                <p>Online systems designed for student academic and administrative needs</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {studentPortals.map((portal) => (
              <div className="col-lg-6 col-md-6 mb-4" key={portal.id}>
                <div className="portal-card h-100">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="portal-icon me-3">
                          <i className={`fa ${portal.icon} fa-3x text-primary`}></i>
                        </div>
                        <div className="portal-content">
                          <h4 className="card-title">{portal.title}</h4>
                          <p className="card-text">{portal.description}</p>
                          <a href={portal.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            {portal.buttonText} <i className="fa fa-external-link-alt ms-1"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="student-portal-help p-4 bg-white rounded shadow-sm">
                <h5><i className="fa fa-info-circle me-2 text-primary"></i> Student Portal Help</h5>
                <p>
                  For assistance with student portals, visit the IT Support Center in the Main 
                  Administration Building or contact the Student Help Desk at 
                  <a href="mailto:studenthelp@lmmu.ac.zm"> studenthelp@lmmu.ac.zm</a> or call +260 211 123471.
                </p>
                <a href="/student-portal-guide" className="btn btn-outline-primary btn-sm">View Student Portal Guide</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Faculty Portals */}
      <section className="faculty-portals py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Faculty Portals</h2>
                <p>Online systems supporting teaching, research, and academic administration</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {facultyPortals.map((portal) => (
              <div className="col-lg-4 col-md-6 mb-4" key={portal.id}>
                <div className="portal-card h-100">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <div className="portal-icon mb-3">
                        <i className={`fa ${portal.icon} fa-3x text-secondary`}></i>
                      </div>
                      <h4 className="card-title">{portal.title}</h4>
                      <p className="card-text">{portal.description}</p>
                      <a href={portal.url} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                        {portal.buttonText} <i className="fa fa-external-link-alt ms-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="faculty-portal-help p-4 bg-light rounded shadow-sm">
                <h5><i className="fa fa-info-circle me-2 text-secondary"></i> Faculty Portal Help</h5>
                <p>
                  For assistance with faculty portals, contact the Faculty Support Desk at 
                  <a href="mailto:facultysupport@lmmu.ac.zm"> facultysupport@lmmu.ac.zm</a> or call +260 211 123472.
                </p>
                <a href="/faculty-portal-guide" className="btn btn-outline-secondary btn-sm">View Faculty Portal Guide</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Administrative Portals */}
      <section className="admin-portals bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Administrative Portals</h2>
                <p>Online systems supporting university administrative functions</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {administrativePortals.map((portal) => (
              <div className="col-lg-4 col-md-6 mb-4" key={portal.id}>
                <div className="portal-card h-100">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <div className="portal-icon mb-3">
                        <i className={`fa ${portal.icon} fa-3x text-info`}></i>
                      </div>
                      <h4 className="card-title">{portal.title}</h4>
                      <p className="card-text">{portal.description}</p>
                      <a href={portal.url} className="btn btn-info text-white" target="_blank" rel="noopener noreferrer">
                        {portal.buttonText} <i className="fa fa-external-link-alt ms-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="admin-portal-help p-4 bg-white rounded shadow-sm">
                <h5><i className="fa fa-info-circle me-2 text-info"></i> Administrative Portal Help</h5>
                <p>
                  For assistance with administrative portals, contact the Administrative Support Desk at 
                  <a href="mailto:adminsupport@lmmu.ac.zm"> adminsupport@lmmu.ac.zm</a> or call +260 211 123473.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* IT Support */}
      <section className="it-support py-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="support-image">
                <Image 
                  src="/assets/images/it-support.jpg" 
                  alt="IT Support" 
                  width={600} 
                  height={400} 
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="support-content">
                <h2>IT Support Services</h2>
                <p>
                  Our IT Support team is available to assist with any technical issues related to 
                  university portals, email accounts, network access, and other IT services. We 
                  provide support through various channels to ensure timely resolution of your 
                  technical issues.
                </p>
                
                <div className="support-contact mt-4">
                  <h5>Contact IT Support</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="fa fa-envelope me-2 text-primary"></i> 
                      <a href="mailto:itsupport@lmmu.ac.zm">itsupport@lmmu.ac.zm</a>
                    </li>
                    <li className="mb-2">
                      <i className="fa fa-phone me-2 text-primary"></i> +260 211 123474
                    </li>
                    <li className="mb-2">
                      <i className="fa fa-map-marker me-2 text-primary"></i> 
                      IT Support Center, Ground Floor, Main Administration Building
                    </li>
                    <li>
                      <i className="fa fa-clock me-2 text-primary"></i> 
                      Monday - Friday: 08:00 - 17:00
                    </li>
                  </ul>
                </div>
                
                <div className="support-options mt-4">
                  <h5>Support Options</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <a href="https://support.lmmu.ac.zm" className="btn btn-primary btn-block w-100" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-ticket-alt me-2"></i> Submit Support Ticket
                      </a>
                    </div>
                    <div className="col-md-6 mb-3">
                      <a href="https://faq.lmmu.ac.zm" className="btn btn-outline-primary btn-block w-100" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-question-circle me-2"></i> IT Support FAQ
                      </a>
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
