import type { IAircraftSize } from '../Interface/IAircraftSize';
import type { IApiResponse } from '../Interface/IApiResponse';
import api from './Axios';

export default async function getAircraftSize(): Promise<IAircraftSize[]> {
  const { data }: { data: IApiResponse<IAircraftSize[]> } =
    await api.get('AirCraftSize');
  return data.data;
}

export const AddAircraftSize = async (
  aircraftSize: IAircraftSize,
): Promise<IAircraftSize> => {
  const { data } = await api.post('aircraftSize', aircraftSize);
  return data;
};

export const UpdateAircraftSize = async (
  aircraftSize: IAircraftSize,
): Promise<IAircraftSize> => {
  const { data } = await api.put('aircraftSize', aircraftSize);
  return data;
};

export const deleteAircraftSize = async (
  Id: number,
): Promise<IApiResponse<object>> => {
  if (!Id) throw new Error('Airport ID is required for delete');
  const { data } = await api.delete('aircraftSize?Id=');
  return data;
};
