import React from 'react';
import Slider from '@/components/ui/Slider';
import CategorySection from '@/components/ui/CategorySection';
import NewsSection from '@/components/ui/NewsSection';
import ApplySection from '@/components/ui/ApplySection';
// Import the new UI components we created
import StatsSection from '@/components/ui/StatsSection.jsx';
import TestimonialsSection from '@/components/ui/TestimonialsSection.jsx';
import UpcomingEventsSection from '@/components/ui/UpcomingEventsSection.jsx';

export const metadata = {
  title: 'Levy Mwanawasa Medical University - Excellence in Medical Education',
  description: 'Levy Mwanawasa Medical University is a leading health professions education, training and research institution in Zambia and beyond.',
};

export default function HomePage(): React.ReactNode {
  return (
    <main className="home-page">
      {/* Hero Slider Section */}
      <Slider />
      
      {/* Quick Links/Stats Section */}
      {/* <StatsSection /> */}
      
      {/* Academic Programs Section */}
      <section className="container py-3 my-md-2">
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto text-center">
            <h6 className="text-primary text-uppercase fw-bold">Excellence in Education</h6>
            <h2 className="display-5 fw-bold mb-4">Academic Excellence at LMMU</h2>
            <p className="lead text-muted">
              Discover our comprehensive range of programs designed to prepare healthcare professionals for the challenges of modern medicine.
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <CategorySection />
      </section>
      {/* Application Section with Gradient Background */}
      <div className="bg-gradient-primary-to-secondary py-2 my-0">
        <ApplySection />
      </div>
      
      {/* News and Events Section */}
      <section className="container py-5">
        <div className="row mb-4">
          <div className="col-lg-8">
            <h6 className="text-primary text-uppercase fw-bold">Stay Informed</h6>
            <h2 className="display-5 fw-bold">Latest News & Events</h2>
          </div>
          <div className="col-lg-4 d-flex align-items-center justify-content-lg-end">
            <a href="/news" className="btn btn-outline-primary">View All News</a>
          </div>
        </div>
        <NewsSection />
      </section>
      
      {/* Upcoming Events Section */}
      {/* <div className="bg-light py-5 my-5">
        <UpcomingEventsSection />
      </div> */}
      
      {/* Testimonials Section */}
      {/* <section className="container py-5 my-5">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h6 className="text-primary text-uppercase fw-bold">Success Stories</h6>
            <h2 className="display-5 fw-bold">What Our Students Say</h2>
          </div>
        </div>
        <TestimonialsSection />
      </section> */}
    </main>
  );
}