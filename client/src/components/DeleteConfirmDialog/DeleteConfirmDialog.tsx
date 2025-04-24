'use client';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { User } from '@/types/User';

interface DeleteConfirmDialogProps {
  user: User;
  onDelete: (user: User) => void;
  visible: boolean;
  onHide: () => void;
}

export const DeleteConfirmDialog = ({ user, onDelete, visible, onHide }: DeleteConfirmDialogProps) => {
  const header = (
    <div
      className="flex justify-content-between align-items-center px-4 py-3 border-round-top shadow-1"
      style={{ backgroundColor: 'var(--blue-color)' }}
    >
      <span className="text-white text-lg font-semibold">Confirmar eliminación</span>
      <Button
        icon="pi pi-times"
        className="p-button-rounded p-button-text text-white hover:bg-white/20"
        onClick={onHide}
      />
    </div>
  );

  return (
    <Dialog
      header={header}
      visible={visible}
      onHide={onHide}
      modal
      closable={false}
      className="custom-delete-dialog"
      style={{ width: '400px', borderRadius: '12px' }}
    >
      <div className="flex flex-column align-items-center justify-content-center text-center px-4 py-4">
        <i className="pi pi-trash text-red-600" style={{ fontSize: '3rem' }} />
        <h3 className="mt-3 mb-2 text-xl font-semibold text-900">
          ¿Eliminar a {user.usuario}?
        </h3>
        <p className="text-600 text-sm mb-4">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-content-center gap-3 mt-2">
          <Button
            label="Cancelar"
            className="p-button-outlined w-10rem"
            onClick={onHide}
          />
          <Button
            label="Sí, eliminar"
            className="p-button-danger w-10rem"
            onClick={() => onDelete(user)}
          />
        </div>
      </div>
    </Dialog>
  );
};
