import getCountry from '../../Api/Country';
import { useQuery } from '@tanstack/react-query';

export function useCountry() {
  return useQuery({
    queryKey: ['country'],
    queryFn: getCountry,
    refetchInterval: 60000,
  });
}
