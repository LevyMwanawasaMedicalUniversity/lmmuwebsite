import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Academics | Levy Mwanawasa Medical University (LMMU)',
  description: 'Explore academic programs, schools and faculties at Levy Mwanawasa Medical University. Find undergraduate and postgraduate courses in healthcare and medical sciences.',
};

export default function AcademicsPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-3.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Academics</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li>Academics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Overview */}
      <section className="academic-overview pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title pb-30">
                <h2>Academic Programs</h2>
                <p>
                  Levy Mwanawasa Medical University offers a wide range of academic programs 
                  designed to prepare students for successful careers in healthcare and related fields. 
                  Our programs combine theoretical knowledge with practical skills, ensuring that our 
                  graduates are well-equipped to meet the healthcare needs of Zambia and beyond.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="academic-box mb-50">
                <div className="academic-icon">
                  <i className="fa fa-graduation-cap"></i>
                </div>
                <div className="academic-content">
                  <h4>Undergraduate Programs</h4>
                  <p>
                    Our undergraduate programs provide students with a solid foundation in healthcare 
                    and medical sciences. These programs are designed to prepare students for entry-level 
                    positions in healthcare or for further studies at the postgraduate level.
                  </p>
                  <Link href="/undergrad" className="main-btn mt-3">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="academic-box mb-50">
                <div className="academic-icon">
                  <i className="fa fa-book"></i>
                </div>
                <div className="academic-content">
                  <h4>Postgraduate Programs</h4>
                  <p>
                    Our postgraduate programs offer advanced training and specialization in various 
                    healthcare disciplines. These programs are designed for professionals seeking to 
                    enhance their knowledge and skills or pursue careers in research and academia.
                  </p>
                  <Link href="/postgrad" className="main-btn mt-3">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schools and Faculties */}
      <section className="schools-section pt-70 pb-70 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-50">
                <h2>Our Schools and Faculties</h2>
                <p>
                  LMMU comprises several specialized schools and faculties, each focusing on 
                  different aspects of healthcare education and research.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="school-card mb-30">
                <div className="school-image">
                  <Image 
                    src="/assets/images/schools/somcs.jpg" 
                    alt="School of Medicine and Clinical Sciences" 
                    width={400} 
                    height={250} 
                    className="img-fluid"
                  />
                </div>
                <div className="school-content">
                  <h4>School of Medicine and Clinical Sciences</h4>
                  <p>
                    Offers programs in medicine, surgery, pediatrics, obstetrics, gynecology, and other clinical specialties.
                  </p>
                  <Link href="/somcs" className="read-more">Learn More <i className="fa fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="school-card mb-30">
                <div className="school-image">
                  <Image 
                    src="/assets/images/schools/ibbs.jpg" 
                    alt="Institute of Basic and Biomedical Sciences" 
                    width={400} 
                    height={250} 
                    className="img-fluid"
                  />
                </div>
                <div className="school-content">
                  <h4>Institute of Basic and Biomedical Sciences</h4>
                  <p>
                    Focuses on basic sciences, anatomy, physiology, biochemistry, pharmacology, and biomedical research.
                  </p>
                  <Link href="/ibbs" className="read-more">Learn More <i className="fa fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="school-card mb-30">
                <div className="school-image">
                  <Image 
                    src="/assets/images/schools/sophes.jpg" 
                    alt="School of Public Health and Environmental Sciences" 
                    width={400} 
                    height={250} 
                    className="img-fluid"
                  />
                </div>
                <div className="school-content">
                  <h4>School of Public Health and Environmental Sciences</h4>
                  <p>
                    Specializes in public health, epidemiology, environmental health, and health promotion.
                  </p>
                  <Link href="/academics/schools/sophes" className="read-more">Learn More <i className="fa fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="school-card mb-30">
                <div className="school-image">
                  <Image 
                    src="/assets/images/schools/soh.jpg" 
                    alt="School of Health Sciences" 
                    width={400} 
                    height={250} 
                    className="img-fluid"
                  />
                </div>
                <div className="school-content">
                  <h4>School of Health Sciences</h4>
                  <p>
                    Offers programs in physiotherapy, occupational therapy, medical laboratory sciences, radiography, and other allied health disciplines.
                  </p>
                  <Link href="/academics/schools/soh" className="read-more">Learn More <i className="fa fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="school-card mb-30">
                <div className="school-image">
                  <Image 
                    src="/assets/images/schools/nursing.jpg" 
                    alt="School of Nursing" 
                    width={400} 
                    height={250} 
                    className="img-fluid"
                  />
                </div>
                <div className="school-content">
                  <h4>School of Nursing</h4>
                  <p>
                    Specializes in nursing education, midwifery, and nursing specialties.
                  </p>
                  <Link href="/academics/schools/son" className="read-more">Learn More <i className="fa fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="school-card mb-30">
                <div className="school-image">
                  <Image 
                    src="/assets/images/schools/drpgs.jpg" 
                    alt="Directorate of Research and Postgraduate Studies" 
                    width={400} 
                    height={250} 
                    className="img-fluid"
                  />
                </div>
                <div className="school-content">
                  <h4>Directorate of Research and Postgraduate Studies</h4>
                  <p>
                    Offers advanced postgraduate programs and promotes research excellence in healthcare disciplines.
                  </p>
                  <Link href="/academics/schools/drpgs" className="read-more">Learn More <i className="fa fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Resources */}
      <section className="academic-resources pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-50">
                <h2>Academic Resources</h2>
                <p>
                  LMMU provides various resources to support students' academic journey.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="resource-box text-center mb-30">
                <div className="resource-icon">
                  <i className="fa fa-book"></i>
                </div>
                <h4>Library</h4>
                <p>
                  Our modern library provides access to a wide range of books, journals, and digital resources.
                </p>
                <Link href="/library" className="main-btn mt-3">Explore Library</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="resource-box text-center mb-30">
                <div className="resource-icon">
                  <i className="fa fa-flask"></i>
                </div>
                <h4>Laboratories</h4>
                <p>
                  State-of-the-art laboratories for practical learning and research activities.
                </p>
                <Link href="/labs" className="main-btn mt-3">View Labs</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="resource-box text-center mb-30">
                <div className="resource-icon">
                  <i className="fa fa-laptop"></i>
                </div>
                <h4>E-Learning</h4>
                <p>
                  Online learning platforms and digital resources to support virtual learning.
                </p>
                <Link href="/odl" className="main-btn mt-3">E-Learning Portal</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now CTA */}
      <section className="apply-now-cta py-5" style={{ backgroundColor: '#07294d' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="cta-content text-white">
                <h3>Ready to Begin Your Journey at LMMU?</h3>
                <p>Apply now for our undergraduate and postgraduate programs.</p>
              </div>
            </div>
            <div className="col-lg-4 text-center text-lg-right">
              <a href="https://edurole.lmmu.ac.zm" className="main-btn" target="_blank" rel="noopener noreferrer">Apply Now</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}