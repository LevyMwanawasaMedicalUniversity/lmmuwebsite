"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Programme, PatternType } from './SchoolPageTypes';

// Client-only animation wrapper to avoid hydration mismatch
const ClientAnimation = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }
  
  return <>{children}</>;
};

interface ProgrammeCardsProps {
  programmes: Programme[];
  fadeIn: any;
  staggerContainer: any;
}

export const ProgrammeCards: React.FC<ProgrammeCardsProps> = ({ 
  programmes, 
  fadeIn, 
  staggerContainer 
}) => {
  // State for auto-scrolling cards functionality
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to advance to the next card set
  const nextCardSet = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      // Math.ceil because we want to include the last item if it doesn't fill a full page
      const totalSets = Math.ceil(programmes.length / getCardsPerPage());
      return (prevIndex + 1) % totalSets;
    });
  }, [programmes.length]);
  
  // Setup auto-scrolling
  useEffect(() => {
    const startAutoScroll = () => {
      if (programmes.length > getCardsPerPage()) { // Only auto-scroll if there are enough programmes
        autoScrollRef.current = setInterval(() => {
          if (!isHovering) {
            nextCardSet();
          }
        }, 5000); // Auto-scroll every 5 seconds
      }
    };
    
    startAutoScroll();
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [nextCardSet, programmes.length, isHovering]);
  
  // Handle mouse enter/leave and touch events to pause/resume scrolling
  const handleInteractionStart = () => {
    setIsHovering(true);
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
  };
  
  const handleInteractionEnd = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    touchTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 8000); // Resume after 8 seconds of inactivity
  };

  // Function to get pattern class based on pattern type with more randomness
  const getPatternClass = (pattern: PatternType): string => {
    switch(pattern) {
      case 'radial': return 'bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3)_1px,transparent_8px),radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2)_1px,transparent_6px)] bg-[length:24px_24px]';
      case 'diagonal': return 'bg-[linear-gradient(135deg,rgba(255,255,255,0.3)_25%,transparent_25%),linear-gradient(225deg,rgba(255,255,255,0.2)_25%,transparent_25%)] bg-[length:16px_16px]';
      case 'mesh': return 'bg-[linear-gradient(0deg,rgba(255,255,255,0)_9px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0)_11px),linear-gradient(90deg,rgba(255,255,255,0)_9px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0)_11px)] bg-[length:30px_30px]';
      case 'wave': return 'bg-[url("data:image/svg+xml,%3Csvg width=\'120\' height=\'20\' viewBox=\'0 0 120 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-50.129,15.369 C-26.558,15.369 -26.558,4.631 -3,4.631 C20.558,4.631 20.558,15.369 44.129,15.369 C67.687,15.369 67.687,4.631 91.254,4.631 C114.813,4.631 114.813,15.369 138.371,15.369\' stroke=\'rgba(255,255,255,0.2)\' stroke-width=\'1.5\' fill=\'none\' /%3E%3C/svg%3E"),url("data:image/svg+xml,%3Csvg width=\'120\' height=\'20\' viewBox=\'0 0 120 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-50.129,10.369 C-26.558,10.369 -26.558,1.631 -3,1.631 C20.558,1.631 20.558,10.369 44.129,10.369 C67.687,10.369 67.687,1.631 91.254,1.631 C114.813,1.631 114.813,10.369 138.371,10.369\' stroke=\'rgba(255,255,255,0.15)\' stroke-width=\'1\' fill=\'none\' /%3E%3C/svg%3E")]';
      case 'dots': return 'bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.3)_2px,transparent_2px),radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.2)_4px,transparent_4px)] bg-[length:24px_24px,25px_25px] bg-[position:0_0,12px_12px]';
      case 'circles': return 'bg-[radial-gradient(circle_at_center,transparent_40%,rgba(255,255,255,0.2)_41%,rgba(255,255,255,0.2)_43%,transparent_44%)] bg-[length:40px_40px]';
      case 'zigzag': return 'bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_25%,transparent_25%),linear-gradient(225deg,rgba(255,255,255,0.25)_25%,transparent_25%)] bg-[size:20px_40px] bg-[position:0_0,10px_0]';
      case 'bubbles': return 'bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.2)_0,rgba(255,255,255,0.2)_3px,transparent_3px),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.25)_0,rgba(255,255,255,0.25)_6px,transparent_6px),radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.3)_0,rgba(255,255,255,0.3)_4px,transparent_4px)] bg-[length:60px_60px]';
      default: return '';
    }
  };
  
  // Function to get pattern style based on pattern type
  const getPatternStyle = (pattern: PatternType): React.CSSProperties => {
    switch(pattern) {
      case 'radial': return {
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 1px, transparent 8px), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 1px, transparent 6px)',
        backgroundSize: '24px 24px'
      };
      case 'diagonal': return {
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.3) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.2) 25%, transparent 25%)',
        backgroundSize: '16px 16px'
      };
      case 'mesh': return {
        backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0) 9px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0) 11px), linear-gradient(90deg, rgba(255,255,255,0) 9px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0) 11px)',
        backgroundSize: '30px 30px'
      };
      case 'wave': return {
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'120\' height=\'20\' viewBox=\'0 0 120 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-50.129,15.369 C-26.558,15.369 -26.558,4.631 -3,4.631 C20.558,4.631 20.558,15.369 44.129,15.369 C67.687,15.369 67.687,4.631 91.254,4.631 C114.813,4.631 114.813,15.369 138.371,15.369\' stroke=\'rgba(255,255,255,0.2)\' stroke-width=\'1.5\' fill=\'none\' /%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg width=\'120\' height=\'20\' viewBox=\'0 0 120 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-50.129,10.369 C-26.558,10.369 -26.558,1.631 -3,1.631 C20.558,1.631 20.558,10.369 44.129,10.369 C67.687,10.369 67.687,1.631 91.254,1.631 C114.813,1.631 114.813,10.369 138.371,10.369\' stroke=\'rgba(255,255,255,0.15)\' stroke-width=\'1\' fill=\'none\' /%3E%3C/svg%3E")'
      };
      case 'dots': return {
        backgroundImage: 'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.3) 2px, transparent 2px), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.2) 4px, transparent 4px)',
        backgroundSize: '24px 24px, 25px 25px',
        backgroundPosition: '0 0, 12px 12px'
      };
      case 'circles': return {
        backgroundImage: 'radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.2) 41%, rgba(255,255,255,0.2) 43%, transparent 44%)',
        backgroundSize: '40px 40px'
      };
      case 'zigzag': return {
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.25) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.25) 25%, transparent 25%)',
        backgroundSize: '20px 40px',
        backgroundPosition: '0 0, 10px 0'
      };
      case 'bubbles': return {
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 3px, transparent 3px), radial-gradient(circle at 80% 40%, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 6px, transparent 6px), radial-gradient(circle at 40% 30%, rgba(255,255,255,0.3) 0, rgba(255,255,255,0.3) 4px, transparent 4px)',
        backgroundSize: '60px 60px'
      };
      default: return {};
    }
  };

  // Helper function to get decorative elements based on index
  const getDecorativeElements = (index: number): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    
    // Add different decorative elements based on index
    switch (index % 8) {
      case 0: // Floating dots
        for (let i = 0; i < 5; i++) {
          elements.push(
            <motion.div
              key={`dot-${i}`}
              className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
              style={{
                top: `${15 + (i * 15)}%`,
                left: `${10 + (i * 18)}%`,
              }}
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.2
              }}
            />
          );
        }
        break;
      case 1: // Floating circles
        for (let i = 0; i < 3; i++) {
          elements.push(
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full border border-white/30"
              style={{
                width: `${20 + (i * 15)}px`,
                height: `${20 + (i * 15)}px`,
                top: `${20 + (i * 20)}%`,
                left: `${15 + (i * 25)}%`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.3
              }}
            />
          );
        }
        break;
      case 2: // Floating lines
        for (let i = 0; i < 3; i++) {
          elements.push(
            <motion.div
              key={`line-${i}`}
              className="absolute h-0.5 bg-white/30 rounded-full"
              style={{
                width: `${30 + (i * 20)}px`,
                top: `${25 + (i * 20)}%`,
                left: `${10 + (i * 15)}%`,
                transform: `rotate(${45 + (i * 30)}deg)`
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                width: [`${30 + (i * 20)}px`, `${40 + (i * 20)}px`, `${30 + (i * 20)}px`]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.2
              }}
            />
          );
        }
        break;
      case 3: // Pulsing rings
        elements.push(
          <React.Fragment key="rings">
            <motion.div
              className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full border border-white/20"
              style={{ marginTop: -24, marginLeft: -24 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full border border-white/15"
              style={{ marginTop: -32, marginLeft: -32 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full border border-white/10"
              style={{ marginTop: -40, marginLeft: -40 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </React.Fragment>
        );
        break;
      case 4: // Diagonal sweep
        elements.push(
          <motion.div
            key="sweep"
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
            initial={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ transform: 'translateX(-100%) skewX(-20deg)' }}
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop', ease: 'linear', delay: 1 }}
            />
          </motion.div>
        );
        break;
      case 5: // Rotating elements
        elements.push(
          <React.Fragment key="rotating">
            <motion.div
              className="absolute top-1/2 left-1/2 w-16 h-16 border border-white/20"
              style={{ marginTop: -32, marginLeft: -32, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-12 h-12 border border-white/15"
              style={{ marginTop: -24, marginLeft: -24, borderRadius: '80% 20% 50% 50% / 20% 80% 20% 80%' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
          </React.Fragment>
        );
        break;
      case 6: // Particle flow
        for (let i = 0; i < 6; i++) {
          elements.push(
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white/50 rounded-full"
              style={{
                top: `${10 + (i * 15)}%`,
                left: '10%'
              }}
              animate={{
                x: ['0%', '80%', '0%'],
                y: [0, (i % 2 === 0 ? 10 : -10), 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.4
              }}
            />
          );
        }
        break;
      case 7: // Floating squares
        for (let i = 0; i < 4; i++) {
          elements.push(
            <motion.div
              key={`square-${i}`}
              className="absolute bg-white/20 rounded-sm"
              style={{
                width: `${6 + (i * 4)}px`,
                height: `${6 + (i * 4)}px`,
                top: `${15 + (i * 20)}%`,
                left: `${20 + (i * 15)}%`,
                transform: `rotate(${i * 15}deg)`
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [i * 15, i * 15 + 45, i * 15],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.3
              }}
            />
          );
        }
        break;
    }
    
    return elements;
  };

  // Helper function to get icon container style based on index
  const getIconContainerStyle = (index: number): React.ReactElement => {
    switch (index % 8) {
      case 0: // Circle
        return (
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm" />
        );
      case 1: // Rounded square
        return (
          <div className="relative flex items-center justify-center w-14 h-14 rounded-lg bg-white/20 backdrop-blur-sm" />
        );
      case 2: // Square with rotation
        return (
          <motion.div 
            className="relative flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rotate-45"
            animate={{ rotate: [45, 45 + 10, 45] }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          >
            <div className="-rotate-45" />
          </motion.div>
        );
      case 3: // Blob shape
        return (
          <motion.div 
            className="relative flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm"
            animate={{ 
              borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '60% 40% 30% 70% / 60% 30% 70% 40%', '30% 70% 70% 30% / 30% 30% 70% 70%']
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        );
      case 4: // Diamond with glow
        return (
          <motion.div 
            className="relative flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rotate-45"
            animate={{ 
              boxShadow: [
                '0 0 10px 0 rgba(255,255,255,0.3)',
                '0 0 20px 0 rgba(255,255,255,0.5)',
                '0 0 10px 0 rgba(255,255,255,0.3)'
              ]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          >
            <div className="-rotate-45" />
          </motion.div>
        );
      case 5: // Hexagon
        return (
          <div 
            className="relative flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          />
        );
      case 6: // Crossed circles
        return (
          <div className="relative flex items-center justify-center">
            <motion.div 
              className="absolute w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            <motion.div 
              className="absolute w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm" />
          </div>
        );
      case 7: // Stacked plates
        return (
          <div className="relative flex items-center justify-center">
            <motion.div 
              className="absolute w-16 h-4 rounded-full bg-white/10 backdrop-blur-sm"
              style={{ y: -8 }}
              animate={{ y: [-8, -10, -8] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
            <motion.div 
              className="absolute w-16 h-4 rounded-full bg-white/15 backdrop-blur-sm"
              style={{ y: -4 }}
              animate={{ y: [-4, -5, -4] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: 0.2
              }}
            />
            <motion.div 
              className="absolute w-16 h-4 rounded-full bg-white/20 backdrop-blur-sm"
              animate={{ y: [0, -1, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: 0.4
              }}
            />
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm mt-2" />
          </div>
        );
      default:
        return (
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm" />
        );
    }
  };

  // Generate advanced color palette for cards with rich gradients
  const getCardColors = (index: number): { gradient: string, accent: string, textColor: string, border: string, shadow: string } => {
    // Premium color palettes with multi-tone gradients
    const colorPalettes = [
      { 
        gradient: 'from-blue-600 via-blue-500 to-indigo-700', 
        accent: 'bg-blue-100 text-blue-800',
        textColor: 'text-blue-700',
        border: 'border-blue-300',
        shadow: 'shadow-blue-400/20'
      },
      { 
        gradient: 'from-purple-600 via-fuchsia-500 to-pink-600', 
        accent: 'bg-purple-100 text-purple-800',
        textColor: 'text-purple-700',
        border: 'border-purple-300',
        shadow: 'shadow-purple-400/20'
      },
      { 
        gradient: 'from-emerald-600 via-emerald-500 to-teal-700', 
        accent: 'bg-emerald-100 text-emerald-800',
        textColor: 'text-emerald-700',
        border: 'border-emerald-300',
        shadow: 'shadow-emerald-400/20'
      },
      { 
        gradient: 'from-orange-500 via-amber-500 to-amber-700', 
        accent: 'bg-orange-100 text-orange-800',
        textColor: 'text-orange-700',
        border: 'border-orange-300',
        shadow: 'shadow-orange-400/20'
      },
      { 
        gradient: 'from-pink-600 via-rose-500 to-rose-700', 
        accent: 'bg-pink-100 text-pink-800',
        textColor: 'text-pink-700',
        border: 'border-pink-300',
        shadow: 'shadow-pink-400/20'
      },
      { 
        gradient: 'from-cyan-600 via-cyan-500 to-blue-700', 
        accent: 'bg-cyan-100 text-cyan-800',
        textColor: 'text-cyan-700',
        border: 'border-cyan-300',
        shadow: 'shadow-cyan-400/20'
      },
      { 
        gradient: 'from-lime-600 via-lime-500 to-green-700', 
        accent: 'bg-lime-100 text-lime-800',
        textColor: 'text-lime-700',
        border: 'border-lime-300',
        shadow: 'shadow-lime-400/20'
      },
      { 
        gradient: 'from-red-600 via-red-500 to-rose-700', 
        accent: 'bg-red-100 text-red-800',
        textColor: 'text-red-700',
        border: 'border-red-300',
        shadow: 'shadow-red-400/20'
      },
      { 
        gradient: 'from-indigo-600 via-violet-500 to-purple-700', 
        accent: 'bg-indigo-100 text-indigo-800',
        textColor: 'text-indigo-700',
        border: 'border-indigo-300',
        shadow: 'shadow-indigo-400/20'
      },
      { 
        gradient: 'from-amber-600 via-yellow-500 to-orange-700', 
        accent: 'bg-amber-100 text-amber-800',
        textColor: 'text-amber-700',
        border: 'border-amber-300',
        shadow: 'shadow-amber-400/20'
      },
      { 
        gradient: 'from-sky-600 via-sky-500 to-indigo-700', 
        accent: 'bg-sky-100 text-sky-800',
        textColor: 'text-sky-700',
        border: 'border-sky-300',
        shadow: 'shadow-sky-400/20'
      },
      { 
        gradient: 'from-violet-600 via-violet-500 to-purple-700', 
        accent: 'bg-violet-100 text-violet-800',
        textColor: 'text-violet-700',
        border: 'border-violet-300',
        shadow: 'shadow-violet-400/20'
      },
    ];
    
    // Deterministic but seemingly random selection based on index
    const colorIndex = (index * 7) % colorPalettes.length;
    return colorPalettes[colorIndex];
  };

  // Enhanced card style with more sophisticated effects and layouts
  const getCardStyle = (index: number): string => {
    // Advanced gradient varieties
    const complexGradients = [
      'bg-gradient-to-br', // standard bottom-right
      'bg-[linear-gradient(135deg,var(--tw-gradient-stops))]', // diagonal
      'bg-[linear-gradient(45deg,var(--tw-gradient-stops))]',  // diagonal opposite
      'bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))]', // radial from corner
      'bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))]', // radial from corner
      'bg-[conic-gradient(from_45deg_at_center,var(--tw-gradient-stops))]', // conic gradient
      'bg-[linear-gradient(120deg,var(--tw-gradient-stops))]', // angled linear
      'bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))]', // centered radial
      'bg-[linear-gradient(to_right,var(--tw-gradient-stops))]', // horizontal
      'bg-[linear-gradient(to_top,var(--tw-gradient-stops))]', // vertical
      'bg-[linear-gradient(315deg,var(--tw-gradient-stops))]', // diagonal alternate
      'bg-[conic-gradient(from_180deg_at_65%_65%,var(--tw-gradient-stops))]', // off-center conic
    ];
    
    // Get the direction based on index
    const direction = complexGradients[index % complexGradients.length];
    
    // Sophisticated layouts with design polish
    const layouts = [
      'flex items-center justify-center p-6 relative', // standard centered
      'flex items-end justify-center p-5 relative overflow-hidden', // bottom centered
      'flex items-center justify-end p-6 relative', // right aligned
      'flex items-start justify-center p-6 relative overflow-hidden', // top centered
      'flex items-center justify-start p-6 relative', // left aligned
      'flex items-end justify-end p-5 relative overflow-hidden', // corner
      'flex items-start justify-start p-6 relative overflow-hidden', // opposite corner
      'flex items-center justify-center p-5 relative overflow-hidden', // centered with overflow
      'flex items-start justify-end p-6 relative', // top-right aligned
      'flex items-end justify-start p-6 relative', // bottom-left aligned
      'flex items-center justify-center p-7 relative' // extra padded center
    ];
    
    const layout = layouts[index % layouts.length];
    
    // Premium visual effects
    const specialEffects = [
      ' backdrop-blur-sm', // blur effect
      ' shadow-[inset_5px_5px_15px_rgba(0,0,0,0.2)]', // inner shadow
      ' shadow-[0_15px_30px_rgba(0,0,0,0.2)]', // elevated premium shadow
      ' relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/15 after:to-transparent after:z-0', // gradient overlay
      ' border-b-[6px] border-white/20', // thick bottom border
      ' border-l-[6px] border-white/20', // thick left border
      ' border-r-[6px] border-white/20', // thick right border
      ' border-t-[6px] border-white/20', // thick top border
      ' shadow-inner shadow-white/20', // subtle inner glow
      ' backdrop-saturate-150', // color boost
      ' relative after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,transparent_65%,rgba(0,0,0,0.15)_100%)] after:z-0', // vignette effect
      ' backdrop-contrast-110' // contrast boost
    ];
    
    const effectIndex = (index * 3) % specialEffects.length;
    const effect = specialEffects[effectIndex];
    
    return `${direction} ${layout}${effect}`;
  };

  // Calculate the number of cards to show per page based on screen size
  // We'll use a responsive approach for different screen sizes
  const getCardsPerPage = () => {
    // For standalone carousel view, we use fixed number
    return 4; // Show 4 cards per page
  };
  
  // Calculate total pages for pagination
  const getTotalPages = () => {
    return Math.ceil(programmes.length / getCardsPerPage());
  };
  
  // Calculate which card indices are visible on the current page
  const visibleCardIndices = () => {
    return programmes.slice(
      currentIndex,
      currentIndex + getCardsPerPage()
    ).map((_, i) => currentIndex + i);
  };

  // Determine if we should use grid view or carousel view
  const useGridView = () => {
    // If there are 8 or fewer programmes, use grid view
    return programmes.length <= 20;
  };

  // Simplified card hover for grid view
  const cardHover = {
    rest: { scale: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    hover: { 
      scale: 1.03, 
      boxShadow: '0 10px 15px rgba(0,0,0,0.15)',
      transition: { duration: 0.3 }
    }
  };

  // Render the grid view with all cards visible at once
  const renderGridView = () => {
    return (
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {programmes.map((programme, index) => (
          <motion.div
            key={programme.id}
            className="programme-card bg-white rounded-lg shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-300 overflow-hidden"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`h-32 relative overflow-hidden bg-gradient-to-br ${programme.gradient}`}>
              {/* Pattern overlay based on programme type */}
              <div className={`absolute inset-0 opacity-20 ${getPatternClass(programme.pattern)}`}></div>
              
              {/* Client-only decorative elements */}
              <ClientAnimation>
                <div className="absolute inset-0 pointer-events-none">
                  {getDecorativeElements(index)}
                </div>
              </ClientAnimation>
              
              {/* Icon container */}
              <ClientAnimation>
                <div className="absolute inset-0 flex items-center justify-center">
                  {React.cloneElement(getIconContainerStyle(index), {}, 
                    programme.icon.startsWith('fa-') ? (
                      <i className={`fa-solid ${programme.icon} text-white text-2xl`} />
                    ) : (
                      <img 
                        src={programme.icon} 
                        alt={programme.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    )
                  )}
                </div>
              </ClientAnimation>
            </div>
            
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-sm font-bold mb-1 text-blue-900">{programme.title}</h3>
              <div className="mb-1 flex flex-wrap gap-1">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-sm">
                  {programme.level}
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-sm">
                  {programme.duration}
                </span>
              </div>
              <p className="text-gray-600 text-xs line-clamp-3">{programme.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Render pagination dots for navigation between card sets
  const renderNavigationDots = () => {
    const totalPages = getTotalPages();
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center items-center space-x-2 mt-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * getCardsPerPage())}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / getCardsPerPage()) === index
                ? 'bg-blue-600 dark:bg-blue-400 scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    );
  };
  
  // Render the carousel view with auto-scrolling and navigation
  const renderCarouselView = () => {
    return (
      <>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {visibleCardIndices().map((actualIndex) => {
                const programme = programmes[actualIndex];
                const colorSet = getCardColors(actualIndex);
                
                return (
                  <motion.div 
                    key={programme.id}
                    className={`flex flex-col h-36 rounded-xl overflow-hidden ${colorSet.shadow} hover:shadow-xl transition-shadow duration-300 relative z-0 border ${colorSet.border}`}
                    variants={fadeIn}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`h-36 ${getCardStyle(actualIndex)} relative overflow-hidden`}>
                      {/* Pattern overlay based on programme type */}
                      <div className="absolute inset-0 opacity-20" style={getPatternStyle(programme.pattern)}></div>
                      
                      {/* Decorative background elements */}
                      <ClientAnimation>
                        <div className="absolute inset-0 pointer-events-none">
                          {getDecorativeElements(actualIndex)}
                        </div>
                      </ClientAnimation>
                      
                      {/* Enhanced icon container */}
                      <ClientAnimation>
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          {React.cloneElement(getIconContainerStyle(actualIndex), {}, 
                            <i className={`fa-solid ${programme.icon} text-white text-3xl drop-shadow-md`} />
                          )}
                        </div>
                      </ClientAnimation>
                      
                      {/* Enhanced title banner with better readability and no truncation */}
                      <div className={`absolute bottom-0 inset-x-0 px-3 py-2.5 backdrop-blur-md bg-gradient-to-t ${colorSet.gradient} bg-opacity-90 z-30 border-t border-white/10`}>
                        <h3 className="text-sm font-bold tracking-tight text-white drop-shadow-sm break-words hyphens-auto">
                          {programme.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation arrows if there are multiple card sets */}
          {getTotalPages() > 1 && (
            <>
              <motion.button 
                onClick={() => setCurrentIndex((prev) => (prev === 0 ? getTotalPages() - 1 : prev - 1))}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-white hover:scale-110 transition-all z-10 border border-gray-100 dark:border-slate-700"
                aria-label="Previous card set"
                whileHover={{ scale: 1.1, x: -20 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </motion.button>
              <motion.button 
                onClick={() => nextCardSet()}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-white hover:scale-110 transition-all z-10 border border-gray-100 dark:border-slate-700"
                aria-label="Next card set"
                whileHover={{ scale: 1.1, x: 20 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </motion.button>
            </>
          )}
        </div>
        
        {/* Navigation dots */}
        {renderNavigationDots()}
      </>
    );
  };

  return (
    <div className="w-full relative" 
      onMouseEnter={handleInteractionStart} 
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      {useGridView() ? renderGridView() : renderCarouselView()}
    </div>
  );
};
