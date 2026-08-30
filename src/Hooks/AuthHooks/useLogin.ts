import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import type { ILogin, ILoginResponse } from "../../Interface/ILogin";
import { login } from "../../Api/Auth";


export const useLogin = (): UseMutationResult<ILoginResponse, Error, ILogin, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<ILoginResponse, Error, ILogin>({
    mutationFn: (data: ILogin) => login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
};
