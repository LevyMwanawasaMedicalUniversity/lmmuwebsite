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
}) {
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
  }, [externalIndex, onIndexChange]);  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timer = useRef(null);
  
  // If there's only one or zero images, don't render carousel controls
  const showControls = images.length > 1;
  
  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };// Function to go to next slide
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
      <div className="position-relative rounded-4 overflow-hidden mb-5" style={{ height: `${height}px` }}>
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
      </div>
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
    <div 
      className={`position-relative rounded-4 overflow-hidden mb-5 ${isFullscreen ? 'fixed-top vh-100 vw-100 rounded-0 z-3' : ''}`} 
      style={{ height: isFullscreen ? '100vh' : `${height}px` }}
    >
      {/* Main carousel content */}
      <div className="carousel-inner h-100">
        <AnimatePresence initial={false} custom={direction}>          <motion.div
            key={currentIndex}
            className="position-absolute w-100 h-100"
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
              className={`img-fluid ${isFullscreen ? 'object-contain' : 'object-cover'}`}
              priority
              sizes={isFullscreen ? "100vw" : "(max-width: 768px) 100vw, 1200px"}
              quality={isFullscreen ? 90 : 80}
            />
            {images[currentIndex].caption && (
              <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-50">
                <p className={`text-white m-0 ${isFullscreen ? 'text-center fs-5' : ''}`}>
                  {images[currentIndex].caption}
                </p>
              </div>
            )}
            
            {/* Fullscreen overlay */}
            {isFullscreen && (
              <div 
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"
                style={{ zIndex: -1 }}
              ></div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>      {/* Controls for next/prev navigation */}
      {showControls && (
        <>
          <button 
            className="carousel-control carousel-control-prev" 
            onClick={() => paginate(-1)}
            aria-label="Previous image"
            title="Previous image (Left arrow key)"
          >
            <span className="carousel-control-prev-icon bg-primary p-3 rounded-circle opacity-75 shadow" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          
          <button 
            className="carousel-control carousel-control-next" 
            onClick={() => paginate(1)}
            aria-label="Next image"
            title="Next image (Right arrow key)"
          >
            <span className="carousel-control-next-icon bg-primary p-3 rounded-circle opacity-75 shadow" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>          {/* Play/Pause Button */}
          <button
            className={`position-absolute top-0 end-0 m-3 btn btn-sm ${isPlaying ? 'btn-danger' : 'btn-success'} rounded-circle shadow`}
            onClick={toggleAutoPlay}
            style={{ zIndex: 10, width: '40px', height: '40px', marginRight: isFullscreen ? '60px' : '12px' }}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            title={isPlaying ? 'Pause slideshow (Space key)' : 'Play slideshow (Space key)'}
          >
            <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          
          {/* Fullscreen Button */}
          <button
            className={`position-absolute top-0 end-0 m-3 btn btn-sm btn-dark rounded-circle shadow`}
            onClick={toggleFullscreen}
            style={{ zIndex: 10, width: '40px', height: '40px' }}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'View in fullscreen'}
            title={isFullscreen ? 'Exit fullscreen (Esc key)' : 'View in fullscreen'}
          >
            <i className={`fa ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>

          {/* Indicators/dots for direct navigation */}
          <div className="carousel-indicators position-absolute start-50 translate-middle-x mb-3">
            {images.map((_, index) => (
              <button
                key={index}
                className={`rounded-circle mx-1 ${index === currentIndex ? 'active bg-primary border border-light' : 'bg-light bg-opacity-75'}`}
                style={{ 
                  width: index === currentIndex ? '14px' : '10px', 
                  height: index === currentIndex ? '14px' : '10px',  
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to image ${index + 1}`}
                title={`Go to image ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          {/* Current image indicator */}
          <div className="position-absolute top-0 start-0 m-3 px-2 py-1 bg-dark bg-opacity-50 rounded text-white shadow-sm">
            <small><i className="fa fa-image me-1"></i> {currentIndex + 1} / {images.length}</small>
          </div>
            {/* Swipe hint for mobile */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-5 text-white bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-none d-md-block">
            <small><i className="fa fa-hand-point-right me-1"></i> Swipe or use arrow keys to navigate</small>
          </div>
          
          {/* Close button for fullscreen */}
          {isFullscreen && (
            <button
              className="position-fixed top-2 start-0 m-3 btn btn-sm btn-danger rounded-circle shadow"
              onClick={toggleFullscreen}
              style={{ zIndex: 10, width: '40px', height: '40px' }}
              aria-label="Exit fullscreen"
              title="Exit fullscreen (Esc key)"
            >
              <i className="fa fa-times"></i>
            </button>
          )}
        </>
      )}
    </div>
  );
}
