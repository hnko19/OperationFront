import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import type { IUser } from '../../Interface/IUser';
import { AddUser } from '../../Api/User';

export const useAddUser = (): UseMutationResult<
  IUser,
  Error,
  IUser,
  unknown
> => {
  const queryclient = useQueryClient();
  return useMutation<IUser, Error, IUser>({
    mutationFn: (user: IUser) => AddUser(user),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
