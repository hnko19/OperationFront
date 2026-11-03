
import { useQuery } from '@tanstack/react-query';
import getRoles from '../../Api/Auth';


export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
    refetchInterval: 60000,
  });
}
