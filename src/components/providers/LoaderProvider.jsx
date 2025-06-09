"use client";

import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';

// Create context for loader state
export const LoaderContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
});

export default function LoaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Set up event listeners for Next.js router events
  useEffect(() => {
    // Function to handle slow connections
    let slowConnectionTimeout;
    
    // Show loader only if navigation takes longer than 300ms
    // This prevents flashing on fast connections
    const handleLoadingStart = () => {
      slowConnectionTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 300);
    };
    
    const handleLoadingEnd = () => {
      clearTimeout(slowConnectionTimeout);
      setIsLoading(false);
    };

    // Add event listeners for navigation events
    window.addEventListener('beforeunload', handleLoadingStart);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        handleLoadingStart();
      }
    });

    // Clean up event listeners
    return () => {
      clearTimeout(slowConnectionTimeout);
      window.removeEventListener('beforeunload', handleLoadingStart);
      document.removeEventListener('visibilitychange', handleLoadingStart);
    };
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}
