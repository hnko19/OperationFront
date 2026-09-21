import type { IAirlineAgentShow, IAirlineAgentCreate } from '../Interface/IAirlineAgent';
import type { IApiResponse } from '../Interface/IApiResponse';
import api from './Axios';

export default async function getAirlineAgent(): Promise<IAirlineAgentShow[]> {
  const { data }: { data: IApiResponse<IAirlineAgentShow[]> } = await api.get('AirlineAgent');
  return data.data;
}

export const AddAirlineAgent = async (
  dataModel: IAirlineAgentCreate
): Promise<IAirlineAgentShow> => {
  const { data } = await api.post('AirlineAgent', dataModel);
  return data;
};

export const UpdateAirlineAgent = async (
  dataModel: IAirlineAgentCreate
): Promise<IAirlineAgentShow> => {
  const { data } = await api.put('AirlineAgent', dataModel);
  return data;
};

export const deleteAirlineAgent = async (
  id: number
): Promise<IApiResponse<object>> => {
  if (!id) throw new Error('Agent ID is required for delete');
  const { data } = await api.delete(`AirlineAgent?Id=${id}`);
  return data;
};