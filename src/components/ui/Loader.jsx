"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // If not loading, don't render anything
  if (!loading) return null;

  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="heartbeat-container">
        <div className="heartbeat">
          <Image 
            src="/assets/images/logo.png" 
            alt="LMMU Logo" 
            width={100} 
            height={100}
            className="heartbeat-logo"
          />
        </div>
        <p className="loading-text">Loading...</p>
      </div>

      <style jsx global>{`
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .heartbeat-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .heartbeat {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .heartbeat::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: rgba(29, 113, 184, 0.2);
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .heartbeat-logo {
          position: relative;
          z-index: 2;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .loading-text {
          margin-top: 20px;
          font-size: 18px;
          color: #1d71b8;
          font-weight: 500;
        }

        @keyframes heartbeat {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </motion.div>
  );
}
