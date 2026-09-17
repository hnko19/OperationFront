import { useQuery } from '@tanstack/react-query';
import getAircraftType from '../../Api/AircraftType';


export function useAircraftType() {
  return useQuery({
    queryKey: ['aircaftType'],
    queryFn: getAircraftType,
    refetchInterval: 60000,
  });
}
