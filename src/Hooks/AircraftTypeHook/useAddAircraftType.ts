import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import type {
  IAircraftTypeCreate,
  IAircraftTypeShow,
} from '../../Interface/IAircraftType';
import { AddAircraftType } from '../../Api/AircraftType';

export const useAddAircraftType = (): UseMutationResult<
  IAircraftTypeShow,
  Error,
  IAircraftTypeCreate,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<IAircraftTypeShow, Error, IAircraftTypeCreate>({
    mutationFn: (aircraftType: IAircraftTypeCreate) =>
      AddAircraftType(aircraftType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aircraft'] });
    },
    onError: (e) => {
      console.error(e);
    },
  });
};