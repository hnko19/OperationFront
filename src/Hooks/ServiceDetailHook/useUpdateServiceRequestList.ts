import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import { UpdateServiceRequestList } from '../../Api/ServiceRequestDetail';
import type { IServiceRequestModel } from '../../Interface/IServiceRequestDetail';
import type { IApiResponse } from '../../Interface/IApiResponse';

interface UpdateServiceRequestVariables {
  towerDataId: number;
  model: IServiceRequestModel[];
}

export const useUpdateServiceRequestList = (): UseMutationResult<
  IApiResponse<object>,
  Error,
  UpdateServiceRequestVariables,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<
    IApiResponse<object>,
    Error,
    UpdateServiceRequestVariables
  >({
    mutationFn: ({ towerDataId, model }) =>
      UpdateServiceRequestList(towerDataId, model),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['flightofficer'],
      });
    },

    onError: (error) => {
      console.error('Error updating service request list:', error);
    },
  });
};
