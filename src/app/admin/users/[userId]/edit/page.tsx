import UserFormEdit from '@/components/admin/UserFormEdit';

interface EditUserPageProps {
  params: {
    userId: string;
  }
}

export const metadata = {
  title: 'Edit User - LMMU Admin',
  description: 'Edit user details in the LMMU Website'
};

export default function EditUserPage({ params }: EditUserPageProps) {
  return <UserFormEdit userId={params.userId} />;
}
