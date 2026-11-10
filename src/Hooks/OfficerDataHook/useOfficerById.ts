import { useQuery } from '@tanstack/react-query';
import { getOfficerDataById } from '../../Api/OfficerData';
import type { IOfficerData } from '../../Interface/IOfficerData';

export const useOfficerById = (id?: number | null) => {
  return useQuery<IOfficerData>({
    queryKey: ['flightofficer', id],
    queryFn: () => getOfficerDataById(id!),
    enabled: typeof id === 'number' && id > 0, // id yoo jiraate qofa gaaffiin (request) ergama
  });
};

export default useOfficerById;
