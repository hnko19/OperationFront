import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { IFuelCompany } from '../../Interface/IFuelCompany';
import { UpdateFuelCompany } from '../../Api/FuelCompany';
export const useUpdateFuelCompany = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (fuelcompany: IFuelCompany) =>
      UpdateFuelCompany(fuelcompany),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['FuelCompany'] });
    },
  });
};
