import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useGetServiceDetailByTowerDataId } from '../../../Hooks/ServiceDetailHook/useGetServiceDetailByTowerDataId';

import { useAddServiceRequestList } from '../../../Hooks/ServiceDetailHook/useAddServiceRequestList';
import { useUpdateServiceRequestList } from '../../../Hooks/ServiceDetailHook/useUpdateServiceRequestList';
import getServiceType from '../../../Api/ServiceType';

import type { IServiceRequestModel } from '../../../Interface/IServiceRequestDetail';

import CrudBtn from '../../Buttons/CrudBtn';
import AdditionalBtn from '../../Buttons/AdditionalBtn';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  towerId?: number | null;
  flightNo?: string | null;
}

export default function ServiceRequestModal({
  isOpen,
  onClose,
  mode,
  towerId,
  flightNo,
}: ServiceRequestModalProps) {
  // ============================================
  // 1. API Hooks
  // ============================================

  // تعديل 1: جلب الخدمات المسجلة سابقاً فقط في حالة التعديل وعندما يكون المودال مفتوحاً
  const { data: existingServices, isLoading: isLoadingExisting } =
    useGetServiceDetailByTowerDataId(
      mode === 'edit' && isOpen ? towerId : null,
    );

  // جلب أنواع الخدمات
  const { data: serviceTypes = [], isLoading: isLoadingTypes } = useQuery({
    queryKey: ['ServiceType'],
    queryFn: getServiceType,
    enabled: isOpen,
  });

  // Hook الإضافة
  const { mutateAsync: AddServiceRequest, isPending: adding } =
    useAddServiceRequestList();

  // Hook التعديل
  const { mutateAsync: UpdateServiceRequest, isPending: updating } =
    useUpdateServiceRequestList();

  const isSaving = adding || updating;

  // ============================================
  // 2. State
  // ============================================

  const [userEditedServices, setUserEditedServices] = useState<Record<
    number,
    number
  > | null>(null);

  // ============================================
  // 3. حفظ بيانات الخدمات الحالية مع ID
  // ============================================

  // تعديل 2: حماية الدالة باستخدام Array.isArray وتجاهلها في وضع الإضافة
  const existingServicesMap = useMemo(() => {
    const map = new Map<number, IServiceRequestModel>();

    if (mode === 'add') return map;

    const servicesArray: IServiceRequestModel[] = Array.isArray(
      existingServices,
    )
      ? existingServices
      : Array.isArray(
            (existingServices as unknown as { data?: IServiceRequestModel[] })
              ?.data,
          )
        ? (existingServices as unknown as { data: IServiceRequestModel[] }).data
        : [];

    servicesArray.forEach((item) => {
      if (item?.serviceTypeId != null) {
        map.set(item.serviceTypeId, item);
      }
    });

    return map;
  }, [existingServices, mode]);

  // ============================================
  // 4. تحديد الخدمات الافتراضية
  // ============================================

  const initialServicesMap = useMemo(() => {
    const map: Record<number, number> = {};

    // في حالة التعديل نعرض الخدمات المسجلة سابقاً
    // في حالة الإضافة نبدأ بقائمة فارغة
    if (mode === 'edit') {
      existingServicesMap.forEach((item, serviceTypeId) => {
        map[serviceTypeId] = item.countOfRequests ?? 1;
      });
    }

    return map;
  }, [existingServicesMap, mode]);

  // الخدمات المحددة حالياً
  const selectedServices = userEditedServices ?? initialServicesMap;

  // ============================================
  // 5. إغلاق المودال
  // ============================================

  const handleClose = () => {
    setUserEditedServices(null);
    onClose();
  };

  // ============================================
  // 6. تغيير عدد الطلبات
  // ============================================

  const handleCountChange = (serviceTypeId: number, count: number) => {
    setUserEditedServices((prev) => {
      const current = prev ?? initialServicesMap;

      return {
        ...current,
        [serviceTypeId]: count > 0 ? count : 1,
      };
    });
  };

  // ============================================
  // 7. تفعيل أو إلغاء خدمة
  // ============================================

  const handleToggleService = (serviceTypeId: number) => {
    setUserEditedServices((prev) => {
      const copy = { ...(prev ?? initialServicesMap) };

      if (copy[serviceTypeId] !== undefined) {
        delete copy[serviceTypeId];
      } else {
        copy[serviceTypeId] = 1;
      }

      return copy;
    });
  };

  // ============================================
  // 8. تجهيز Payload
  // ============================================

  const handleSaveSubmit = async () => {
    if (towerId == null) {
      Swal.fire('تنبيه', 'رقم الرحلة غير موجود.', 'warning');
      return;
    }

    if (isSaving) return;

    const payload: IServiceRequestModel[] = Object.entries(
      selectedServices,
    ).map(([typeId, count]) => {
      const serviceTypeId = Number(typeId);

      // نحتفظ بالبيانات القديمة عند التعديل فقط
      const existing =
        mode === 'edit' ? existingServicesMap.get(serviceTypeId) : undefined;

      return {
        id: mode === 'add' ? 0 : (existing?.id ?? 0),
        serviceTypeId,
        countOfRequests: count,
        requestedAt: existing?.requestedAt ?? new Date().toISOString(),
        // requestedBy: existing?.requestedBy ?? null,

        requestedBy: '0e8c352b-44f2-430d-bc9d-951dbb43dc3a',
      };
    });

    // التحقق من اختيار خدمة واحدة على الأقل
    if (payload.length === 0) {
      Swal.fire('تنبيه', 'يرجى اختيار خدمة واحدة على الأقل.', 'warning');
      return;
    }

    // ============================================
    // 9. تنفيذ الإضافة أو التعديل
    // ============================================

    try {
      if (mode === 'add') {
        // إضافة الخدمات
        await AddServiceRequest({
          towerDataId: towerId,
          model: payload,
        });

        await Swal.fire(
          'تمت الإضافة',
          'تم تسجيل طلبات الخدمات بنجاح.',
          'success',
        );
      } else {
        // تعديل الخدمات
        await UpdateServiceRequest({
          towerDataId: towerId,
          model: payload,
        });

        await Swal.fire(
          'تم التعديل',
          'تم تحديث طلبات الخدمات بنجاح.',
          'success',
        );
      }

      handleClose();
    } catch (error) {
      console.error('Service Request Error:', error);

      if (axios.isAxiosError(error)) {
        console.error('Status:', error.response?.status);

        console.error('Backend Response:', error.response?.data);

        Swal.fire({
          title: 'خطأ في إضافة الخدمات',
          text:
            typeof error.response?.data === 'string'
              ? error.response.data
              : JSON.stringify(error.response?.data),
          icon: 'error',
        });
      }
    }
  };

  // ============================================
  // 10. Render
  // ============================================

  if (!isOpen) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200 animate-fadeIn">
        {/* Header */}
        <div className="bg-[#31213F] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-list-check text-xl text-amber-400"></i>

            <div>
              <h2 className="text-lg font-bold">
                {mode === 'add'
                  ? 'إضافة طلبات الخدمات الأرضية'
                  : 'تعديل طلبات الخدمات الأرضية'}
              </h2>

              <p className="text-xs text-gray-300">
                رقم الرحلة:{' '}
                <span className="font-semibold text-white">
                  {flightNo || towerId}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSaving}
            className="text-gray-300 hover:text-white transition-colors text-xl cursor-pointer disabled:opacity-50"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {isLoadingTypes || (mode === 'edit' && isLoadingExisting) ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 gap-3">
              <i className="fa-solid fa-circle-notch fa-spin text-3xl text-[#31213F]"></i>

              <p className="font-medium">جاري تحميل الخدمات...</p>
            </div>
          ) : serviceTypes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>لا توجد أنواع خدمات متاحة حالياً.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 mb-2">
                قم بتحديد الخدمات المطلوبة وتحديد العدد لكل خدمة:
              </p>

              {serviceTypes.map((type) => {
                const isSelected = selectedServices[type.id] !== undefined;

                const currentCount = selectedServices[type.id] || 1;

                return (
                  <div
                    key={type.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-purple-300 bg-purple-50/50 shadow-sm'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {/* اسم الخدمة مع Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={isSaving}
                        onChange={() => handleToggleService(type.id)}
                        className="w-4 h-4 text-[#31213F] rounded border-gray-300 focus:ring-purple-500 cursor-pointer"
                      />

                      <span className="font-bold text-gray-800">
                        {type.nameAr || type.nameEn || `خدمة #${type.id}`}
                      </span>
                    </label>

                    {/* حقل العدد */}
                    {isSelected && (
                      <div className="flex items-center gap-2 animate-fadeIn">
                        <span className="text-xs text-gray-600 font-medium">
                          العدد:
                        </span>

                        <input
                          type="number"
                          min="1"
                          disabled={isSaving}
                          value={currentCount}
                          onChange={(e) =>
                            handleCountChange(
                              type.id,
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className="w-20 px-3 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#31213F] text-sm font-bold"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            الخدمات المحددة:{' '}
            <strong>{Object.keys(selectedServices).length}</strong>
          </span>

          <div className="flex gap-2">
            <CrudBtn text="إلغاء" btnType="cancel" fun={handleClose} />

            <AdditionalBtn
              text={
                isSaving
                  ? mode === 'add'
                    ? 'جاري الإضافة...'
                    : 'جاري التعديل...'
                  : mode === 'add'
                    ? 'إضافة الطلبات'
                    : 'حفظ التعديلات'
              }
              btnType="save"
              fun={handleSaveSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
