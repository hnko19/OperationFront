import { useQueryClient, useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { IAirlineAgentShow, IAirlineAgentCreate } from '../../Interface/IAirlineAgent';
import { UpdateAirlineAgent } from '../../Api/AirlineAgent';

export const useUpdateAirlineAgent = (): UseMutationResult<
  IAirlineAgentShow,
  Error,
  IAirlineAgentCreate,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<IAirlineAgentShow, Error, IAirlineAgentCreate>({
    mutationFn: (airlineAgent: IAirlineAgentCreate) =>
      UpdateAirlineAgent(airlineAgent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airlineAgents'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};