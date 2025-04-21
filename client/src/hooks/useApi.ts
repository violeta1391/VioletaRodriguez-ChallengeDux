import { useEffect, useState } from 'react';
import api from '@/services/apiService';
import { buildQuery } from '@/utils/buildQuery';
import { User } from '@/types/User';

interface UseApiParams {
  page?: number;
  limit?: number;
  search?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
  sector: number;
}

export const useApi = ({
  page = 1,
  limit = 10,
  search,
  estado,
  sector
}: UseApiParams) => {
  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const params = {
        _page: page,
        _limit: limit,
        sector,
        ...(search && { q: search }),
        ...(estado && { estado })
      };

      try {
        const query = buildQuery(params);
        const res = await api.get<User[]>(`personal${query}`);

        const totalCount = Number(res.headers['x-total-count']) || 0;

        setData(res.data);
        setTotal(totalCount);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, search, estado, sector]);

  return { data, total, loading, error };
};
