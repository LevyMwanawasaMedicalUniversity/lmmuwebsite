"use client";

import { useState, useEffect, createContext, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loader from '@/components/ui/Loader';

export const LoadingContext = createContext({
  isLoading: false,
  setManualLoading: () => {},
});

// SearchParams wrapper component with suspense
export default function LoadingProvider({ children }) {
  return (
    <Suspense fallback={<div className="global-loading-fallback">Loading...</div>}>
      <LoadingState>{children}</LoadingState>
    </Suspense>
  );
}

// Component that safely uses searchParams
function LoadingState({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isManualLoading, setManualLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track navigation changes
  useEffect(() => {
    let timeoutId = null;
    
    // Start loading
    const handleStart = () => {
      // Only show loader after a delay to avoid flashing on fast connections
      timeoutId = setTimeout(() => {
        setIsLoading(true);
      }, 300);
    };
    
    // Complete loading
    const handleComplete = () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
    };

    // Add event listeners for navigation
    window.addEventListener('beforeunload', handleStart);
    
    // For slow resources loading
    if (document.readyState !== 'complete') {
      handleStart();
      window.addEventListener('load', handleComplete);
    }

    // Clean up
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, [pathname, searchParams]);

  // Show loader if either navigation is happening or manual loading is set
  const showLoader = isLoading || isManualLoading;

  return (
    <LoadingContext.Provider value={{ isLoading: showLoader, setManualLoading }}>
      {showLoader && <Loader />}
      {children}
    </LoadingContext.Provider>
  );
}

// This export is now moved to be the default export above
