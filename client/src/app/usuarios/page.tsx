import { Suspense } from 'react';
import { UsersListWrapper } from '@/features/users/UsersListWrapper';
import { Metadata } from 'next';
import { LoaderFallback } from '@/components/LoaderOrError/LoaderFallback';

export const metadata: Metadata = {
  title: 'Usuarios',
  description: 'Gestión de usuarios de la plataforma',
};

export default function UsuariosPage() {
  return (
    <Suspense fallback={<LoaderFallback />}>
      <UsersListWrapper />
    </Suspense>
  );
}
