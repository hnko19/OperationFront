import { getOfficerDataByAirlineId } from '../../Api/OfficerData';
import { useQuery } from '@tanstack/react-query';

export function useGetOfficerDataByAirlineId(airLineId?: number) {
  return useQuery({
    queryKey: ['flightofficer', airLineId],
    queryFn: () => getOfficerDataByAirlineId(airLineId),
    refetchInterval: 60000,
    // إذا كنت تريد ألا يتم جلب البيانات إلا عند تمرير airLineId فقط، قم بتفعيل هذا السطر:
    // enabled: !!airLineId,
  });
}
