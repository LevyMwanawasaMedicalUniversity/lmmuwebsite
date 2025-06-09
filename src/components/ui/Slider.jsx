"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QuickLinks from './QuickLinks';
import { motion } from 'framer-motion';

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalSlides = 3;
  const intervalRef = useRef(null);
  
  const slides = [
    {
      image: "/assets/images/slider/s-1.png",
      title: "Shaping the Future of Healthcare",
      subtitle: "Excellence in Medical Education",
      text: "Join a world-class institution dedicated to transforming healthcare through education, research, and innovation.",
      link: "/about",
      linkText: "Discover LMMU",
      overlay: 4
    },
    {
      image: "/assets/images/slider/s-2.jpeg",
      title: "World-Class Facilities",
      subtitle: "State-of-the-Art Teaching Hospital",
      text: "Experience hands-on learning in our modern teaching hospital, equipped with the latest medical technology.",
      link: "/facilities",
      linkText: "Tour Our Campus",
      overlay: 4
    },
    {
      image: "/assets/images/slider/s-3.jpeg",
      title: "Your Journey Starts Here",
      subtitle: "Join Our Healthcare Community",
      text: "Begin your path to becoming a healthcare professional at one of Zambia's leading medical universities.",
      link: "/admissions",
      linkText: "Apply Now",
      overlay: 4
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
    <div className="hero-section position-relative">
      <div className="hero-slider position-relative vh-100">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide-item position-absolute w-100 h-100 ${
              currentSlide === index ? 'active' : ''
            }`}
            style={{
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            <div className="slide-image position-absolute w-100 h-100">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                quality={90}
              />
              <div
                className="overlay position-absolute w-100 h-100"
                style={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,${
                    slide.overlay / 10
                  }), rgba(7,41,77,${(slide.overlay + 1) / 10}))`,
                }}
              />
            </div>
            <div className="container h-100 position-relative z-1">
              <div className="row h-100" style={{ alignItems: 'flex-start', paddingTop: 'clamp(10vh, 12vh, 15vh)' }}>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="slide-content text-center"
                  >
                    <h1 className="slide-title fw-bold mb-2">{slide.title}</h1>
                    <h2 className="slide-subtitle fw-light mb-3">{slide.subtitle}</h2>
                    <p className="slide-text mb-4">{slide.text}</p>
                    <Link
                      href={slide.link}
                      className="btn btn-lg btn-outline-light rounded-pill px-4"
                    >
                      {slide.linkText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="slide-controls position-absolute bottom-0 start-0 w-100 py-4">
          <div className="container">
            <div className="d-flex align-items-center">
              <div className="slide-dots me-auto">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`slide-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="slide-arrows">
                <button
                  className="btn btn-link text-white me-3"
                  onClick={() => goToSlide((currentSlide - 1 + totalSlides) % totalSlides)}
                  aria-label="Previous slide"
                >
                  <i className="bi bi-arrow-left"></i>
                </button>
                <button
                  className="btn btn-link text-white"
                  onClick={() => goToSlide((currentSlide + 1) % totalSlides)}
                  aria-label="Next slide"
                >
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>      <div className="quick-links-overlay position-absolute w-100" style={{ bottom: '0', transform: 'translateY(0)' }}>
        <QuickLinks />
      </div>

      <style jsx global>{`
        .hero-section {
          height: 100vh;
          min-height: 700px;
          margin-bottom: 0px;
          padding-bottom: 0;
          position: relative;
        }

        .slide-item {
          pointer-events: none;
        }

        .slide-item.active {
          pointer-events: all;
        }

        .slide-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .slide-text {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          margin-bottom: 1.5rem;
          max-width: 600px;
          line-height: 1.4;
        }
        
        @media (max-width: 768px) {
          .slide-text {
            margin-bottom: 1rem;
            max-width: 100%;
          }
        }

        .slide-controls {
          position: absolute;
          bottom: 120px;
          left: 0;
          width: 100%;
          padding: 1rem 0;
          z-index: 10;
        }
        
        @media (max-width: 768px) {
          .slide-controls {
            bottom: 80px;
          }
        }

        .slide-content {
          position: absolute;
          top: 40%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          z-index: 5;
          color: #fff;
          padding: 0 5%;
        }
        
        @media (min-width: 768px) {
          .slide-content {
            padding: 0 15%;
            top: 45%;
          }
        }

        .slide-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          background: transparent;
          margin: 0 6px;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .slide-dot.active {
          background: white;
          transform: scale(1.2);
        }

        .quick-links-overlay {
          z-index: 10;
          padding-bottom: 0;
          margin-top: 0;
        }

        .quick-link-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 8px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-top: 4px solid var(--bs-primary);
        }

        .quick-link-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .icon-wrapper {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .quick-link-icon {
          filter: brightness(0) invert(1);
        }
      `}</style>
    </div>
  );
}