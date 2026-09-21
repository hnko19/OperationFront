import type { IAircraftTypeCreate, IAircraftTypeShow } from '../Interface/IAircraftType';
import type { IApiResponse } from '../Interface/IApiResponse';
import api from './Axios';


export default async function getAircraftType(): Promise<IAircraftTypeShow[]> {
  const { data }: { data: IApiResponse<IAircraftTypeShow[]> } = await api.get('AircraftType');
  return data.data;
}

export const AddAircraftType = async (AircraftType: IAircraftTypeCreate): Promise<IAircraftTypeShow> => {
  const { data } = await api.post('AircraftType', AircraftType);
  return data;
};

export const UpdateAircraftType = async (AircraftType: IAircraftTypeShow): Promise<IAircraftTypeShow> => {
  const { data } = await api.put('AircraftType', AircraftType);
  return data;
};

export const deleteAircraftType = async (
  Id: number,
): Promise<IApiResponse<object>> => {
  if (!Id) throw new Error('Country ID is required for delete');
  const { data } = await api.delete('Country?Id=');
  return data;
};
