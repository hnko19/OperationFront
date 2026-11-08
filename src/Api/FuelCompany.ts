import type { IFuelCompany } from '../Interface/IFuelCompany';
import type { IApiResponse } from '../Interface/IApiResponse';
import api from './Axios';

export default async function getFuelCompany(): Promise<IFuelCompany[]> {
  const { data }: { data: IApiResponse<IFuelCompany[]> } =
    await api.get('FuelCompany');
  return data.data;
}

export const AddFuelCompany = async (
  fuelcompany: IFuelCompany,
): Promise<IFuelCompany> => {
  const { data } = await api.post('FuelCompany', fuelcompany);
  return data;
};

export const UpdateFuelCompany = async (
  fuelcompany: IFuelCompany,
): Promise<IFuelCompany> => {
  const { data } = await api.put('FuelCompany', fuelcompany);
  return data;
};

export const deleteFuelCompany = async (
  Id: number,
): Promise<IApiResponse<object>> => {
  if (!Id) throw new Error('FuelCompany ID is required for delete');
  const { data } = await api.delete(`FuelCompany?Id=${Id}`);
  return data;
};
