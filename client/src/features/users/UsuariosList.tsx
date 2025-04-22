'use client';

import { useState, useMemo, useEffect } from 'react';
import { User } from '@/types/User';
import { useApi } from '@/hooks/useApi';
import { createUser, updateUser, deleteUser } from '@/services/userService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ToggleButton } from 'primereact/togglebutton';
import { useSector } from '@/SectorContext/SectorContext';
import { UserModal } from '@/components/UserModal/UserModal';

type Estado = 'ACTIVO' | 'INACTIVO' | 'TODOS';
const estados: Estado[] = ['ACTIVO', 'INACTIVO', 'TODOS'];

export const UsuariosList = () => {
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

  const handleDeleteUser = (user: User) => {
    confirmDialog({
      message: `¿Estás segura de eliminar a "${user.usuario}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await deleteUser(user.id);
        resetFilters();
        refetch();
      }
    });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <h2>Usuarios</h2>
        <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={() => setCreateVisible(true)} />
      </div>

      <div className="flex gap-3 mb-4 align-items-center">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>

        <Dropdown
          value={selectedEstado}
          options={estados.map(e => ({ label: e.charAt(0) + e.slice(1).toLowerCase(), value: e }))}
          onChange={(e) => setSelectedEstado(e.value)}
          placeholder="Filtrar por estado"
          className="w-15rem"
        />

        <Dropdown
          value={sector}
          options={sectorOptions}
          onChange={(e) => setSector(e.value)}
          placeholder="Filtrar por sector"
          className="w-15rem"
        />

        <ToggleButton
          checked={sectorMode === 'oneSector'}
          onChange={toggleSectorMode}
          onIcon="pi pi-filter"
          offIcon="pi pi-globe"
          className="p-button-rounded p-button-text"
        />
      </div>

      <ConfirmDialog />

      <DataTable
        value={filteredData}
        paginator
        first={first}
        rows={rows}
        onPage={(e) => {
          setFirst(e.first);
          setRows(e.rows);
          localStorage.setItem('usuarios-rows', e.rows.toString());
        }}
        rowsPerPageOptions={[5, 10, 20, 50]}
        totalRecords={filteredData.length}
        responsiveLayout="scroll"
        className="p-datatable-striped"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      >
        <Column field="id" header="ID" sortable className="w-1/4 text-left" />

        <Column
          field="usuario"
          header="Usuario"
          sortable
          className="w-1/4 text-left"
          body={(rowData: User) => (
            <a
              onClick={() => {
                setSelectedUser(rowData);
                setEditVisible(true);
              }}
              className="user-link"
            >
              {rowData.usuario}
            </a>
          )}
        />

        <Column
          field="estado"
          header="Estado"
          sortable
          body={(rowData: User) => (
            <span className={rowData.estado === 'ACTIVO' ? 'text-green-600' : 'text-red-600'}>
              {rowData.estado}
            </span>
          )}
          className="w-1/4 text-left"
        />

        <Column field="sector" header="Sector" sortable className="w-1/4 text-left" />
      </DataTable>

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
