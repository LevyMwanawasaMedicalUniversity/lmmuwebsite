import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Administrative Officers | Levy Mwanawasa Medical University',
  description: 'Meet the key administrative officers responsible for the day-to-day operations of Levy Mwanawasa Medical University.',
};

export default function AdministrativeOfficersPage(): React.ReactNode {
  const officers = [
    {
      id: 1,
      name: "Mr. David Zulu",
      title: "Registrar",
      image: "/assets/images/officer-registrar.jpg",
      responsibilities: [
        "Management of academic records and student data",
        "Oversight of student admissions and registrations",
        "Coordination of examinations and academic scheduling",
        "Custodian of University records and official documents",
        "Secretary to various University committees"
      ],
      contact: {
        email: "registrar@lmmu.ac.zm",
        phone: "+260 211 123458"
      }
    },
    {
      id: 2,
      name: "Ms. Elizabeth Mwansa",
      title: "Bursar",
      image: "/assets/images/officer-bursar.jpg",
      responsibilities: [
        "Financial management and accounting",
        "Budget preparation and monitoring",
        "Financial reporting and audit coordination",
        "Management of student fees and financial aid",
        "Procurement and asset management"
      ],
      contact: {
        email: "bursar@lmmu.ac.zm",
        phone: "+260 211 123459"
      }
    },
    {
      id: 3,
      name: "Dr. Patrick Tembo",
      title: "Director of Research and Innovation",
      image: "/assets/images/officer-research.jpg",
      responsibilities: [
        "Coordination of research activities and initiatives",
        "Management of research grants and funding",
        "Promotion of innovation and knowledge transfer",
        "Research ethics and compliance oversight",
        "Fostering research partnerships and collaborations"
      ],
      contact: {
        email: "research@lmmu.ac.zm",
        phone: "+260 211 123460"
      }
    },
    {
      id: 4,
      name: "Mrs. Catherine Bwalya",
      title: "Director of Human Resources",
      image: "/assets/images/officer-hr.jpg",
      responsibilities: [
        "Recruitment and staff development",
        "Employee relations and welfare",
        "Performance management",
        "Implementation of HR policies and procedures",
        "Staff training and capacity building"
      ],
      contact: {
        email: "hr@lmmu.ac.zm",
        phone: "+260 211 123461"
      }
    },
    {
      id: 5,
      name: "Mr. Joseph Gondwe",
      title: "Director of Information and Communication Technology",
      image: "/assets/images/officer-ict.jpg",
      responsibilities: [
        "ICT infrastructure management and support",
        "Development and maintenance of information systems",
        "Implementation of e-learning platforms",
        "Data security and privacy protection",
        "Technology innovation and digital transformation"
      ],
      contact: {
        email: "ict@lmmu.ac.zm",
        phone: "+260 211 123462"
      }
    },
    {
      id: 6,
      name: "Ms. Naomi Mbewe",
      title: "Librarian",
      image: "/assets/images/officer-librarian.jpg",
      responsibilities: [
        "Management of library resources and services",
        "Acquisition and cataloging of academic materials",
        "Implementation of digital library systems",
        "Information literacy and research support",
        "Library user services and training"
      ],
      contact: {
        email: "library@lmmu.ac.zm",
        phone: "+260 211 123463"
      }
    },
    {
      id: 7,
      name: "Mr. Victor Kaunda",
      title: "Director of Quality Assurance",
      image: "/assets/images/officer-qa.jpg",
      responsibilities: [
        "Implementation of quality assurance frameworks",
        "Coordination of program accreditation processes",
        "Monitoring and evaluation of academic standards",
        "Facilitation of institutional self-assessment",
        "Quality enhancement initiatives"
      ],
      contact: {
        email: "quality@lmmu.ac.zm",
        phone: "+260 211 123464"
      }
    },
    {
      id: 8,
      name: "Dr. Mercy Banda",
      title: "Dean of Students",
      image: "/assets/images/officer-dean-students.jpg",
      responsibilities: [
        "Student welfare and support services",
        "Coordination of student activities and organizations",
        "Student discipline and conflict resolution",
        "Student counseling and guidance",
        "Management of student residences"
      ],
      contact: {
        email: "deanofstudents@lmmu.ac.zm",
        phone: "+260 211 123465"
      }
    }
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-11.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Administrative Officers</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/administration">Administration</Link></li>
                  <li>Administrative Officers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Officers Overview */}
      <section className="officers-overview pt-70 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-30">
                <h2>Key Administrative Officers</h2>
                <p>
                  The day-to-day operations of Levy Mwanawasa Medical University are managed by a team 
                  of dedicated administrative officers who bring expertise and experience to their respective 
                  roles. These officers work collaboratively to support the University's academic mission 
                  and ensure effective administrative functions.
                </p>
              </div>
            </div>
          </div>

          {/* Officers Listing */}
          {officers.map((officer) => (
            <div className="row officer-row mb-50" key={officer.id}>
              <div className="col-lg-3 col-md-4">
                <div className="officer-image mb-4 mb-md-0">
                  <Image 
                    src={officer.image} 
                    alt={officer.name} 
                    width={250} 
                    height={250} 
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
              </div>
              
              <div className="col-lg-9 col-md-8">
                <div className="officer-details">
                  <h3 className="officer-name">{officer.name}</h3>
                  <h5 className="officer-title text-primary mb-3">{officer.title}</h5>
                  
                  <h6 className="responsibilities-title">Key Responsibilities:</h6>
                  <ul className="responsibilities-list mb-4">
                    {officer.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  
                  <div className="contact-info">
                    <h6>Contact:</h6>
                    <p className="mb-1"><i className="fa fa-envelope me-2"></i> {officer.contact.email}</p>
                    <p><i className="fa fa-phone me-2"></i> {officer.contact.phone}</p>
                  </div>
                </div>
              </div>
              
              {officer.id < officers.length && (
                <div className="col-12">
                  <hr className="mt-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* Administrative Structure */}
      <section className="admin-structure bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Administrative Structure</h2>
                <p>How our administrative departments work together to support the University's mission</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="structure-diagram p-4 bg-white shadow-sm">
                <div className="diagram-content text-center">
                  <div className="top-level p-3 border bg-primary text-white mb-4 w-50 mx-auto">
                    Vice Chancellor
                  </div>
                  
                  <div className="second-level d-flex justify-content-center mb-4">
                    <div className="p-3 border bg-secondary text-white mx-2" style={{ width: '45%' }}>
                      Deputy Vice Chancellor
                    </div>
                  </div>
                  
                  <div className="third-level d-flex flex-wrap justify-content-center gap-3 mb-4">
                    <div className="p-3 border" style={{ width: '30%' }}>Registrar</div>
                    <div className="p-3 border" style={{ width: '30%' }}>Bursar</div>
                    <div className="p-3 border" style={{ width: '30%' }}>Director of HR</div>
                  </div>
                  
                  <div className="fourth-level d-flex flex-wrap justify-content-center gap-3">
                    <div className="p-3 border" style={{ width: '22%' }}>Director of ICT</div>
                    <div className="p-3 border" style={{ width: '22%' }}>Librarian</div>
                    <div className="p-3 border" style={{ width: '22%' }}>Director of QA</div>
                    <div className="p-3 border" style={{ width: '22%' }}>Dean of Students</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <Link href="/contact" className="btn btn-primary">Contact Administration</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
