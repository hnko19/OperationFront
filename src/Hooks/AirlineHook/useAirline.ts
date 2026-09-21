import { useQuery } from '@tanstack/react-query';
import getAirlineFids from '../../Api/Airline';

export function useAirlineFids() {
  return useQuery({
    queryKey: ['airlineFids'],
    queryFn: getAirlineFids,
    refetchInterval: 60000,
  });
}
