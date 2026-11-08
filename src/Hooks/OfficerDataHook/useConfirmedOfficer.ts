import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConfirmedOfficer } from '../../Api/OfficerData';
import type { IOfficerData } from '../../Interface/IOfficerData';

export const useConfirmOfficer = () => {
  const queryClient = useQueryClient();

  return useMutation<IOfficerData, Error, number>({
    mutationFn: (id: number) => ConfirmedOfficer(id),
    onSuccess: () => {
      // إعادة جلب البيانات لتحديث الجدول تلقائياً بعد التأكيد
      // استبدل المفتاح أدناه بمفتاح استعلام الجدول الخاص بك
      queryClient.invalidateQueries({ queryKey: ['flightofficer'] });
    },
    onError: (error) => {
      console.error('فشل التأكيد:', error);
    },
  });
};

export default useConfirmOfficer;
