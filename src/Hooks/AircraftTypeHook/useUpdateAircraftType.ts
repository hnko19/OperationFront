import { useQueryClient, useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { IAircraftTypeShow } from '../../Interface/IAircraftType';
import { UpdateAircraftType } from '../../Api/AircraftType';

export const useUpdateAircraftType = (): UseMutationResult<
  IAircraftTypeShow,
  Error,
  IAircraftTypeShow,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<IAircraftTypeShow, Error, IAircraftTypeShow>({
    mutationFn: (aircraftType: IAircraftTypeShow) =>
      UpdateAircraftType(aircraftType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aircraft'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};