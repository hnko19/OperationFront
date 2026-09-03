import type { ICountry } from '../Interface/ICountry';
import type { IApiResponse } from '../Interface/IApiResponse';
import api from './Axios';

export default async function getCountry(): Promise<ICountry[]> {
  const { data }: { data: IApiResponse<ICountry[]> } = await api.get('Country');
  return data.data;
}

export const AddCountry = async (country: ICountry): Promise<ICountry> => {
  const { data } = await api.post('Country', country);
  return data;
};

export const UpdateCountry = async (country: ICountry): Promise<ICountry> => {
  const { data } = await api.put('Country', country);
  return data;
};

export const deleteCountry = async (
  Id: number,
): Promise<IApiResponse<object>> => {
  if (!Id) throw new Error('Country ID is required for delete');
  const { data } = await api.delete('Country?Id=');
  return data;
};
