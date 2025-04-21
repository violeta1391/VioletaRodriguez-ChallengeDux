'use client';
import { useState } from 'react';
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

const estados = ['ACTIVO', 'INACTIVO'];
const sectores = [1000];

export const UsuariosList = () => {
  const [search, setSearch] = useState('');
  const [selectedEstado, setSelectedEstado] = useState<"ACTIVO" | "INACTIVO" | undefined>(undefined);
  const [selectedSector, setSelectedSector] = useState<number>(1000);

  const { data, total, loading, error } = useApi({
    page: 1,
    limit: 5,
    search,
    estado: selectedEstado,
    sector: selectedSector
  });

  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = async (user: Omit<User, 'id'>) => {
    await createUser(user);
    setCreateVisible(false);
    location.reload();
  };

  const handleUpdateUser = async (user: Omit<User, 'id'>) => {
    if (!selectedUser) return;
    await updateUser(selectedUser.id, user);
    setEditVisible(false);
    location.reload();
  };

  const handleDeleteUser = (user: User) => {
    confirmDialog({
      message: `¿Estás segura de eliminar a "${user.usuario}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await deleteUser(user.id);
        location.reload();
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
          options={[{ label: 'Todos', value: undefined }, ...estados.map(e => ({ label: e, value: e }))]}
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

      <DataTable value={data} paginator rows={10} totalRecords={total} responsiveLayout="scroll">
        <Column field="id" header="ID" sortable />
        <Column field="usuario" header="Usuario" sortable />
        <Column field="estado" header="Estado" sortable />
        <Column field="sector" header="Sector" sortable />
        <Column header="Acciones" body={actionTemplate} />
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