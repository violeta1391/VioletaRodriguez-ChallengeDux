'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type SectorMode = 'oneSector' | 'allSectors';

interface SectorContextType {
  sector: number;
  setSector: (s: number) => void;
  sectorMode: SectorMode;
  toggleSectorMode: () => void;
  sectores: number[];
  setSectores: (s: number[]) => void;
}

const SectorContext = createContext<SectorContextType | undefined>(undefined);

export const SectorProvider = ({ children }: { children: ReactNode }) => {
  const [sector, setSector] = useState(1000);
  const [sectorMode, setSectorMode] = useState<SectorMode>('oneSector');
  const [sectores, setSectores] = useState<number[]>([]);

  const toggleSectorMode = () => {
    setSectorMode((prev) => (prev === 'oneSector' ? 'allSectors' : 'oneSector'));
  };
  return (
    <SectorContext.Provider
      value={{ sector, setSector, sectorMode, toggleSectorMode, sectores, setSectores }}
    >
      {children}
    </SectorContext.Provider>
  );
};

export const useSector = () => {
  const context = useContext(SectorContext);
  if (!context) throw new Error('useSector debe usarse dentro de SectorProvider');
  return context;
};