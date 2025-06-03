"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SchoolData } from './SchoolPageTypes';
import { ProgrammeCards } from '@/components/schools/ProgrammeCards';
import { FeeStructure } from '@/components/schools/FeeStructure';

// Client-only animation wrapper to avoid hydration mismatch
const ClientAnimation = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }
  
  return <>{children}</>;
};

interface SchoolPageProps {
  schoolData: SchoolData;
}

export default function SchoolPage({ schoolData }: SchoolPageProps): React.ReactNode {
  // Simple fade-in animation variant for sections
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Animation variant for staggered children
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="school-page">
      {/* Hero Banner */}
      <section className="hero-section relative overflow-hidden bg-blue-900 text-white">
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75"></div>
        
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center mb-4 text-sm md:text-base">
                <Link href="/" className="text-blue-200 hover:text-white transition">Home</Link>
                <span className="mx-2"><i className="fa fa-chevron-right text-xs"></i></span>
                <Link href="/academics" className="text-blue-200 hover:text-white transition">Academics</Link>
                <span className="mx-2"><i className="fa fa-chevron-right text-xs"></i></span>
                <Link href="/academics/schools" className="text-blue-200 hover:text-white transition">Schools</Link>
                <span className="mx-2"><i className="fa fa-chevron-right text-xs"></i></span>
                <span className="text-white">{schoolData.name}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{schoolData.name}</h1>
              <p className="text-base md:text-lg text-blue-100 mb-8">{schoolData.tagline}</p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#academic-programmes" 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 flex items-center"
                >
                  Academic Programmes <i className="fa fa-arrow-right ml-2"></i>
                </Link>
                <Link 
                  href="#fee-structure" 
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium rounded-md transition duration-300 flex items-center"
                >
                  Fee Structure <i className="fa fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </motion.div>
            
            {/* School Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 transform lg:rotate-1 hover:rotate-0 transition-all duration-500">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={schoolData.heroImage} 
                    alt={`${schoolData.name} hero image`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Overview with Director */}
      <section className="overview-section py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Director's Profile */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="dean-profile bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center">
                <div className="w-48 h-48 mt-8 mb-4 relative rounded-full overflow-hidden border-4 border-blue-200 shadow">
                  <Image
                    src={schoolData.director.imageSrc}
                    alt={`Director of ${schoolData.shortName}`}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-1">{schoolData.director.name}</h3>
                  <p className="text-blue-700 font-medium mb-2">{schoolData.director.title} – {schoolData.name}</p>
                  <p className="text-gray-700">{schoolData.director.qualifications}</p>
                </div>
              </div>
            </motion.div>
            
            {/* School Overview */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <p className="text-lg mb-4">
                  {schoolData.overview}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <i className="fa fa-graduation-cap text-blue-600 text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold">Our Mission</h3>
                  </div>
                  <p>{schoolData.mission}</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <i className="fa fa-eye text-blue-600 text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold">Our Vision</h3>
                  </div>
                  <p>{schoolData.vision}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Academic Programmes Section */}
      <section id="academic-programmes" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Academic Programmes</h2>
            <div className="mx-auto mb-8 h-1.5 w-20 rounded bg-blue-600"></div>
            <p className="mx-auto max-w-3xl text-lg text-gray-700">
              Explore the academic programmes offered by the {schoolData.name}. Our programmes are designed to provide students with the knowledge and skills needed for successful careers in healthcare.
            </p>
          </motion.div>

          {/* Using ProgrammeCards component */}
          <ProgrammeCards 
            programmes={schoolData.programmes}
            fadeIn={fadeIn}
            staggerContainer={staggerContainer}
          />
        </div>
      </section>
      
      {/* Fee Structure */}
      <section id="fee-structure" className="fee-structure-section py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Fee Structure</h2>
            <div className="mx-auto mb-8 h-1.5 w-20 rounded bg-blue-600"></div>
            
            {/* Fee Structure Component */}
            <FeeStructure feeStructure={schoolData.feeStructure} />
            
            <div className="bg-blue-50 p-6 rounded-xl mt-8">
              <p className="text-gray-700">
                <strong>Note:</strong> Fees are subject to change. Please contact the university's finance department for the most up-to-date information.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facilities Section - Optional */}
      {schoolData.facilities && (
        <section className="facilities-section py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Facilities</h2>
              <div className="mx-auto mb-8 h-1.5 w-20 rounded bg-blue-600"></div>
              <p className="mx-auto max-w-3xl text-lg text-gray-700">
                The {schoolData.name} is equipped with state-of-the-art facilities to support teaching and learning
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {schoolData.facilities.map((facility, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <motion.div 
                    className="facility-card text-center p-6 bg-white rounded-xl shadow-md h-full"
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="icon mb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                        <i className={`fa ${facility.icon} text-blue-600 text-2xl`}></i>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-3">{facility.title}</h4>
                    <p className="text-gray-600">{facility.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
