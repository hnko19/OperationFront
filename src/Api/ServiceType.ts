import type { IServiceType } from '../Interface/IServicetype';
import type { IApiResponse } from '../Interface/IApiResponse';
import api from './Axios';

export default async function getServiceType(): Promise<IServiceType[]> {
  const { data }: { data: IApiResponse<IServiceType[]> } =
    await api.get('ServiceType');
  return data.data;
}
