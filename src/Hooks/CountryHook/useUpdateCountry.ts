import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { ICountry } from '../../Interface/ICountry';
import { UpdateCountry } from '../../Api/Country';

export const useUpdateCountry = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (country: ICountry) => UpdateCountry(country),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['country'] });
    },
  });
};
