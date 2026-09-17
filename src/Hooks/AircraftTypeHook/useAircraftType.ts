import { useQuery } from '@tanstack/react-query';
import getAircraftType from '../../Api/AircraftType';


export function useAircraftType() {
  return useQuery({
    queryKey: ['aircraftTypes'],
    queryFn: getAircraftType,
    refetchInterval: 60000,
  });
}
