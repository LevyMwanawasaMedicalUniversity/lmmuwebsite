"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * An image carousel component that automatically cycles through images
 * 
 * @param {Object} props
 * @param {Array<{url: string, caption: string}>} props.images - Array of image objects with url and optional caption
 * @param {number} props.interval - Time between image transitions in milliseconds (default: 5000ms)
 * @param {boolean} props.autoPlay - Whether to autoplay the carousel (default: true)
 * @param {number} props.height - Height of the carousel (default: 500px)
 * @param {number} props.currentIndex - External control of current index (optional)
 * @param {Function} props.onIndexChange - Callback when index changes (optional)
 */
export default function ImageCarousel({ 
  images, 
  interval = 5000, 
  autoPlay = true, 
  height = 500, 
  currentIndex: externalIndex,
  onIndexChange 
}) {  // Add custom styles for fullscreen modal
  useEffect(() => {
    // Inject custom CSS for improved transitions and interactions
    const style = document.createElement('style');
    style.textContent = `
      .carousel-image {
        transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
      .carousel-image:hover {
        transform: scale(1.02);
      }
      .fullscreen-backdrop {
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.85) !important;
      }
      .carousel-control {
        background: transparent;
        border: none;
        transition: all 0.3s ease;
        opacity: 0.7;
      }
      .carousel-control:hover {
        opacity: 1;
      }
      .carousel-control-icon {
        background: rgba(0, 0, 0, 0.5);
        border: 2px solid #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
      }
      .carousel-control:hover .carousel-control-icon {
        transform: scale(1.1);
        background: rgba(0, 0, 0, 0.7);
      }
      .carousel-button {
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        border: none;
        transform: translateY(0);
      }
      .carousel-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      }
      .carousel-indicators button {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
      }
      .carousel-indicators button:hover {
        transform: scale(1.2);
      }
      .image-counter {
        backdrop-filter: blur(4px);
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 30px;
        padding: 5px 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      .fullscreen-controls {
        opacity: 0.7;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        border: 2px solid rgba(255, 255, 255, 0.1);
      }
      .fullscreen-controls:hover {
        opacity: 1;
        transform: scale(1.05);
      }
      .caption-container {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      .fullscreen-image-counter {
        background: rgba(0, 0, 0, 0.6);
        border-radius: 30px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }
      .expand-hint {
        transition: all 0.3s ease;
        opacity: 0.7;
      }      .carousel-image:hover .expand-hint {
        opacity: 1;
        transform: scale(1.1);
      }
      @keyframes fadeInOut {
        0% { opacity: 0.7; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-5px); }
        100% { opacity: 0.7; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [internalIndex, setInternalIndex] = useState(0);
  
  // Use external index if provided, otherwise use internal state
  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  
  // Function to update the index and call the callback if provided
  const updateIndex = useCallback((newIndex) => {
    if (externalIndex === undefined) {
      setInternalIndex(newIndex);
    }
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  }, [externalIndex, onIndexChange]);
  
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timer = useRef(null);
  
  // If there's only one or zero images, don't render carousel controls
  const showControls = images.length > 1;
  
  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // When entering fullscreen, prevent body scrolling
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Function to go to next slide
  const nextSlide = useCallback(() => {
    updateIndex((currentIndex + 1) % images.length);
  }, [images.length, currentIndex, updateIndex]);

  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    updateIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [images.length, currentIndex, updateIndex]);
  
  // Function to go to a specific slide
  const goToSlide = (index) => {
    updateIndex(index);
    
    // Reset autoplay timer when manually changing slides
    if (isPlaying) {
      clearInterval(timer.current);
      startAutoplayTimer();
    }
  };
  
  // Toggle autoplay
  const toggleAutoPlay = () => {
    if (isPlaying) {
      // Stop autoplay
      if (timer.current) clearInterval(timer.current);
    } else {
      // Start autoplay
      startAutoplayTimer();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Function to start autoplay timer
  const startAutoplayTimer = useCallback(() => {
    if (isPlaying && images.length > 1) {
      timer.current = setInterval(() => {
        nextSlide();
      }, interval);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isPlaying, interval, nextSlide, images.length]);

  // Set up autoplay effect
  useEffect(() => {
    const cleanup = startAutoplayTimer();
    return cleanup;
  }, [startAutoplayTimer]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ' || event.key === 'Space') {
        event.preventDefault(); // Prevent page scrolling
        toggleAutoPlay();
      } else if (event.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      } else if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide, isFullscreen]);

  // If no images or only one image, return simple image display
  if (!images || images.length === 0) {
    return null;
  }
  
  if (images.length === 1) {
    return (
      <>
        <div 
          className="position-relative rounded-4 overflow-hidden mb-5 carousel-image" 
          style={{ height: `${height}px`, cursor: 'pointer' }}
          onClick={toggleFullscreen}
          title="Click to view in fullscreen"
        >
          <Image 
            src={images[0].url} 
            alt={images[0].caption || 'Post image'}
            fill
            className="img-fluid object-cover"
            priority
          />
          {images[0].caption && (
            <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-50">
              <p className="text-white m-0">{images[0].caption}</p>
            </div>
          )}
            {/* Fullscreen hint indicator */}
          <div className="position-absolute top-0 end-0 m-3 bg-dark bg-opacity-50 rounded-circle p-2 expand-hint">
            <i className="fas fa-expand text-white"></i>
          </div>
        </div>
          {/* Fullscreen Modal */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div 
              key="fullscreen-single" 
              className="fixed-top h-100 w-100 d-flex align-items-center justify-content-center fullscreen-backdrop" 
              style={{ zIndex: 1050 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="position-relative h-100 w-100 d-flex align-items-center justify-content-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Image 
                  src={images[0].url}
                  alt={images[0].caption || 'Post image'}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                />
                
                {images[0].caption && (
                  <div className="position-absolute bottom-0 start-0 end-0 p-4 caption-container">
                    <p 
                      className="text-white text-center m-0 fs-5"
                      style={{ 
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                        fontWeight: 500,
                        maxWidth: '800px',
                        margin: '0 auto !important'
                      }}
                    >
                      {images[0].caption}
                    </p>
                  </div>
                )}
                
                <button
                  className="position-absolute top-0 end-0 m-4 btn btn-danger rounded-circle fullscreen-controls"
                  onClick={toggleFullscreen}
                  style={{ 
                    zIndex: 1051, 
                    width: '48px', 
                    height: '48px',
                    background: 'rgba(220, 53, 69, 0.85)',
                    backdropFilter: 'blur(3px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}
                  aria-label="Close fullscreen"
                  title="Close fullscreen (Esc key)"
                >
                  <i className="fa fa-times fa-lg"></i>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };
  
  // Track slide direction
  const [[page, direction], setPage] = useState([0, 0]);

  // Custom versions of next/prev that track direction
  const paginate = (newDirection) => {
    if (newDirection > 0) {
      setPage([page + 1, newDirection]);
      nextSlide();
    } else {
      setPage([page - 1, newDirection]);
      prevSlide();
    }
  };
  
  // Handle swipe gestures
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      paginate(1);
    } else if (offset.x > swipeThreshold) {
      paginate(-1);
    }
  };
  
  return (
    <>
      {/* Main carousel component */}
      <div 
        className="position-relative rounded-4 overflow-hidden mb-5" 
        style={{ height: `${height}px` }}
      >
        {/* Main carousel content */}
        <div className="carousel-inner h-100">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              className="position-absolute w-100 h-100 carousel-image"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
              drag={showControls ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              onClick={toggleFullscreen}
              style={{ cursor: 'pointer' }}
              title="Click to view in fullscreen"
            >
              <Image 
                src={images[currentIndex].url} 
                alt={images[currentIndex].caption || `Image ${currentIndex + 1}`}
                fill
                className="img-fluid object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={80}
              />              {images[currentIndex].caption && (
                <div className="position-absolute bottom-0 start-0 end-0 p-3 caption-container">
                  <p className="text-white m-0" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}>
                    {images[currentIndex].caption}
                  </p>
                </div>
              )}
              {/* Fullscreen hint indicator */}
              <div className="position-absolute top-0 end-0 m-3 bg-dark bg-opacity-50 rounded-circle p-2 expand-hint">
                <i className="fas fa-expand text-white"></i>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Regular carousel controls */}
        {showControls && (
          <>            <button 
              className="carousel-control carousel-control-prev position-absolute top-50 start-0 translate-middle-y ms-3" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering fullscreen
                paginate(-1);
              }}
              aria-label="Previous image"
              title="Previous image (Left arrow key)"
              style={{ zIndex: 5 }}
            >
              <span className="carousel-control-prev-icon carousel-control-icon bg-primary p-3 rounded-circle shadow" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            
            <button 
              className="carousel-control carousel-control-next position-absolute top-50 end-0 translate-middle-y me-3" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering fullscreen
                paginate(1);
              }}
              aria-label="Next image"
              title="Next image (Right arrow key)"
              style={{ zIndex: 5 }}
            >
              <span className="carousel-control-next-icon carousel-control-icon bg-primary p-3 rounded-circle shadow" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>            {/* Play/Pause Button */}
            <button
              className={`position-absolute top-0 end-0 m-3 btn ${isPlaying ? 'btn-danger' : 'btn-success'} rounded-circle carousel-button`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering fullscreen
                toggleAutoPlay();
              }}
              style={{ 
                zIndex: 10, 
                width: '42px', 
                height: '42px', 
                marginRight: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
                border: '2px solid rgba(255, 255, 255, 0.5)'
              }}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              title={isPlaying ? 'Pause slideshow (Space key)' : 'Play slideshow (Space key)'}
            >
              <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>{/* Indicators/dots for direct navigation */}
            <div className="carousel-indicators position-absolute start-50 translate-middle-x mb-4" style={{ zIndex: 5 }}>
              <div className="bg-dark bg-opacity-50 px-3 py-2 rounded-pill shadow">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`rounded-circle mx-1 ${index === currentIndex ? 'active bg-primary border border-light' : 'bg-light'}`}
                    style={{ 
                      width: index === currentIndex ? '14px' : '10px', 
                      height: index === currentIndex ? '14px' : '10px',  
                      border: index === currentIndex ? '2px solid white' : 'none',
                      opacity: index === currentIndex ? 1 : 0.7,
                      boxShadow: index === currentIndex ? '0 0 5px rgba(255, 255, 255, 0.5)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={`Go to image ${index + 1}`}
                    title={`Go to image ${index + 1}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering fullscreen
                      goToSlide(index);
                    }}
                  />
                ))}
              </div>
            </div>            {/* Current image indicator */}
            <div className="position-absolute top-0 start-0 m-3 px-3 py-1 image-counter rounded-pill text-white" style={{ zIndex: 5 }}>
              <span style={{ fontWeight: 600 }}>
                <i className="fa fa-image me-2"></i> 
                <span className="me-1">{currentIndex + 1}</span>/
                <span className="ms-1" style={{ opacity: 0.8 }}>{images.length}</span>
              </span>
            </div>
              {/* Swipe hint for mobile */}
            <div 
              className="position-absolute bottom-0 start-50 translate-middle-x mb-5 text-white px-3 py-2 rounded-pill d-none d-md-block"
              style={{
                zIndex: 5,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'fadeInOut 3s ease-in-out infinite'
              }}
            >
              <small>
                <i className="fa fa-hand-point-right me-2"></i> 
                <span style={{ fontWeight: 500 }}>Swipe or use arrow keys to navigate</span>
              </small>
            </div>
          </>
        )}
      </div>
      
      {/* Fullscreen Modal Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            key="fullscreen-modal"
            className="fixed-top vh-100 vw-100 bg-dark d-flex align-items-center justify-content-center fullscreen-backdrop" 
            style={{ zIndex: 1050 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Fullscreen image content */}
            <div className="position-relative h-100 w-100">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={`fullscreen-${currentIndex}`}
                  className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                  drag={showControls ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={handleDragEnd}
                >
                  <Image 
                    src={images[currentIndex].url} 
                    alt={images[currentIndex].caption || `Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                    sizes="100vw"
                    quality={90}
                  />                  {images[currentIndex].caption && (
                    <div className="position-absolute bottom-0 start-0 end-0 p-4 caption-container">
                      <p className="text-white text-center m-0 fs-5" style={{ 
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                        fontWeight: 500,
                        maxWidth: '800px',
                        margin: '0 auto !important'
                      }}>
                        {images[currentIndex].caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              
              {/* Fullscreen controls */}
              <div className="container-fluid h-100 position-relative">                {/* Close button */}
                <button
                  className="position-absolute top-0 end-0 m-4 btn btn-danger rounded-circle shadow fullscreen-controls"
                  onClick={toggleFullscreen}
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    zIndex: 1051,
                    background: 'rgba(220, 53, 69, 0.85)',
                    backdropFilter: 'blur(3px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}
                  aria-label="Exit fullscreen"
                  title="Exit fullscreen (Esc key)"
                >
                  <i className="fa fa-times fa-lg"></i>
                </button>
                
                {showControls && (
                  <>                    {/* Fullscreen navigation controls */}
                    <button 
                      className="position-absolute top-50 start-0 translate-middle-y ms-4 btn btn-dark rounded-circle fullscreen-controls"
                      onClick={(e) => {
                        e.stopPropagation();
                        paginate(-1);
                      }}
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        zIndex: 1051,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(5px)'
                      }}
                      aria-label="Previous image"
                      title="Previous image (Left arrow key)"
                    >
                      <i className="fa fa-chevron-left fa-2x"></i>
                    </button>
                    
                    <button 
                      className="position-absolute top-50 end-0 translate-middle-y me-4 btn btn-dark rounded-circle fullscreen-controls"
                      onClick={(e) => {
                        e.stopPropagation();
                        paginate(1);
                      }}
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        zIndex: 1051,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(5px)'
                      }}
                      aria-label="Next image"
                      title="Next image (Right arrow key)"
                    >
                      <i className="fa fa-chevron-right fa-2x"></i>
                    </button>
                      {/* Play/Pause Button in fullscreen */}
                    <button
                      className={`position-absolute top-0 end-0 me-5 mt-4 pe-4 btn ${isPlaying ? 'btn-danger' : 'btn-success'} rounded-circle shadow fullscreen-controls`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAutoPlay();
                      }}
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        marginRight: '60px', 
                        zIndex: 1051,
                        background: isPlaying ? 'rgba(220, 53, 69, 0.85)' : 'rgba(40, 167, 69, 0.85)',
                        backdropFilter: 'blur(3px)', 
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                      }}
                      aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                      title={isPlaying ? 'Pause slideshow (Space key)' : 'Play slideshow (Space key)'}
                    >
                      <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'} fa-lg`}></i>
                    </button>
                      {/* Fullscreen image counter */}
                    <div 
                      className="position-absolute top-0 start-0 m-4 px-3 py-2 rounded-pill text-white fullscreen-image-counter" 
                      style={{ zIndex: 1051 }}
                    >
                      <span><i className="fa fa-image me-2"></i> <strong>{currentIndex + 1}</strong> / {images.length}</span>
                    </div>
                    
                    {/* Fullscreen indicators/dots */}
                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4" style={{ zIndex: 1051 }}>
                      <div className="d-flex">
                        {images.map((_, index) => (
                          <button
                            key={`fs-${index}`}
                            className={`rounded-circle mx-1 ${index === currentIndex ? 'bg-primary' : 'bg-light bg-opacity-50'}`}
                            style={{ 
                              width: index === currentIndex ? '16px' : '12px', 
                              height: index === currentIndex ? '16px' : '12px',
                              border: index === currentIndex ? '2px solid white' : 'none',
                              transition: 'all 0.3s ease'
                            }}
                            aria-label={`Go to image ${index + 1}`}
                            title={`Go to image ${index + 1}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToSlide(index);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
