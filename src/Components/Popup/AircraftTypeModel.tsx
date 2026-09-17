import type {
  IAircraftTypeShow,
  IAircraftTypeCreate,
} from '../../Interface/IAircraftType';
import { useAddAircraftType } from '../../Hooks/AircraftTypeHook/useAddAircraftType';
import { useUpdateAircraftType } from '../../Hooks/AircraftTypeHook/useUpdateAircraftType';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import BaseModal from './BaseModal';
import SelectSingle from '../DropdownList/SelectSingle';

interface AircraftTypeModelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: IAircraftTypeShow;
}

export default function AircraftTypeModel({
  isOpen,
  onClose,
  mode,
  initialData,
}: AircraftTypeModelProps) {
  const { mutate: addAircraftType, isPending: adding } = useAddAircraftType();
  const { mutate: updateAircraftType, isPending: updating } = useUpdateAircraftType();

  // خيارات أحجام الطائرات (يمكن جلبها من Hook مخصص إذا كانت ديناميكية)
  const sizeOptions = [
    { value: 1, label: 'Small' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'Large' },
    { value: 4, label: 'Heavy' },
  ];

  const formik = useFormik({
    initialValues: {
      id: initialData?.id ?? 0,
      type: initialData?.type ?? '',
      sizeId: initialData?.sizeId ?? 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      type: Yup.string().trim().required('نوع الطراز مطلوب (Type is required)'),
      sizeId: Yup.number()
        .min(1, 'يرجى اختيار حجم الطائرة (Size is required)')
        .required('حجم الطائرة مطلوب'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (mode === 'add') {
        const payload: IAircraftTypeCreate = {
          type: values.type,
          sizeId: Number(values.sizeId),
        };

        addAircraftType(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success('تمت إضافة نوع الطائرة بنجاح');
          },
          onError: () => toast.error('حدث خطأ أثناء الإضافة'),
        });
      } else {
        const payload: IAircraftTypeShow = {
          id: values.id,
          type: values.type,
          sizeId: Number(values.sizeId),
          createdBy: initialData?.createdBy ?? null,
          creationDate: initialData?.creationDate ?? null,
          updatedBy: initialData?.updatedBy ?? null,
          updatingDate: initialData?.updatingDate ?? null,
          size: {
            id: Number(values.sizeId),
            size:
              sizeOptions.find((opt) => opt.value === Number(values.sizeId))
                ?.label ??
              initialData?.size?.size ??
              '',
          },
        };

        updateAircraftType(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success('تم التعديل بنجاح');
          },
          onError: () => toast.error('حدث خطأ أثناء التعديل'),
        });
      }
    },
  });

  const handleClose = () => {
    if (mode === 'add') {
      formik.resetForm();
    } else {
      formik.setValues({
        id: initialData?.id ?? 0,
        type: initialData?.type ?? '',
        sizeId: initialData?.sizeId ?? 0,
      });
    }
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        mode === 'add'
          ? 'إضافة نوع طائرة (Add Aircraft Type)'
          : 'تعديل نوع طائرة (Edit Aircraft Type)'
      }
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full mx-auto bg-white rounded-lg px-6 py-4 flex flex-col space-y-4"
      >
        {/* حقل نوع الطائرة (Type) */}
        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1">
            نوع / طراز الطائرة (Aircraft Type):
          </label>
          <input
            id="type"
            name="type"
            type="text"
            placeholder="مثال: Boeing 737-800 أو A320"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.type}</p>
          )}
        </div>

        {/* حقل اختيار الحجم (Size) */}
        <div className="flex flex-col">
          <label htmlFor="sizeId" className="text-sm font-medium text-gray-700 mb-1">
            الحجم (Aircraft Size):
          </label>
          <SelectSingle
            options={sizeOptions}
            name="sizeId"
            value={formik.values.sizeId}
            onChange={(val) => formik.setFieldValue('sizeId', val)}
          />
          {formik.touched.sizeId && formik.errors.sizeId && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.sizeId}</p>
          )}
        </div>

        {/* أزرار الحفظ والإلغاء */}
        <div className="flex justify-end gap-x-2 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={adding || updating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors disabled:opacity-50"
          >
            {adding || updating
              ? mode === 'add'
                ? 'جاري الإضافة...'
                : 'جاري التعديل...'
              : mode === 'add'
                ? 'إضافة'
                : 'تعديل'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}