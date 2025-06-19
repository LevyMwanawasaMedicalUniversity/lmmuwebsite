"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageObject {
  url: string;
  caption?: string;
  id?: number;
  order?: number;
}

interface ImageCarouselProps {
  images: ImageObject[];
  interval?: number;
  autoPlay?: boolean;
  height?: number;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

/**
 * An image carousel component that automatically cycles through images
 */
export default function ImageCarousel({ 
  images, 
  interval = 5000, 
  autoPlay = true, 
  height = 500, 
  currentIndex: externalIndex,
  onIndexChange 
}: ImageCarouselProps): React.ReactNode {
  
  // Add custom styles for fullscreen modal
  useEffect(() => {
    // Inject custom CSS for improved transitions and interactions
    const style = document.createElement('style');
    style.textContent = `
      .carousel-image {
        transition: transform 0.3s ease-out;
      }
      
      .carousel-image:hover {
        transform: scale(1.02);
      }
      
      .carousel-fullscreen-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .carousel-fullscreen-image {
        max-height: 90vh;
        max-width: 90vw;
        object-fit: contain;
      }
      
      .carousel-fullscreen-close {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 20px;
        z-index: 10000;
      }
      
      .carousel-fullscreen-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 20px;
        z-index: 10000;
      }
      
      .carousel-fullscreen-prev {
        left: 20px;
      }
      
      .carousel-fullscreen-next {
        right: 20px;
      }
      
      .carousel-fullscreen-caption {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        color: white;
        text-align: center;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        margin: 0 auto;
        max-width: 80%;
        border-radius: 4px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Use external index if provided, otherwise manage internally
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIdx = externalIndex !== undefined ? externalIndex : internalIndex;
  
  // State for fullscreen view
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Refs for touch interactions
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const [isPaused, setIsPaused] = useState(false);
  
  // Reset to first image when images change
  useEffect(() => {
    setInternalIndex(0);
    if (onIndexChange) onIndexChange(0);
  }, [images, onIndexChange]);
  
  const goToNext = useCallback(() => {
    const newIndex = (currentIdx + 1) % images.length;
    setInternalIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  }, [currentIdx, images.length, onIndexChange]);
  
  const goToPrev = useCallback(() => {
    const newIndex = (currentIdx - 1 + images.length) % images.length;
    setInternalIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  }, [currentIdx, images.length, onIndexChange]);
  
  // Automatic slideshow
  useEffect(() => {
    if (!autoPlay || isPaused || isFullscreen || images.length <= 1) return;
    
    const timer = setInterval(goToNext, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, currentIdx, goToNext, interval, isPaused, isFullscreen, images.length]);
  
  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    
    // If swipe distance is significant
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next
        goToNext();
      } else {
        // Swipe right, go to prev
        goToPrev();
      }
    }
  };
  
  // Toggle fullscreen view
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  // Handle keyboard navigation in fullscreen mode
  useEffect(() => {
    if (!isFullscreen) return;
    
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          setIsFullscreen(false);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeydown);
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isFullscreen, goToPrev, goToNext]);
  
  // No images, don't render
  if (!images || images.length === 0) {
    return null;
  }
  
  // Single image, render without controls
  if (images.length === 1) {
    return (
      <div 
        className="carousel-container position-relative" 
        style={{ height: `${height}px`, cursor: 'zoom-in' }}
        onClick={toggleFullscreen}
      >
        <Image 
          src={images[0].url} 
          alt={images[0].caption || 'Image'} 
          fill
          style={{ objectFit: 'cover' }}
          className="carousel-image rounded"
          priority={true}
        />
        
        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div className="carousel-fullscreen-overlay" onClick={toggleFullscreen}>
            <button className="carousel-fullscreen-close" onClick={toggleFullscreen}>
              &times;
            </button>
            <img 
              src={images[0].url} 
              alt={images[0].caption || 'Image'} 
              className="carousel-fullscreen-image" 
            />
            {images[0].caption && (
              <div className="carousel-fullscreen-caption">
                {images[0].caption}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <>
      {/* Multiple images carousel */}
      <div 
        className="carousel-container position-relative" 
        style={{ height: `${height}px`, overflow: 'hidden', cursor: 'zoom-in' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div 
            key={currentIdx}
            className="position-absolute w-100 h-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={toggleFullscreen}
          >
            <Image 
              src={images[currentIdx]?.url || ''} 
              alt={images[currentIdx]?.caption || 'Image'} 
              fill
              style={{ objectFit: 'cover' }}
              className="carousel-image rounded"
              priority={currentIdx === 0}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation arrows */}
        <button 
          className="carousel-control carousel-prev position-absolute start-0 top-50 translate-middle-y bg-dark bg-opacity-50 border-0 rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px', zIndex: 5 }}
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
        >
          <span className="text-white">&lsaquo;</span>
        </button>
        <button 
          className="carousel-control carousel-next position-absolute end-0 top-50 translate-middle-y bg-dark bg-opacity-50 border-0 rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px', zIndex: 5 }}
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
        >
          <span className="text-white">&rsaquo;</span>
        </button>
        
        {/* Image counter */}
        <div 
          className="position-absolute bottom-0 start-0 m-3 bg-dark bg-opacity-50 px-2 py-1 rounded text-white"
          style={{ zIndex: 5 }}
        >
          {currentIdx + 1} / {images.length}
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="carousel-fullscreen-overlay" onClick={toggleFullscreen}>
          <button 
            className="carousel-fullscreen-close" 
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
          >
            &times;
          </button>
          
          <button 
            className="carousel-fullscreen-nav carousel-fullscreen-prev" 
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
          >
            &lsaquo;
          </button>
          
          <img 
            src={images[currentIdx]?.url} 
            alt={images[currentIdx]?.caption || 'Image'} 
            className="carousel-fullscreen-image" 
          />
          
          <button 
            className="carousel-fullscreen-nav carousel-fullscreen-next" 
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            &rsaquo;
          </button>
          
          {images[currentIdx]?.caption && (
            <div className="carousel-fullscreen-caption">
              {images[currentIdx].caption}
            </div>
          )}
        </div>
      )}
    </>
  );
}
