"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function Home() {
  return (
    <main className="p-6">
      <Card title="¡Hola PrimeReact!">
        <p className="m-0">
          Esta tarjeta usa <strong>PrimeReact</strong> y <strong>PrimeFlex</strong>.
        </p>
        <div className="mt-4 flex justify-content-center">
          <Button label="Probando botón" icon="pi pi-check" />
        </div>
      </Card>
    </main>
  );
}