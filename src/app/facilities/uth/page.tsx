'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function UTHPage() {
  return (
    <React.Fragment>
      {/* Page banner */}
      <section className="hero-section position-relative">
        <div className="hero-image-container" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
          <Image 
            src="/assets/images/facilities/uth/page-banner.svg" 
            alt="Levy Mwanawasa University Teaching Hospital" 
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="overlay position-absolute w-100 h-100 top-0" 
            style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.4), rgba(7, 41, 77, 0.3))' }}>
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
                whileHover={{ boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)' }}
              >
                <motion.h1 
                  className="mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Levy Mwanawasa University Teaching Hospital
                </motion.h1>
                <motion.nav 
                  aria-label="breadcrumb"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link href="/university">The University</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Levy Mwanawasa University Teaching Hospital</li>
                  </ol>
                </motion.nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief Information Section */}
      <section className="pt-70 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <motion.div 
                className="mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4">Brief Information on LMUTH</h2>
                <div className="about-content">
                  <p className="mb-4">
                    The Levy Mwanawasa University Teaching Hospital (LMUTH) is situated along the Great East Road, Chainama Hills Area in Lusaka. 
                    The hospital has approximately 906 medical and administrative personnel. Among the staff are about 396 nurses and around 146 medical doctors. 
                    LMUTH functions as a Provincial hospital with 3rd level services.
                  </p>
                  <p className="mb-4">
                    The hospital is part of the newly established Levy Mwanawasa Medical University (LMMU) which was founded as a Public University on 22nd May, 2018. 
                    LMMU is an amalgamation of four premier health institutions namely, LMUTH, Chainama College of Health Sciences, Dental Training School, 
                    Chainama Hills Hospital and the University itself.
                  </p>
                  <p>
                    The merger of these leading health training and service institutions is aimed at consolidating the efficient delivery of high-quality 
                    health care services and the education of health professionals in Zambia.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4">Mission Statement</h2>
                <div className="about-content">
                  <p className="mb-4">
                    The provision of health services at the hospital is centred on its Mission Statement which is: 
                    "A health institution dedicated to providing quality patient care with unrelenting attention to clinical excellence, 
                    patient safety and an unparalleled commitment to ensure the very best healthcare for those we serve".
                  </p>
                  <p className="font-weight-bold">
                    Vision: Making Zambia "A nation of Health and productive people".
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4">Catchment Area</h2>
                <div className="about-content">
                  <p>
                    LMUTH's has a catchment area of eight (08) Districts. These are Chilanga, Chirundu, Chongwe, Kafue, Luangwa, Lusaka, 
                    Rufunsa and Shibuyunji with an estimated population of more than 3 million people (CSO's projection report, 2018).
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4">Official Opening</h2>
                <div className="about-content">
                  <p className="mb-4">
                    The hospital was officially opened on 8th August, 2011 as Lusaka General Hospital. Later in the year, 
                    the hospital was renamed Levy Mwanawasa General Hospital in memory of Zambia's third President, 
                    His Excellency, Mr. Levy Patrick Mwanawasa. On June 6, 2017, the hospital was upgraded to a teaching hospital 
                    and renamed Levy Mwanawasa University Teaching Hospital in line with its expanded functions.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="section-subtitle mb-3">Bed Space</h3>
                <div className="about-content">
                  <p className="mb-4">
                    At inception, the hospital had 150 bed spaces. However, with the ever increasing population of Lusaka 
                    and the sharp increase in the disease burden, the demand for health services at the institution has gone up, 
                    inescapably culminating in an increase of bed space to the current 239.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="section-subtitle mb-3">Expansion</h3>
                <div className="about-content">
                  <p className="mb-4">
                    With its on-going robust programme of constructing, rehabilitating and upgrading health facilities across the country, 
                    the Zambian Government with support from the Chinese Government is currently expanding LMUTH from the current 239 to an 826 bed 
                    capacity modern health facility. The New state-of-the-art LMUTH brings on board specialized medical services with avant-garde 
                    medical equipment suitable for a practicum site for College and University students.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pt-40 pb-70 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <motion.div 
                className="text-center mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4">Services Offered</h2>
                <p className="lead">
                  The institution offers specialized and general services under four major Clinical disciplines namely, 
                  Paediatrics, Obstetrics and Gynaecology, Internal Medicine and Surgery. Each of these departments is headed 
                  by a specialist with unrivalled experience in their fields. These clinical departments are backed by high-performance 
                  support Units of Laboratory, Radiology (x-ray), Physiotherapy, Pharmacy, Environmental Health, Biomedicine and other 
                  related paramedical disciplines.
                </p>
                <p>
                  The hospital has other administrative units that equally offer incomparable services towards the running of the institution. 
                  These include: Public Relations, Social Work, Human Resources, Accounts, Engineering, Health Information, Purchasing, 
                  Security, Information Technology (IT) and Audit.
                </p>
              </motion.div>

              <div className="row mt-5">
                <div className="col-lg-6 mb-4">
                  <motion.div 
                    className="card h-100 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  >
                    <div className="card-body">
                      <h3 className="card-title mb-3">Internal Medicine</h3>
                      <ul className="list-unstyled">
                        <li className="mb-2">✓ An active 24-hour out-patient and In-Patient service</li>
                        <li className="mb-2">✓ State-of-the-art gastrointestinal endoscopy for both diagnosis and therapy</li>
                        <li className="mb-2">✓ Specialist out-patient medical clinics</li>
                        <li className="mb-2">✓ TB and HIV clinics</li>
                        <li className="mb-2">✓ Premium medical clinics</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <div className="col-lg-6 mb-4">
                  <motion.div 
                    className="card h-100 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  >
                    <div className="card-body">
                      <h3 className="card-title mb-3">Paediatrics and Child Health</h3>
                      <ul className="list-unstyled">
                        <li className="mb-2">✓ An active 24-hour out-patient and In-Patient service</li>
                        <li className="mb-2">✓ Neonatology</li>
                        <li className="mb-2">✓ Sickle Cell Clinic</li>
                        <li className="mb-2">✓ General Paediatrics</li>
                        <li className="mb-2">✓ Padiatrics Antiretroviral Therapy (ART) Clinic</li>
                        <li className="mb-2">✓ Pediatrics' Nutrition</li>
                        <li className="mb-2">✓ Neonatal Vaccination</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <div className="col-lg-6 mb-4">
                  <motion.div 
                    className="card h-100 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  >
                    <div className="card-body">
                      <h3 className="card-title mb-3">Obstetrics and Gynaecology</h3>
                      <ul className="list-unstyled">
                        <li className="mb-2">✓ An active 24-hour out-patient and In-Patient service</li>
                        <li className="mb-2">✓ Antenatal, Delivery and Postnatal</li>
                        <li className="mb-2">✓ Obs and Gynae Clinic</li>
                        <li className="mb-2">✓ Leep Clinic</li>
                        <li className="mb-2">✓ Maternal and Child Health Services</li>
                        <li className="mb-2">✓ General Gynae Surgical Services including laparascopy surgery</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <div className="col-lg-6 mb-4">
                  <motion.div 
                    className="card h-100 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  >
                    <div className="card-body">
                      <h3 className="card-title mb-3">Surgery</h3>
                      <ul className="list-unstyled">
                        <li className="mb-2">✓ An active 24-hour out-patient and In-Patient service</li>
                        <li className="mb-2">✓ Neurosurgery (Brain and Spine Surgery)</li>
                        <li className="mb-2">✓ Orthopaedic Trauma Surgery</li>
                        <li className="mb-2">✓ Ear Nose and Throat (ENT) Surgery</li>
                        <li className="mb-2">✓ Urology Surgery</li>
                        <li className="mb-2">✓ Ophthalmology</li>
                        <li className="mb-2">✓ Dental Services</li>
                        <li className="mb-2">✓ General Surgery: Minimally Invasive or Key Hole Surgery</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services Section */}
      <section className="pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Support Services
              </motion.h2>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <motion.div 
                className="card h-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <div className="card-body">
                  <h3 className="card-title mb-3">Radiology</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Computerized Tomography (CT Scan)</li>
                    <li className="mb-2">✓ Plain X-Rays</li>
                    <li className="mb-2">✓ Electrocardiography (ECG)</li>
                    <li className="mb-2">✓ Ultrasound (Sonography)</li>
                    <li className="mb-2">✓ Prostate Screening</li>
                    <li className="mb-2">✓ Obstetrics</li>
                    <li className="mb-2">✓ Abdominal Scan</li>
                    <li className="mb-2">✓ Doppler</li>
                    <li className="mb-2">✓ ECHO</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <motion.div 
                className="card h-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <div className="card-body">
                  <h3 className="card-title mb-3">Laboratory</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Phlebotomy</li>
                    <li className="mb-2">✓ Molecular Lab services</li>
                    <li className="mb-2">✓ Viral Load</li>
                    <li className="mb-2">✓ Gene xpert (TB)</li>
                    <li className="mb-2">✓ Haematology and Immunology</li>
                    <li className="mb-2">✓ Biochemistry</li>
                    <li className="mb-2">✓ Blood Transfusion Medicine</li>
                    <li className="mb-2">✓ Microbiology</li>
                    <li className="mb-2">✓ Premium Lab Services</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <motion.div 
                className="card h-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <div className="card-body">
                  <h3 className="card-title mb-3">Other Support Services</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Physiotherapy</li>
                    <li className="mb-2">✓ Pharmacy</li>
                    <li className="mb-2">✓ Environmental Health</li>
                    <li className="mb-2">✓ Public Relations</li>
                    <li className="mb-2">✓ Social Work</li>
                    <li className="mb-2">✓ Human Resources</li>
                    <li className="mb-2">✓ Accounts</li>
                    <li className="mb-2">✓ Engineering</li>
                    <li className="mb-2">✓ Information Technology (IT)</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="pt-60 pb-60 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-3">Contributing to Healthcare in Zambia</h2>
                <p className="mb-0">
                  Since inception, the hospital has been cardinal in contributing to the reduction of government expense of referring 
                  patients abroad for treatment. LMUTH has built capacity in various areas of specialization that has greatly contributed 
                  to the mitigation of the expense of treating patients outside the country by offering these services locally.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-4 col-md-5 text-md-end mt-4 mt-md-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link href="/university" className="btn btn-light btn-lg">
                  Learn More About LMMU
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
