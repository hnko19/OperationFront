import { useGetServiceDetailByTowerDataId } from '../../../Hooks/ServiceDetailHook/useGetServiceDetailByTowerDataId';
import useAcceptServiceDetail from '../../../Hooks/ServiceDetailHook/useAcceptServiceDetail';

import type { IServiceRequestDetail } from '../../../Interface/IServiceRequestDetail';
import CrudBtn from '../../Buttons/CrudBtn';
import AdditionalBtn from '../../Buttons/AdditionalBtn';
import Swal from 'sweetalert2';

interface ServiceDetailByTowerIdModalProps {
  isOpen: boolean;
  onClose: () => void;
  towerId?: number | null;
  flightNo?: string | null;
  userRole?: 'officer' | 'agent' | 'viewer';
  // يمكنك تمرير معرف الضابط الحالي أو جلبه من الـ Auth/localStorage داخل المكون
  currentUserId?: string;
}

export default function ServiceDetailByTowerIdModal({
  isOpen,
  onClose,
  towerId,
  flightNo,
  userRole = 'viewer',
  // currentUserId,
}: ServiceDetailByTowerIdModalProps) {
  const {
    data: services,
    isLoading,
    isError,
    refetch,
  } = useGetServiceDetailByTowerDataId(towerId);

  // 1. استدعاء الـ Hook الخاص بقبول الطلب
  const { mutate: acceptOfficer, isPending: isAccepting } =
    useAcceptServiceDetail();

  if (!isOpen) return null;

  // 2. دالة قبول الطلب من الضابط
  const acceptOfficerHandle = (detailId: number) => {
    // جلب معرف المستخدم إما من الـ Props أو من الـ localStorage (عدّل المفتاح حسب نظامك)
    // const userBy = currentUserId || localStorage.getItem('userId') || 'Officer';
    const userBy = '0e8c352b-44f2-430d-bc9d-951dbb43dc3a';
    Swal.fire({
      title: 'تأكيد القبول',
      text: 'هل أنت متأكد من قبول طلب الخدمة الأرضية هذا؟',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#31213F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قبول',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        acceptOfficer(
          { id: detailId, by: userBy },
          {
            onSuccess: () => {
              Swal.fire({
                title: 'تم القبول!',
                text: 'تم قبول طلب الخدمة بنجاح.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
              });
            },
            onError: () => {
              Swal.fire({
                title: 'خطأ!',
                text: 'حدث خطأ أثناء قبول الطلب، يرجى المحاولة مرة أخرى.',
                icon: 'error',
                confirmButtonText: 'حسناً',
              });
            },
          },
        );
      }
    });
  };

  // دالة مساعدة لتنسيق التاريخ والوقت
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleString('ar-EG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // دالة لتحديد شارة الحالة (Status Badge) بناءً على مراحل الطلب
  const renderStatusBadge = (item: IServiceRequestDetail) => {
    if (item.confirmAgentBy) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-1 w-fit mx-auto">
          <i className="fa-solid fa-check-double"></i>
          مؤكد (الوكيل)
        </span>
      );
    }
    if (item.acceptedBy) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center gap-1 w-fit mx-auto">
          <i className="fa-solid fa-check"></i>
          مقبول (الضابط)
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center gap-1 w-fit mx-auto animate-pulse">
        <i className="fa-regular fa-clock"></i>
        قيد الانتظار
      </span>
    );
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden border border-gray-200 animate-fadeIn">
        {/* 1. رأس النافذة (Header) */}
        <div className="bg-[#31213F] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-bell-concierge text-xl text-amber-400"></i>
            <div>
              <h2 className="text-lg font-bold">تفاصيل طلبات الخدمة الأرضية</h2>
              <p className="text-xs text-gray-300">
                رقم الرحلة:{' '}
                <span className="font-semibold text-white">
                  {flightNo || towerId}
                </span>
                {services && services.length > 0 && services[0].airlineName && (
                  <>
                    {' '}
                    | شركة الطيران:{' '}
                    <span className="font-semibold text-amber-300">
                      {services[0].airlineName}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors text-xl cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* 2. محتوى النافذة (Body) */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 gap-3">
              <i className="fa-solid fa-circle-notch fa-spin text-3xl text-[#31213F]"></i>
              <p className="font-medium">جاري تحميل طلبات الخدمة...</p>
            </div>
          ) : isError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                <span>حدث خطأ أثناء جلب تفاصيل الخدمات.</span>
              </div>
              <CrudBtn
                text="إعادة المحاولة"
                btnType="view"
                fun={() => refetch()}
              />
            </div>
          ) : !services || services.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
              <i className="fa-solid fa-inbox text-4xl mb-2 text-gray-400"></i>
              <p className="font-medium">
                لا توجد طلبات خدمة مسجلة لهذه الرحلة حتى الآن.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full text-sm text-right">
                <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-center">#</th>
                    <th className="py-3 px-4">نوع الخدمة</th>
                    <th className="py-3 px-4 text-center">العدد المطلوب</th>
                    <th className="py-3 px-4 text-center">تاريخ الطلب</th>
                    <th className="py-3 px-4 text-center">تاريخ قبول الضابط</th>
                    <th className="py-3 px-4 text-center">
                      تاريخ تأكيد الوكيل
                    </th>
                    <th className="py-3 px-4 text-center">الحالة</th>
                    {userRole !== 'viewer' && (
                      <th className="py-3 px-4 text-center">الإجراء</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {services.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-center font-medium text-gray-500">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#31213F]">
                        {item.serviceTypeName || `خدمة #${item.serviceTypeId}`}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-purple-100 text-[#31213F] font-bold px-2.5 py-0.5 rounded-md">
                          {item.countOfRequests ?? 1}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600 dir-ltr">
                        {formatDateTime(item.requestedAt)}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600 dir-ltr">
                        {formatDateTime(item.acceptedAt)}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600 dir-ltr">
                        {formatDateTime(item.confirmAgentAt)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {renderStatusBadge(item)}
                      </td>

                      {/* أزرار الإجراءات */}
                      {userRole !== 'viewer' && (
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* 3. استدعاء acceptOfficerHandle عند الضغط */}
                            {userRole === 'officer' && !item.acceptedBy && (
                              <AdditionalBtn
                                text={
                                  isAccepting ? 'جاري القبول...' : 'قبول الطلب'
                                }
                                btnType="alert"
                                disabled={isAccepting}
                                fun={() => acceptOfficerHandle(item.id)}
                              />
                            )}

                            {/* في حال اكتملت المرحلة الخاصة بالمستخدم */}
                            {((userRole === 'officer' && item.acceptedBy) ||
                              (userRole === 'agent' &&
                                item.confirmAgentBy)) && (
                              <span className="text-xs text-gray-400 font-medium">
                                تم الإجراء
                              </span>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 3. تذييل النافذة (Footer) */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            إجمالي الطلبات المسجلة: <strong>{services?.length || 0}</strong>
          </span>
          <CrudBtn text="إغلاق" btnType="cancel" fun={onClose} />
        </div>
      </div>
    </div>
  );
}
