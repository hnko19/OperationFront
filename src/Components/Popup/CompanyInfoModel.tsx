import type { ICompanyInfo } from '../../Interface/ICompanyInfo';
import { useAddCompanyInfo } from '../../Hooks/CompanyInfoHook/useAddCompanyInfo';
import { useUpdateCompanyInfo } from '../../Hooks/CompanyInfoHook/useUpdateCompanyInfo';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import BaseModal from './BaseModal';

interface CompanyInfoModelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: ICompanyInfo;
}

export default function CompanyInfoModel({
  isOpen,
  onClose,
  mode,
  initialData,
}: CompanyInfoModelProps) {
  const { mutate: addCompany, isPending: adding } = useAddCompanyInfo();
  const { mutate: updateCompany, isPending: updating } = useUpdateCompanyInfo();

  const initialValues: ICompanyInfo = {
    id: initialData?.id ?? 0,
    nameAr: initialData?.nameAr ?? '',
    nameEn: initialData?.nameEn ?? '',
    code: initialData?.code ?? '',
    address: initialData?.address ?? '',
    revenuesManager: initialData?.revenuesManager ?? '',
    email: initialData?.email ?? '',
    phone: initialData?.phone ?? '',
    isActive: initialData?.isActive ?? true,
    isSingleAccounting: initialData?.isSingleAccounting ?? false,
    landingSupervisor: initialData?.landingSupervisor ?? '',
    serviceCarSupervisor: initialData?.serviceCarSupervisor ?? '',
    interCuupssupervisor: initialData?.interCuupssupervisor ?? '',
    domeCuupssupervisor: initialData?.domeCuupssupervisor ?? '',
    interNysupervisor: initialData?.interNysupervisor ?? '',
    domeNysupervisor: initialData?.domeNysupervisor ?? '',
    firstClassSupervisor: initialData?.firstClassSupervisor ?? '',
    pushBackSupervisor: initialData?.pushBackSupervisor ?? '',
    createdBy: initialData?.createdBy ?? null,
    creationDate: initialData?.creationDate ?? null,
    updatedBy: initialData?.updatedBy ?? null,
    updatingDate: initialData?.updatingDate ?? null,
  };

  const validationSchema = Yup.object({
    nameAr: Yup.string().required('Arabic Name is required'),
    nameEn: Yup.string().required('English Name is required'),
    code: Yup.string().required('Code is required'),
    email: Yup.string().email('Invalid email format').nullable(),
    phone: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const payload: ICompanyInfo = values;

      if (mode === 'add') {
        addCompany(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success('Added successfully');
          },
          onError: () => toast.error('An error occurred while adding'),
        });
      } else {
        updateCompany(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success('Updated successfully');
          },
          onError: () => toast.error('An error occurred while updating'),
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
      title={mode === 'add' ? 'Add Airport / Company Info' : 'Edit Info'}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-h-[80vh] overflow-y-auto bg-white rounded-lg p-4 flex flex-col space-y-4"
      >
        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="nameAr"
              className="text-sm font-medium text-gray-700"
            >
              Arabic Name *
            </label>
            <input
              id="nameAr"
              name="nameAr"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameAr}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.nameAr && formik.errors.nameAr && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.nameAr}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="nameEn"
              className="text-sm font-medium text-gray-700"
            >
              English Name *
            </label>
            <input
              id="nameEn"
              name="nameEn"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameEn}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.nameEn && formik.errors.nameEn && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.nameEn}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="code" className="text-sm font-medium text-gray-700">
              Code *
            </label>
            <input
              id="code"
              name="code"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.code}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Supervisors Section */}
        <h4 className="text-sm font-semibold text-gray-800 border-b pb-1 pt-2">
          Supervisors & Management
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="revenuesManager" className="text-sm text-gray-700">
              Revenues Manager
            </label>
            <input
              id="revenuesManager"
              name="revenuesManager"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.revenuesManager}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="landingSupervisor"
              className="text-sm text-gray-700"
            >
              Landing Supervisor
            </label>
            <input
              id="landingSupervisor"
              name="landingSupervisor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.landingSupervisor}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="serviceCarSupervisor"
              className="text-sm text-gray-700"
            >
              Service Car Supervisor
            </label>
            <input
              id="serviceCarSupervisor"
              name="serviceCarSupervisor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.serviceCarSupervisor}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="pushBackSupervisor"
              className="text-sm text-gray-700"
            >
              PushBack Supervisor
            </label>
            <input
              id="pushBackSupervisor"
              name="pushBackSupervisor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.pushBackSupervisor}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="firstClassSupervisor"
              className="text-sm text-gray-700"
            >
              First Class Supervisor
            </label>
            <input
              id="firstClassSupervisor"
              name="firstClassSupervisor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstClassSupervisor}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="interCuupssupervisor"
              className="text-sm text-gray-700"
            >
              International CUPS Supervisor
            </label>
            <input
              id="interCuupssupervisor"
              name="interCuupssupervisor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.interCuupssupervisor}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="domeCuupssupervisor"
              className="text-sm text-gray-700"
            >
              Domestic CUPS Supervisor
            </label>
            <input
              id="domeCuupssupervisor"
              name="domeCuupssupervisor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.domeCuupssupervisor}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="interNysupervisor"
              className="text-sm text-gray-700"
            >
              International NY Supervisor
            </label>
            <input
              id="interNysupervisor"
              name="interNysupervisor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.interNysupervisor}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="domeNysupervisor" className="text-sm text-gray-700">
              Domestic NY Supervisor
            </label>
            <input
              id="domeNysupervisor"
              name="domeNysupervisor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.domeNysupervisor}
              className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              name="isActive"
              checked={formik.values.isActive}
              onChange={formik.handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Active
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              name="isSingleAccounting"
              checked={formik.values.isSingleAccounting}
              onChange={formik.handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Single Accounting
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={adding || updating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50"
          >
            {adding || updating
              ? mode === 'add'
                ? 'Adding...'
                : 'Updating...'
              : mode === 'add'
                ? 'Add'
                : 'Edit'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
