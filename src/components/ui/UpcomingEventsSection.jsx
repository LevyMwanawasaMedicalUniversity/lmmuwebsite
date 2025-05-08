"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UpcomingEventsSection() {
  const events = [
    {
      id: 1,
      title: "2025 Orientation Week",
      date: "January 15-20, 2025",
      location: "Main Campus",
      image: "/images/events/orientation.jpg",
      description: "Welcome program for new students joining LMMU for the 2025 academic year.",
      link: "/events/orientation-2025"
    },
    {
      id: 2,
      title: "Annual Research Symposium",
      date: "February 5-6, 2025",
      location: "LMMU Conference Center",
      image: "/images/events/research-symposium.jpg",
      description: "Showcase of research projects by faculty and students with keynote speakers.",
      link: "/events/research-symposium-2025"
    },
    {
      id: 3,
      title: "Healthcare Innovation Workshop",
      date: "March 12, 2025",
      location: "School of Medicine",
      image: "/images/events/innovation-workshop.jpg",
      description: "Interactive workshop on healthcare innovation and technology.",
      link: "/events/innovation-workshop-2025"
    }
  ];

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-lg-8">
          <h6 className="text-primary text-uppercase fw-bold">Mark Your Calendar</h6>
          <h2 className="display-5 fw-bold">Upcoming Events</h2>
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-lg-end">
          <Link href="/events" className="btn btn-outline-primary">View All Events</Link>
        </div>
      </div>

      <div className="row">
        {events.map((event) => (
          <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
            <div className="event-card h-100 bg-white rounded shadow-sm overflow-hidden">
              <div className="event-image position-relative">
                <Image 
                  src={event.image} 
                  alt={event.title}
                  width={400}
                  height={225}
                  className="img-fluid w-100"
                  // Fallback image if the event image is not available
                  onError={(e) => {
                    e.currentTarget.src = "/images/events/default-event.jpg";
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
