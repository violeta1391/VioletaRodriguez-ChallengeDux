'use client';

import { useState, useMemo } from 'react';
import { User } from '@/types/User';
import { useApi } from '@/hooks/useApi';
import { createUser, updateUser, deleteUser } from '@/services/userService';
import { UserForm } from '@/components/UserForm/UserForm';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

type Estado = 'ACTIVO' | 'INACTIVO' | 'TODOS';

const estados: Estado[] = ['ACTIVO', 'INACTIVO', 'TODOS'];
const sectores = [1000];

export const UsuariosList = () => {
  const [search, setSearch] = useState('');
  const [selectedEstado, setSelectedEstado] = useState<Estado>('TODOS');
  const [selectedSector, setSelectedSector] = useState<number>(1000);

  const { data, loading, error, refetch } = useApi({ sector: selectedSector });

  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [rows, setRows] = useState(() => {
    const stored = localStorage.getItem('usuarios-rows');
    return stored ? parseInt(stored) : 10;
  });
  const [first, setFirst] = useState(0);

  const resetFilters = () => {
    setSearch('');
    setSelectedEstado('TODOS');
    setSelectedSector(1000);
  };

  const filteredData = useMemo(() => {
    const estadosValidos = selectedEstado === 'TODOS'
      ? ['ACTIVO', 'INACTIVO']
      : [selectedEstado];

    return data.filter((user) => {
      const matchEstado = estadosValidos.includes(user.estado);
      const matchSearch = user.usuario
        .toUpperCase()
        .includes(search.toUpperCase());
      return matchEstado && matchSearch;
    });
  }, [data, search, selectedEstado]);

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
      message: `¿Estás seguro de eliminar a "${user.usuario}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await deleteUser(user.id);
        resetFilters();
        refetch();
      }
    });
  };

  const actionTemplate = (rowData: User) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        severity="info"
        onClick={() => {
          setSelectedUser(rowData);
          setEditVisible(true);
        }}
      />
      <Button
        icon="pi pi-trash"
        severity="danger"
        onClick={() => handleDeleteUser(rowData)}
      />
    </div>
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <h2>Usuarios</h2>
        <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={() => setCreateVisible(true)} />
      </div>

      <div className="flex gap-3 mb-4">
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
          value={selectedSector}
          options={sectores.map(s => ({ label: s.toString(), value: s }))}
          onChange={(e) => setSelectedSector(e.value)}
          placeholder="Filtrar por sector"
          className="w-15rem"
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
        <Column
          field="id"
          header="ID"
          sortable
          className="w-1/4 text-left"
        />

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
            <span
              className={`${rowData.estado === 'ACTIVO' ? 'text-green-600' : 'text-red-600'
                }`}
            >
              {rowData.estado}
            </span>
          )}
          className="w-1/4 text-left"
        />

        <Column
          field="sector"
          header="Sector"
          sortable
          className="w-1/4 text-left"
        />
      </DataTable>


      <Dialog
        header="Crear Usuario"
        visible={createVisible}
        onHide={() => setCreateVisible(false)}
        style={{ width: '400px' }}
        modal
      >
        <UserForm onSubmit={handleCreateUser} onCancel={() => setCreateVisible(false)} />
      </Dialog>

      <Dialog
        header="Editar Usuario"
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        style={{ width: '400px' }}
        modal
      >
        <UserForm
          initialData={selectedUser ?? {}}
          onSubmit={handleUpdateUser}
          onCancel={() => setEditVisible(false)}
        />
      </Dialog>
    </div>
  );
};
