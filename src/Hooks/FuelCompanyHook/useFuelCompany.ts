import getFuelCompany from '../../Api/FuelCompany';
import { useQuery } from '@tanstack/react-query';

export function useFuelCompany() {
  return useQuery({
    queryKey: ['FuelCompany'],
    queryFn: getFuelCompany,
    refetchInterval: 60000,
  });
}
