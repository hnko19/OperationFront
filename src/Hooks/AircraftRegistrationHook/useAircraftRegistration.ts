import getAircraftRegistration from '../../Api/AircraftRegistration';
import { useQuery } from '@tanstack/react-query';

export function useAircraftRegistration() {
  return useQuery({
    queryKey: ['aircraftregistration'],
    queryFn: getAircraftRegistration,
    refetchInterval: 60000,
  });
}
