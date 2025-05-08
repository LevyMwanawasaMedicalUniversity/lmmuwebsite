import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Administration | Levy Mwanawasa Medical University',
  description: 'Learn about the administrative structure and leadership at Levy Mwanawasa Medical University.',
};

export default function AdministrationPage(): React.ReactNode {
  const leadershipCards = [
    {
      id: 1,
      title: 'Vice Chancellor',
      image: '/assets/images/vc-placeholder.jpg',
      link: '/administration/vice-chancellor',
      description: 'The Vice Chancellor is the principal academic and administrative officer of the University.',
    },
    {
      id: 2,
      title: 'Deputy Vice Chancellor',
      image: '/assets/images/dvc-placeholder.jpg',
      link: '/administration/deputy-vice-chancellor',
      description: 'The Deputy Vice Chancellor assists the Vice Chancellor in the academic and administrative management of the University.',
    },
    {
      id: 3,
      title: 'University Council',
      image: '/assets/images/council-placeholder.jpg',
      link: '/administration/council',
      description: 'The University Council is the governing body responsible for the overall governance and policy direction of the institution.',
    },
    {
      id: 4,
      title: 'University Senate',
      image: '/assets/images/senate-placeholder.jpg',
      link: '/administration/senate',
      description: 'The Senate is the highest academic authority responsible for academic affairs of the University.',
    },
    {
      id: 5,
      title: 'Administrative Officers',
      image: '/assets/images/officers-placeholder.jpg',
      link: '/administration/officers',
      description: 'The key administrative officers manage various administrative functions of the University.',
    },
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-6.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>University Administration</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li>Administration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Administration Overview */}
      <section className="administration-overview pt-70 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-30">
                <h2>University Leadership</h2>
                <p>
                  Levy Mwanawasa Medical University is guided by a dedicated leadership team committed to 
                  excellence in medical education, research, and community service. Our administrative 
                  structure ensures efficient management and strategic development of the University.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {leadershipCards.map((card) => (
              <div className="col-lg-4 col-md-6" key={card.id}>
                <div className="leadership-card mb-40">
                  <div className="card">
                    <div className="leadership-image">
                      <Image src={card.image} alt={card.title} width={350} height={250} />
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{card.title}</h4>
                      <p className="card-text">{card.description}</p>
                      <Link href={card.link} className="btn btn-primary">Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="org-structure bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Organizational Structure</h2>
                <p>Levy Mwanawasa Medical University operates through a well-defined organizational structure</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="org-chart p-4 bg-white shadow-sm">
                <div className="text-center">
                  <p className="fw-bold">This chart illustrates the governance and management structure of the University:</p>
                  <div className="d-flex justify-content-center mt-4">
                    <ul className="list-unstyled text-center">
                      <li className="p-3 border mb-3 bg-primary text-white">University Council</li>
                      <li className="p-3 border mb-3">Vice Chancellor</li>
                      <li>
                        <div className="d-flex justify-content-center gap-3 mt-3">
                          <div className="p-3 border bg-secondary text-white" style={{ width: '180px' }}>Deputy Vice Chancellor</div>
                          <div className="p-3 border bg-secondary text-white" style={{ width: '180px' }}>University Senate</div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-center gap-3 mt-3">
                          <div className="p-3 border" style={{ width: '150px' }}>Academic Deans</div>
                          <div className="p-3 border" style={{ width: '150px' }}>Administrative Heads</div>
                          <div className="p-3 border" style={{ width: '150px' }}>Finance Director</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-5">
                <Link href="/contact" className="btn btn-primary">Contact University Administration</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
