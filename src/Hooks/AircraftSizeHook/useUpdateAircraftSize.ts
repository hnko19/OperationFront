import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { IAircraftSize } from '../../Interface/IAircraftSize';
import { UpdateAircraftSize } from '../../Api/AircraftSize';

export const useUpdateAircraftSize = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (aircraftsize: IAircraftSize) =>
      UpdateAircraftSize(aircraftsize),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['aircraftsize'] });
    },
  });
};
