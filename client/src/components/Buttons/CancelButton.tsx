'use client';
import { Button } from 'primereact/button';
import { ButtonProps } from 'primereact/button';

export const CancelButton = (props: ButtonProps) => {
  return (
    <Button
      label="Cancelar"
      icon="pi pi-times"
      iconPos="left"
      className={`custom-cancel-button ${props.className || ''}`}
      {...props}
    />
  );
};
