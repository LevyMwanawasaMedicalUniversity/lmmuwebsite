import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'University Senate | Levy Mwanawasa Medical University',
  description: 'Learn about the University Senate, the academic authority responsible for academic affairs at Levy Mwanawasa Medical University.',
};

export default function UniversitySenatePage(): React.ReactNode {
  const senateMembers = [
    {
      id: 1,
      position: "Chairperson",
      title: "Vice Chancellor",
      description: "The Vice Chancellor chairs the Senate and provides overall academic leadership."
    },
    {
      id: 2,
      position: "Deputy Chairperson",
      title: "Deputy Vice Chancellor",
      description: "The Deputy Vice Chancellor assists the Vice Chancellor in academic leadership and Senate duties."
    },
    {
      id: 3,
      position: "Secretary",
      title: "Registrar",
      description: "The Registrar serves as the Secretary to the Senate, recording proceedings and implementing decisions."
    },
    {
      id: 4,
      position: "Member",
      title: "Dean, School of Medicine & Clinical Sciences",
      description: "Represents the School of Medicine & Clinical Sciences in the Senate."
    },
    {
      id: 5,
      position: "Member",
      title: "Dean, School of Health Sciences",
      description: "Represents the School of Health Sciences in the Senate."
    },
    {
      id: 6,
      position: "Member",
      title: "Dean, School of Public Health & Environmental Sciences",
      description: "Represents the School of Public Health & Environmental Sciences in the Senate."
    },
    {
      id: 7,
      position: "Member",
      title: "Director of Research",
      description: "Represents research interests in the Senate."
    },
    {
      id: 8,
      position: "Member",
      title: "Director of Quality Assurance",
      description: "Represents quality assurance in the Senate."
    },
    {
      id: 9,
      position: "Member",
      title: "Heads of Academic Departments",
      description: "Represent their respective academic departments in the Senate."
    },
    {
      id: 10,
      position: "Member",
      title: "Elected Academic Staff Representatives",
      description: "Elected members representing academic staff in the Senate."
    },
    {
      id: 11,
      position: "Member",
      title: "Student Representatives",
      description: "Represent student interests in the Senate."
    }
  ];

  const senateFunctions = [
    {
      id: 1,
      title: "Academic Programs",
      description: "Review and approve new academic programs, curriculum revisions, and program discontinuation.",
      icon: "fa-graduation-cap"
    },
    {
      id: 2,
      title: "Academic Policies",
      description: "Develop and implement academic policies, regulations, and standards.",
      icon: "fa-book"
    },
    {
      id: 3,
      title: "Examinations",
      description: "Oversee examination processes, regulations, and academic assessment standards.",
      icon: "fa-pencil-alt"
    },
    {
      id: 4,
      title: "Research",
      description: "Promote and coordinate research activities and approve research policies.",
      icon: "fa-flask"
    },
    {
      id: 5,
      title: "Student Affairs",
      description: "Address academic matters related to student admissions, progression, and graduation.",
      icon: "fa-users"
    },
    {
      id: 6,
      title: "Quality Assurance",
      description: "Establish and monitor quality assurance mechanisms for academic programs.",
      icon: "fa-check-circle"
    }
  ];

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner pt-200 pb-100" style={{ backgroundImage: "url('/assets/images/page-banner-10.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-banner-content">
                <h2>University Senate</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/administration">Administration</Link></li>
                  <li>University Senate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senate Overview */}
      <section className="senate-overview pt-70 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title pb-30">
                <h2>About the University Senate</h2>
                <p>
                  The University Senate is the principal academic authority of Levy Mwanawasa Medical University. 
                  It is responsible for regulating and overseeing all academic matters of the institution, 
                  including teaching, research, and examinations. The Senate plays a crucial role in ensuring 
                  the maintenance of high academic standards and the promotion of academic excellence.
                </p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-12">
              <div className="senate-info mb-30">
                <div className="card">
                  <div className="card-body">
                    <h4>Powers and Functions</h4>
                    <p>
                      The Senate is empowered to make regulations and take measures to promote the academic 
                      work of the University in teaching, research, and learning. It advises the University 
                      Council on academic matters and implements the University's academic policies.
                    </p>
                    
                    <div className="senate-functions mt-5">
                      <div className="row">
                        {senateFunctions.map((function_item) => (
                          <div className="col-lg-4 col-md-6 mb-4" key={function_item.id}>
                            <div className="function-item d-flex">
                              <div className="icon me-3">
                                <i className={`fa ${function_item.icon} fa-2x text-primary`}></i>
                              </div>
                              <div className="content">
                                <h5>{function_item.title}</h5>
                                <p>{function_item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senate Composition */}
      <section className="senate-composition bg-light py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Senate Composition</h2>
                <p>The University Senate comprises key academic and administrative leaders</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-12">
              <div className="composition-table">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>Position in Senate</th>
                        <th>Title</th>
                        <th>Role Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {senateMembers.map((member) => (
                        <tr key={member.id}>
                          <td><strong>{member.position}</strong></td>
                          <td>{member.title}</td>
                          <td>{member.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Senate Committees */}
      <section className="senate-committees py-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb-45">
                <h2>Senate Committees</h2>
                <p>The Senate operates through specialized committees to effectively fulfill its responsibilities</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">Academic Programs Committee</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      Reviews proposals for new academic programs, curriculum changes, 
                      and academic regulations before submission to the full Senate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">Research and Publications Committee</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      Promotes research activities, reviews research proposals, 
                      and coordinates research publications and conferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">Examinations Committee</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      Oversees examination procedures, appointment of examiners, 
                      and ensures integrity of the examination process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">Library Committee</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      Advises on library policies, acquisition of resources, 
                      and development of library services to support academic programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">Quality Assurance Committee</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      Develops and implements quality assurance frameworks 
                      and processes for academic programs and teaching.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="committee-card mb-30">
                <div className="card h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">Student Affairs Committee</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      Addresses academic matters related to student welfare, 
                      student petitions, and academic appeals.
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
