import getAircraftSize from '../../Api/AircraftSize';
import { useQuery } from '@tanstack/react-query';

export function useAircraftSize() {
  return useQuery({
    queryKey: ['aircraftsize'],
    queryFn: getAircraftSize,
    refetchInterval: 60000,
  });
}
