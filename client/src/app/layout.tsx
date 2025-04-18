import './globals.css';
import 'primereact/resources/themes/saga-blue/theme.css';     
import 'primereact/resources/primereact.min.css';             
import 'primeicons/primeicons.css';                           

import { PrimeReactProvider } from 'primereact/api';
import { JSX } from 'react';

export const metadata = {
  title: 'Challenge Dux',
  description: 'ABM de usuarios',
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="es">
      <body>
        <PrimeReactProvider value={{ ripple: true }}>
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}