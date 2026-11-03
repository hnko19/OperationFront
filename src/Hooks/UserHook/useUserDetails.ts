import { useQuery } from '@tanstack/react-query';
import { GetUserDetails } from '../../Api/User';

export function useUserDetails(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => GetUserDetails(userId),
    enabled: Boolean(userId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}