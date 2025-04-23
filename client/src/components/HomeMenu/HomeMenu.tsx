'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export default function HomeMenu() {
  const router = useRouter();

  const menuItems = [
    { icon: 'pi pi-home', route: '/', tooltip: 'Inicio' },
    { icon: 'pi pi-users', route: '/usuarios', tooltip: 'Usuarios' },
    { icon: 'pi pi-box', tooltip: 'Módulo 1' },
    { icon: 'pi pi-box', tooltip: 'Módulo 2' },
    { icon: 'pi pi-box', tooltip: 'Módulo 3' },
  ];

  return (
    <div className="menu-custom flex flex-column align-items-center justify-content-start gap-2 py-4">
      {menuItems.map((item, index) => (
        <span key={index} className="relative">
          <Button
            icon={item.icon}
            className="p-button-rounded p-button-text text-white"
            style={{
              width: '50px',
              height: '50px',
              fontSize: '1.2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => item.route && router.push(item.route)}
            data-pr-tooltip={item.tooltip}
            data-pr-position="right"
          />
        </span>
      ))}
      <Tooltip target="[data-pr-tooltip]" />
    </div>
  );
}
