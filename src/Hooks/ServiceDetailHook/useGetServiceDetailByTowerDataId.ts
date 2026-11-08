import getServiceDetailByTowerId from '../../Api/ServiceRequestDetail';
import { useQuery } from '@tanstack/react-query';

export function useGetServiceDetailByTowerDataId(towerId?: number | null) {
  return useQuery({
    queryKey: ['flightofficer', towerId],
    // استخدام towerId! لأن خاصية enabled تضمن أنه لن يكون undefined أو null عند التنفيذ
    queryFn: () => getServiceDetailByTowerId(towerId!),
    refetchInterval: 60000,
    // لا يتم تنفيذ الاستعلام إلا إذا كان towerId موجوداً وأكبر من صفر
    enabled: !!towerId && towerId > 0,
  });
}
