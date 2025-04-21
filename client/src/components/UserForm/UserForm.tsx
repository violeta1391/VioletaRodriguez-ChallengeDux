'use client';
import { useState, useEffect } from 'react';
import { User } from '@/types/User';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

interface Props {
  initialData?: Partial<User>;
  onSubmit: (user: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

const estados = ['ACTIVO', 'INACTIVO'] as const;
const sectores = [1000];

export const UserForm = ({ initialData = {}, onSubmit, onCancel }: Props) => {
  const [usuario, setUsuario] = useState('');
  const [estado, setEstado] = useState<User['estado']>('ACTIVO');
  const [sector, setSector] = useState<number>(1000);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialData?.usuario) {
      setUsuario(initialData.usuario.toUpperCase());
    }
    if (initialData?.estado) {
      setEstado(initialData.estado.toUpperCase() as User['estado']);
    }
    if (initialData?.sector !== undefined) {
      setSector(initialData.sector);
    }
  }, [initialData]);

  const handleSubmit = () => {
    setSubmitted(true);
    if (usuario.trim()) {
      const user: Omit<User, 'id'> = {
        usuario: usuario.toUpperCase(),
        estado: estado.toUpperCase() as User['estado'],
        sector
      };
      onSubmit(user);
    }
  };

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(e.target.value);
  };

  return (
    <div className="p-fluid">
      <div className="field mb-4">
        <label htmlFor="id">ID</label>
        <InputText id="id" value={initialData.id ?? 'ID AUTOASIGNADO'} disabled />
      </div>

      <div className="field mb-4">
        <label htmlFor="usuario">Nombre de Usuario</label>
        <InputText
          id="usuario"
          value={usuario}
          onChange={handleUsuarioChange}
          className={classNames({ 'p-invalid': submitted && !usuario })}
        />
        {submitted && !usuario && <small className="p-error">El nombre es obligatorio.</small>}
      </div>

      <div className="field mb-4">
        <label htmlFor="estado">Estado</label>
        <Dropdown
          id="estado"
          value={estado}
          options={estados.map((e) => ({ label: e, value: e }))}
          onChange={(e) => setEstado(e.value)}
          placeholder="Seleccionar estado"
        />
      </div>

      <div className="field mb-4">
        <label htmlFor="sector">Sector</label>
        <Dropdown
          id="sector"
          value={sector}
          options={sectores.map((s) => ({ label: s.toString(), value: s }))}
          onChange={(e) => setSector(e.value)}
          placeholder="Seleccionar sector"
        />
      </div>

      <div className="flex justify-content-end gap-2 mt-4">
        <Button label="Cancelar" severity="secondary" onClick={onCancel} />
        <Button label="Guardar" severity="success" onClick={handleSubmit} />
      </div>
    </div>
  );
};