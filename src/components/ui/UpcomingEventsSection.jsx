"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function UpcomingEventsSection() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const hoverEffect = {
    rest: { scale: 1, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  const events = [
    {
      id: 1,
      title: "2025 Orientation Week",
      date: "January 15-20, 2025",
      location: "Main Campus",
      image: "/assets/images/events/orientation.jpg",
      description: "Welcome program for new students joining LMMU for the 2025 academic year.",
      link: "/events/orientation-2025"
    },
    {
      id: 2,
      title: "Annual Research Symposium",
      date: "February 5-6, 2025",
      location: "LMMU Conference Center",
      image: "/assets/images/events/research-symposium.jpg",
      description: "Showcase of research projects by faculty and students with keynote speakers.",
      link: "/events/research-symposium-2025"
    },
    {
      id: 3,
      title: "Healthcare Innovation Workshop",
      date: "March 12, 2025",
      location: "School of Medicine",
      image: "/assets/images/events/innovation-workshop.jpg",
      description: "Interactive workshop on healthcare innovation and technology.",
      link: "/events/innovation-workshop-2025"
    }
  ];

  return (
    <motion.div 
      className="container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.div className="row mb-5" variants={fadeIn}>
        <div className="col-lg-8">
          <motion.h6 
            className="text-primary text-uppercase fw-bold" 
            style={{ letterSpacing: "2px" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Mark Your Calendar
          </motion.h6>
          <h2 className="display-5 fw-bold position-relative">
            Upcoming Events
            <motion.span 
              className="position-absolute"
              style={{ 
                height: "4px", 
                background: "var(--bs-primary)", 
                borderRadius: "2px", 
                bottom: "-10px", 
                left: 0
              }}
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </h2>
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-lg-end">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/events" className="btn btn-outline-primary px-4 py-2" style={{ borderRadius: "30px", borderWidth: "2px" }}>
              View All Events
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="row" variants={staggerContainer}>
        {events.map((event) => (
          <motion.div 
            className="col-lg-4 col-md-6 mb-4" 
            key={event.id}
            variants={fadeIn}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div 
              className="event-card h-100 bg-white rounded overflow-hidden"
              variants={hoverEffect}
            >
              <div className="event-image position-relative">
                <Image 
                  src={event.image} 
                  alt={event.title}
                  width={400}
                  height={225}
                  className="img-fluid w-100"
                  // Fallback image if the event image is not available
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/events/default-event.jpg";
                  }}
                />
                <div className="event-date position-absolute top-0 start-0 bg-primary text-white p-2 m-3 rounded">
                  <i className="fa fa-calendar me-2"></i>{event.date}
                </div>
              </div>
              <div className="event-content p-4">
                <h4 className="event-title mb-3">
                  <Link href={event.link} className="text-decoration-none text-dark hover-primary">
                    {event.title}
                  </Link>
                </h4>
                <div className="event-meta d-flex mb-3">
                  <div className="location me-4">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    {event.location}
                  </div>
                </div>
                <p className="event-description mb-3">{event.description}</p>
                <Link href={event.link} className="btn btn-sm btn-outline-primary">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
