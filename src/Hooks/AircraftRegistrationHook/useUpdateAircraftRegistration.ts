import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { IAircraftRegistration } from '../../Interface/IAircraftRegistration';
import { UpdateAircraftRegistration } from '../../Api/AircraftRegistration';
export const useUpdateAircraftRegistration = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (aircraftype: IAircraftRegistration) =>
      UpdateAircraftRegistration(aircraftype),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['aircraftregistration'] });
    },
  });
};
