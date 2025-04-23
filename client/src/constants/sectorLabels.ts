export const SECTOR_LABELS: Record<string, string> = {
    '1000': 'Marketing',
    '2000': 'Customer',
    '3000': 'Ventas',
    '4000': 'Producto',
    '5000': 'Desarrollo',
};

export const getSectorLabel = (sector: string | number): string =>
    SECTOR_LABELS[sector.toString()] ?? `Sector ${sector}`;
