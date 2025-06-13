"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { PlusCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import PermissionGuard from '@/components/auth/PermissionGuard';

export default function RolesManagement() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch roles
  const { data: rolesData, error: rolesError, mutate: mutateRoles } = useSWR('/api/roles', async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch roles');
    return res.json();
  });

  // Fetch permissions for assignment
  const { data: permissionsData } = useSWR('/api/permissions', async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch permissions');
    return res.json();
  });

  // Set form data when editing a role
  useEffect(() => {
    if (currentRole) {
      setFormData({
        name: currentRole.name,
        description: currentRole.description || '',
      });

      // Extract permission IDs from role
      if (currentRole.rolePermissions) {
        setSelectedPermissions(
          currentRole.rolePermissions.map((rp: any) => rp.permission.id)
        );
      }
    } else {
      setFormData({ name: '', description: '' });
      setSelectedPermissions([]);
    }
  }, [currentRole]);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle permission checkbox change
  const handlePermissionChange = (permissionId: number) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  // Handle create/update role
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = currentRole ? `/api/roles/${currentRole.id}` : '/api/roles';
      const method = currentRole ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          permissions: selectedPermissions,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save role');
      }

      // Close modal and reset form
      setIsModalOpen(false);
      setCurrentRole(null);
      // Refresh roles list
      mutateRoles();
    } catch (error: any) {
      console.error('Error saving role:', error);
      alert(error.message || 'Failed to save role');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete role
  const handleDelete = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this role?')) return;

    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete role');
      }

      // Refresh roles list
      mutateRoles();
    } catch (error: any) {
      console.error('Error deleting role:', error);
      alert(error.message || 'Failed to delete role');
    }
  };

  // Handle open modal for editing
  const handleEdit = async (roleId: number) => {
    try {
      const response = await fetch(`/api/roles/${roleId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch role details');
      }
      const roleData = await response.json();
      setCurrentRole(roleData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching role details:', error);
      alert('Failed to fetch role details');
    }
  };

  // Loading state
  if (!rolesData && !rolesError) {
    return <div className="p-4 text-center">Loading roles...</div>;
  }

  // Error state
  if (rolesError) {
    return <div className="p-4 text-center text-red-500">Failed to load roles</div>;
  }

  return (
    <PermissionGuard adminOnly>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Role Management</h1>
          <button
            onClick={() => {
              setCurrentRole(null);
              setIsModalOpen(true);
            }}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            New Role
          </button>
        </div>

        {/* Roles Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rolesData?.roles?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No roles found</td>
                </tr>
              ) : (
                rolesData?.roles?.map((role: any) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                    <td className="px-6 py-4">{role.description || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{role._count.users}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{role._count.rolePermissions}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(role.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(role.id)}
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

        {/* Modal for Create/Edit Role */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
              <h2 className="text-xl font-semibold mb-4">
                {currentRole ? 'Edit Role' : 'Create New Role'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  
                  <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
                    {permissionsData?.permissions?.length === 0 ? (
                      <p className="text-gray-500 text-sm">No permissions available</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {permissionsData?.permissions?.map((permission: any) => (
                          <div key={permission.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`permission-${permission.id}`}
                              checked={selectedPermissions.includes(permission.id)}
                              onChange={() => handlePermissionChange(permission.id)}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`permission-${permission.id}`} className="ml-2 text-sm text-gray-700">
                              {permission.name}
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
                      setCurrentRole(null);
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
                    {isSubmitting ? 'Saving...' : currentRole ? 'Update' : 'Create'}
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
