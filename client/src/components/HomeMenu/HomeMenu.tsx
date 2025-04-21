
import React from 'react';
import { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';

export default function HomeMenu() {
  const items: MenuItem[] = [
    {
      label: '',
      icon: 'pi pi-box',
    },
    {
      label: '',
      icon: 'pi pi-box',
    },
    {
      label: '',
      icon: 'pi pi-box',
    },
    {
      label: '',
      icon: 'pi pi-box',
    },
    {
      label: '',
      icon: 'pi pi-box',
    },
  ];

  return (
    <Menu model={items} className="menu-custom" />
  )
}
