import './globals.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { PrimeReactProvider } from 'primereact/api';
import type { ReactNode } from 'react';
import Header from '@/components/Header/Header';

export const metadata = {
  title: 'Challenge Dux',
  description: 'ABM de usuarios',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <PrimeReactProvider value={{ ripple: true }}>
          <Header />
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
