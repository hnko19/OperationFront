import type { IAircraftRegistration } from '../../Interface/IAircraftRegistration';
import { useAddAircraftRegistration } from '../../Hooks/AircraftRegistrationHook/useAddAircraftRegistration';

import { useUpdateAircraftRegistration } from '../../Hooks/AircraftRegistrationHook/useUpdateAircraftRegistration';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import BaseModal from './BaseModal';
import { useAircraftType } from '../../Hooks/AircraftTypeHook/useAircraftType';
import SelectSingle from '../DropdownList/SelectSingle';

interface AircraftTypeModelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: IAircraftRegistration;
}

export default function AircraftRegistrationModel({
  isOpen,
  onClose,
  mode,
  initialData,
}: AircraftTypeModelProps) {
  const { mutate: AddAircraftRegistration, isPending: adding } =
    useAddAircraftRegistration();
  const { mutate: UpdateAircraftRegistration, isPending: updating } =
    useUpdateAircraftRegistration();
  const { data: aircraftTypes } = useAircraftType();

  const AircraftTypeOptions =
    aircraftTypes?.map((t) => ({
      value: t.id,
      label: t.type,
    })) ?? [];

  const formik = useFormik({
    initialValues: {
      id: initialData?.id ?? 0,
      registration: initialData?.registration ?? '',
      aircraftTypeId: initialData?.aircraftTypeId ?? 0,
      maxTakoffWieght: initialData?.maxTakoffWieght ?? 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      registration: Yup.string().required('registration type is required'),
      aircraftTypeId: Yup.string().required('aircraftTypeId is required'),
      maxTakoffWieght: Yup.string().required('maxTakoffWieght is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload: IAircraftRegistration = values;

      if (mode === 'add') {
        AddAircraftRegistration(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success('تمت الإضافة بنجاح');
          },
          onError: () => toast.error('حدث خطأ أثناء الإضافة'),
        });
      } else {
        UpdateAircraftRegistration(payload, {
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
        registration: initialData?.registration ?? '',
        aircraftTypeId: initialData?.aircraftTypeId ?? 0,
        maxTakoffWieght: initialData?.maxTakoffWieght ?? 0,
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
            <label htmlFor="type" className="text-sm text-gray-700">
              Registration (رقم التسجيل):
            </label>
            <input
              id="registration"
              name="registration"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registration}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.registration && formik.errors.registration && (
              <p className="text-red-500 text-sm">
                {formik.errors.registration}
              </p>
            )}
          </div>

          {/* maxTakoffWieght  */}
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm text-gray-700">
              maxTakoffWieght :
            </label>
            <input
              id="maxTakoffWieght"
              name="maxTakoffWieght"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.maxTakoffWieght}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.maxTakoffWieght &&
              formik.errors.maxTakoffWieght && (
                <p className="text-red-500 text-sm">
                  {formik.errors.maxTakoffWieght}
                </p>
              )}
          </div>

          {/* aircraftType */}
          {
            <div className="flex flex-col">
              <label htmlFor="aircraftTypeId" className="text-sm text-gray-700">
                Aircraft Type :
              </label>
              <SelectSingle
                options={AircraftTypeOptions}
                name="aircraftTypeId"
                value={formik.values.aircraftTypeId}
                onChange={(val) => formik.setFieldValue('aircraftTypeId', val)}
              />
              {formik.touched.aircraftTypeId &&
                formik.errors.aircraftTypeId && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.aircraftTypeId}
                  </p>
                )}
            </div>
          }

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
