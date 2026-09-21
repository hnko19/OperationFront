import type {
  IAirlineAgentShow,
  IAirlineAgentCreate,
} from "../../Interface/IAirlineAgent";
import { useAddAirlineAgent } from "../../Hooks/AirlineAgentHook/useAddAirlineAgent";
import { useUpdateAirlineAgent } from "../../Hooks/AirlineAgentHook/useUpdateAirlineAgent";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import BaseModal from "./BaseModal";
import SelectSingle from "../DropdownList/SelectSingle";
import { useAirlineFids } from "../../Hooks/AirlineHook/useAirline";
import type { IAirlineFids } from "../../Interface/IAirline";
// افترض وجود Hook لجلب خطوط الطيران لاختيار Airline

interface AirlineAgentModelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: IAirlineAgentShow;
}

export default function AirlineAgentModel({
  isOpen,
  onClose,
  mode,
  initialData,
}: AirlineAgentModelProps) {
  const { mutate: addAirlineAgent, isPending: adding } = useAddAirlineAgent();
  const { mutate: updateAirlineAgent, isPending: updating } =
    useUpdateAirlineAgent();

  // جلب قائمة خطوط الطيران للـ Select
  const { data: airlines = [] } = useAirlineFids();

  const airlineOptions = airlines.map((a: IAirlineFids) => ({
    value: a.Id,
    label: a.NameEn,
  }));

  const formik = useFormik({
    initialValues: {
      id: initialData?.id ?? 0,
      nameAr: initialData?.nameAr ?? "",
      nameAn: initialData?.nameAn ?? "",
      phone1: initialData?.phone1 ?? "",
      phone2: initialData?.phone2 ?? "",
      email: initialData?.email ?? "",
      address: initialData?.address ?? "",
      airLineId: initialData?.airLineId ?? 0,
      userId: initialData?.userId ?? "2d1c8cbf-0f0f-487f-afb7-e0638741b8cf",
      isActive: initialData?.isActive ?? true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nameAr: Yup.string().trim().required("Arabic name is required"),
      nameAn: Yup.string().trim().required("English name is required"),
      phone1: Yup.string().trim().required("Primary phone is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      address: Yup.string().trim().required("Address is required"),
      airLineId: Yup.number()
        .min(1, "Airline selection is required")
        .required("Airline is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (mode === "add") {
        const payload: IAirlineAgentCreate = {
          nameAr: values.nameAr,
          nameAn: values.nameAn,
          phone1: values.phone1,
          phone2: values.phone2 || null,
          email: values.email,
          address: values.address,
          airLineId: Number(values.airLineId),
          userId: values.userId,
          isActive: values.isActive,
        };

        addAirlineAgent(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success("Added Successfully");
          },
          onError: () => toast.error("An error occurred while adding"),
        });
      } else {
        const payload: IAirlineAgentCreate = {
          id: values.id,
          nameAr: values.nameAr,
          nameAn: values.nameAn,
          phone1: values.phone1,
          phone2: values.phone2 || null,
          email: values.email,
          address: values.address,
          airLineId: Number(values.airLineId),
          userId: values.userId,
          isActive: values.isActive,
        };

        updateAirlineAgent(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success("Updated Successfully");
          },
          onError: () => toast.error("An error occurred while updating"),
        });
      }
    },
  });

  const handleClose = () => {
    if (mode === "add") {
      formik.resetForm();
    } else {
      formik.setValues({
        id: initialData?.id ?? 0,
        nameAr: initialData?.nameAr ?? "",
        nameAn: initialData?.nameAn ?? "",
        phone1: initialData?.phone1 ?? "",
        phone2: initialData?.phone2 ?? "",
        email: initialData?.email ?? "",
        address: initialData?.address ?? "",
        airLineId: initialData?.airLineId ?? 0,
        userId: initialData?.userId ?? "2d1c8cbf-0f0f-487f-afb7-e0638741b8cf",
        isActive: initialData?.isActive ?? true,
      });
    }
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === "add" ? "Add Airline Agent" : "Edit Airline Agent"}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full mx-auto bg-white rounded-lg px-6 py-4 flex flex-col space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* الاسم بالعربية */}
          <div className="flex flex-col">
            <label
              htmlFor="nameAr"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Arabic Name:
            </label>
            <input
              id="nameAr"
              name="nameAr"
              type="text"
              dir="rtl"
              placeholder="الاسم بالعربية"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameAr}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            {formik.touched.nameAr && formik.errors.nameAr && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.nameAr}
              </p>
            )}
          </div>

          {/* الاسم بالإنجليزية */}
          <div className="flex flex-col">
            <label
              htmlFor="nameAn"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              English Name:
            </label>
            <input
              id="nameAn"
              name="nameAn"
              type="text"
              placeholder="English Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameAn}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            {formik.touched.nameAn && formik.errors.nameAn && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.nameAn}
              </p>
            )}
          </div>

          {/* خط الطيران */}
          <div className="flex flex-col">
            <label
              htmlFor="airLineId"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Airline:
            </label>
            <SelectSingle
              options={airlineOptions}
              name="airLineId"
              value={formik.values.airLineId}
              onChange={(val) => formik.setFieldValue("airLineId", val)}
            />
            {formik.touched.airLineId && formik.errors.airLineId && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.airLineId}
              </p>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
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
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* الهاتف الأول */}
          <div className="flex flex-col">
            <label
              htmlFor="phone1"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Phone 1:
            </label>
            <input
              id="phone1"
              name="phone1"
              type="text"
              placeholder="Primary Phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone1}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            {formik.touched.phone1 && formik.errors.phone1 && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.phone1}
              </p>
            )}
          </div>

          {/* الهاتف الثاني */}
          <div className="flex flex-col">
            <label
              htmlFor="phone2"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Phone 2 (Optional):
            </label>
            <input
              id="phone2"
              name="phone2"
              type="text"
              placeholder="Secondary Phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone2}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* العنوان */}
        <div className="flex flex-col">
          <label
            htmlFor="address"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Address:
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Agent Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/* تفعيل / تعطيل */}
        <div className="flex items-center gap-x-2 pt-1">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={formik.values.isActive}
            onChange={(e) => formik.setFieldValue("isActive", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="isActive"
            className="text-sm font-medium text-gray-700"
          >
            Active Agent
          </label>
        </div>

        {/* أزرار الحفظ والإلغاء */}
        <div className="flex justify-start gap-x-2 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={adding || updating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors disabled:opacity-50"
          >
            {adding || updating
              ? "Loading ..."
              : mode === "add"
                ? "Add"
                : "Save Changes"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
