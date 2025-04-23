'use client';
import { Dropdown } from 'primereact/dropdown';

interface StatusDropdownProps {
    selectedStatus: 'ACTIVO' | 'INACTIVO' | 'TODOS';
    setSelectedStatus: (value: 'ACTIVO' | 'INACTIVO' | 'TODOS') => void;
    statuses: ('ACTIVO' | 'INACTIVO' | 'TODOS')[];
}

export const StatusDropdown = ({
    selectedStatus,
    setSelectedStatus,
    statuses,
}: StatusDropdownProps) => (
    <div className="inputgroup-lupita w-full">
        <Dropdown
            value={selectedStatus}
            options={statuses.map((status) => ({
                label: status.charAt(0) + status.slice(1).toLowerCase(),
                value: status,
            }))}
            onChange={(e) => setSelectedStatus(e.value)}
            placeholder="Filtrar por estado"
            className="w-full border-none"
            style={{ border: 'none', boxShadow: 'none' }}
        />
    </div>
);
