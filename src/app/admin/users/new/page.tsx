import UserForm from '@/components/admin/UserForm';

export const metadata = {
  title: 'Create New User - LMMU Admin',
  description: 'Create a new user in the LMMU Website'
};

export default function NewUserPage() {
  return <UserForm />;
}
