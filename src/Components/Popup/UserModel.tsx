import type { IUser } from "../../Interface/IUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import BaseModal from "./BaseModal";
import SelectSingle from "../DropdownList/SelectSingle";
import { useAddUser } from "../../Hooks/UserHook/useAddUser";
import { useUpdateUser } from "../../Hooks/UserHook/UseUpdateUser";
import { useRoles } from "../../Hooks/AuthHooks/useRoles";

interface UserModelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: IUser;
}

export default function UserModel({
  isOpen,
  onClose,
  mode,
  initialData,
}: UserModelProps) {
  const { mutate: addUser, isPending: adding } = useAddUser();
  const { mutate: updateUser, isPending: updating } = useUpdateUser();
  const { data: rolesData = [] } = useRoles();

  // تحويل الأدوار إلى خيارات للـ SelectSingle
  const roleOptions = rolesData.map((role) => ({
    value: role,
    label: role,
  }));

  const initialValues: IUser = {
    id: initialData?.id ?? "",
    fullName: initialData?.fullName ?? "",
    userName: initialData?.userName ?? "",
    email: initialData?.email ?? "",
    phoneNumber: initialData?.phoneNumber ?? "",
    roles: initialData?.roles ?? [],
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    userName: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string().nullable(),
    roles: Yup.array().of(Yup.string()).min(1, "Role is required"),
  });

  const formik = useFormik<IUser>({
    initialValues,
    enableReinitialize: true,
    validationSchema,

    onSubmit: (values, { resetForm }) => {
      if (mode === "add") {
        // تمرير الباسورد الافتراضي مع بيانات الإضافة
        const payload = {
          ...values,
          password: "M@c52541",
        };

        addUser(payload as IUser, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success("Added successfully");
          },
          onError: () => {
            console.log(payload);

            toast.error("An error occurred while adding");
          },
        });
      } else {
        const payload: IUser = values;

        updateUser(payload, {
          onSuccess: () => {
            resetForm();
            onClose();
            toast.success("Updated successfully");
          },
          onError: () => {
            toast.error("An error occurred while updating");
          },
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
      title={mode === "add" ? "Add New User" : "Edit User"}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full bg-white rounded-lg p-4 flex flex-col space-y-4"
      >
        {/* Full Name */}
        <div className="flex flex-col">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700"
          >
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.fullName}
            </p>
          )}
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label
            htmlFor="userName"
            className="text-sm font-medium text-gray-700"
          >
            Username *
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
          />
          {formik.touched.userName && formik.errors.userName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.userName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email *
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

        {/* Phone Number */}
        <div className="flex flex-col">
          <label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber ?? ""}
            className="px-3 py-1.5 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Roles SelectSingle */}
        <div className="flex flex-col">
          <label htmlFor="roles" className="text-sm font-medium text-gray-700">
            Role *
          </label>
          <SelectSingle
            options={roleOptions}
            name="roles"
            value={formik.values.roles?.[0] ?? ""}
            onChange={(val) => formik.setFieldValue("roles", val ? [val] : [])}
          />
          {formik.touched.roles && formik.errors.roles && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.roles as string}
            </p>
          )}
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
              ? mode === "add"
                ? "Adding..."
                : "Updating..."
              : mode === "add"
                ? "Add"
                : "Edit"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
