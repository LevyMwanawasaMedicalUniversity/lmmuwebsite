export const metadata = {
  title: 'The University | Levy Mwanawasa Medical University (LMMU)',
  description: 'Learn about Levy Mwanawasa Medical University, its history, mission, vision, and core values.',
};

import Image from 'next/image';
import Link from 'next/link';

export default function UniversityPage() {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-1.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>The University</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li>The University</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About University */}
      <section className="about-university pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title pb-30">
                <h2>About Levy Mwanawasa Medical University</h2>
              </div>
              <div className="about-content">
                <p>
                  Levy Mwanawasa Medical University (LMMU) is a public institution of higher learning 
                  that was established through the Higher Education Act No.4 of 2013. The University 
                  was officially opened on 13th May 2019 following the approval of the transformation 
                  of Levy Mwanawasa Medical University College (LMMUC) by President Edgar Chagwa Lungu.
                </p>
                <p>
                  Prior to its transformation to a University College in 2018, LMMU existed as the 
                  Chainama College of Health Sciences which was opened in 1936 as the Chainama Health 
                  Training Institution, making it one of the oldest health training institutions in 
                  the region. The establishment of the University was necessitated by the need to 
                  address the critical shortage of skilled health workers in the country.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-image mt-50">
                <Image 
                  src="/assets/images/about/about-univ.jpg" 
                  alt="About University" 
                  width={400} 
                  height={300} 
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision pt-70 pb-70 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="mission-box">
                <h3>Our Mission</h3>
                <p>
                  To educate and train health professionals using hands-on and competence-based 
                  training that is administered through a distributed network of academic health 
                  complexes in order to contribute towards Universal Health Coverage in Zambia.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="vision-box">
                <h3>Our Vision</h3>
                <p>
                  To be a leading centre of health professions, education, training and research 
                  in Zambia and beyond.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-50">
            <div className="col-lg-12">
              <div className="values-box">
                <h3>Our Core Values</h3>
                <ul>
                  <li><strong>Excellence:</strong> We strive for excellence in all our endeavors.</li>
                  <li><strong>Integrity:</strong> We uphold the highest ethical standards in all our actions.</li>
                  <li><strong>Innovation:</strong> We embrace creative and innovative approaches to teaching, learning, and research.</li>
                  <li><strong>Inclusion:</strong> We value diversity and ensure equal opportunities for all.</li>
                  <li><strong>Collaboration:</strong> We foster teamwork and partnerships to achieve our goals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="leadership pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-50">
                <h2>University Leadership</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="leadership-card text-center">
                <div className="leadership-image mb-30">
                  <Image 
                    src="/assets/images/officers/vc.jpg" 
                    alt="Vice Chancellor" 
                    width={250} 
                    height={250} 
                    className="img-fluid rounded-circle"
                  />
                </div>
                <div className="leadership-content">
                  <h4>Prof. Elwyn Chomba</h4>
                  <span>Vice Chancellor</span>
                  <Link href="/vc" className="main-btn mt-4">Read More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="leadership-card text-center">
                <div className="leadership-image mb-30">
                  <Image 
                    src="/assets/images/officers/dvc.jpg" 
                    alt="Deputy Vice Chancellor" 
                    width={250} 
                    height={250} 
                    className="img-fluid rounded-circle"
                  />
                </div>
                <div className="leadership-content">
                  <h4>Prof. Alick Nyirenda</h4>
                  <span>Deputy Vice Chancellor</span>
                  <Link href="/dvc" className="main-btn mt-4">Read More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="leadership-card text-center">
                <div className="leadership-image mb-30">
                  <Image 
                    src="/assets/images/officers/advc.jpg" 
                    alt="Associate Deputy Vice Chancellor" 
                    width={250} 
                    height={250} 
                    className="img-fluid rounded-circle"
                  />
                </div>
                <div className="leadership-content">
                  <h4>Dr. Ruth Mfune</h4>
                  <span>Associate Deputy Vice Chancellor</span>
                  <Link href="/advc" className="main-btn mt-4">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5" style={{ backgroundColor: '#07294d' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="cta-content text-white">
                <h3>Interested in becoming part of LMMU?</h3>
                <p>Learn about our programs and application process.</p>
              </div>
            </div>
            <div className="col-lg-4 text-center text-lg-right">
              <Link href="/academics" className="main-btn">Explore Programs</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}