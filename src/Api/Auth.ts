
import type { IApiResponse } from "../Interface/IApiResponse";
import type { ILogin, ILoginResponse } from "../Interface/ILogin";
import api from "./Axios";



// Login
export const login = async (value: ILogin): Promise<ILoginResponse> => {
  const { data } = await api.post<ILoginResponse>('auth/login', value);
  return data;
};


export default async function getRoles(): Promise<string[]> {
  const { data }: { data: IApiResponse<string[]> } = await api.get('Auth/GetRoles');
  return data.data;
}


export async function resetUserPassword(
  userId: string,
  password: string,
): Promise<boolean> {
  const { data } = await api.post<boolean>(
    "/Auth/ResetPasswordForAdmin",
    null,
    {
      params: {
        userId,
        password,
      },
    }
  );
  console.log(data);

  return data;
}