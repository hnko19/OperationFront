import type { IHandlingAgentsCompany } from '../Interface/IHandlingAgentsCompany';
import type { IApiResponse } from '../Interface/IApiResponse';
import api from './Axios';

export default async function getHandlingAgentsCompany(): Promise<
  IHandlingAgentsCompany[]
> {
  const { data }: { data: IApiResponse<IHandlingAgentsCompany[]> } =
    await api.get('HandlingAgentsCompany');
  return data.data;
}

export const AddHandlingAgentsCompany = async (
  handlingAgentsCompany: IHandlingAgentsCompany,
): Promise<IHandlingAgentsCompany> => {
  const { data } = await api.post(
    'HandlingAgentsCompany',
    handlingAgentsCompany,
  );
  return data;
};

export const UpdateHandlingAgentsCompany = async (
  handlingAgentsCompany: IHandlingAgentsCompany,
): Promise<IHandlingAgentsCompany> => {
  const { data } = await api.put(
    'HandlingAgentsCompany',
    handlingAgentsCompany,
  );
  return data;
};

export const deleteHandlingAgentsCompany = async (
  Id: number,
): Promise<IApiResponse<object>> => {
  if (!Id) throw new Error('HandlingAgentsCompany ID is required for delete');
  const { data } = await api.delete('HandlingAgentsCompany?Id=');
  return data;
};
