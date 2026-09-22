import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteAircraftRegistration } from '../../Api/AircraftRegistration';
export const useDeleteAircraftRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAircraftRegistration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aircraftregistration'] });
    },
  });
};
