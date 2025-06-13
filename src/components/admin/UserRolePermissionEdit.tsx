"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import PermissionGuard from '@/components/auth/PermissionGuard';

interface UserRolePermissionEditProps {
  userId: number;
}

export default function UserRolePermissionEdit({ userId }: UserRolePermissionEditProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user data, available roles, and permissions
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch user data
        const userResponse = await fetch(`/api/users/${userId}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUser(userData);

        // Extract user's current roles and direct permissions
        const currentRoleIds = userData.userRoles?.map((ur: any) => ur.role.id) || [];
        const currentPermissionIds = userData.userPermissions?.map((up: any) => up.permission.id) || [];
        
        setSelectedRoles(currentRoleIds);
        setSelectedPermissions(currentPermissionIds);

        // Fetch available roles
        const rolesResponse = await fetch('/api/roles');
        if (!rolesResponse.ok) throw new Error('Failed to fetch roles');
        const rolesData = await rolesResponse.json();
        setRoles(rolesData.roles);

        // Fetch available permissions
        const permissionsResponse = await fetch('/api/permissions');
        if (!permissionsResponse.ok) throw new Error('Failed to fetch permissions');
        const permissionsData = await permissionsResponse.json();
        setPermissions(permissionsData.permissions);

      } catch (err: any) {
        console.error('Error loading data:', err);
        setError(err.message || 'Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Handle role selection change
  const handleRoleChange = (roleId: number) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId) 
        : [...prev, roleId]
    );
  };

  // Handle permission selection change
  const handlePermissionChange = (permissionId: number) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(id => id !== permissionId) 
        : [...prev, permissionId]
    );
  };

  // Save changes to user's roles and permissions
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      // Update user's roles
      const rolesResponse = await fetch(`/api/users/${userId}/roles`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleIds: selectedRoles })
      });
      
      if (!rolesResponse.ok) {
        const errorData = await rolesResponse.json();
        throw new Error(errorData.error || 'Failed to update roles');
      }

      // Update user's direct permissions
      const permissionsResponse = await fetch(`/api/users/${userId}/permissions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissionIds: selectedPermissions })
      });
      
      if (!permissionsResponse.ok) {
        const errorData = await permissionsResponse.json();
        throw new Error(errorData.error || 'Failed to update permissions');
      }

      // Redirect to users list
      router.push('/admin/users');
      router.refresh();
      
    } catch (err: any) {
      console.error('Error saving user roles and permissions:', err);
      setError(err.message || 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading user data...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-4">
          User not found
        </div>
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
    );
  }

  return (
    <PermissionGuard adminOnly>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()}
            className="mr-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Edit User Roles & Permissions</h1>
        </div>
        
        {/* User info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">System Role</p>
              <p className="font-medium">
                <span className={`px-2 py-0.5 rounded text-xs ${
                  user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {user.role}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Roles Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Assign Roles</h2>
            <div className="max-h-96 overflow-y-auto border border-gray-100 rounded-md p-2">
              {roles.length === 0 ? (
                <p className="text-gray-500">No roles available</p>
              ) : (
                <div className="space-y-3">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-start">
                      <input
                        type="checkbox"
                        id={`role-${role.id}`}
                        checked={selectedRoles.includes(role.id)}
                        onChange={() => handleRoleChange(role.id)}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <label htmlFor={`role-${role.id}`} className="font-medium text-gray-700">
                          {role.name}
                        </label>
                        {role.description && (
                          <p className="text-sm text-gray-500">{role.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Direct Permissions Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Direct Permissions</h2>
            <p className="text-sm text-gray-500 mb-4">
              These permissions are assigned directly to the user, in addition to any permissions granted by roles.
            </p>
            <div className="max-h-96 overflow-y-auto border border-gray-100 rounded-md p-2">
              {permissions.length === 0 ? (
                <p className="text-gray-500">No permissions available</p>
              ) : (
                <div className="space-y-3">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-start">
                      <input
                        type="checkbox"
                        id={`permission-${permission.id}`}
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={() => handlePermissionChange(permission.id)}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <label htmlFor={`permission-${permission.id}`} className="font-medium text-gray-700">
                          {permission.name}
                        </label>
                        {permission.description && (
                          <p className="text-sm text-gray-500">{permission.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </PermissionGuard>
  );
}
