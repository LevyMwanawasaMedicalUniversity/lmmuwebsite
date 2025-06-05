"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function UndergraduatePage(): React.ReactNode {
  const schoolPrograms = [
    {
      id: 1,
      name: "School of Medicine and Clinical Sciences",
      color: "#2a76dd",
      programs: {
        degree: [
          "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
          "Bachelor of Science in Clinical Sciences",
          "Bachelor of Science in Clinical Anaesthesia",
          "Bachelor of Science in Clinical Ophthalmology",
          "Bachelor of Science in Optometry",
          "Bachelor of Science in Mental Health and Clinical Psychiatry",
          "Bachelor of Dental Surgery"
        ],
        advancedDiploma: [
          "Adv. Dip Clinical Ophthalmology",
          "Adv. Dip Clinical Anaesthesia"
        ],
        diploma: [
          "Dip in Dental Therapy",
          "Dip in Dental Technology",
          "Diploma in Optometry Technology",
          "Dip in Clinical Medical Sciences - General",
          "Diploma in Clinical Medical Sciences- General (Kabwe Campus)",
          "Dip in Clinical Medical Sciences - Psychiatry",
          "Dip in Optometry",
          "Dip in Emergency Medical Care"
        ],
        certificate: [
          "Cert. in Community Health Assistants (HIV Medics)",
          "Cert. in Dental Assisting",
          "Cert. in Emergency Medical Care"
        ]
      }
    },
    {
      id: 2,
      name: "School of Nursing",
      color: "#1e5bb0",
      programs: {
        degree: [
          "Bachelor of Science in Registered Nursing",
          "Bachelor of Science in Ophthalmic Nursing",
          "Bachelor of Science in Midwifery",
          "Bachelor of Science in Public Health Nursing",
          "Bachelor of Science in Mental Health Nursing"
        ],
        advancedDiploma: [
          "Adv. Dip Ophthalmic Nursing"
        ],
        diploma: [
          "Diploma in Registered General Nursing",
          "Diploma in Midwifery",
          "Diploma in Public Health Nursing",
          "Diploma in Mental Health Nursing",
          "Diploma in Oncology Nursing"
        ]
      }
    },
    {
      id: 3,
      name: "School of Public Health and Environmental Sciences",
      color: "#07294d",
      programs: {
        degree: [
          "Bachelor Of Science In Public Health",
          "Bachelor Of Science In Public Health Nutrition",
          "Bachelor Of Science In Environmental Health"
        ],
        diploma: [
          "Diploma In Environmental Health",
          "Diploma Public Health"
        ],
        certificate: [
          "Certificate Hiv Community Health Workers"
        ]
      }
    },
    {
      id: 4,
      name: "School of Health Sciences",
      color: "#2a76dd",
      programs: {
        degree: [
          "Bachelor Of Science In Clinical Nutrition And Dietetics",
          "Bachelor Of Arts In General Counselling",
          "Bachelor Of Pharmacy",
          "Bachelor Of Science In Radiography",
          "Bachelor Of Physiotherapy",
          "Bachelor Of Science In Speech And Language Therapy"
        ],
        diploma: [
          "Diploma Prostetics & Orthotics",
          "Diploma In General Counselling"
        ]
      }
    },
    {
      id: 5,
      name: "Institute of Basic and Biomedical Sciences",
      color: "#1e5bb0",
      programs: {
        degree: [
          "Bachelor Of Science In Biomedical Sciences"
        ],
        diploma: [
          "Diploma in Biomedical Sciences"
        ]
      }
    },
    {
      id: 6,
      name: "Open and Distance Learning (ODL)",
      color: "#07294d",
      programs: {
        degree: [
          "Bachelor of Science in Public Health",
          "Bachelor of Science in Environmental Health"
        ],
        diploma: [
          "Diploma in Medical/Surgical Nursing",
          "Diploma in Clinical Medical Sciences General",
          "Diploma in Clinical Medical Sciences Psychiatry",
          "Diploma in Environmental Health Sciences"
        ]
      }
    }
  ];

  return (
    <React.Fragment>
      {/* Page banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
          <Image 
            src="/assets/images/academics/undergrad-banner.jpg" 
            alt="Undergraduate Programs" 
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="overlay position-absolute w-100 h-100 top-0" 
            style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.7))' }}>
          </div>
        </div>
        <div className="container position-relative" style={{ marginTop: '-150px' }}>
          <div className="row">
            <div className="col-12">
              <motion.div 
                className="hero-content bg-white shadow-lg rounded-3 p-4 p-md-5 text-center position-relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="mb-3">Undergraduate Programs</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/academics">Academics</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Undergraduate Programs</li>
                  </ol>
                </nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-5 section-spacing">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="pe-lg-4"
              >
                <h2 className="section-title mb-4">Undergraduate Programs</h2>
                <div className="background-content">
                  <p className="mb-4">
                    Levy Mwanawasa Medical University offers a variety of undergraduate programs 
                    designed to prepare students for successful careers in healthcare and medical sciences. 
                    Our programs combine theoretical knowledge with hands-on practical experience.
                  </p>
                  <p className="mb-0">
                    With state-of-the-art facilities and experienced faculty members, our undergraduate 
                    programs provide students with the skills and knowledge needed to excel in their 
                    chosen healthcare fields. We emphasize competency-based training through our network 
                    of academic health complexes across Zambia.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-5 mt-lg-0"
              >
                <div className="rounded-3 overflow-hidden shadow-sm">
                  <Image
                    src="/assets/images/academics/undergrad-students.jpg"
                    alt="Undergraduate Students"
                    width={600}
                    height={400}
                    className="img-fluid w-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Programs Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-3">Our Degree Programs</h2>
                <p className="mb-0">Explore our comprehensive range of undergraduate programs offered across different schools and faculties at LMMU.</p>
              </motion.div>
            </div>
          </div>

          {/* Program Cards by School/Faculty */}
          <div className="row g-4">
            {schoolPrograms.map((school, index) => (
              <div className="col-6 mb-5" key={school.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="card border-0 shadow-sm">
                    <div className="card-header py-3" 
                      style={{ 
                        backgroundColor: school.color,
                        borderBottom: 'none' 
                      }}
                    >
                      <h3 className="card-title mb-0 text-white">{school.name}</h3>
                    </div>
                    <div className="card-body p-4">
                      {/* Degree Programs */}
                      {school.programs.degree && school.programs.degree.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-3">Degree Programmes:</h4>
                          <ul className="list-unstyled">
                            {school.programs.degree.map((program, i) => (
                              <li key={i} className="mb-2">
                                <i className="fa fa-graduation-cap me-2 text-primary"></i>
                                {program}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Advanced Diploma Programs */}
                      {school.programs.advancedDiploma && school.programs.advancedDiploma.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-3">Advanced Diploma Courses:</h4>
                          <ul className="list-unstyled">
                            {school.programs.advancedDiploma.map((program, i) => (
                              <li key={i} className="mb-2">
                                <i className="fa fa-certificate me-2 text-success"></i>
                                {program}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Diploma Programs */}
                      {school.programs.diploma && school.programs.diploma.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-3">Diploma Courses:</h4>
                          <ul className="list-unstyled">
                            {school.programs.diploma.map((program, i) => (
                              <li key={i} className="mb-2">
                                <i className="fa fa-certificate me-2 text-info"></i>
                                {program}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Certificate Programs */}
                      {school.programs.certificate && school.programs.certificate.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-3">Certificate Courses:</h4>
                          <ul className="list-unstyled">
                            {school.programs.certificate.map((program, i) => (
                              <li key={i} className="mb-2">
                                <i className="fa fa-certificate me-2 text-warning"></i>
                                {program}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: '#07294d' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-white mb-4">Ready to Begin Your Healthcare Career?</h2>
                <p className="text-white-50 mb-4">
                  Take the first step towards a rewarding career in healthcare by applying to one of our undergraduate programs at Levy Mwanawasa Medical University.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/apply" className="btn btn-lg btn-light px-4 py-2">
                    Apply Now
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
