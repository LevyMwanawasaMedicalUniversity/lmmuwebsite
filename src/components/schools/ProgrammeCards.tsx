"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
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
          <div className="h-32 relative overflow-hidden" style={{ background: `linear-gradient(to bottom right, ${programme.gradient.split('from-')[1]?.split(' ')[0] || '#3b82f6'}, ${programme.gradient.split('to-')[1] || '#1e40af'})` }}>
            <div className="absolute inset-0 opacity-20" style={getPatternStyle(programme.pattern)}></div>
            <ClientAnimation>
              <div className="absolute inset-0 pointer-events-none">
                {getDecorativeElements(index)}
              </div>
            </ClientAnimation>
            <ClientAnimation>
              <div className="absolute inset-0 flex items-center justify-center">
                {React.cloneElement(getIconContainerStyle(index), {}, 
                  <i className={`fa-solid ${programme.icon} text-white text-2xl`} />
                )}
              </div>
            </ClientAnimation>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {programme.title}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="mr-3"> {programme.level} </span>
              <span> {programme.duration} </span>
            </div>
            <p className="text-sm text-gray-600 mt-auto">
              {programme.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
