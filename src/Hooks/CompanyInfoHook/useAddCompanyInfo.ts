import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AddCompanyInfo } from '../../Api/CompanyInfo';
import type { ICompanyInfo } from '../../Interface/ICompanyInfo';
export const useAddCompanyInfo = (): UseMutationResult<
  ICompanyInfo,
  Error,
  ICompanyInfo,
  unknown
> => {
  const queryclient = useQueryClient();
  return useMutation<ICompanyInfo, Error, ICompanyInfo>({
    mutationFn: (companyinfo: ICompanyInfo) => AddCompanyInfo(companyinfo),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['CompanyInfo'] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
