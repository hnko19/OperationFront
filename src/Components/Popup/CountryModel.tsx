import type { ICountry } from '../../Interface/ICountry';

import { useAddCountry } from '../../Hooks/CountryHook/useAddCountry';
import { useUpdateCountry } from '../../Hooks/CountryHook/useUpdateCountry';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import BaseModal from './BaseModal';
interface CountryModelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: ICountry;
}

export default function CountryModel({
  isOpen,
  onClose,
  mode,
  initialData,
}: CountryModelProps) {
  const { mutate: AddCountry, isPending: adding } = useAddCountry();
  const { mutate: UpdateCountry, isPending: updating } = useUpdateCountry();

  const formik = useFormik({
    initialValues: {
      id: initialData?.id ?? 0,
      nameAr: initialData?.nameAr ?? '',
      nameEn: initialData?.nameEn ?? '',
      code: initialData?.code ?? '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nameAr: Yup.string().required('nameAr is required'),
      nameEn: Yup.string().required('nameEn is required'),

      code: Yup.string().required('code is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload: ICountry = values;

      if (mode === 'add') {
        AddCountry(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success('تمت الإضافة بنجاح');
          },
          onError: () => toast.error('حدث خطأ أثناء الإضافة'),
        });
      } else {
        UpdateCountry(payload, {
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
        nameAr: initialData?.nameAr ?? '',
        nameEn: initialData?.nameEn ?? '',
        code: initialData?.code ?? '',
      });
    }
    onClose();
  };

  return (
    <div>
      <BaseModal
        isOpen={isOpen}
        onClose={handleClose}
        title={mode === 'add' ? 'إضافة وزن جديد' : 'تعديل وزن طائرة'}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="w-full mx-auto bg-white rounded-lg shadow-md px-8 py-4 flex flex-col space-y-4"
        >
          {/* Arabic Name */}
          <div className="flex flex-col">
            <label htmlFor="NameAr" className="text-sm text-gray-700">
              Name (عربي):
            </label>
            <input
              id="nameAr"
              name="nameAr"
              type="nameAr"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameAr}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.nameAr && formik.errors.nameAr && (
              <p className="text-red-500 text-sm">{formik.errors.nameAr}</p>
            )}
          </div>

          {/* English Name */}
          <div className="flex flex-col">
            <label htmlFor="nameEn" className="text-sm text-gray-700">
              Name (English):
            </label>
            <input
              id="nameEn"
              name="nameEn"
              type="nameEn"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameEn}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.nameEn && formik.errors.nameEn && (
              <p className="text-red-500 text-sm">{formik.errors.nameEn}</p>
            )}
          </div>

          {/* code  */}
          <div className="flex flex-col">
            <label htmlFor="code" className="text-sm text-gray-700">
              code:
            </label>
            <input
              id="code"
              name="code"
              type="code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500 text-sm">{formik.errors.code}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={adding || updating}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {adding || updating
                ? mode === 'add'
                  ? 'إضافة...'
                  : 'تعديل...'
                : mode === 'add'
                  ? 'إضافة'
                  : 'تعديل'}
            </button>
          </div>
        </form>
      </BaseModal>
    </div>
  );
}
