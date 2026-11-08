import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AddOfficerData } from '../../Api/OfficerData';
import type { IOfficerData } from '../../Interface/IOfficerData';

export const useAddOfficerData = (): UseMutationResult<
  IOfficerData,
  AxiosError,
  IOfficerData,
  unknown
> => {
  const queryclient = useQueryClient();

  return useMutation<IOfficerData, AxiosError, IOfficerData>({
    mutationFn: (officerdata: IOfficerData) => AddOfficerData(officerdata),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['flightofficer'] });
    },
    onError: (error: AxiosError) => {
      const serverResponse = error.response?.data as
        | Record<string, unknown>
        | undefined;
      console.log(
        'Server Validation Errors:',
        serverResponse?.errors || serverResponse,
      );
    },
  });
};
