import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import type { IAirlineAgentShow, IAirlineAgentCreate } from '../../Interface/IAirlineAgent';
import { AddAirlineAgent } from '../../Api/AirlineAgent';

export const useAddAirlineAgent = (): UseMutationResult<
  IAirlineAgentShow,
  Error,
  IAirlineAgentCreate,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<IAirlineAgentShow, Error, IAirlineAgentCreate>({
    mutationFn: (airlineAgent: IAirlineAgentCreate) => AddAirlineAgent(airlineAgent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AirlineAgent'] });
    },
    onError: (e) => {
      console.error(e);
    },
  });
};