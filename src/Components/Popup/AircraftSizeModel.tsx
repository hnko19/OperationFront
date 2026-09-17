import type { IAircraftSize } from '../../Interface/IAircraftSize';
import { useAddAircraftSize } from '../../Hooks/AircraftSizeHook/useAddAircraftSize';
import { useUpdateAircraftSize } from '../../Hooks/AircraftSizeHook/useUpdateAircraftSize';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import BaseModal from './BaseModal';
interface AircraftSizeModelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: IAircraftSize;
}

export default function AircraftSizeModel({
  isOpen,
  onClose,
  mode,
  initialData,
}: AircraftSizeModelProps) {
  const { mutate: AddAircraftSize, isPending: adding } = useAddAircraftSize();
  const { mutate: UpdateAircraftSize, isPending: updating } =
    useUpdateAircraftSize();

  const formik = useFormik({
    initialValues: {
      id: initialData?.id ?? 0,
      size: initialData?.size ?? '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      size: Yup.string().required('Aircraft Size is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload: IAircraftSize = values;

      if (mode === 'add') {
        AddAircraftSize(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success('تمت الإضافة بنجاح');
          },
          onError: () => toast.error('حدث خطأ أثناء الإضافة'),
        });
      } else {
        UpdateAircraftSize(payload, {
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
        size: initialData?.size ?? '',
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
              Size (الوزن):
            </label>
            <input
              id="size"
              name="size"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.size && formik.errors.size && (
              <p className="text-red-500 text-sm">{formik.errors.size}</p>
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
