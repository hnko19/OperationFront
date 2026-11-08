import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AddFuelCompany } from '../../Api/FuelCompany';
import type { IFuelCompany } from '../../Interface/IFuelCompany';
export const useAddFuelCompany = (): UseMutationResult<
  IFuelCompany,
  Error,
  IFuelCompany,
  unknown
> => {
  const queryclient = useQueryClient();
  return useMutation<IFuelCompany, Error, IFuelCompany>({
    mutationFn: (fuelcompany: IFuelCompany) => AddFuelCompany(fuelcompany),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['FuelCompany'] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
