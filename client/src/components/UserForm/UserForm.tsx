'use client';
import { useState, useEffect } from 'react';
import { User } from '@/types/User';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { ConfirmButton } from '../Buttons/ConfirmButton';
import { CancelButton } from '../Buttons/CancelButton';
import { SECTOR_LABELS } from '@/constants/sectorLabels';

interface Props {
  initialData?: Partial<User>;
  onSubmit: (user: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

const estados = ['ACTIVO', 'INACTIVO'] as const;

export const UserForm = ({ initialData = {}, onSubmit, onCancel }: Props) => {
  const [usuario, setUsuario] = useState('');
  const [estado, setEstado] = useState<User['estado']>('ACTIVO');
  const [sector, setSector] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isEditMode = initialData?.id !== undefined;
  const isReadOnly = isEditMode && initialData?.sector !== 1000;

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

    const isUsuarioValido = usuario.trim() !== '';
    const isSectorValido = sector === 1000;

    if (isUsuarioValido && isSectorValido) {
      const user: Omit<User, 'id'> = {
        usuario: usuario.toUpperCase(),
        estado: estado.toUpperCase() as User['estado'],
        sector: sector!,
      };
      onSubmit(user);
    }
  };

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(e.target.value);
  };

  const sectorOptions = Object.entries(SECTOR_LABELS).map(([value, label]) => ({
    label,
    value: Number(value),
  }));

  return (
    <div className="p-fluid">
      <div className="field mb-4">
        <label htmlFor="id">Id</label>
        <InputText id="id" value={initialData.id !== undefined ? String(initialData.id) : 'ID AUTOASIGNADO'} disabled />
      </div>
      <div className="field mb-4">
        <label htmlFor="usuario">Nombre</label>
        <InputText
          id="usuario"
          value={usuario}
          onChange={handleUsuarioChange}
          disabled={isReadOnly}
          className={classNames({ 'p-invalid': submitted && !usuario })}
        />
        {submitted && !usuario && !isReadOnly && (
          <small className="p-error">El nombre es obligatorio.</small>
        )}
      </div>
      <div className="field mb-4">
        <label htmlFor="estado">Estado</label>
        <Dropdown
          id="estado"
          value={estado}
          options={estados.map((e) => ({ label: e, value: e }))}
          onChange={(e) => setEstado(e.value)}
          placeholder="Seleccionar estado"
          disabled={isReadOnly}
        />
      </div>
      <div className="field mb-4">
        <label htmlFor="sector">Sector</label>
        <Dropdown
          id="sector"
          value={sector}
          options={sectorOptions}
          onChange={(e) => setSector(e.value)}
          placeholder="Seleccionar sector"
          disabled={isReadOnly || isEditMode}
          className={classNames({ 'p-invalid': submitted && sector !== 1000 })}
        />
        {submitted && sector !== 1000 && !isReadOnly && (
          <small className="p-error">Solo se permite el sector Marketing (1000).</small>
        )}
      </div>
      {isReadOnly && (
        <div className="mt-3 mb-4 text-center text-sm text-red-500">
          No tiene permitido realizar modificaciones. Solo los usuarios del sector Marketing (1000) pueden ser editados.
        </div>
      )}
      <div className="flex justify-content-center gap-3 mt-4 custom-button-container">
        <ConfirmButton onClick={handleSubmit} disabled={isReadOnly} />
        <CancelButton onClick={onCancel} />
      </div>
    </div>
  );
};