import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Portals | Levy Mwanawasa Medical University (LMMU)',
  description: 'Access LMMU online portals including student portal, staff portal, e-learning platform, library resources, and more.',
};

export default function PortalsPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-4.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Portals</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li>Portals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portals Introduction */}
      <section className="portals-intro pt-70 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <div className="section-title pb-30">
                <h2>Online Portals</h2>
                <p>
                  LMMU provides various online portals to facilitate easy access to information and services 
                  for students, staff, and other stakeholders. These portals are designed to enhance the learning 
                  experience and improve administrative efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Portals */}
      <section className="student-portals pt-30 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-40">
                <h3>Student Portals</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="portal-card text-center mb-30">
                <div className="portal-icon">
                  <Image 
                    src="/assets/images/portals/student.jpg" 
                    alt="Student Portal" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                  />
                </div>
                <h4>Student Portal</h4>
                <p>
                  Access your academic records, register for courses, view grades, and manage your student profile.
                </p>
                <a href="https://edurole.lmmu.ac.zm" className="main-btn mt-3" target="_blank" rel="noopener noreferrer">
                  Login to Portal
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portal-card text-center mb-30">
                <div className="portal-icon">
                  <Image 
                    src="/assets/images/portals/elearning.jpg" 
                    alt="E-Learning Portal" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                  />
                </div>
                <h4>E-Learning Portal</h4>
                <p>
                  Access course materials, participate in online classes, submit assignments, and interact with instructors.
                </p>
                <a href="https://elearning.lmmu.ac.zm" className="main-btn mt-3" target="_blank" rel="noopener noreferrer">
                  Access E-Learning
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portal-card text-center mb-30">
                <div className="portal-icon">
                  <Image 
                    src="/assets/images/portals/library.jpg" 
                    alt="Library Portal" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                  />
                </div>
                <h4>Library Portal</h4>
                <p>
                  Search for books, access online journals, research papers, and other academic resources.
                </p>
                <a href="https://library.lmmu.ac.zm" className="main-btn mt-3" target="_blank" rel="noopener noreferrer">
                  Access Library
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Portals */}
      <section className="staff-portals pt-30 pb-70 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-40">
                <h3>Staff Portals</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="portal-card text-center mb-30">
                <div className="portal-icon">
                  <Image 
                    src="/assets/images/portals/staff.jpg" 
                    alt="Staff Portal" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                  />
                </div>
                <h4>Staff Portal</h4>
                <p>
                  Access staff records, payroll information, leave management, and other administrative tools.
                </p>
                <a href="https://staff.lmmu.ac.zm" className="main-btn mt-3" target="_blank" rel="noopener noreferrer">
                  Staff Login
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portal-card text-center mb-30">
                <div className="portal-icon">
                  <Image 
                    src="/assets/images/portals/research.jpg" 
                    alt="Research Portal" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                  />
                </div>
                <h4>Research Portal</h4>
                <p>
                  Manage research projects, access funding information, submit research proposals, and share findings.
                </p>
                <a href="https://research.lmmu.ac.zm" className="main-btn mt-3" target="_blank" rel="noopener noreferrer">
                  Access Research Portal
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portal-card text-center mb-30">
                <div className="portal-icon">
                  <Image 
                    src="/assets/images/portals/email.jpg" 
                    alt="Email Portal" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                  />
                </div>
                <h4>Email Portal</h4>
                <p>
                  Access your official LMMU email account, manage messages, and communicate with colleagues and students.
                </p>
                <a href="https://mail.lmmu.ac.zm" className="main-btn mt-3" target="_blank" rel="noopener noreferrer">
                  Check Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Portals */}
      <section className="additional-portals pt-30 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-40">
                <h3>Additional Resources</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="portal-card text-center mb-30">
                <div className="portal-icon">
                  <Image 
                    src="/assets/images/portals/admission.jpg" 
                    alt="Admissions Portal" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                  />
                </div>
                <h4>Admissions Portal</h4>
                <p>
                  Apply for undergraduate and postgraduate programs, check application status, and access admission requirements.
                </p>
                <a href="https://admission.lmmu.ac.zm" className="main-btn mt-3" target="_blank" rel="noopener noreferrer">
                  Apply Online
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portal-card text-center mb-30">
                <div className="portal-icon">
                  <Image 
                    src="/assets/images/portals/alumni.jpg" 
                    alt="Alumni Portal" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                  />
                </div>
                <h4>Alumni Portal</h4>
                <p>
                  Stay connected with your alma mater, network with fellow alumni, and access alumni-specific resources.
                </p>
                <a href="https://alumni.lmmu.ac.zm" className="main-btn mt-3" target="_blank" rel="noopener noreferrer">
                  Alumni Login
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portal-card text-center mb-30">
                <div className="portal-icon">
                  <Image 
                    src="/assets/images/portals/finance.jpg" 
                    alt="Finance Portal" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                  />
                </div>
                <h4>Finance Portal</h4>
                <p>
                  Make fee payments, check payment history, and access financial statements and receipts.
                </p>
                <a href="https://finance.lmmu.ac.zm" className="main-btn mt-3" target="_blank" rel="noopener noreferrer">
                  Finance Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="help-support pt-30 pb-70 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <div className="section-title pb-30">
                <h3>Need Help?</h3>
                <p>
                  If you're experiencing any issues accessing our portals or need assistance, 
                  please contact our technical support team.
                </p>
              </div>
              <div className="support-contact">
                <p><i className="fa fa-envelope"></i> support@lmmu.ac.zm</p>
                <p><i className="fa fa-phone"></i> +260974330519</p>
                <div className="mt-4">
                  <Link href="/files/HOW TO CONNECT TO LEVY MWANAWASA MEDICAL UNIVERSITY.pdf" className="main-btn" target="_blank">
                    Download Connection Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}