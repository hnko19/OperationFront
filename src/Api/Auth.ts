
import type { ILogin, ILoginResponse } from "../Interface/ILogin";
import api from "./Axios";



// Login
export const login = async (value: ILogin): Promise<ILoginResponse> => {
  const { data } = await api.post<ILoginResponse>('auth/login', value);
  return data;
};




