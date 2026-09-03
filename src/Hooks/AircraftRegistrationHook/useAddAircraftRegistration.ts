import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AddAircraftRegistration } from '../../Api/AircraftRegistration';
import type { IAircraftRegistration } from '../../Interface/IAircraftRegistration';
export const useAddAircraftRegistration = (): UseMutationResult<
  IAircraftRegistration,
  Error,
  IAircraftRegistration,
  unknown
> => {
  const queryclient = useQueryClient();
  return useMutation<IAircraftRegistration, Error, IAircraftRegistration>({
    mutationFn: (aircraftType: IAircraftRegistration) =>
      AddAircraftRegistration(aircraftType),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['aircraftregistration'] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
