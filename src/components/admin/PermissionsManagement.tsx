"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { PlusCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import PermissionGuard from '@/components/auth/PermissionGuard';

export default function PermissionsManagement() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch permissions
  const { data: permissionsData, error: permissionsError, mutate: mutatePermissions } = useSWR(
    '/api/permissions',
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch permissions');
      return res.json();
    }
  );

  // Fetch roles for assignment
  const { data: rolesData } = useSWR('/api/roles', async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch roles');
    return res.json();
  });

  // Set form data when editing a permission
  useEffect(() => {
    if (currentPermission) {
      setFormData({
        name: currentPermission.name,
        description: currentPermission.description || '',
      });

      // Extract role IDs from permission
      if (currentPermission.roles) {
        setSelectedRoles(currentPermission.roles.map((r: any) => r.role.id));
      }
    } else {
      setFormData({ name: '', description: '' });
      setSelectedRoles([]);
    }
  }, [currentPermission]);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle role checkbox change
  const handleRoleChange = (roleId: number) => {
    setSelectedRoles(prev => {
      if (prev.includes(roleId)) {
        return prev.filter(id => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  // Handle create/update permission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = currentPermission ? `/api/permissions/${currentPermission.id}` : '/api/permissions';
      const method = currentPermission ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          roles: selectedRoles,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save permission');
      }

      // Close modal and reset form
      setIsModalOpen(false);
      setCurrentPermission(null);
      // Refresh permissions list
      mutatePermissions();
    } catch (error: any) {
      console.error('Error saving permission:', error);
      alert(error.message || 'Failed to save permission');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete permission
  const handleDelete = async (permissionId: number) => {
    if (!confirm('Are you sure you want to delete this permission?')) return;

    try {
      const response = await fetch(`/api/permissions/${permissionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete permission');
      }

      // Refresh permissions list
      mutatePermissions();
    } catch (error: any) {
      console.error('Error deleting permission:', error);
      alert(error.message || 'Failed to delete permission');
    }
  };

  // Handle open modal for editing
  const handleEdit = async (permissionId: number) => {
    try {
      const response = await fetch(`/api/permissions/${permissionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch permission details');
      }
      const permissionData = await response.json();
      setCurrentPermission(permissionData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching permission details:', error);
      alert('Failed to fetch permission details');
    }
  };

  // Loading state
  if (!permissionsData && !permissionsError) {
    return <div className="p-4 text-center">Loading permissions...</div>;
  }

  // Error state
  if (permissionsError) {
    return <div className="p-4 text-center text-red-500">Failed to load permissions</div>;
  }

  return (
    <PermissionGuard adminOnly>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Permission Management</h1>
          <button
            onClick={() => {
              setCurrentPermission(null);
              setIsModalOpen(true);
            }}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            New Permission
          </button>
        </div>

        {/* Permissions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {permissionsData?.permissions?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No permissions found</td>
                </tr>
              ) : (
                permissionsData?.permissions?.map((permission: any) => (
                  <tr key={permission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{permission.name}</td>
                    <td className="px-6 py-4">{permission.description || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{permission._count.roles}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{permission._count.users}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(permission.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(permission.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination controls would go here */}
        </div>

        {/* Modal for Create/Edit Permission */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
              <h2 className="text-xl font-semibold mb-4">
                {currentPermission ? 'Edit Permission' : 'Create New Permission'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Roles</label>
                  
                  <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
                    {rolesData?.roles?.length === 0 ? (
                      <p className="text-gray-500 text-sm">No roles available</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {rolesData?.roles?.map((role: any) => (
                          <div key={role.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`role-${role.id}`}
                              checked={selectedRoles.includes(role.id)}
                              onChange={() => handleRoleChange(role.id)}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`role-${role.id}`} className="ml-2 text-sm text-gray-700">
                              {role.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setCurrentPermission(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : currentPermission ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PermissionGuard>
  );
}
