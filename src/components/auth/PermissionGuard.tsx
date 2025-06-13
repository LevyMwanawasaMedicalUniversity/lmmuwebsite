"use client";

import { ReactNode } from 'react';
import { usePermission } from '@/hooks/usePermission';
import { useSession } from 'next-auth/react';

interface PermissionGuardProps {
  permission?: string;
  adminOnly?: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Component that conditionally renders content based on user permissions
 * 
 * @param permission - The permission name required to view the content
 * @param adminOnly - If true, only admins can view the content (overrides permission)
 * @param fallback - Optional content to show when permission is denied
 * @param children - Content to show when permission is granted
 */
export default function PermissionGuard({
  permission,
  adminOnly = false,
  fallback = null,
  children,
}: PermissionGuardProps) {
  const { data: session, status } = useSession();
  const { hasPermission, isLoading } = permission ? usePermission(permission) : { hasPermission: true, isLoading: false };

  // If still loading, show nothing or a loading state
  if (status === 'loading' || isLoading) {
    return null;
  }

  // If not authenticated, show fallback
  if (status !== 'authenticated') {
    return <>{fallback}</>;
  }

  // Admin only check
  if (adminOnly && session?.user?.role !== 'admin') {
    return <>{fallback}</>;
  }

  // Permission check
  if (permission && !hasPermission && session?.user?.role !== 'admin') {
    return <>{fallback}</>;
  }

  // User has permission, show content
  return <>{children}</>;
}
