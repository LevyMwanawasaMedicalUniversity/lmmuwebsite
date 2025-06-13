import { Metadata } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import UsersManagement from '@/components/admin/UsersManagement';

export const metadata: Metadata = {
  title: 'User Management - LMMU Admin',
  description: 'Manage users, roles and permissions',
};

export default function UsersPage() {
  return (
    <AdminLayout>
      <UsersManagement />
    </AdminLayout>
  );
}
