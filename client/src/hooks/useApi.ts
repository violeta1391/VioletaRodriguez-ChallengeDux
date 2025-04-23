import { useEffect, useState, useCallback } from 'react';
import api from '@/services/apiService';
import { User } from '@/types/User';
import { useSector } from '@/context/SectorContext/SectorContext';

export const useApi = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { sector, sectorMode } = useSector();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const query = sectorMode === 'oneSector' ? `?sector=${sector}` : '';
      const res = await api.get<User[]>(`personal${query}`);
      setData(res.data);
    } catch (err) {
      setError('Error al obtener usuarios');
    } finally {
      setLoading(false);
    }
  }, [sector, sectorMode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
