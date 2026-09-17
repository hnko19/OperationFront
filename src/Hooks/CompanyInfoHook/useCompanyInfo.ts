import getCompanyInfo from '../../Api/CompanyInfo';
import { useQuery } from '@tanstack/react-query';

export function useCompanyInfo() {
  return useQuery({
    queryKey: ['country'],
    queryFn: getCompanyInfo,
    refetchInterval: 60000,
  });
}
