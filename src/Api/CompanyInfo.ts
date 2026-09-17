import type { ICompanyInfo } from '../Interface/ICompanyInfo';
import type { IApiResponse } from '../Interface/IApiResponse';
import api from './Axios';

export default async function getCompanyInfo(): Promise<ICompanyInfo[]> {
  const { data }: { data: IApiResponse<ICompanyInfo[]> } =
    await api.get('CompanyInfo');
  return data.data;
}

export const AddCompanyInfo = async (
  country: ICompanyInfo,
): Promise<ICompanyInfo> => {
  const { data } = await api.post('CompanyInfo', country);
  return data;
};

export const UpdateCompanyInfo = async (
  country: ICompanyInfo,
): Promise<ICompanyInfo> => {
  const { data } = await api.put('CompanyInfo', country);
  return data;
};

export const deleteCompanyInfo = async (
  Id: number,
): Promise<IApiResponse<object>> => {
  if (!Id) throw new Error('CompanyInfo ID is required for delete');
  const { data } = await api.delete('CompanyInfo?Id=');
  return data;
};
