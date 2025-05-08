import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Vice Chancellor | Levy Mwanawasa Medical University',
  description: 'Meet the Vice Chancellor of Levy Mwanawasa Medical University, the principal academic and administrative officer of the university.',
};

export default function ViceChancellorPage(): React.ReactNode {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-7.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>Vice Chancellor</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/administration">Administration</Link></li>
                  <li>Vice Chancellor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VC Profile */}
      <section className="vc-profile pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <div className="profile-image mb-30">
                <Image 
                  src="/assets/images/vc-portrait.jpg" 
                  alt="Vice Chancellor"
                  width={400}
                  height={500}
                  className="img-fluid rounded shadow"
                />
                <div className="contact-info mt-4 p-4 bg-light rounded">
                  <h5>Contact</h5>
                  <ul className="list-unstyled">
                    <li><i className="fa fa-envelope me-2"></i> vc@lmmu.ac.zm</li>
                    <li><i className="fa fa-phone me-2"></i> +260 211 123456</li>
                    <li><i className="fa fa-map-marker me-2"></i> Vice Chancellor's Office, LMMU</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-lg-8 col-md-7">
              <div className="profile-content">
                <div className="section-title mb-4">
                  <h2>Prof. John Doe, PhD</h2>
                  <span className="position d-block mb-3">Vice Chancellor</span>
                </div>
                
                <div className="biography mb-5">
                  <h4>Biography</h4>
                  <p>
                    Professor John Doe is a distinguished medical professional and academic leader who 
                    has served as the Vice Chancellor of Levy Mwanawasa Medical University since 2018. 
                    With over 25 years of experience in medical education and research, Prof. Doe has 
                    contributed significantly to advancing medical education in Zambia.
                  </p>
                  <p>
                    Prior to his appointment as Vice Chancellor, Prof. Doe served as Dean of the School 
                    of Medicine at the University of Zambia for six years. He has published extensively 
                    in international medical journals and has been recognized for his contributions to 
                    medical education and healthcare policy in Africa.
                  </p>
                  <p>
                    As Vice Chancellor, Prof. Doe is committed to strengthening the university's academic 
                    programs, expanding research initiatives, and fostering partnerships with leading 
                    healthcare institutions globally. Under his leadership, LMMU has achieved significant 
                    milestones in curriculum development, infrastructure expansion, and international collaboration.
                  </p>
                </div>
                
                <div className="education mb-5">
                  <h4>Education</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">PhD in Medical Education, University of London, UK</li>
                    <li className="list-group-item">Master of Public Health, Harvard University, USA</li>
                    <li className="list-group-item">MBChB, University of Zambia, Zambia</li>
                  </ul>
                </div>
                
                <div className="vision mb-5">
                  <h4>Vision for the University</h4>
                  <p>
                    "My vision for Levy Mwanawasa Medical University is to establish it as a center of 
                    excellence in medical education, research, and healthcare innovation in Africa. We 
                    aim to produce highly skilled healthcare professionals who will contribute to improving 
                    healthcare delivery in Zambia and beyond.
                  </p>
                  <p>
                    We are committed to fostering a culture of academic excellence, innovation, and social 
                    responsibility. Through strategic partnerships, cutting-edge research, and community 
                    engagement, we will address the healthcare challenges facing our society and contribute 
                    to the achievement of universal health coverage."
                  </p>
                </div>
                
                <div className="publications">
                  <h4>Selected Publications</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Doe J, et al. (2022). "Innovations in Medical Education in Resource-Limited Settings." Journal of Medical Education, 45(3), 234-245.</li>
                    <li className="list-group-item">Doe J, et al. (2020). "Healthcare Workforce Development in Zambia: Challenges and Opportunities." African Journal of Health Sciences, 28(2), 112-125.</li>
                    <li className="list-group-item">Doe J, et al. (2018). "Impact of Community-Based Medical Education on Healthcare Outcomes." Medical Teacher, 40(4), 389-401.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* VC's Message */}
      <section className="vc-message bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="message-box p-5 bg-white shadow-sm">
                <div className="section-title mb-4 text-center">
                  <h2>Message from the Vice Chancellor</h2>
                </div>
                <div className="message-content">
                  <p>
                    Dear Students, Faculty, Staff, and Visitors,
                  </p>
                  <p>
                    Welcome to Levy Mwanawasa Medical University, a leading institution dedicated to 
                    excellence in medical and health sciences education, research, and service. As 
                    Vice Chancellor, I am proud to lead this distinguished institution that plays a 
                    vital role in addressing the healthcare needs of our nation and the region.
                  </p>
                  <p>
                    At LMMU, we are committed to providing high-quality education that prepares our 
                    students to become competent, compassionate, and ethical healthcare professionals. 
                    Our faculty and staff are dedicated to creating a supportive learning environment 
                    that fosters critical thinking, innovation, and lifelong learning.
                  </p>
                  <p>
                    Our university continues to grow and evolve, with new programs, enhanced facilities, 
                    and expanded research capabilities. We are building strategic partnerships with 
                    leading institutions globally to enrich our academic programs and research initiatives.
                  </p>
                  <p>
                    I invite you to explore our website to learn more about our academic programs, 
                    research activities, and community outreach initiatives. Whether you are a 
                    prospective student, faculty member, researcher, or partner, we welcome your 
                    interest in our university and look forward to collaborating with you.
                  </p>
                  <p>
                    Thank you for your interest in Levy Mwanawasa Medical University. Together, 
                    we can work towards our vision of becoming a center of excellence in medical 
                    education and research in Africa.
                  </p>
                  <p className="mt-4">
                    Sincerely,<br />
                    <strong>Prof. John Doe, PhD</strong><br />
                    Vice Chancellor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
