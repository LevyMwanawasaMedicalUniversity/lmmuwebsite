"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function CategorySection() {
  const scrollRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const autoScrollIntervalRef = useRef(null);
  const currentScrollPos = useRef(0);
  const [scrollDirection, setScrollDirection] = useState('right'); // Track scrolling direction
  
  // Check if scroll buttons should be shown
  useEffect(() => {
    const checkScrollWidth = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setShowScrollButtons(scrollWidth > clientWidth);
      }
    };
    
    checkScrollWidth();
    window.addEventListener('resize', checkScrollWidth);
    return () => window.removeEventListener('resize', checkScrollWidth);
  }, []);

  // Setup continuous one-direction carousel scrolling
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const startAutoScroll = () => {
      if (!autoScrollEnabled) return;
      
      // Find the width of a single card + its margin
      const firstCard = scrollRef.current.querySelector('.program-card');
      if (!firstCard) return;
      
      const cardContainer = firstCard.parentElement;
      const cardWidth = cardContainer.offsetWidth;
      
      autoScrollIntervalRef.current = setInterval(() => {
        if (!scrollRef.current) return;

        const { scrollLeft } = scrollRef.current;
        
        // Scroll one card at a time for full visibility
        if (scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10) {
          // Smooth scroll to the next card
          scrollRef.current.scrollTo({
            left: scrollLeft + cardWidth,
            behavior: 'smooth'
          });
        } else {
          // When we reach the end, quickly reset to beginning (not visible to user)
          scrollRef.current.scrollLeft = 0;
          // Then immediately continue the smooth scrolling from the beginning
          setTimeout(() => {
            scrollRef.current.scrollTo({
              left: cardWidth,
              behavior: 'smooth'
            });
          }, 50);
        }
      }, 4000); // Auto-scroll every 4 seconds for better viewing
    };
    
    // Start auto scrolling after 3 seconds initial delay
    const initialDelay = setTimeout(() => {
      startAutoScroll();
    }, 3000);
    
    // Pause auto-scroll when user interacts with the scroll
    const handleScrollInteraction = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
        
        // Resume auto-scroll after 8 seconds of inactivity
        setTimeout(() => {
          startAutoScroll();
        }, 8000);
      }
    };
    
    const container = scrollRef.current;
    container.addEventListener('mousedown', handleScrollInteraction);
    container.addEventListener('touchstart', handleScrollInteraction);
    container.addEventListener('wheel', handleScrollInteraction);
    
    return () => {
      clearTimeout(initialDelay);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (container) {
        container.removeEventListener('mousedown', handleScrollInteraction);
        container.removeEventListener('touchstart', handleScrollInteraction);
        container.removeEventListener('wheel', handleScrollInteraction);
      }
    };
  }, [autoScrollEnabled]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
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
    <section id="category-part" className="py-5 bg-light">
      <div className="container-fluid px-md-5">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-8 text-center">
            <h6 className="text-uppercase fw-bold" style={{ color: '#ffc600' }}>Academic Programs</h6>
            <h2 className="display-5 fw-bold mb-3">Our Schools & Faculties</h2>
            <p className="lead">Discover our specialized programs designed to prepare healthcare professionals for the future of medicine and public health.</p>
          </div>
        </div>
        
        <div className="position-relative academic-programs">
          {showScrollButtons && (
            <>
              <button 
                className="position-absolute start-0 top-50 translate-middle-y z-index-1 btn btn-circle btn-light shadow-sm border" 
                onClick={scrollLeft}
                style={{ width: '40px', height: '40px', left: '-5px' }}
                aria-label="Scroll left"
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <button 
                className="position-absolute end-0 top-50 translate-middle-y z-index-1 btn btn-circle btn-light shadow-sm border" 
                onClick={scrollRight}
                style={{ width: '40px', height: '40px', right: '-5px' }}
                aria-label="Scroll right"
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </>
          )}
          
          <div 
            className="d-flex flex-nowrap overflow-auto pb-4 pt-2 px-md-4 px-2 justify-content-center" 
            ref={scrollRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {academicPrograms.map((program) => (
              <div 
                className="flex-shrink-0 mx-md-3 mx-2" 
                key={program.id}
                style={{ width: '350px' }}
              >
                <div className="program-card h-100 bg-white rounded shadow overflow-hidden transition-all hover-shadow border">
                  <div className="position-relative program-image" style={{ height: '180px' }}>
                    <div className="position-absolute w-100 h-100" style={{ backgroundColor: program.color, opacity: 0.9 }}></div>
                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                      <div 
                        className="rounded-circle bg-white d-flex align-items-center justify-content-center shadow-lg position-relative school-icon" 
                        style={{ width: '130px', height: '130px', zIndex: 2 }}
                      >
                        <Image 
                          src={program.icon} 
                          alt={program.title} 
                          width={100} 
                          height={100} 
                          className="img-fluid rounded-circle p-2"
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 text-center">
                    <h4 className="fw-bold mb-3" style={{ minHeight: '60px' }}>{program.title}</h4>
                    <p className="text-muted mb-4">{program.description}</p>
                    <Link href={program.link} className="main-btn">
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