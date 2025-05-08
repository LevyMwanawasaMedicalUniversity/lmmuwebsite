"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalSlides = 3;
  const intervalRef = useRef(null);
  
  const slides = [
    {
      image: "/assets/images/slider/s-1.png",
      title: "Fourth LMMU Graduation Ceremony 2024",
      subtitle: "Celebrating Excellence in Healthcare Education",
      text: "Join us in celebrating the accomplishments of our graduates as they embark on their journey to transform healthcare in Zambia and beyond.",
      link: "/graduation",
      linkText: "View Gallery",
      overlay: 6
    },
    {
      image: "/assets/images/slider/s-2.jpeg",
      title: "LMMU University Teaching Hospital",
      subtitle: "State-of-the-Art Healthcare Training",
      text: "The LMMU-UTH is the largest purpose-built health training institution in Zambia, providing world-class clinical education and patient care.",
      link: "/uth",
      linkText: "Learn More",
      overlay: 6
    },
    {
      image: "/assets/images/slider/s-3.jpeg",
      title: "Excellence in Medical Education",
      subtitle: "Shaping the Future of Healthcare",
      text: "A leading center of health professions education, training and research in Zambia and beyond, committed to excellence and innovation.",
      link: "/university",
      linkText: "Discover LMMU",
      overlay: 6
    }
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-slider position-relative" ref={sliderRef} style={{ minHeight: '600px', marginTop: '-1px' }}>
      <div className="slider-container overflow-hidden position-relative" style={{ height: '600px' }}>
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide-item position-relative ${currentSlide === index ? 'active' : ''}`}
            style={{ 
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: currentSlide === index ? 'block' : 'none'
            }}
          >
            <div className="slide-img position-absolute w-100 h-100" 
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.7)',
                top: 0,
                left: 0
              }} 
            />
            
            <div className="container position-relative h-100 d-flex align-items-center" style={{ zIndex: 2 }}>
              <div className="row">
                <div className="col-lg-8 col-md-10">
                  <div className="slide-content text-white" 
                    style={{ 
                      animation: currentSlide === index ? 'fadeInUp 1s ease-out' : 'none'
                    }}
                  >
                    <span className="text-primary text-uppercase fw-bold mb-3 d-block">
                      {slide.subtitle}
                    </span>
                    <h1 className="display-4 fw-bold mb-4">{slide.title}</h1>
                    <p className="lead mb-5">{slide.text}</p>
                    <Link 
                      href={slide.link} 
                      className="btn btn-primary btn-lg px-4 py-2"
                    >
                      {slide.linkText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="slider-controls position-absolute bottom-0 w-100 mb-4" style={{ zIndex: 10 }}>
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              {slides.map((_, index) => (
                <button 
                  key={index} 
                  className={`slider-dot mx-2 ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: currentSlide === index ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button 
        className="slider-nav prev position-absolute start-0 top-50 translate-middle-y bg-transparent border-0 text-white ms-4"
        onClick={() => goToSlide((currentSlide - 1 + totalSlides) % totalSlides)}
        style={{ zIndex: 10, fontSize: '2rem' }}
        aria-label="Previous slide"
      >
        <i className="fa fa-chevron-left"></i>
      </button>

      <button 
        className="slider-nav next position-absolute end-0 top-50 translate-middle-y bg-transparent border-0 text-white me-4"
        onClick={() => goToSlide((currentSlide + 1) % totalSlides)}
        style={{ zIndex: 10, fontSize: '2rem' }}
        aria-label="Next slide"
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </section>
  );
}