import './globals.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { PrimeReactProvider } from 'primereact/api';
import type { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import HomeMenu from '@/components/HomeMenu/HomeMenu';
import { SectorProvider } from '@/context/SectorContext/SectorContext';

export const metadata = {
  title: 'Challenge Dux',
  description: 'ABM de usuarios',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="m-0 p-0 overflow-hidden">
        <PrimeReactProvider value={{ ripple: true }}>
          <SectorProvider>
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <div style={{ width: '65px', height: '100%', backgroundColor: '#333' }}>
                  <HomeMenu />
                </div>
                <div style={{ flex: 1, overflow: 'auto' }}>
                  {children}
                </div>
              </div>
            </div>
          </SectorProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}

