
import type { IAirlineFids } from '../Interface/IAirline';
import type { IApiResponse } from '../Interface/IApiResponse';
import  { apiFids } from './Axios';

export default async function getAirlineFids(): Promise<IAirlineFids[]> {
  const { data }: { data: IApiResponse<IAirlineFids[]> } = await apiFids.get('airlines');
  return data.data;
}
