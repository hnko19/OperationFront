import type { IHandlingAgentsCompany } from '../../Interface/IHandlingAgentsCompany';
import { useAddHandlingAgentsCompany } from '../../Hooks/HandlingAgentsCompanyHook/useAddHandlingAgentsCompany';

import { useUpdateHandlingAgentsCompany } from '../../Hooks/HandlingAgentsCompanyHook/useUpdateHandlingAgentsCompany';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import BaseModal from './BaseModal';
// import { useAircraftType } from '../../Hooks/AircraftTypeHook/useAircraftType';

import SelectSingle from '../DropdownList/SelectSingle';

interface AircraftTypeModelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: IHandlingAgentsCompany;
}

export default function HandlingAgentsCompanyModel({
  isOpen,
  onClose,
  mode,
  initialData,
}: AircraftTypeModelProps) {
  const { mutate: AddAircraftRegistration, isPending: adding } =
    useAddHandlingAgentsCompany();
  const { mutate: UpdateAircraftRegistration, isPending: updating } =
    useUpdateHandlingAgentsCompany();
  //   const { data: aircraftTypes } = useAircraftType();

  //   const AircraftTypeOptions =
  //     aircraftTypes?.map((t) => ({
  //       value: t.id,
  //       label: t.type,
  //     })) ?? [];
  const currencyOptions = [
    { value: 1, label: 'جنيه' },
    { value: 2, label: 'دولار' },
  ];

  const formik = useFormik({
    initialValues: {
      id: initialData?.id ?? 0,
      phone: initialData?.phone ?? '',
      email: initialData?.email ?? '',
      nameAr: initialData?.nameAr ?? '',
      nameEn: initialData?.nameEn ?? '',
      address: initialData?.address ?? '',
      currencyId: initialData?.currencyId ?? 0,
      isActive: initialData?.isActive ?? false, // ✅ تمت إضافة الحقل الناقص هنا
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nameAr: Yup.string().required('nameAr type is required'),
      nameEn: Yup.string().required('nameEn is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload: IHandlingAgentsCompany = values;

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
        currencyId: initialData?.currencyId ?? 0,
        phone: initialData?.phone ?? '',
        email: initialData?.email ?? '',
        nameAr: initialData?.nameAr ?? '',
        nameEn: initialData?.nameEn ?? '',
        address: initialData?.address ?? '',
        isActive: initialData?.isActive ?? false,
      });
    }
    onClose();
  };

  return (
    <div>
      <BaseModal
        isOpen={isOpen}
        onClose={handleClose}
        title={
          mode === 'add'
            ? 'Add Handling Agents Company'
            : 'Edit Handling Agents Company'
        }
      >
        <form
          onSubmit={formik.handleSubmit}
          className="w-full mx-auto bg-white rounded-lg shadow-md px-8 py-4 flex flex-col space-y-4"
        >
          {/* Arabic Name */}
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm text-gray-700">
              phone (رقم الهاتف):
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>

          {/* nameEn  */}
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm text-gray-700">
              nameEn :
            </label>
            <input
              id="nameEn"
              name="nameEn"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameEn}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.nameEn && formik.errors.nameEn && (
              <p className="text-red-500 text-sm">{formik.errors.nameEn}</p>
            )}
          </div>

          {/* nameAr  */}
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm text-gray-700">
              nameAr :
            </label>
            <input
              id="nameAr"
              name="nameAr"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameAr}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.nameAr && formik.errors.nameAr && (
              <p className="text-red-500 text-sm">{formik.errors.nameAr}</p>
            )}
          </div>

          {/* address  */}
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm text-gray-700">
              address :
            </label>
            <input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          {/* currencyId  */}
          <div className="flex flex-col">
            <label htmlFor="currencyId" className="text-sm text-gray-700">
              Currency :
            </label>
            <SelectSingle
              options={currencyOptions}
              name="currencyId"
              value={formik.values.currencyId}
              onChange={(val) => formik.setFieldValue('currencyId', val)}
            />
            {formik.touched.currencyId && formik.errors.currencyId && (
              <p className="text-red-500 text-sm">{formik.errors.currencyId}</p>
            )}
          </div>

          {/* IsActive Checkbox */}
          <div className="flex items-center space-x-2 space-x-reverse pt-2">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.isActive}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              تفعيل الحساب (نشط)
            </label>
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
