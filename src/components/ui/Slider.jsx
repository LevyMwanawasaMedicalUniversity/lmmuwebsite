"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalSlides = 3;
  
  const slides = [
    {
      image: "/assets/images/slider/s-1.png",
      title: "FOURTH LMMU GRADUATION CEREMONY 2024",
      link: "/graduation",
      linkText: "View Gallery",
      overlay: 4
    },
    {
      image: "/assets/images/slider/s-2.jpeg",
      title: "LMMU-UTH",
      text: "THE LMMU-UTH IS THE LARGEST PURPOSE-BUILT HEALTH TRAINING INSTUTUTION IN ZAMBIA.",
      link: "/uth",
      linkText: "Learn More",
      overlay: 4
    },
    {
      image: "/assets/images/slider/s-3.jpeg",
      title: "LMMU",
      text: "A LEADING CENTRE OF HEALTH PROFESSIONS, EDUCATION, TRAINING AND RESEARCH IN ZAMBIA AND BEYOND",
      link: "/university",
      linkText: "Learn More",
      overlay: 4
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="slider-part" className="slider-active" ref={sliderRef}>
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`single-slider bg_cover pt-150 ${currentSlide === index ? 'active' : 'hidden'}`} 
          style={{ 
            backgroundImage: `url(${slide.image})`,
            display: currentSlide === index ? 'block' : 'none'
          }} 
          data-overlay={slide.overlay}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-7 col-lg-9">
                <div className="slider-cont">
                  <h1 data-animation="bounceInLeft" data-delay="1s">{slide.title}</h1>
                  {slide.text && (
                    <p data-animation="fadeInUp" data-delay="1.3s">{slide.text}</p>
                  )}
                  <ul>
                    <li>
                      <Link 
                        href={slide.link} 
                        className="main-btn"
                        data-animation="fadeInUp" 
                        data-delay="1.6s"
                      >
                        {slide.linkText}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={currentSlide === index ? 'active' : ''}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}