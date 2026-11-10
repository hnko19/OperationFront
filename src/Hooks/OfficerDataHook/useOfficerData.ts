import getOfficerData from '../../Api/OfficerData';
import { useQuery } from '@tanstack/react-query';

export function useOfficerData() {
  return useQuery({
    queryKey: ['flightofficer'],
    queryFn: getOfficerData,
    refetchInterval: 60000,
  });
}
