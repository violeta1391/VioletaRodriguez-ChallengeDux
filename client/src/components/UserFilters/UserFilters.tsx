'use client';
import { SearchInput } from './SearchInput';
import { StatusDropdown } from './StatusDropdown';
import { SectorFilter } from './SectorFilter';
import { UserFiltersProps } from '@/types/UserFiltersProps';
import { getSectorLabel } from '@/constants/sectorLabels';

export const UserFilters = ({
    search,
    setSearch,
    selectedStatus,
    setSelectedStatus,
    statuses,
    sector,
    setSector,
    sectorOptions,
    sectorMode,
    toggleSectorMode,
}: UserFiltersProps) => {
    const mappedSectorOptions = sectorOptions.map((option) => ({
        label: getSectorLabel(option.value),
        value: option.value,
    }));
    return (
        <div className="grid mb-6 align-items-center w-full">
            <div className="col-12 md:col-4">
                <SearchInput search={search} setSearch={setSearch} />
            </div>
            <div className="col-12 md:col-4">
                <StatusDropdown
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    statuses={statuses}
                />
            </div>
            <div className="col-12 md:col-4">
                <SectorFilter
                    sector={sector}
                    setSector={setSector}
                    sectorOptions={mappedSectorOptions}
                    sectorMode={sectorMode}
                    toggleSectorMode={toggleSectorMode}
                />
            </div>
        </div>
    );
};
