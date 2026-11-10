import type { IFuelCompany } from '../../Interface/IFuelCompany';
import { useAddFuelCompany } from '../../Hooks/FuelCompanyHook/useAddFuelCompany';
import { useUpdateFuelCompany } from '../../Hooks/FuelCompanyHook/useUpdateFuelCompany';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import BaseModal from './BaseModal';

interface FuelCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: IFuelCompany;
}

export default function FuelCompanyModal({
  isOpen,
  onClose,
  mode,
  initialData,
}: FuelCompanyModalProps) {
  const { mutate: AddFuelCompany, isPending: adding } = useAddFuelCompany();
  const { mutate: UpdateFuelCompany, isPending: updating } =
    useUpdateFuelCompany();

  const formik = useFormik({
    initialValues: {
      id: initialData?.id ?? 0,
      nameAr: initialData?.nameAr ?? '',
      nameEn: initialData?.nameEn ?? '',
      phone: initialData?.phone ?? '',
      email: initialData?.email ?? '',
      address: initialData?.address ?? '',
      isActive: initialData?.isActive ?? true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nameAr: Yup.string().required('Arabic Name is required'),
      nameEn: Yup.string().required('English Name is required'),
      phone: Yup.string().required('Phone number is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload: IFuelCompany = values as IFuelCompany;

      if (mode === 'add') {
        AddFuelCompany(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success('Fuel company added successfully');
          },
          onError: () => toast.error('Failed to add fuel company'),
        });
      } else {
        UpdateFuelCompany(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success('Fuel company updated successfully');
          },
          onError: () => toast.error('Failed to update fuel company'),
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'add' ? 'Add Fuel Company' : 'Edit Fuel Company'}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full mx-auto bg-white rounded-lg shadow-md px-8 py-4 flex flex-col space-y-4"
      >
        {/* Arabic Name */}
        <div className="flex flex-col">
          <label htmlFor="nameAr" className="text-sm font-medium text-gray-700">
            Arabic Name:
          </label>
          <input
            id="nameAr"
            name="nameAr"
            type="text"
            placeholder="Enter Arabic name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nameAr}
            className="w-full px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {formik.touched.nameAr && formik.errors.nameAr && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.nameAr}</p>
          )}
        </div>

        {/* English Name */}
        <div className="flex flex-col">
          <label htmlFor="nameEn" className="text-sm font-medium text-gray-700">
            English Name:
          </label>
          <input
            id="nameEn"
            name="nameEn"
            type="text"
            placeholder="Enter English name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nameEn}
            className="w-full px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {formik.touched.nameEn && formik.errors.nameEn && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.nameEn}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter phone number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="w-full px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Address:
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Enter address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className="w-full px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/* IsActive Checkbox */}
        <div className="flex items-center space-x-2 pt-2">
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
            Active Status
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={adding || updating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {adding || updating
              ? mode === 'add'
                ? 'Adding...'
                : 'Saving...'
              : mode === 'add'
                ? 'Add'
                : 'Save Changes'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
