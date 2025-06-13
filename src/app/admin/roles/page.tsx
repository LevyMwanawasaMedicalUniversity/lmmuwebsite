import { Metadata } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import RolesManagement from '@/components/admin/RolesManagement';

export const metadata: Metadata = {
  title: 'Role Management - LMMU Admin',
  description: 'Manage user roles and their permissions',
};

export default function RolesPage() {
  return (
    <AdminLayout>
      <RolesManagement />
    </AdminLayout>
  );
}
