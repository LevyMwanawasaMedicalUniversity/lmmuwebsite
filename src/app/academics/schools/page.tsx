import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Schools and Faculties | Levy Mwanawasa Medical University (LMMU)',
  description: 'Explore the various schools and faculties at Levy Mwanawasa Medical University offering specialized medical and health science education.',
};

export default function SchoolsPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-4.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Schools and Faculties</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/academics">Academics</Link></li>
                  <li>Schools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="schools-section pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-45">
                <h2>Our Schools</h2>
                <p>
                  Levy Mwanawasa Medical University is organized into specialized schools, each 
                  dedicated to excellence in specific healthcare disciplines. Our schools provide 
                  comprehensive education that combines theoretical knowledge with practical skills.
                </p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {/* School of Medicine & Clinical Sciences */}
            <div className="col-lg-4 col-md-6">
              <div className="school-box mb-50">
                <div className="school-image">
                  <Image src="/assets/images/school-medicine.jpg" alt="School of Medicine" width={350} height={230} />
                </div>
                <div className="school-content p-4">
                  <h4><Link href="/academics/schools/somcs">School of Medicine & Clinical Sciences</Link></h4>
                  <p>
                    Offers programs in Medicine, Clinical Sciences, and specialized medical disciplines to prepare 
                    future doctors and healthcare specialists.
                  </p>
                  <Link href="/academics/schools/somcs" className="btn btn-primary mt-3">Learn More</Link>
                </div>
              </div>
            </div>
            
            {/* School of Health Sciences */}
            <div className="col-lg-4 col-md-6">
              <div className="school-box mb-50">
                <div className="school-image">
                  <Image src="/assets/images/school-health.jpg" alt="School of Health Sciences" width={350} height={230} />
                </div>
                <div className="school-content p-4">
                  <h4><Link href="/academics/schools/soh">School of Health Sciences</Link></h4>
                  <p>
                    Focuses on various health disciplines including Nursing, Pharmacy, Physiotherapy, and other 
                    allied health professions.
                  </p>
                  <Link href="/academics/schools/soh" className="btn btn-primary mt-3">Learn More</Link>
                </div>
              </div>
            </div>
            
            {/* School of Public Health & Environmental Sciences */}
            <div className="col-lg-4 col-md-6">
              <div className="school-box mb-50">
                <div className="school-image">
                  <Image src="/assets/images/school-public-health.jpg" alt="School of Public Health" width={350} height={230} />
                </div>
                <div className="school-content p-4">
                  <h4><Link href="/academics/schools/sophes">School of Public Health & Environmental Sciences</Link></h4>
                  <p>
                    Dedicated to public health education, research, and innovation to address public health challenges.
                  </p>
                  <Link href="/academics/schools/sophes" className="btn btn-primary mt-3">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Facilities Section */}
      <section className="facilities-section bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>School Facilities</h2>
                <p>Our schools are equipped with state-of-the-art facilities to enhance learning and research.</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="facility-item text-center mb-30">
                <div className="icon">
                  <i className="fa fa-flask fa-3x"></i>
                </div>
                <h4>Research Laboratories</h4>
                <p>Modern laboratories for medical and scientific research</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="facility-item text-center mb-30">
                <div className="icon">
                  <i className="fa fa-heartbeat fa-3x"></i>
                </div>
                <h4>Simulation Centers</h4>
                <p>Clinical skills centers with advanced simulation technology</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="facility-item text-center mb-30">
                <div className="icon">
                  <i className="fa fa-book fa-3x"></i>
                </div>
                <h4>Libraries</h4>
                <p>Comprehensive libraries with digital and print resources</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="facility-item text-center mb-30">
                <div className="icon">
                  <i className="fa fa-desktop fa-3x"></i>
                </div>
                <h4>Computer Labs</h4>
                <p>Modern computer laboratories with specialized software</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
