import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'University Council | Levy Mwanawasa Medical University',
  description: 'Learn about the University Council, the governing body of Levy Mwanawasa Medical University responsible for policy and strategic direction.',
};

export default function UniversityCouncilPage(): React.ReactNode {
  const councilMembers = [
    {
      id: 1,
      name: "Dr. Robert Mulenga",
      position: "Chairperson",
      organization: "Ministry of Health Representative",
      image: "/assets/images/council-chair.jpg",
    },
    {
      id: 2,
      name: "Prof. John Doe",
      position: "Vice Chancellor",
      organization: "LMMU, Ex-officio Member",
      image: "/assets/images/vc-portrait.jpg",
    },
    {
      id: 3,
      name: "Ms. Sarah Banda",
      position: "Council Member",
      organization: "Ministry of Education Representative",
      image: "/assets/images/council-member1.jpg",
    },
    {
      id: 4,
      name: "Dr. Michael Chanda",
      position: "Council Member",
      organization: "Healthcare Industry Representative",
      image: "/assets/images/council-member2.jpg",
    },
    {
      id: 5,
      name: "Prof. Ruth Mwale",
      position: "Council Member",
      organization: "Academic Representative",
      image: "/assets/images/council-member3.jpg",
    },
    {
      id: 6,
      name: "Mr. James Lungu",
      position: "Council Member",
      organization: "Business Sector Representative",
      image: "/assets/images/council-member4.jpg",
    },
    {
      id: 7,
      name: "Dr. Grace Mumba",
      position: "Council Member",
      organization: "Medical Association Representative",
      image: "/assets/images/council-member5.jpg",
    },
    {
      id: 8,
      name: "Mr. Charles Phiri",
      position: "Council Member",
      organization: "Community Representative",
      image: "/assets/images/council-member6.jpg",
    },
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-9.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>University Council</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/administration">Administration</Link></li>
                  <li>University Council</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Council Overview */}
      <section className="council-overview pt-70 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-30">
                <h2>About the University Council</h2>
                <p>
                  The University Council is the supreme governing body of Levy Mwanawasa Medical University. 
                  It is responsible for the overall governance, policy formulation, and strategic direction 
                  of the institution. The Council ensures that the University achieves its mission of 
                  providing high-quality education, fostering research excellence, and contributing to 
                  healthcare development.
                </p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6">
              <div className="council-info mb-30">
                <h4>Role and Responsibilities</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Formulate policies and strategic plans for the University</li>
                  <li className="list-group-item">Ensure effective management of the University's resources</li>
                  <li className="list-group-item">Approve annual budgets and financial statements</li>
                  <li className="list-group-item">Oversee the appointment of senior university officials</li>
                  <li className="list-group-item">Establish and maintain academic standards</li>
                  <li className="list-group-item">Monitor and evaluate the University's performance</li>
                  <li className="list-group-item">Ensure compliance with legal and regulatory requirements</li>
                </ul>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="council-structure mb-30">
                <h4>Council Structure</h4>
                <p>
                  The University Council consists of members appointed from various sectors, including 
                  government, healthcare industry, academic community, and the public. This diverse 
                  composition ensures that the Council benefits from a wide range of perspectives and expertise.
                </p>
                <div className="council-composition mt-4">
                  <h5>Composition</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Chairperson (appointed by the Minister of Health)</li>
                    <li className="list-group-item">Vice Chancellor (Ex-officio member)</li>
                    <li className="list-group-item">Representatives from Ministry of Health</li>
                    <li className="list-group-item">Representatives from Ministry of Education</li>
                    <li className="list-group-item">Representatives from healthcare professional bodies</li>
                    <li className="list-group-item">Representatives from business and industry</li>
                    <li className="list-group-item">Representatives from the academic community</li>
                    <li className="list-group-item">Community representatives</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Council Members */}
      <section className="council-members bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Current Council Members</h2>
                <p>Meet the distinguished individuals who serve on the University Council</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {councilMembers.map((member) => (
              <div className="col-lg-3 col-md-6" key={member.id}>
                <div className="member-card mb-30">
                  <div className="card">
                    <div className="member-image">
                      <Image src={member.image} alt={member.name} width={250} height={250} className="card-img-top" />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{member.name}</h5>
                      <p className="position mb-1">{member.position}</p>
                      <p className="organization text-muted small">{member.organization}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Council Committees */}
      <section className="council-committees py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Council Committees</h2>
                <p>The University Council operates through the following committees</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="committee-title">Finance and General Purposes Committee</h4>
                    <p>
                      Oversees financial management, budget planning, resource allocation, 
                      and general administrative matters of the University.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="committee-title">Academic Affairs Committee</h4>
                    <p>
                      Reviews and recommends policies related to academic programs, 
                      curriculum development, and quality assurance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="committee-title">Human Resources Committee</h4>
                    <p>
                      Oversees matters related to staffing, appointments, promotions, 
                      and staff welfare policies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="committee-title">Audit and Risk Management Committee</h4>
                    <p>
                      Monitors financial controls, risk management processes, 
                      and compliance with regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="committee-title">Infrastructure and Development Committee</h4>
                    <p>
                      Oversees the planning and implementation of physical infrastructure 
                      projects and campus development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="committee-title">Student Affairs Committee</h4>
                    <p>
                      Addresses matters related to student welfare, discipline, 
                      and overall student experience.
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
