import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { IHandlingAgentsCompany } from '../../Interface/IHandlingAgentsCompany';
import { UpdateHandlingAgentsCompany } from '../../Api/HandlingAgentsCompany';
export const useUpdateHandlingAgentsCompany = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (handlingAgentsCompany: IHandlingAgentsCompany) =>
      UpdateHandlingAgentsCompany(handlingAgentsCompany),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['HandlingAgentsCompany'] });
    },
  });
};
