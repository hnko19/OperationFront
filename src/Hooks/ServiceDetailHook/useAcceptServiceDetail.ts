import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IAccepterviceDetail } from '../../Interface/IServiceRequestDetail';
import { AcceptOfficer } from '../../Api/ServiceRequestDetail';

// تعريف نوع البيانات التي سيستقبلها الـ mutate
interface AcceptOfficerVariables {
  id: number;
  by: string;
}

export const useAcceptServiceDetail = () => {
  const queryClient = useQueryClient();

  return useMutation<IAccepterviceDetail, Error, AcceptOfficerVariables>({
    // استقبال كائن واحد يحتوي على id و by
    mutationFn: ({ id, by }) => AcceptOfficer(id, by),
    onSuccess: () => {
      // تحديث بيانات المودال وجدول الضابط تلقائياً بعد القبول
      queryClient.invalidateQueries({ queryKey: ['ServiceRequestDetail'] });
      queryClient.invalidateQueries({ queryKey: ['flightofficer'] }); // عدل الاسم إذا كان مفتاح جدول الضابط مختلفاً لديك
    },
    onError: (error) => {
      console.error('فشل قبول الطلب:', error);
    },
  });
};

export default useAcceptServiceDetail;
