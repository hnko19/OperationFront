import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteAircraftSize } from '../../Api/AircraftSize';
export const useDeleteAircraftSize = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAircraftSize(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aircraftsize'] });
    },
  });
};
