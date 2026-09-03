import getHandlingAgentsCompany from '../../Api/HandlingAgentsCompany';
import { useQuery } from '@tanstack/react-query';

export function useHandlingAgentsCompany() {
  return useQuery({
    queryKey: ['HandlingAgentsCompany'],
    queryFn: getHandlingAgentsCompany,
    refetchInterval: 60000,
  });
}
