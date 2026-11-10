import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import type { IUser } from "../../Interface/IUser";
import { useUpdateUser } from "../../Hooks/UserHook/UseUpdateUser";
import { useUserDetails } from "../../Hooks/UserHook/useUserDetails";
import { UserContext } from "../../Context/UserContext";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");

  // 1. جلب الـ userId ديناميكياً من الـ UserContext
  const { userId } = useContext(UserContext);

  // 2. جلب تفاصيل المستخدم بناءً على الـ userId
  const { data: currentUser, isLoading, isError } = useUserDetails(userId);
  const { mutate: updateUser, isPending: updatingUser } = useUpdateUser();

  // استخراج الدور كقيمة نصية مفردة
  const userRole = Array.isArray(currentUser?.roles)
    ? currentUser?.roles[0] || "User"
    : (currentUser?.roles as unknown as string) || "User";

  // استخراج الحروف الأولى للافاتار
  const initials = currentUser?.fullName
    ? currentUser.fullName
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  // Formik 1: تحديث البيانات الأساسية
  const profileFormik = useFormik<IUser>({
    initialValues: {
      id: currentUser?.id ?? "",
      fullName: currentUser?.fullName ?? "",
      userName: currentUser?.userName ?? "",
      email: currentUser?.email ?? "",
      phoneNumber: currentUser?.phoneNumber ?? "",
      roles: currentUser?.roles ?? [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      userName: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phoneNumber: Yup.string().nullable(),
    }),
    onSubmit: (values) => {
      console.log(values);
      const payload: IUser = {
        ...values,
        phoneNumber: values.phoneNumber || null,
      };

      updateUser(payload, {
        onSuccess: () => {
          toast.success("Profile updated successfully");
        },
        onError: () => {
          toast.error("An error occurred while updating profile");
        },
      });
    },
  });

  // Formik 2: تغيير كلمة المرور
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "78945612",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (_values, { resetForm }) => {
      toast.success("Password changed successfully");
      resetForm();
    },
  });

  // حالة التحميل أثناء استرجاع البيانات
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500 font-medium">Loading user profile...</p>
        </div>
      </div>
    );
  }

  // في حال تعذر العثور على المعرف أو حدوث خطأ
  if (isError || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500 font-medium">Failed to load user profile.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal details and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ================= Left Side (1/3 Card) ================= */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-blue-50 shadow mb-4">
            {initials}
          </div>

          {/* Full Name */}
          <h2 className="text-lg font-semibold text-gray-900 capitalize">
            {currentUser.fullName}
          </h2>

          {/* Username */}
          <p className="text-sm text-gray-500 mb-3">@{currentUser.userName}</p>

          {/* Single Role Badge */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 uppercase tracking-wider mb-6">
            {userRole}
          </span>

          {/* Contact Details List */}
          <div className="w-full border-t border-gray-100 pt-4 space-y-3 text-left">
            <div>
              <span className="text-xs font-medium text-gray-400 block uppercase">
                Email Address
              </span>
              <span className="text-sm text-gray-700 font-medium break-all">
                {currentUser.email}
              </span>
            </div>

            <div>
              <span className="text-xs font-medium text-gray-400 block uppercase">
                Phone Number
              </span>
              <span className="text-sm text-gray-700 font-medium">
                {currentUser.phoneNumber || "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* ================= Right Side (2/3 Card with Tabs) ================= */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50/50 px-4 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab("info")}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-150 ${
                activeTab === "info"
                  ? "border-blue-600 text-blue-600 bg-white rounded-t-md border-t border-x border-b-transparent -mb-[1px]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              General Information
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("password")}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-150 ${
                activeTab === "password"
                  ? "border-blue-600 text-blue-600 bg-white rounded-t-md border-t border-x border-b-transparent -mb-[1px]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Change Password
            </button>
          </div>

          <div className="p-6">
            {/* Tab 1: General Information */}
            {activeTab === "info" && (
              <form onSubmit={profileFormik.handleSubmit} className="space-y-4">
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
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    value={profileFormik.values.fullName}
                    className="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {profileFormik.touched.fullName &&
                    profileFormik.errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {profileFormik.errors.fullName}
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
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    value={profileFormik.values.userName}
                    className="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {profileFormik.touched.userName &&
                    profileFormik.errors.userName && (
                      <p className="text-red-500 text-xs mt-1">
                        {profileFormik.errors.userName}
                      </p>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    value={profileFormik.values.email}
                    className="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {profileFormik.touched.email &&
                    profileFormik.errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {profileFormik.errors.email}
                      </p>
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
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    value={profileFormik.values.phoneNumber ?? ""}
                    className="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => profileFormik.resetForm()}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={updatingUser}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50"
                  >
                    {updatingUser ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* Tab 2: Change Password */}
            {activeTab === "password" && (
              <form
                onSubmit={passwordFormik.handleSubmit}
                className="space-y-4"
              >
                {/* Current Password */}
                <div className=" flex-col hidden">
                  <label
                    htmlFor="currentPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Current Password *
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.currentPassword}
                    className="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {passwordFormik.touched.currentPassword &&
                    passwordFormik.errors.currentPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {passwordFormik.errors.currentPassword}
                      </p>
                    )}
                </div>

                {/* New Password */}
                <div className="flex flex-col">
                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    New Password *
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.newPassword}
                    className="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {passwordFormik.touched.newPassword &&
                    passwordFormik.errors.newPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {passwordFormik.errors.newPassword}
                      </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm New Password *
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.confirmPassword}
                    className="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {passwordFormik.touched.confirmPassword &&
                    passwordFormik.errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {passwordFormik.errors.confirmPassword}
                      </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => passwordFormik.resetForm()}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition"
                  >
                    Clear
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
