import { useQuery } from '@tanstack/react-query';
import getAirlineAgent from '../../Api/AirlineAgent';

export function useAirlineAgent() {
  return useQuery({
    queryKey: ['AirlineAgent'],
    queryFn: getAirlineAgent,
    refetchInterval: 60000,
  });
}
