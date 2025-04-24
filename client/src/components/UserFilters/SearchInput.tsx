'use client';
import { InputText } from 'primereact/inputtext';

interface SearchInputProps {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchInput = ({ search, setSearch }: SearchInputProps) => (
  <div className="inputgroup-lupita w-full">
    <span className="p-inputgroup-addon" style={{ backgroundColor: 'white', border: 'none' }}>
      <i className="pi pi-search" style={{ color: '#6b7280' }} />
    </span>
    <InputText
      placeholder="Buscar por nombre"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ border: 'none', boxShadow: 'none' }}
    />
  </div>
);
