import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { resetUserPassword } from "../../Api/Auth";

interface IResetPassword {
  userId: string;
  password: string;
}

export const useResetUserPassword = (): UseMutationResult<
  boolean,
  Error,
  IResetPassword,
  unknown
> => {

  return useMutation<boolean, Error, IResetPassword>({
    mutationFn: (data) => 
      resetUserPassword(data.userId, data.password),
  });
};