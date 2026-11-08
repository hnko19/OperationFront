import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { IOfficerData } from '../../Interface/IOfficerData';
import { UpdateOfficerData } from '../../Api/OfficerData';
export const useUpdateOfficerData = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (officerData: IOfficerData) => UpdateOfficerData(officerData),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['flightofficer'] });
    },
  });
};
