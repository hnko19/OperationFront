
import { useQuery } from '@tanstack/react-query';
import getUsers from '../../Api/User';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    refetchInterval: 60000,
  });
}
