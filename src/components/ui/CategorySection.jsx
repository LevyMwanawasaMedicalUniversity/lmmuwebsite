"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function CategorySection() {
  const academicPrograms = [
    {
      id: 1,
      title: "School of Medicine & Clinical Sciences",
      description: "Comprehensive medical programs including MBChB and specialized clinical training.",
      icon: "/assets/images/all-icon/ctg-1.jpeg",
      link: "/academics/schools/somcs",
      color: "#2a76dd"
    },
    {
      id: 2,
      title: "School of Health Sciences",
      description: "Programs in nursing, pharmacy, physiotherapy, and allied health professions.",
      icon: "/assets/images/all-icon/ctg-2.jpg",
      link: "/academics/schools/soh",
      color: "#17a2b8"
    },
    {
      id: 3,
      title: "School of Public Health & Environmental Sciences",
      description: "Focused on public health, epidemiology, and environmental health sciences.",
      icon: "/assets/images/all-icon/ctg-3.jpg",
      link: "/academics/schools/sophes",
      color: "#28a745"
    },
    {
      id: 4,
      title: "Institute of Basic and Biomedical Sciences",
      description: "Advanced research and education in basic and biomedical sciences.",
      icon: "/assets/images/all-icon/ctg-4.jpg",
      link: "/academics/ibbs",
      color: "#6f42c1"
    },
    {
      id: 5,
      title: "School of Nursing",
      description: "Programs in nursing education and research.",
      icon: "/assets/images/all-icon/ctg-5.png",
      link: "/academics/schools/ns",
      color: "#dc3545"
    }
  ];
  
  return (
    <section id="category-part" className="py-5">
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-lg-6">
            <h6 className="text-primary text-uppercase fw-bold">Academic Programs</h6>
            <h2 className="display-5 fw-bold">Our Schools & Faculties</h2>
            <p className="lead">Discover our specialized programs designed to prepare healthcare professionals for the future</p>
          </div>
        </div>
        
        <div className="academic-programs">
          <div className="row">
            {academicPrograms.map((program) => (
              <div className="col-lg-4 col-md-6 mb-4" key={program.id}>
                <div className="program-card h-100 bg-white rounded shadow-sm overflow-hidden transition-all hover-shadow">
                  <div className="program-icon p-4" style={{ backgroundColor: program.color }}>
                    <div className="icon-wrapper bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                      style={{ width: '80px', height: '80px', padding: '15px' }}
                    >
                      <Image 
                        src={program.icon} 
                        alt={program.title} 
                        width={50} 
                        height={50} 
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="program-content p-4 text-center">
                    <h4 className="mb-3">{program.title}</h4>
                    <p className="text-muted mb-4">{program.description}</p>
                    <Link 
                      href={program.link} 
                      className="btn btn-outline-primary btn-sm rounded-pill px-4"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}