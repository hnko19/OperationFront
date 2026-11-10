import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteFuelCompany } from '../../Api/FuelCompany';
export const useDeleteFuelCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFuelCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['FuelCompany'] });
    },
  });
};
