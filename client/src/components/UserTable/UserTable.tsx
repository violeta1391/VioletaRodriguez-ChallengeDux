'use client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { User } from '@/types/User';
import { UserTableProps } from '@/types/UserTableProps';
import { getSectorLabel } from '@/constants/sectorLabels';

export const UserTable = ({
    users,
    rows,
    first,
    setRows,
    setFirst,
    onUserClick
}: UserTableProps) => {
    return (
        <>
            <ConfirmDialog />
            <DataTable
                value={users}
                paginator
                first={first}
                rows={rows}
                onPage={(e) => {
                    setFirst(e.first);
                    setRows(e.rows);
                    localStorage.setItem('usuarios-rows', e.rows.toString());
                }}
                rowsPerPageOptions={[5, 10, 20, 50]}
                totalRecords={users.length}
                responsiveLayout="scroll"
                className="p-datatable-striped"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            >
                <Column field="id" header="ID" sortable className="w-1/4 text-left" />
                <Column
                    field="usuario"
                    header="Usuario"
                    sortable
                    className="w-1/4 text-left"
                    body={(rowData: User) => (
                        <a onClick={() => onUserClick(rowData)} className="user-link">
                            {rowData.usuario}
                        </a>
                    )}
                />
                <Column
                    field="estado"
                    header="Estado"
                    sortable
                    body={(rowData: User) => (
                        <span className={rowData.estado === 'ACTIVO' ? 'text-green-600' : 'text-red-600'}>
                            {rowData.estado}
                        </span>
                    )}
                    className="w-1/4 text-left"
                />
                <Column
                    field="sector"
                    header="Sector"
                    sortable
                    className="w-1/4 text-left"
                    body={(rowData: User) => getSectorLabel(rowData.sector)}
                />
            </DataTable>
        </>
    );
};
