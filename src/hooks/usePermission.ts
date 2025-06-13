"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

/**
 * Hook to check if the current user has a specific permission
 * @param permissionName The name of the permission to check
 * @returns An object with isLoading, hasPermission, and error states
 */
export function usePermission(permissionName: string) {
  const { data: session, status } = useSession();
  const [hasPermission, setHasPermission] = useState(false);
  
  // If session is loading, we're loading
  const isLoading = status === 'loading';
  
  // If user is admin, they have all permissions
  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        setHasPermission(true);
        return;
      }
      
      // Otherwise, need to check user permissions
      checkPermission();
    } else if (status === 'unauthenticated') {
      setHasPermission(false);
    }
  }, [status, session, permissionName]);
  
  // Function to fetch and check the permission
  const checkPermission = async () => {
    if (!session?.user?.id) return;
    
    try {
      const response = await fetch(`/api/permissions/check?permission=${permissionName}`);
      if (response.ok) {
        const data = await response.json();
        setHasPermission(data.hasPermission);
      } else {
        setHasPermission(false);
      }
    } catch (error) {
      console.error('Error checking permission:', error);
      setHasPermission(false);
    }
  };
  
  return {
    isLoading,
    hasPermission,
    isAdmin: session?.user?.role === 'admin'
  };
}

/**
 * Hook to get all permissions for the current user
 * @returns Object with permissions data, loading state, and error
 */
export function useUserPermissions() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  
  // Only fetch permissions if we have a user ID
  const { data, error, isLoading } = useSWR(
    userId ? `/api/permissions/user` : null,
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch permissions');
      }
      return res.json();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );
  
  return {
    permissions: data?.permissions || [],
    isLoading: status === 'loading' || isLoading,
    error: error
  };
}
