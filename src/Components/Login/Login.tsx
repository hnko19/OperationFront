
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../Hooks/AuthHooks/useLogin";
import axios from "axios";

export function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      UserName: "",
    },

    validationSchema: Yup.object({
      Email: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email address"),

      Password: Yup.string()
        .required("Password is required"),
    }),

    onSubmit: handleLogin,
  });

  function handleLogin() {
    setErrorMsg("");
    setSuccessMsg("");

    loginMutation.mutate(
      {
        Email: values.Email,
        Password: values.Password,
        UserName: "",
      },
      {
        onSuccess: ({ data }) => {
          setSuccessMsg("Login successful!");

          setUserToken(data.token);
          localStorage.setItem("operationToken", data.token);

          if (location.pathname === "/login") {
            navigate("/");
          } else {
            navigate(location.pathname);
          }
        },

        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setErrorMsg(
              error.response?.data?.message ||
                "Something went wrong."
            );
          } else {
            setErrorMsg(
              error.message || "Something went wrong."
            );
          }
        },
      }
    );
  }

  return (
    <div
      dir="ltr"
      className="relative w-full h-dvh overflow-hidden  flex items-center justify-center  font-sans"
    >
     
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[950px] max-h-full">

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/30">

          {/* Left Section */}
          <div className="hidden lg:flex flex-col justify-center px-12 xl:px-16 bg-[#14263d] text-white">

            {/* Brand */}
            <div className="flex items-center gap-3 mb-16">

              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                <i className="fa-solid fa-plane-departure text-lg text-blue-400" />
              </div>

              <div>
                <h2 className="text-[17px] font-semibold tracking-wide">
                  Airport Operations
                </h2>

                <p className="text-[10px] text-slate-400 tracking-[2px] uppercase mt-1">
                  Management System
                </p>
              </div>

            </div>

            {/* Introduction */}
            <div>

              <p className="text-[11px] text-blue-400 font-medium uppercase tracking-[2px] mb-4">
                Airport Management
              </p>

              <h1 className="text-[28px] font-medium leading-snug text-white">
                Manage Operations.
                <span className="block text-blue-400">
                  Simplify Your Work.
                </span>
              </h1>

              <p className="text-[13px] leading-6 text-slate-400 mt-5 max-w-[340px]">
                An integrated platform for managing airport
                operations and flight activities efficiently.
              </p>

            </div>

            {/* Footer */}
            <div className="mt-20 pt-5 border-t border-white/10">

              <p className="text-[11px] text-slate-500">
                Sudan Airports Company Ltd.
              </p>

            </div>

          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-center bg-white px-6 py-8 sm:px-12 lg:px-10 xl:px-14">

            {/* Mobile Brand */}
            <div className="lg:hidden flex items-center gap-3 mb-9">

              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <i className="fa-solid fa-plane-departure text-lg text-[#174b85]" />
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-slate-800">
                  Airport Operations
                </h2>

                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                  Management System
                </p>
              </div>

            </div>

            {/* Login Header */}
            <div className="mb-7">

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                <i className="fa-solid fa-user-lock text-lg text-[#174b85]" />
              </div>

              <h3 className="text-[22px] font-semibold text-slate-800">
                Welcome Back
              </h3>

              <p className="text-[13px] text-slate-500 mt-2">
                Sign in to your account.
              </p>

            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label className="block text-[13px] font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <i className="fa-regular fa-envelope text-slate-400 text-sm" />
                  </div>

                  <input
                    type="email"
                    name="Email"
                    placeholder="Enter your email"
                    value={values.Email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full h-11 pl-10 pr-3 rounded-lg bg-slate-50 border text-[13px] text-slate-800 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-100 ${
                      touched.Email && errors.Email
                        ? "border-red-400"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                  />

                </div>

                {touched.Email && errors.Email && (
                  <p className="text-red-500 mt-1.5 text-[11px]">
                    {errors.Email}
                  </p>
                )}

              </div>

              {/* Password */}
              <div>

                <label className="block text-[13px] font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <i className="fa-solid fa-lock text-slate-400 text-sm" />
                  </div>

                  <input
                    type={showPassword ? "password" : "text"}
                    name="Password"
                    placeholder="Enter your password"
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full h-11 pl-10 pr-11 rounded-lg bg-slate-50 border text-[13px] text-slate-800 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-100 ${
                      touched.Password && errors.Password
                        ? "border-red-400"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3.5 flex items-center text-slate-400 hover:text-blue-700 transition-colors"
                    aria-label={
                      showPassword ? "Show password" : "Hide password"
                    }
                  >
                    <i
                      className={`fa-regular ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    />
                  </button>

                </div>

                {touched.Password && errors.Password && (
                  <p className="text-red-500 mt-1.5 text-[11px]">
                    {errors.Password}
                  </p>
                )}

              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600">
                  <i className="fa-solid fa-circle-exclamation text-sm" />
                  <p className="text-[12px]">
                    {errorMsg}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {successMsg && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-green-50 border border-green-100 text-green-600">
                  <i className="fa-solid fa-circle-check text-sm" />
                  <p className="text-[12px]">
                    {successMsg}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full h-11 flex items-center justify-center gap-2.5 bg-[#174b85] hover:bg-[#123d70] text-white rounded-lg font-medium text-[13px] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {loginMutation.isPending ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </>
                )}

              </button>

            </form>

            {/* Footer */}
            <div className="mt-8 pt-5 border-t border-slate-100 text-center">

              <p className="text-[11px] text-slate-400">
                Secure access to Airport Operations System
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
