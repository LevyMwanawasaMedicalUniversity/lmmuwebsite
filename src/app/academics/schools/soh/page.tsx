"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Component for handling client-side animations
const ClientAnimation = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }
  
  return <>{children}</>;
};

export default function SchoolOfHealthSciencesPage(): React.ReactNode {
  // State for accordion/FAQ sections and tabs
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('undergraduate');

  // Simple fade-in animation variant for sections
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Animation variant for staggered children
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Function to get pattern class based on pattern type with more randomness
  const getPatternClass = (pattern) => {
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

  // Helper function to get random card style based on index
  const getCardStyle = (index: number): string => {
    // Even more gradient variety with complex multi-color gradients
    const complexGradients = [
      'bg-gradient-to-br', // standard bottom-right
      'bg-[linear-gradient(135deg,var(--tw-gradient-stops))]', // diagonal
      'bg-[linear-gradient(45deg,var(--tw-gradient-stops))]',  // diagonal opposite
      'bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))]', // radial from corner
      'bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))]', // radial from corner
      'bg-[linear-gradient(to_right,var(--tw-gradient-stops))]', // horizontal
      'bg-[conic-gradient(from_45deg_at_center,var(--tw-gradient-stops))]', // conic
      'bg-[linear-gradient(to_top_left,var(--tw-gradient-stops))]', // diagonal to corner
      'bg-[linear-gradient(175deg,var(--tw-gradient-stops))]', // almost vertical
      'bg-[linear-gradient(85deg,var(--tw-gradient-stops))]', // almost horizontal
      'bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))]', // center radial
      'bg-[conic-gradient(from_90deg_at_75%_25%,var(--tw-gradient-stops))]' // off-center conic
    ];
    
    // Get the programme's gradient colors but apply a more complex pattern
    const gradient = programmes[index].gradient;
    
    // Get a direction based on index
    const direction = complexGradients[index % complexGradients.length];
    
    // More interesting layouts with rotations and perspective effects
    const layouts = [
      'flex items-center justify-center p-6', // standard centered
      'flex items-end justify-center p-6 relative overflow-hidden', // bottom centered
      'flex items-center justify-end p-6 relative perspective-500', // with perspective
      'flex items-start justify-center p-6 relative overflow-hidden', // top centered
      'flex items-center justify-start p-6 relative perspective-700', // with stronger perspective
      'flex items-end justify-end p-6 relative overflow-hidden', // corner
      'flex items-start justify-start p-6 relative overflow-hidden skew-y-1', // with slight skew
      'flex items-end justify-start p-6 relative overflow-hidden -skew-x-1', // with opposite skew
      'flex items-center justify-center p-6 relative overflow-hidden rotate-1', // slight rotation
      'flex items-center justify-center p-6 relative overflow-hidden -rotate-1', // opposite rotation
      'flex items-center justify-center p-6 relative overflow-hidden scale-[1.02] origin-bottom-right', // scaled
      'flex items-center justify-center p-6 relative overflow-hidden scale-[1.02] origin-top-left' // scaled from different origin
    ];
    
    const layout = layouts[index % layouts.length];
    
    // Some cards get a special pseudo-3D effect with shadows based on index
    const specialEffects = [
      '', // no special effect
      ' shadow-[inset_5px_5px_15px_rgba(0,0,0,0.2)]', // inner shadow top-left
      ' shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2)]', // inner shadow bottom-right
      ' shadow-[0_10px_20px_rgba(0,0,0,0.15)]', // elevated shadow
      ' relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent after:z-0', // gradient overlay
      ' border-b-4 border-white/20', // bottom border
      ' border-l-4 border-white/20', // left border
      ' border-2 border-white/10', // full border
      ' shadow-inner shadow-white/10' // subtle inner glow
    ];
    
    // Deterministic effect based on index
    const effectIndex = (index * 3) % specialEffects.length;
    const effect = specialEffects[effectIndex];
    
    return `${direction} ${gradient} ${layout}${effect}`;
  };
  
  // Client component wrapper for animations to prevent hydration mismatches
  const ClientAnimation = ({children}: {children: React.ReactNode}) => {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
      setIsMounted(true);
    }, []);
    
    if (!isMounted) {
      return null; // Render nothing on server
    }
    
    return <>{children}</>;
  };
  
  // Get decorative elements for card background based on index
  // Using deterministic values for all animations to prevent hydration errors
  const getDecorativeElements = (index: number): React.ReactNode => {
    // Ensure deterministic values for all animations
    const cycleIndex = index % 16;
    
    switch (cycleIndex) { // Increased variety with 16 different patterns
      case 0:
        // Animated pulsing circles
        return (
          <ClientAnimation>
            <motion.div 
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/10"
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </ClientAnimation>
        );
      case 1:
        // Floating circles
        return (
          <ClientAnimation>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
              <motion.div 
                className="w-3 h-3 rounded-full bg-white/15"
                animate={{ y: ["-5px", "5px", "-5px"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-white/25"
                animate={{ y: ["-5px", "5px", "-5px"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-white/15"
                animate={{ y: ["-5px", "5px", "-5px"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              />
            </div>
          </ClientAnimation>
        );
      case 2:
        // Corner shapes with reveal animation
        return (
          <>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-0 w-16 h-16 bg-white/5"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full bg-white/5"
            />
          </>
        );
      case 3:
        // Rotating diagonal lines
        return (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-1/4 right-0 bottom-0 -rotate-45 transform origin-top-right border-t-2 border-white/10"
              animate={{ rotate: [-45, -43, -45] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-0 left-1/4 right-0 bottom-0 -rotate-45 transform origin-bottom-left border-b-2 border-white/5"
              animate={{ rotate: [-45, -47, -45] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
          </div>
        );
      case 4:
        // Floating dots with different timings
        return (
          <>
            <motion.div 
              className="absolute top-4 left-8 w-2 h-2 rounded-full bg-white/20"
              animate={{ y: ["-5px", "5px", "-5px"], x: ["0px", "5px", "0px"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-10 right-12 w-3 h-3 rounded-full bg-white/15"
              animate={{ y: ["5px", "-5px", "5px"], x: ["0px", "-5px", "0px"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-6 left-1/3 w-2 h-2 rounded-full bg-white/20"
              animate={{ y: ["0px", "8px", "0px"], x: ["5px", "0px", "5px"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-1/2 right-6 w-4 h-4 rounded-full bg-white/10"
              animate={{ y: ["0px", "-8px", "0px"], x: ["-5px", "0px", "-5px"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        );
      case 5:
        // Moving wave line
        return (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full rounded-br-full border-r-2 border-b-2 border-white/10"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-0 left-0 w-full h-full rounded-tl-full border-l-2 border-t-2 border-white/5"
              animate={{ scale: [1, 0.98, 1], rotate: [0, -1, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
          </div>
        );
      case 6:
        // Animated triangles
        return (
          <>
            <motion.div 
              className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-white/10 border-r-transparent"
              animate={{ borderWidth: ["16px", "18px", "16px"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-0 h-0 border-b-[16px] border-l-[16px] border-b-white/10 border-l-transparent"
              animate={{ borderWidth: ["16px", "14px", "16px"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </>
        );
      case 7:
        // Animated grid with opacity changes
        return (
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-4 p-4">
            {Array(12).fill(0).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-1 h-1 rounded-full bg-white/15"
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.2 % 1.5 // Staggered animation
                }}
              />
            ))}
          </div>
        );
      case 8:
        // Concentric circles
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-32 h-32 rounded-full border border-white/5"
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute w-24 h-24 rounded-full border border-white/10"
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div 
              className="absolute w-16 h-16 rounded-full border border-white/15"
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.2, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>
        );
      case 9:
        // Grid lines
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_95%,rgba(255,255,255,0.1)_100%)] bg-[size:10px_100%]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(255,255,255,0.1)_100%)] bg-[size:100%_10px]"></div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        );
      case 10:
        // Spotlight effect
        return (
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] opacity-50"
            animate={{ 
              backgroundPosition: [
                "25% 25%", 
                "75% 25%", 
                "75% 75%", 
                "25% 75%", 
                "25% 25%"
              ] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      case 11:
        // Dashed lines
        return (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute left-0 right-0 top-1/4 h-[1px] bg-white/10"
              style={{ backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)" }}
              animate={{ x: ["-20px", "0px", "-20px"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute left-0 right-0 top-2/4 h-[1px] bg-white/15"
              style={{ backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 4px, rgba(255,255,255,0.15) 4px, rgba(255,255,255,0.15) 8px)" }}
              animate={{ x: ["0px", "-20px", "0px"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute left-0 right-0 top-3/4 h-[1px] bg-white/10"
              style={{ backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)" }}
              animate={{ x: ["-20px", "0px", "-20px"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>
        );
      case 12:
        // Diamond pattern
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-40 h-40 border-2 border-white/5 transform rotate-45"
              animate={{ rotate: [45, 90, 45], scale: [1, 0.9, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute w-32 h-32 border border-white/10 transform rotate-45"
              animate={{ rotate: [45, 0, 45], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            />
          </div>
        );
      case 13:
        // Abstract corner lines
        return (
          <>
            <div className="absolute top-0 right-0 w-16 h-[1px] bg-white/20"></div>
            <div className="absolute top-0 right-0 w-[1px] h-16 bg-white/20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-[1px] bg-white/20"></div>
            <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-white/20"></div>
            <motion.div 
              className="absolute inset-[10%] border border-white/5 rounded-sm"
              animate={{ opacity: [0.05, 0.2, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        );
      case 14:
        // Spinning ring
        return (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div 
              className="w-32 h-32 rounded-full border-4 border-t-white/20 border-r-white/10 border-b-white/5 border-l-transparent"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        );
      case 15:
        // Glowing stripes
        return (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute -inset-[100%] bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.1)_50%,transparent_55%)] "
              animate={{ left: ["-100%", "200%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            />
            <motion.div 
              className="absolute -inset-[100%] bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.05)_50%,transparent_55%)] "
              animate={{ left: ["-100%", "200%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2, repeatDelay: 2 }}
            />
          </div>
        );
      default:
        return null;
    };
  };
  
  // Get icon container as a React component with animations based on index
  const getIconContainerStyle = (index: number): React.ReactElement => {
    const iconDesigns = [
      // Pulsing circle with border
      <motion.div 
        className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg relative z-10 border border-white/20"
        animate={{ boxShadow: ['0 4px 12px rgba(255,255,255,0.1)', '0 4px 20px rgba(255,255,255,0.2)', '0 4px 12px rgba(255,255,255,0.1)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Corner positioned with grow effect
      <motion.div 
        className="w-20 h-20 rounded-full bg-white/40 backdrop-blur flex items-center justify-center shadow-lg absolute bottom-6 right-6 z-10 border-2 border-white/20"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Rotating square
      <motion.div 
        className="w-28 h-28 rounded-lg bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg relative z-10 border border-white/20"
        animate={{ rotate: [12, 0, 12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Morphing oval 
      <motion.div 
        className="w-24 h-20 rounded-3xl bg-white/25 backdrop-blur-md flex items-center justify-center shadow-lg relative z-10 border border-white/15"
        animate={{ borderRadius: ['1.5rem', '1rem', '1.5rem'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Color shifting gradient
      <motion.div 
        className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg relative z-10"
        animate={{ 
          background: [
            'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
            'linear-gradient(225deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
            'linear-gradient(315deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
            'linear-gradient(45deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Rotating diamond
      <motion.div 
        className="w-20 h-20 rounded-md bg-white/30 flex items-center justify-center shadow-lg relative z-10 border border-white/20"
        animate={{ rotate: [45, 135, 225, 315, 405] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />,
      
      // Breathing wide oval
      <motion.div 
        className="w-28 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg relative z-10 border border-white/20"
        animate={{ width: ['7rem', '8rem', '7rem'], height: ['4rem', '3.5rem', '4rem'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Spinning dashed border
      <motion.div 
        className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center shadow-lg relative z-10 border-2 border-dashed border-white/30"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />,
      
      // Glowing hexagon
      <motion.div 
        className="w-24 h-24 rounded-md bg-white/25 backdrop-blur flex items-center justify-center shadow-lg relative z-10"
        style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        animate={{ boxShadow: ['0 0 15px rgba(255,255,255,0.3)', '0 0 5px rgba(255,255,255,0.1)', '0 0 15px rgba(255,255,255,0.3)'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Triple border
      <motion.div 
        className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center relative z-10"
      >
        <motion.div 
          className="absolute inset-0 rounded-full border border-white/10"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 rounded-full border border-white/15"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 rounded-full border border-white/20"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>,
      
      // Rounded triangular shield
      <motion.div 
        className="w-24 h-28 bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg relative z-10"
        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
        animate={{ borderRadius: ['50% 50% 50% 50% / 60% 60% 40% 40%', '50% 50% 50% 50% / 50% 50% 50% 50%', '50% 50% 50% 50% / 60% 60% 40% 40%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Star shape
      <motion.div 
        className="w-28 h-28 bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg relative z-10"
        style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        animate={{ rotate: [0, 10, 0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Rotating blob shape
      <motion.div 
        className="w-26 h-26 bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg relative z-10"
        style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%' }}
        animate={{ 
          borderRadius: [
            '60% 40% 50% 50% / 50% 60% 40% 50%',
            '40% 60% 70% 30% / 30% 40% 60% 70%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '60% 40% 50% 50% / 50% 60% 40% 50%'
          ],
          rotate: [0, 15, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Layered circles
      <div className="relative w-28 h-28 flex items-center justify-center z-10">
        <motion.div 
          className="absolute w-full h-full rounded-full bg-white/10 backdrop-blur-sm"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-4/5 h-4/5 rounded-full bg-white/15 backdrop-blur-sm"
          animate={{ rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <div className="w-3/5 h-3/5 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center" />
      </div>,
      
      // Futuristic squircle
      <motion.div 
        className="w-24 h-24 bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg relative z-10"
        style={{ borderRadius: '40%' }}
        animate={{ borderRadius: ['40%', '25%', '40%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />,
      
      // Glass square with glinting corner
      <div className="relative w-24 h-24 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center z-10 overflow-hidden">
        <motion.div 
          className="absolute -right-10 -top-10 w-20 h-20 bg-white/40"
          animate={{ x: [-30, 0, -30], y: [-30, 0, -30] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 border border-white/20 rounded-lg" />
      </div>
    ];
    
    return iconDesigns[index % iconDesigns.length];
  };

  const cardHover = {
    rest: { scale: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    hover: { 
      scale: 1.03, 
      boxShadow: '0 10px 15px rgba(0,0,0,0.15)',
      transition: { duration: 0.3 }
    }
  };
  
  // Academic programmes offered by the School of Health Sciences
  const programmes = [
    {
      id: 1,
      title: "Bachelor of Science in Clinical Nutrition and Dietetics",
      level: "Undergraduate",
      duration: "4 years",
      description: "Comprehensive program focusing on nutrition science, dietetics, and clinical nutrition management.",
      gradient: "from-blue-500 to-green-400",
      icon: "fa-apple-whole",  // Updated icon
      pattern: "radial"
    },
    {
      id: 2,
      title: "Bachelor of Arts in General Counselling",
      level: "Undergraduate",
      duration: "4 years",
      description: "Training in counseling techniques, psychological support, and mental health services.",
      gradient: "from-purple-500 to-indigo-400",
      icon: "fa-brain",  // Updated icon
      pattern: "diagonal"
    },
    {
      id: 3,
      title: "Bachelor of Pharmacy",
      level: "Undergraduate",
      duration: "5 years",
      description: "Comprehensive education in pharmaceutical sciences, drug therapy, and patient care services.",
      gradient: "from-red-500 to-orange-400",
      icon: "fa-pills",  // Updated icon
      pattern: "mesh"
    },
    {
      id: 4,
      title: "Bachelor of Science in Radiography",
      level: "Undergraduate",
      duration: "4 years",
      description: "Training in medical imaging techniques, radiation safety, and diagnostic procedures.",
      gradient: "from-blue-400 to-blue-600",
      icon: "fa-x-ray",  // Updated icon
      pattern: "wave"
    },
    {
      id: 5,
      title: "Bachelor of Physiotherapy",
      level: "Undergraduate",
      duration: "4 years",
      description: "Study of physical rehabilitation, therapeutic exercises, and injury management.",
      gradient: "from-green-400 to-teal-500",
      icon: "fa-user-injured",  // Updated icon
      pattern: "dots"
    },
    {
      id: 6,
      title: "Bachelor of Science in Speech and Language Therapy",
      level: "Undergraduate",
      duration: "4 years",
      description: "Specialized training in communication disorders, speech therapy, and language rehabilitation.",
      gradient: "from-pink-500 to-rose-400",
      icon: "fa-volume-high",  // Updated icon
      pattern: "circles"
    },
    {
      id: 7,
      title: "Diploma in Prosthetics & Orthotics",
      level: "Diploma",
      duration: "3 years",
      description: "Training in design and fabrication of prosthetic limbs and orthotic devices.",
      gradient: "from-yellow-400 to-amber-500",
      icon: "fa-bone",  // Updated icon
      pattern: "zigzag"
    },
    {
      id: 8,
      title: "Diploma in General Counselling",
      level: "Diploma",
      duration: "2 years",
      description: "Foundation in counseling principles, techniques, and ethical practice.",
      gradient: "from-violet-500 to-purple-400",
      icon: "fa-heart-pulse",  // Updated icon
      pattern: "bubbles"
    }
  ];
  
  // Programme Cards component with compact grid layout showing all cards at once
  const ProgrammeCards = () => {
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
                    <i className={`fa-solid ${programme.icon} text-white text-2xl`} />
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

  const feeStructure = [
    {
      id: 1,
      program: "Bachelor of Science in Clinical Nutrition and Dietetics",
      tuitionOnly: "K 28,000",
      year1Total: "K 38,500",
      year1Registration: "K 2,500",
      otherYearsTotal: "K 30,500",
      otherYearsRegistration: "K 2,500"
    },
    {
      id: 2,
      program: "Bachelor of Arts in General Counselling",
      tuitionOnly: "K 25,000",
      year1Total: "K 35,500",
      year1Registration: "K 2,500",
      otherYearsTotal: "K 27,500",
      otherYearsRegistration: "K 2,500"
    },
    {
      id: 3,
      program: "Bachelor of Pharmacy",
      tuitionOnly: "K 32,000",
      year1Total: "K 42,500",
      year1Registration: "K 2,500",
      otherYearsTotal: "K 34,500",
      otherYearsRegistration: "K 2,500"
    },
    {
      id: 4,
      program: "Bachelor of Science in Radiography",
      tuitionOnly: "K 30,000",
      year1Total: "K 40,500",
      year1Registration: "K 2,500",
      otherYearsTotal: "K 32,500",
      otherYearsRegistration: "K 2,500"
    },
    {
      id: 5,
      program: "Bachelor of Physiotherapy",
      tuitionOnly: "K 28,000",
      year1Total: "K 38,500",
      year1Registration: "K 2,500",
      otherYearsTotal: "K 30,500",
      otherYearsRegistration: "K 2,500"
    },
    {
      id: 6,
      program: "Bachelor of Science in Speech and Language Therapy",
      tuitionOnly: "K 28,000",
      year1Total: "K 38,500",
      year1Registration: "K 2,500",
      otherYearsTotal: "K 30,500",
      otherYearsRegistration: "K 2,500"
    },
    {
      id: 7,
      program: "Diploma in Prosthetics & Orthotics",
      tuitionOnly: "K 22,000",
      year1Total: "K 32,500",
      year1Registration: "K 2,500",
      otherYearsTotal: "K 24,500",
      otherYearsRegistration: "K 2,500"
    },
    {
      id: 8,
      program: "Diploma in General Counselling",
      tuitionOnly: "K 20,000",
      year1Total: "K 30,500",
      year1Registration: "K 2,500",
      otherYearsTotal: "K 22,500",
      otherYearsRegistration: "K 2,500"
    }
  ];
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <main className="school-page bg-white">
      {/* Hero Banner */}
      <section className="hero-banner relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/soh-banner.jpg" 
            alt="School of Health Sciences" 
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/50"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center text-white">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4 text-sm md:text-base">
                <Link href="/" className="text-blue-200 hover:text-white transition">Home</Link>
                <span className="mx-2"><i className="fa fa-chevron-right text-xs"></i></span>
                <Link href="/academics" className="text-blue-200 hover:text-white transition">Academics</Link>
                <span className="mx-2"><i className="fa fa-chevron-right text-xs"></i></span>
                <Link href="/academics/schools" className="text-blue-200 hover:text-white transition">Schools</Link>
                <span className="mx-2"><i className="fa fa-chevron-right text-xs"></i></span>
                <span className="text-white">School of Health Sciences</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">School of Health Sciences</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">Educating healthcare professionals through excellence in teaching, research, and clinical practice</p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#academic-programmes" 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 flex items-center"
                >
                  Academic Programmes <i className="fa fa-arrow-right ml-2"></i>
                </Link>
                <Link 
                  href="#fee-structure" 
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium rounded-md transition duration-300 flex items-center"
                >
                  Fee Structure <i className="fa fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Overview with Dean */}
      <section className="overview-section py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dean's Profile */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="dean-profile bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center">
  <div className="w-48 h-48 mt-8 mb-4 relative rounded-full overflow-hidden border-4 border-blue-200 shadow">
    <Image
      src="/assets/images/schools/SOHS RICHARD.png"
      alt="Dr. Richard Kunda"
      fill
      className="object-cover object-center"
      priority
    />
  </div>
  <div className="p-6 text-center">
    <h3 className="text-2xl font-bold mb-1">Dr. Richard Kunda</h3>
    <p className="text-blue-700 font-medium mb-2">Dean – School of Health Sciences</p>
    <p className="text-gray-700">BSc, MSc, PhD</p>
  </div>
</div>
            </motion.div>
            
            {/* School Overview */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <p className="text-lg mb-4">
                  The School of Health Sciences is one of the Schools at Levy Mwanawasa Medical University. The School offers both Degree and Diploma Programmes in the following disciplines: Clinical Nutrition and Dietetics, Pharmacy, Radiography, Physiotherapy, Speech and Language Therapy, Prosthetics & Orthotics, and General Counselling. The School is committed to producing highly skilled graduates who will contribute to the improvement of health care delivery in Zambia and beyond.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <i className="fa fa-graduation-cap text-blue-600 text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold">Our Mission</h3>
                  </div>
                  <p>To educate and train competent, compassionate healthcare professionals who will contribute to improving health outcomes in Zambia and beyond.</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <i className="fa fa-eye text-blue-600 text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold">Our Vision</h3>
                  </div>
                  <p>To be a center of excellence in health sciences education, research, and innovation that addresses the healthcare challenges of the 21st century.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      

      {/* Academic Programmes Section */}
      <section id="academic-programmes" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Academic Programmes</h2>
            <div className="mx-auto mb-8 h-1.5 w-20 rounded bg-blue-600"></div>
            <p className="mx-auto max-w-3xl text-lg text-gray-700">
              Explore the full range of academic programmes offered by the School of Health Sciences. Each programme is designed to provide specialized knowledge and skills for future healthcare professionals.
            </p>
          </motion.div>

          {/* Using ProgrammeCards component with auto-scrolling */}
          <ProgrammeCards />
        </div>
      </section>
      
      {/* Fee Structure */}
      <section id="fee-structure" className="fee-structure-section py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Fee Structure</h2>
            <div className="mx-auto mb-8 h-1.5 w-20 rounded bg-blue-600"></div>
            <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
              <h3 className="text-xl font-bold mb-2">PROGRAMME FEES</h3>
              <table className="min-w-[600px] bg-white border border-black">
                <thead>
                  <tr className="bg-blue-100 text-black">
                    <th className="py-2 px-4 border border-black">PROGRAM</th>
                    <th className="py-2 px-4 border border-black">TUITION FEE ONLY</th>
                    <th className="py-2 px-4 border border-black">YEAR 1 TUITION FEE, INDEX FEE & OTHER FEES</th>
                    <th className="py-2 px-4 border border-black">YEAR 1 REGISTRATION FEE</th>
                    <th className="py-2 px-4 border border-black">OTHER YEARS' TUITION FEE & OTHER FEES</th>
                    <th className="py-2 px-4 border border-black">OTHER YEARS' REGISTRATION FEE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border border-black">Bachelor Of Science In Clinical Nutrition And Dietetics</td>
                    <td className="py-3 px-4 border border-black">K16,692</td>
                    <td className="py-3 px-4 border border-black">K19,673</td>
                    <td className="py-3 px-4 border border-black">K4,918.25</td>
                    <td className="py-3 px-4 border border-black">K19,317</td>
                    <td className="py-3 px-4 border border-black">K4,829.25</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border border-black">Bachelor Of Science In Radiography</td>
                    <td className="py-3 px-4 border border-black">K16,692</td>
                    <td className="py-3 px-4 border border-black">K19,673</td>
                    <td className="py-3 px-4 border border-black">K4,918.25</td>
                    <td className="py-3 px-4 border border-black">K19,317</td>
                    <td className="py-3 px-4 border border-black">K4,829.25</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border border-black">Bachelor Of Pharmacy</td>
                    <td className="py-3 px-4 border border-black">K16,692</td>
                    <td className="py-3 px-4 border border-black">K19,673</td>
                    <td className="py-3 px-4 border border-black">K4,918.25</td>
                    <td className="py-3 px-4 border border-black">K19,317</td>
                    <td className="py-3 px-4 border border-black">K4,829.25</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border border-black">Bachelor Of Physiotherapy</td>
                    <td className="py-3 px-4 border border-black">K16,692</td>
                    <td className="py-3 px-4 border border-black">K19,673</td>
                    <td className="py-3 px-4 border border-black">K4,918.25</td>
                    <td className="py-3 px-4 border border-black">K19,317</td>
                    <td className="py-3 px-4 border border-black">K4,829.25</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border border-black">Bachelor Of Science In Speech And Language Therapy</td>
                    <td className="py-3 px-4 border border-black">K16,692</td>
                    <td className="py-3 px-4 border border-black">K19,673</td>
                    <td className="py-3 px-4 border border-black">K4,918.25</td>
                    <td className="py-3 px-4 border border-black">K19,317</td>
                    <td className="py-3 px-4 border border-black">K4,829.25</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border border-black">Bachelor Of Arts In General Counselling</td>
                    <td className="py-3 px-4 border border-black">K9,725</td>
                    <td className="py-3 px-4 border border-black">K12,350</td>
                    <td className="py-3 px-4 border border-black">K3087.50</td>
                    <td className="py-3 px-4 border border-black">K12,350</td>
                    <td className="py-3 px-4 border border-black">K3087.50</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border border-black">Diploma In General Counselling</td>
                    <td className="py-3 px-4 border border-black">K9,725</td>
                    <td className="py-3 px-4 border border-black">K12,570</td>
                    <td className="py-3 px-4 border border-black">K3,142.50</td>
                    <td className="py-3 px-4 border border-black">K12,350</td>
                    <td className="py-3 px-4 border border-black">K3,087.50</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border border-black">Diploma Prostetics & Orthotics</td>
                    <td className="py-3 px-4 border border-black">K9,725</td>
                    <td className="py-3 px-4 border border-black">K12,570</td>
                    <td className="py-3 px-4 border border-black">K3,142.50</td>
                    <td className="py-3 px-4 border border-black">K12,350</td>
                    <td className="py-3 px-4 border border-black">K3,087.50</td>
                  </tr>
                </tbody>
              </table>
              <div className="my-8"></div>
              <div className="flex flex-col md:flex-row gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">OTHER FEES</h3>
                  <table className="min-w-[300px] bg-white border border-black">
                    <thead>
                      <tr className="bg-blue-100 text-black">
                        <th className="py-2 px-4 border border-black">OTHER FEES</th>
                        <th className="py-2 px-4 border border-black">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border border-black">Registration</td>
                        <td className="py-2 px-4 border border-black">K100</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">Recreation</td>
                        <td className="py-2 px-4 border border-black">K150</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">Medical</td>
                        <td className="py-2 px-4 border border-black">K100</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">Maintenance</td>
                        <td className="py-2 px-4 border border-black">K200</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">Student Guild</td>
                        <td className="py-2 px-4 border border-black">K200</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">Library Services</td>
                        <td className="py-2 px-4 border border-black">K475</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">Internet</td>
                        <td className="py-2 px-4 border border-black">K200</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">Examination</td>
                        <td className="py-2 px-4 border border-black">K200</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">Practical</td>
                        <td className="py-2 px-4 border border-black">K900</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">Student ID card</td>
                        <td className="py-2 px-4 border border-black">K100</td>
                      </tr>
                      <tr className="bg-blue-50 font-bold">
                        <td className="py-2 px-4 border border-black">TOTAL</td>
                        <td className="py-2 px-4 border border-black">K2,625</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">INDEX FEES</h3>
                  <table className="min-w-[300px] bg-white border border-black">
                    <thead>
                      <tr className="bg-blue-100 text-black">
                        <th className="py-2 px-4 border border-black">INDEX FEES</th>
                        <th className="py-2 px-4 border border-black">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border border-black">GNC</td>
                        <td className="py-2 px-4 border border-black">K356</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">HPCZ DEGREE</td>
                        <td className="py-2 px-4 border border-black">K250</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">HPCZ DIPLOMA</td>
                        <td className="py-2 px-4 border border-black">K220</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">HPCZ CERTIFICATE</td>
                        <td className="py-2 px-4 border border-black">K190</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Facilities */}
      <section className="facilities-section py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Facilities</h2>
            <div className="mx-auto mb-8 h-1.5 w-20 rounded bg-blue-600"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The School of Health Sciences is equipped with state-of-the-art facilities to support teaching and learning
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <motion.div 
                className="facility-card text-center p-6 bg-white rounded-xl shadow-md h-full"
                initial="rest"
                whileHover="hover"
                variants={cardHover}
              >
                <div className="icon mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fa fa-flask text-blue-600 text-2xl"></i>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3">Laboratories</h4>
                <p className="text-gray-600">Modern laboratories for clinical skills, medical sciences, and research.</p>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <motion.div 
                className="facility-card text-center p-6 bg-white rounded-xl shadow-md h-full"
                initial="rest"
                whileHover="hover"
                variants={cardHover}
              >
                <div className="icon mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fa fa-user-md text-blue-600 text-2xl"></i>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3">Simulation Center</h4>
                <p className="text-gray-600">Advanced simulation facilities for clinical training and practice.</p>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <motion.div 
                className="facility-card text-center p-6 bg-white rounded-xl shadow-md h-full"
                initial="rest"
                whileHover="hover"
                variants={cardHover}
              >
                <div className="icon mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fa fa-book text-blue-600 text-2xl"></i>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3">Resource Center</h4>
                <p className="text-gray-600">Comprehensive library with digital and print resources for health sciences.</p>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <motion.div 
                className="facility-card text-center p-6 bg-white rounded-xl shadow-md h-full"
                initial="rest"
                whileHover="hover"
                variants={cardHover}
              >
                <div className="icon mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fa fa-desktop text-blue-600 text-2xl"></i>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3">Computer Labs</h4>
                <p className="text-gray-600">Well-equipped computer laboratories with specialized software.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
