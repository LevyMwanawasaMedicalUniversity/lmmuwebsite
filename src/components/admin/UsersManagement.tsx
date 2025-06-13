"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { UserPlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import PermissionGuard from '@/components/auth/PermissionGuard';
import toast, { Toaster } from 'react-hot-toast';

export default function UsersManagement() {
  // State for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: 'user',
    roles: [] as number[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Fetch users with pagination
  const { data: userData, error: userError, mutate: mutateUsers } = useSWR(
    `/api/users?page=${page}&limit=${limit}`,
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    }
  );
  
  // Fetch available roles
  const { data: rolesData } = useSWR('/api/roles', async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch roles');
    return res.json();
  });
  
  // Set form data when editing a user
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        username: currentUser.username || '',
        password: '', // Password is not returned from API
        role: currentUser.role || 'user',
        roles: currentUser.userRoles?.map((ur: any) => ur.role.id) || []
      });
    } else {
      // Reset form when creating new user
      setFormData({
        name: '',
        email: '',
        username: '',
        password: '',
        role: 'user',
        roles: []
      });
    }
  }, [currentUser]);
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle role checkbox changes
  const handleRoleChange = (roleId: number) => {
    setFormData(prev => {
      const currentRoles = [...prev.roles];
      if (currentRoles.includes(roleId)) {
        // Remove role if already selected
        return { ...prev, roles: currentRoles.filter(id => id !== roleId) };
      } else {
        // Add role if not selected
        return { ...prev, roles: [...currentRoles, roleId] };
      }
    });
  };
  
  // Handle form submission (create or update user)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.username) {
      toast.error('Name, email, and username are required');
      return;
    }
    
    // When editing, password is optional
    if (!currentUser && !formData.password) {
      toast.error('Password is required for new users');
      return;
    }

    setIsSubmitting(true);
    
    // Create submission data (omit empty password when editing)
    const submissionData = {...formData};
    if (currentUser && !submissionData.password) {
      delete submissionData.password;
    }

    try {
      const url = currentUser 
        ? `/api/users/${currentUser.id}` 
        : '/api/users';
      
      const method = currentUser ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${currentUser ? 'update' : 'create'} user`);
      }

      toast.success(`User ${currentUser ? 'updated' : 'created'} successfully`);
      
      // Close modal and refresh users list
      setIsModalOpen(false);
      mutateUsers();
    } catch (error: any) {
      console.error(`Error ${currentUser ? 'updating' : 'creating'} user:`, error);
      toast.error(error.message || `Failed to ${currentUser ? 'update' : 'create'} user`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle edit user
  const handleEdit = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const userData = await response.json();
      setCurrentUser(userData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Failed to fetch user details');
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete user');
      }

      // Refresh users list
      toast.success('User deleted successfully');
      mutateUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Failed to delete user');
    }
  };

  // Loading state
  if (!userData && !userError) {
    return <div className="p-4 text-center">Loading users...</div>;
  }

  // Error state
  if (userError) {
    return <div className="p-4 text-center text-red-500">Failed to load users</div>;
  }
  return (
    <PermissionGuard adminOnly>
      <div className="container mx-auto p-4">
        <Toaster position="top-right" />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button
            onClick={() => {
              setCurrentUser(null);
              setIsModalOpen(true);
            }}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <UserPlusIcon className="w-5 h-5 mr-2" />
            New User
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custom Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userData?.users?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No users found</td>
                </tr>
              ) : (
                userData?.users?.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.userRoles?.map((userRole: any) => (
                          <span 
                            key={userRole.role.id} 
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {userRole.role.name}
                          </span>
                        ))}
                        {user._count.userRoles === 0 && <span className="text-gray-400 text-sm">None</span>}                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm">{user._count.userPermissions || 0}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                        <Link 
                          href={`/admin/users/${user.id}/roles-permissions`}
                          className="text-green-600 hover:text-green-900 ml-1"
                          title="Manage Roles & Permissions"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-700">
                Showing <span className="font-medium">{((page - 1) * limit) + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(page * limit, userData?.pagination?.total || 0)}
                </span> of{' '}
                <span className="font-medium">{userData?.pagination?.total || 0}</span> users
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= (userData?.pagination?.pages || 1)}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        
        {/* Modal for Create/Edit User */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {currentUser ? 'Edit User' : 'Create New User'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!currentUser}
                    />
                    {currentUser && (
                      <p className="mt-1 text-xs text-gray-500">
                        Leave blank to keep the current password
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500">
                      Legacy role field (for backward compatibility)
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Roles
                    </label>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200 max-h-48 overflow-y-auto">
                      {rolesData && rolesData.roles && rolesData.roles.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {rolesData.roles.map((role: any) => (
                            <div key={role.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`role-${role.id}`}
                                checked={formData.roles.includes(role.id)}
                                onChange={() => handleRoleChange(role.id)}
                                className="rounded text-blue-600 focus:ring-blue-500"
                              />
                              <label htmlFor={`role-${role.id}`} className="text-sm text-gray-700">
                                {role.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Loading roles...</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting 
                      ? (currentUser ? 'Saving...' : 'Creating...') 
                      : (currentUser ? 'Save Changes' : 'Create User')}
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
