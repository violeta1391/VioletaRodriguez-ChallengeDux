import { useEffect, useState } from 'react';
import api from '@/services/apiService';
import { User } from '@/types/User';
import { buildQuery } from '@/utils/buildQuery';

interface UseApiParams {
  sector: number;
}

export const useApi = ({ sector }: UseApiParams) => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const query = buildQuery({ sector });
      const res = await api.get<User[]>(`personal${query}`);
      setData(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sector]);

  return { data, loading, error, refetch: fetchData };
};
