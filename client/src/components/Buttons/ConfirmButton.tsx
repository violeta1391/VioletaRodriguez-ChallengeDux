'use client';
import { Button } from 'primereact/button';
import { ButtonProps } from 'primereact/button';

export const ConfirmButton = (props: ButtonProps) => {
  return (
    <Button
      label="Confirmar"
      icon="pi pi-check"
      iconPos="left"
      className={`custom-confirm-button ${props.className || ''}`}
      {...props}
    />
  );
};
