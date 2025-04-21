
import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import Image from 'next/image';
import { Button } from 'primereact/button';

export default function BasicDemo() {
  const startContent = (
    <>
      <Image src="/logo.png" alt="Logo" width={35} height={35} />
    </>
  );

  const endContent = (
    <>
      <Button
        icon="pi pi-cog"
        className="p-button-text p-button-rounded p-button-secondary text-white"
        aria-label="Configuración"
      />
    </>
  );

  return (
    <div className="card">
      <Toolbar start={startContent} end={endContent} className="border-none" 
        style={{
          backgroundColor: 'var(--blue-color)',
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
          backgroundImage: 'none',
          filter: 'none',
          padding: '0.4rem 1rem '
        }} />
    </div>
  );
}
