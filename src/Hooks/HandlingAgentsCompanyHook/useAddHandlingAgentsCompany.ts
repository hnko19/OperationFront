import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AddHandlingAgentsCompany } from '../../Api/HandlingAgentsCompany';
import type { IHandlingAgentsCompany } from '../../Interface/IHandlingAgentsCompany';

export const useAddHandlingAgentsCompany = (): UseMutationResult<
  IHandlingAgentsCompany,
  Error,
  IHandlingAgentsCompany,
  unknown
> => {
  const queryclient = useQueryClient();
  return useMutation<IHandlingAgentsCompany, Error, IHandlingAgentsCompany>({
    mutationFn: (country: IHandlingAgentsCompany) =>
      AddHandlingAgentsCompany(country),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['HandlingAgentsCompany'] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
