import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AddAircraftSize } from '../../Api/AircraftSize';
import type { IAircraftSize } from '../../Interface/IAircraftSize';

export const useAddAircraftSize = (): UseMutationResult<
  IAircraftSize,
  Error,
  IAircraftSize,
  unknown
> => {
  const queryclient = useQueryClient();
  return useMutation<IAircraftSize, Error, IAircraftSize>({
    mutationFn: (aircraftSize: IAircraftSize) => AddAircraftSize(aircraftSize),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['aircraftsize'] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
