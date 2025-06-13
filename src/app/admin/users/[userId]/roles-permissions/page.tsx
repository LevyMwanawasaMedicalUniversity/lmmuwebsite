import { Metadata } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import UserRolePermissionEdit from '@/components/admin/UserRolePermissionEdit';

export const metadata: Metadata = {
  title: 'Edit User Roles & Permissions - LMMU Admin',
  description: 'Edit user roles and permissions',
};

export default function UserRolesPermissionsPage({ params }: { params: { userId: string } }) {
  const userId = parseInt(params.userId);
  
  return (
    <AdminLayout>
      <UserRolePermissionEdit userId={userId} />
    </AdminLayout>
  );
}
