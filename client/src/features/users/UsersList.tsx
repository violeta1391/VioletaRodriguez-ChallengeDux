'use client';
import { useState, useMemo, useEffect } from 'react';
import { User } from '@/types/User';
import { useApi } from '@/hooks/useApi';
import { createUser, updateUser, deleteUser } from '@/services/userService';
import { Button } from 'primereact/button';
import { useSector } from '@/context/SectorContext/SectorContext';
import { UserModal } from '@/components/UserModal/UserModal';
import { UserFilters } from '@/components/UserFilters/UserFilters';
import { UserTable } from '@/components/UserTable/UserTable';
import { LoaderOrError } from '@/components/LoaderOrError/LoaderOrError';

type Estado = 'ACTIVO' | 'INACTIVO' | 'TODOS';
const estados: Estado[] = ['ACTIVO', 'INACTIVO', 'TODOS'];

export const UsersList = () => {
  const [search, setSearch] = useState('');
  const [selectedEstado, setSelectedEstado] = useState<Estado>('TODOS');

  const {
    sector,
    setSector,
    sectorMode,
    toggleSectorMode,
    sectores,
    setSectores
  } = useSector();

  const { data, loading, error, refetch } = useApi();
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [rows, setRows] = useState(10);
  const [first, setFirst] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('usuarios-rows');
    if (stored) {
      setRows(parseInt(stored));
    }
  }, []);

  useEffect(() => {
    const uniqueSectores = new Set<number>();
    data.forEach((user) => user.sector && uniqueSectores.add(user.sector));
    setSectores(Array.from(uniqueSectores).sort((a, b) => a - b));
  }, [data, setSectores]);

  useEffect(() => {
    if (sectorMode === 'oneSector') {
      setSector(1000);
    }
  }, [sectorMode, setSector]);

  const resetFilters = () => {
    setSearch('');
    setSelectedEstado('TODOS');
    setSector(1000);
  };

  const sectorOptions = useMemo(() => {
    if (sectorMode === 'oneSector') {
      return [{ label: '1000', value: 1000 }];
    }
    return [
      { label: 'Todos', value: 0 },
      ...sectores.map((s) => ({ label: s.toString(), value: s }))
    ];
  }, [sectorMode, sectores]);

  const filteredData = useMemo(() => {
    const estadosValidos = selectedEstado === 'TODOS'
      ? ['ACTIVO', 'INACTIVO']
      : [selectedEstado];

    return data.filter((user) => {
      const matchEstado = estadosValidos.includes(user.estado);
      const matchSearch = typeof user.usuario === 'string'
        ? user.usuario.toUpperCase().includes(search.toUpperCase())
        : false;
      const matchSector = sectorMode === 'oneSector'
        ? true
        : sector === 0
          ? true
          : user.sector === sector;

      return matchEstado && matchSearch && matchSector;
    });
  }, [data, search, selectedEstado, sector, sectorMode]);

  const handleCreateUser = async (user: Omit<User, 'id'>) => {
    await createUser(user);
    setCreateVisible(false);
    resetFilters();
    refetch();
  };

  const handleUpdateUser = async (user: Omit<User, 'id'>) => {
    if (!selectedUser) return;
    await updateUser(selectedUser.id, user);
    setEditVisible(false);
    resetFilters();
    refetch();
  };

  const isLoadingOrError = loading || error;
  if (isLoadingOrError) {
    return (
      <LoaderOrError
        loading={loading}
        error={error}
        errorMessage="Error al cargar la lista de usuarios"
      />
    );
  }
  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <h2>Usuarios</h2>
        <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={() => setCreateVisible(true)} />
      </div>

      <UserFilters
        search={search}
        setSearch={setSearch}
        selectedStatus={selectedEstado}
        setSelectedStatus={setSelectedEstado}
        statuses={estados}
        sector={sector}
        setSector={setSector}
        sectorOptions={sectorOptions}
        sectorMode={sectorMode}
        toggleSectorMode={toggleSectorMode}
      />
      <UserTable
        users={filteredData}
        rows={rows}
        first={first}
        setRows={setRows}
        setFirst={setFirst}
        onUserClick={(user) => {
          setSelectedUser(user);
          setEditVisible(true);
        }}
      />
      <UserModal
        visible={createVisible}
        header="Crear Usuario"
        onHide={() => setCreateVisible(false)}
        onSubmit={handleCreateUser}
      />
      <UserModal
        visible={editVisible}
        header="Editar Usuario"
        initialData={selectedUser ?? {}}
        onHide={() => setEditVisible(false)}
        onSubmit={handleUpdateUser}
        onDelete={async (user) => {
          try {
            await deleteUser(user.id);
            setEditVisible(false);
            setSelectedUser(null);
            resetFilters();
            refetch();
          } catch (error) {
            console.error('Error al eliminar el usuario:', error);
          }
        }}
      />
    </div>
  );
};
