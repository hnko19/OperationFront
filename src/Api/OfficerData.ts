import type { IOfficerData } from '../Interface/IOfficerData';
import type { IApiResponse } from '../Interface/IApiResponse';
import type { IOfficerDataShow } from '../Interface/IOfficerData';
import type { IFilghtNotComplateView } from '../Interface/IOfficerData';
import type { IFlightSearchRequestModel } from '../Interface/IOfficerData';
import type { ITowerDataViewDomain } from '../Interface/IOfficerData';
import type { IOfficerDataDetail } from '../Interface/IOfficerDataDetail';
import api from './Axios';

export default async function getOfficerData(): Promise<IOfficerDataShow[]> {
  const { data }: { data: IApiResponse<IOfficerDataShow[]> } =
    await api.get('Flight/TodayFlight');
  return data.data;
}

export async function getOfficerDataByAirlineId(
  airLineId?: number,
): Promise<IOfficerDataShow[]> {
  const { data }: { data: IApiResponse<IOfficerDataShow[]> } = await api.get(
    'Flight/TodayFlight',
    {
      params: {
        airLineId,
      },
    },
  );
  return data.data;
}

export async function getFilghtNotComplate(): Promise<
  IFilghtNotComplateView[]
> {
  const { data }: { data: IApiResponse<IFilghtNotComplateView[]> } =
    await api.get('Flight/FilghtLocalNotComplate');
  return data.data;
}

export async function getOfficerDataById(id: number): Promise<IOfficerData> {
  const { data } = await api.get<IApiResponse<IOfficerData>>(
    `Flight/GetOfficerDataById/${id}`,
  );
  return data.data;
}

export async function ConfirmedOfficer(id: number): Promise<IOfficerData> {
  const { data } = await api.post<IApiResponse<IOfficerData>>(
    `Flight/ConfirmedOfficer/${id}`,
    {}, // ضروري لتمرير body فارغ مع طلب الـ POST
  );
  return data.data;
}

export const AddOfficerData = async (
  officerData: IOfficerData,
): Promise<IOfficerData> => {
  const { data } = await api.post('FlightOfficer', officerData);
  return data;
};

export const UpdateOfficerData = async (
  officerData: IOfficerData,
): Promise<IOfficerData> => {
  const { data } = await api.put('FlightOfficer', officerData);
  return data;
};

export const deleteOfficerData = async (
  Id: number,
): Promise<IApiResponse<object>> => {
  if (!Id) throw new Error('FlightOfficer ID is required for delete');
  const { data } = await api.delete(`FlightOfficer/${Id}`);
  return data;
};

// جلب قائمة حسب الفلاتر
export const getFlightByFilter = async (
  item: IFlightSearchRequestModel,
): Promise<ITowerDataViewDomain[]> => {
  const res = await api.post('FlightOfficer/GetSearchFilght', item);

  return res.data?.data ?? [];
};

export async function getOfficerDataDetailById(
  towerDataId: number,
): Promise<IOfficerDataDetail> {
  const { data } = await api.get<IApiResponse<IOfficerDataDetail>>(
    `Flight/GetOfficerDataDetailById/${towerDataId}`,
  );
  return data.data;
}
