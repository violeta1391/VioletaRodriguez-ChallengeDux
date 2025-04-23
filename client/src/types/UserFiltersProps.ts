export interface UserFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    selectedStatus: 'ACTIVO' | 'INACTIVO' | 'TODOS';
    setSelectedStatus: (value: 'ACTIVO' | 'INACTIVO' | 'TODOS') => void;
    statuses: ('ACTIVO' | 'INACTIVO' | 'TODOS')[];
    sector: number;
    setSector: (value: number) => void;
    sectorOptions: { label: string; value: number }[];
    sectorMode: string;
    toggleSectorMode: () => void;
}
