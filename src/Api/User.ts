
import type { IApiResponse } from '../Interface/IApiResponse';
import type { IUser } from '../Interface/IUser';
import api from './Axios';


export default async function getUsers(): Promise<IUser[]> {
  const { data }: { data: IApiResponse<IUser[]> } = await api.get('Auth/GetUsers');
  return data.data;
}

export const AddUser = async (obj: IUser): Promise<IUser> => {
  const { data } = await api.post('Auth/Register', obj);
  return data;
};

export const UpdateUser = async (obj: IUser): Promise<IUser> => {
  const { data } = await api.put('Auth/UpdateUserAsync', obj);
  return data;
};

export async function GetUserDetails(
  userId: string
): Promise<IUser> {
  const { data }: { data: IApiResponse<IUser> } =
    await api.get('/Auth/GetUserDetails', {
      params: { userId },
    });

  return data.data;
}


