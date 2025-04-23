
import { UsersList } from '@/features/users/UsersList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Usuarios',
  description: 'Gestión de usuarios de la plataforma',
};

export default function UsuariosPage() {
  return <UsersList />;
}
