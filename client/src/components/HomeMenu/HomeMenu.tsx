import React from 'react';
import { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';

export default function HomeMenu() {
  const items: MenuItem[] = [
    { label: '', icon: 'pi pi-box' },
    { label: '', icon: 'pi pi-box' },
    { label: '', icon: 'pi pi-box' },
    { label: '', icon: 'pi pi-box' },
    { label: '', icon: 'pi pi-box' },
  ];

  return (
    <div className="menu-custom">
      <Menu model={items} className="w-full border-none shadow-none" />
    </div>
  );
}
