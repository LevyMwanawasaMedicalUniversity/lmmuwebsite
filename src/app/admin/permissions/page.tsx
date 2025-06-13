import { Metadata } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import PermissionsManagement from '@/components/admin/PermissionsManagement';

export const metadata: Metadata = {
  title: 'Permission Management - LMMU Admin',
  description: 'Manage system permissions',
};

export default function PermissionsPage() {
  return (
    <AdminLayout>
      <PermissionsManagement />
    </AdminLayout>
  );
}
