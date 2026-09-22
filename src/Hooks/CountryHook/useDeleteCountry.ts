import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteCountry } from '../../Api/Country';
export const useDeleteCountry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCountry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['country'] });
    },
  });
};
