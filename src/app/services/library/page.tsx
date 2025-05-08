import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'University Library | Levy Mwanawasa Medical University',
  description: 'Explore the resources and services offered by the Levy Mwanawasa Medical University Library, supporting academic excellence and research.',
};

export default function LibraryPage(): React.ReactNode {
  const libraryServices = [
    {
      id: 1,
      title: "Research Support",
      description: "Assistance with literature searches, systematic reviews, and research methodologies",
      icon: "fa-search"
    },
    {
      id: 2,
      title: "Information Literacy",
      description: "Training sessions on how to locate, evaluate, and effectively use information resources",
      icon: "fa-graduation-cap"
    },
    {
      id: 3,
      title: "Digital Collections",
      description: "Access to e-books, e-journals, databases, and digital archives",
      icon: "fa-tablet"
    },
    {
      id: 4,
      title: "Interlibrary Loan",
      description: "Request materials not available in our collection from other libraries",
      icon: "fa-exchange"
    },
    {
      id: 5,
      title: "Study Spaces",
      description: "Individual and group study areas, quiet zones, and computer workstations",
      icon: "fa-users"
    },
    {
      id: 6,
      title: "Printing & Scanning",
      description: "Self-service printing, photocopying, and scanning facilities",
      icon: "fa-print"
    }
  ];

  const openingHours = [
    { day: "Monday - Friday", hours: "08:00 - 22:00" },
    { day: "Saturday", hours: "09:00 - 17:00" },
    { day: "Sunday", hours: "12:00 - 17:00" },
    { day: "Public Holidays", hours: "Closed" }
  ];

  const collections = [
    {
      id: 1,
      title: "Medical Sciences",
      description: "Comprehensive collection covering all areas of medicine, anatomy, physiology, and pathology",
      count: "25,000+ volumes"
    },
    {
      id: 2,
      title: "Clinical Sciences",
      description: "Resources supporting clinical practice, diagnosis, treatment, and patient care",
      count: "18,000+ volumes"
    },
    {
      id: 3,
      title: "Health Sciences",
      description: "Materials on nursing, pharmacy, physiotherapy, and allied health disciplines",
      count: "15,000+ volumes"
    },
    {
      id: 4,
      title: "Public Health",
      description: "Resources on epidemiology, health policy, environmental health, and global health",
      count: "12,000+ volumes"
    },
    {
      id: 5,
      title: "Reference Collection",
      description: "Medical dictionaries, encyclopedias, handbooks, and reference guides",
      count: "3,000+ volumes"
    },
    {
      id: 6,
      title: "Journals",
      description: "Print and electronic journals covering medical and health sciences",
      count: "500+ subscriptions"
    }
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/library-banner.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>University Library</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/services">Services</Link></li>
                  <li>Library</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library Overview */}
      <section className="library-overview pt-70 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="library-content mb-5">
                <div className="section-title pb-30">
                  <h2>About the Library</h2>
                </div>
                <p>
                  The Levy Mwanawasa Medical University Library is a state-of-the-art facility 
                  designed to support the academic and research needs of our students, faculty, 
                  and the broader healthcare community. As a hub for medical and health sciences 
                  information, our library provides access to a wide range of resources, both print 
                  and digital, to facilitate learning, teaching, and research.
                </p>
                <p>
                  Our library houses a comprehensive collection of medical and health sciences 
                  materials, including textbooks, journals, reference works, and multimedia resources. 
                  We also provide access to a vast array of electronic resources, including databases, 
                  e-journals, and e-books, ensuring that our users have access to the latest information 
                  in their respective fields.
                </p>
                <p>
                  Beyond our collections, the library offers various services designed to support 
                  academic and research activities. Our team of professional librarians is available 
                  to assist with literature searches, information literacy training, and research support. 
                  We also provide comfortable and conducive study spaces, including individual study 
                  carrels, group study rooms, and computer workstations.
                </p>
                <p>
                  The LMMU Library is committed to fostering a culture of academic excellence, 
                  lifelong learning, and innovation. We continuously update our collections and 
                  services to meet the evolving needs of our users and to support the University's 
                  mission of advancing medical education and healthcare delivery.
                </p>
              </div>
              
              <div className="librarian-message p-4 bg-light rounded mb-5">
                <div className="row">
                  <div className="col-md-3">
                    <Image 
                      src="/assets/images/librarian.jpg" 
                      alt="University Librarian" 
                      width={150} 
                      height={150} 
                      className="img-fluid rounded-circle mb-3"
                    />
                  </div>
                  <div className="col-md-9">
                    <h4>Librarian's Message</h4>
                    <p>
                      "Welcome to the Levy Mwanawasa Medical University Library, your gateway to 
                      information and knowledge in medical and health sciences. Our library team 
                      is dedicated to providing high-quality resources and services to support your 
                      learning, teaching, and research needs. We invite you to explore our collections, 
                      both physical and digital, and to make use of our various services. Our staff 
                      is always available to assist you in navigating the wealth of information 
                      available through our library."
                    </p>
                    <p className="mb-0">
                      <strong>Ms. Naomi Mbewe, MLIS</strong><br />
                      University Librarian
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="library-sidebar">
                <div className="opening-hours card mb-4">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Opening Hours</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {openingHours.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                          <span>{item.day}</span>
                          <strong>{item.hours}</strong>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-muted">
                      <small>* Special hours apply during examination periods and holidays.</small>
                    </p>
                  </div>
                </div>
                
                <div className="contact-info card">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Contact Information</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <i className="fa fa-map-marker me-2"></i> Main Library Building,<br />
                        Levy Mwanawasa Medical University,<br />
                        Lusaka, Zambia
                      </li>
                      <li className="mb-3">
                        <i className="fa fa-envelope me-2"></i> library@lmmu.ac.zm
                      </li>
                      <li className="mb-3">
                        <i className="fa fa-phone me-2"></i> +260 211 123470
                      </li>
                      <li>
                        <a href="https://library.lmmu.ac.zm" className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Visit Library Website</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library Services */}
      <section className="library-services bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Library Services</h2>
                <p>We offer a range of services to support your learning, teaching, and research needs</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {libraryServices.map((service) => (
              <div className="col-lg-4 col-md-6 mb-4" key={service.id}>
                <div className="service-card h-100">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <div className="icon mb-3">
                        <i className={`fa ${service.icon} fa-3x text-primary`}></i>
                      </div>
                      <h4 className="card-title">{service.title}</h4>
                      <p className="card-text">{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Library Collections */}
      <section className="library-collections py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Library Collections</h2>
                <p>Our collections support the academic and research needs of the University community</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {collections.map((collection) => (
              <div className="col-lg-4 col-md-6 mb-4" key={collection.id}>
                <div className="collection-card h-100">
                  <div className="card h-100">
                    <div className="card-body">
                      <h4 className="card-title">{collection.title}</h4>
                      <p className="card-text">{collection.description}</p>
                      <div className="collection-meta mt-3 text-primary">
                        <strong>{collection.count}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Electronic Resources */}
      <section className="e-resources bg-light py-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="e-resources-image">
                <Image 
                  src="/assets/images/e-resources.jpg" 
                  alt="Electronic Resources" 
                  width={600} 
                  height={400} 
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="e-resources-content">
                <h2>Electronic Resources</h2>
                <p>
                  Our library provides access to a wide range of electronic resources, including databases, 
                  e-journals, e-books, and other digital materials. These resources are available to all 
                  LMMU students, faculty, and staff, both on campus and remotely.
                </p>
                <h5 className="mt-4">Key Databases:</h5>
                <ul className="mt-3">
                  <li>PubMed/MEDLINE</li>
                  <li>CINAHL (Cumulative Index to Nursing and Allied Health Literature)</li>
                  <li>Cochrane Library</li>
                  <li>EMBASE</li>
                  <li>UpToDate</li>
                  <li>Access Medicine</li>
                  <li>HINARI (WHO Access to Research in Health Programme)</li>
                </ul>
                <a href="#" className="btn btn-primary mt-4">Access E-Resources</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Library Facilities */}
      <section className="library-facilities py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Library Facilities</h2>
                <p>Our library offers various facilities to enhance your learning and research experience</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="card">
                  <Image 
                    src="/assets/images/study-spaces.jpg" 
                    alt="Study Spaces" 
                    width={400} 
                    height={250} 
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h4>Study Spaces</h4>
                    <p>
                      Individual study carrels, group study rooms, and open study areas
                      designed to accommodate different learning preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="card">
                  <Image 
                    src="/assets/images/computer-lab.jpg" 
                    alt="Computer Lab" 
                    width={400} 
                    height={250} 
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h4>Computer Lab</h4>
                    <p>
                      Fully equipped computer workstations with internet access and specialized
                      software for research and academic work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="card">
                  <Image 
                    src="/assets/images/multimedia-section.jpg" 
                    alt="Multimedia Section" 
                    width={400} 
                    height={250} 
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h4>Multimedia Section</h4>
                    <p>
                      Access to audiovisual materials, anatomy models, and other multimedia
                      resources to support medical education.
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
