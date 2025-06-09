"use client";

import { useContext } from 'react';
import { LoadingContext } from '@/components/providers/LoadingProvider';

// Hook to access and control the loading state
export default function useLoading() {
  const context = useContext(LoadingContext);
  
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  
  const { isLoading, setManualLoading } = context;
  
  // Helper function to show loader during async operations
  const withLoading = async (asyncFunction) => {
    try {
      setManualLoading(true);
      return await asyncFunction();
    } finally {
      setManualLoading(false);
    }
  };
  
  return {
    isLoading,
    setLoading: setManualLoading,
    withLoading,
  };
}
