import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { ICompanyInfo } from '../../Interface/ICompanyInfo';
import { UpdateCompanyInfo } from '../../Api/CompanyInfo';
export const useUpdateCompanyInfo = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (companyinfo: ICompanyInfo) => UpdateCompanyInfo(companyinfo),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['country'] });
    },
  });
};
