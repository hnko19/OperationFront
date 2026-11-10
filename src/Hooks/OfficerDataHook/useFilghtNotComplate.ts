import { getFilghtNotComplate } from '../../Api/OfficerData';
import { useQuery } from '@tanstack/react-query';

export function useFilghtNotComplate() {
  return useQuery({
    queryKey: ['flightofficer'],
    queryFn: getFilghtNotComplate,
    refetchInterval: 60000,
  });
}
