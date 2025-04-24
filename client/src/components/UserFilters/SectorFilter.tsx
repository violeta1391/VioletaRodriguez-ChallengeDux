'use client';
import { Dropdown } from 'primereact/dropdown';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';

interface SectorFilterProps {
    sector: number;
    setSector: (value: number) => void;
    sectorOptions: { label: string; value: number }[];
    sectorMode: string;
    toggleSectorMode: () => void;
}

export const SectorFilter = ({
    sector,
    setSector,
    sectorOptions,
    sectorMode,
    toggleSectorMode,
}: SectorFilterProps) => (
    <div className="flex gap-2 w-full">
        <div className="inputgroup-lupita w-full">
            <Dropdown
                value={sector}
                options={sectorOptions}
                onChange={(e) => setSector(e.value)}
                placeholder="Filtrar por sector"
                className="w-full border-none"
                style={{ border: 'none', boxShadow: 'none' }}
            />
        </div>
        <ToggleButton
            checked={sectorMode === 'oneSector'}
            onChange={toggleSectorMode}
            onIcon="pi pi-filter"
            offIcon="pi pi-globe"
            onLabel=""
            offLabel=""
            className="button-icono-gris"
            tooltip="Editar sector"
        />
        <Button
            icon="pi pi-sliders-h"
            className="button-icono-gris"
            onClick={() => { }}
        />
    </div>
);
