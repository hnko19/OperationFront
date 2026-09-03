import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AddCountry } from '../../Api/Country';
import type { ICountry } from '../../Interface/ICountry';

export const useAddCountry = (): UseMutationResult<
  ICountry,
  Error,
  ICountry,
  unknown
> => {
  const queryclient = useQueryClient();
  return useMutation<ICountry, Error, ICountry>({
    mutationFn: (country: ICountry) => AddCountry(country),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['country'] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
