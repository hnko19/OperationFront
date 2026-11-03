import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { IUser } from '../../Interface/IUser';
import { UpdateUser } from '../../Api/User';


export const useUpdateUser = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUser) => UpdateUser(user),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
