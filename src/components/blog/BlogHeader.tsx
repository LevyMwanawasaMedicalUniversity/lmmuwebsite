"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface BlogHeaderProps {
  title: string;
  subtitle: string;
}

export default function BlogHeader({ title, subtitle }: BlogHeaderProps): React.ReactNode {
  return (
    <motion.div 
      className="text-center mb-5 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="position-relative gradient-container gradient-gold pattern-container pattern-dots py-5 rounded-4 shadow-sm">
        <div className="circle-decoration circle-medium pos-top-right"></div>
        <div className="triangle-decoration triangle-small pos-bottom-left"></div>
        
        <h1 className="display-4 fw-bold text-white mb-3">{title}</h1>
        <p className="lead text-white mb-0 px-3">{subtitle}</p>
      </div>
    </motion.div>
  );
}
