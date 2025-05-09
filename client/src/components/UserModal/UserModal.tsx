'use client';
import { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { UserForm } from '@/components/UserForm/UserForm';
import { User } from '@/types/User';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog/DeleteConfirmDialog';
import { UserModalProps } from '@/types/UserModalProps';

export const UserModal = ({
  visible,
  initialData,
  onHide,
  onSubmit,
  onDelete,
  deleting = false,
}: UserModalProps) => {
  const deleteBtnRef = useRef<Button>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const canDelete = initialData?.sector === 1000;

  const customHeader = (
    <div
      className="flex justify-content-between align-items-center px-4 py-3 border-round-top shadow-2"
      style={{ backgroundColor: 'var(--blue-color)' }}
    >
      <span className="text-white text-xl font-semibold">Usuario</span>
      <Button
        icon="pi pi-times"
        className="p-button-rounded p-button-text text-white hover:bg-white/20"
        onClick={onHide}
      />
    </div>
  );

  const footerContent = initialData?.id && canDelete ? (
    <div className="flex justify-content-end border-top-1 surface-border pt-3 px-4">
      <Button
        severity="danger"
        ref={deleteBtnRef}
        disabled={deleting}
        onClick={() => {
          if (canDelete) setShowDeleteDialog(true);
        }}
      >
        {deleting ? (
          <div className="flex align-items-center gap-2">
            <ProgressSpinner
              style={{ width: '20px', height: '20px' }}
              strokeWidth="4"
              animationDuration=".5s"
            />
            Eliminando...
          </div>
        ) : (
          <>
            <i className="pi pi-trash mr-2" />
            Eliminar
          </>
        )}
      </Button>
      <Tooltip target={deleteBtnRef.current as unknown as HTMLElement} content="Eliminar usuario del sector Marketing (1000)" />
    </div>
  ) : null;

  return (
    <>
      <Dialog
        header={customHeader}
        visible={visible}
        onHide={onHide}
        modal
        closable={false}
        style={{ width: '800px', borderRadius: '10px' }}
        className="user-dialog"
        footer={footerContent}
      >
        <div className="p-4">
          <UserForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onHide}
          />
        </div>
      </Dialog>
      {initialData?.id && onDelete && canDelete && (
        <DeleteConfirmDialog
          user={initialData as User}
          visible={showDeleteDialog}
          onDelete={(user) => {
            onDelete(user);
            setShowDeleteDialog(false);
          }}
          onHide={() => setShowDeleteDialog(false)}
        />
      )}
    </>
  );
};