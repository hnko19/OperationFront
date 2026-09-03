import type { IAircraftRegistration } from '../Interface/IAircraftRegistration';
import type { IApiResponse } from '../Interface/IApiResponse';
import api from './Axios';

export default async function getAircraftRegistration(): Promise<
  IAircraftRegistration[]
> {
  const { data }: { data: IApiResponse<IAircraftRegistration[]> } =
    await api.get('AircraftRegistration');
  return data.data;
}

export const AddAircraftRegistration = async (
  aircraftType: IAircraftRegistration,
): Promise<IAircraftRegistration> => {
  const { data } = await api.post('AircraftRegistration', aircraftType);
  return data;
};

export const UpdateAircraftRegistration = async (
  aircraftType: IAircraftRegistration,
): Promise<IAircraftRegistration> => {
  const { data } = await api.put('AircraftRegistration', aircraftType);
  return data;
};

export const deleteAircraftRegistration = async (
  Id: number,
): Promise<IApiResponse<object>> => {
  if (!Id) throw new Error('Airport ID is required for delete');
  const { data } = await api.delete('AircraftType?Id=');
  return data;
};
