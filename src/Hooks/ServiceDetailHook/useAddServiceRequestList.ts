import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import { AddServiceRequestList } from '../../Api/ServiceRequestDetail';
import type { IServiceRequestModel } from '../../Interface/IServiceRequestDetail';

import type { IApiResponse } from '../../Interface/IApiResponse';

interface AddServiceRequestVariables {
  towerDataId: number;
  model: IServiceRequestModel[];
}

export const useAddServiceRequestList = (): UseMutationResult<
  IApiResponse<object>,
  Error,
  AddServiceRequestVariables,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<IApiResponse<object>, Error, AddServiceRequestVariables>({
    mutationFn: ({ towerDataId, model }) =>
      AddServiceRequestList(towerDataId, model),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['flightofficer'],
      });
    },

    onError: (error) => {
      console.error('Error adding service request list:', error);
    },
  });
};
