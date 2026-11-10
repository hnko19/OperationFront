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

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        Email: "",
        Password: "",
        UserName: "",
      },
      validationSchema: Yup.object({
        Email: Yup.string()
          .required("Email is required")
          .email("Please enter a valid email address"),

        Password: Yup.string().required("Password is required"),
      }),
      onSubmit: handleLogin,
    });

  // Login using React Query
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
              error.response?.data?.message || "Something went wrong.",
            );
          } else {
            setErrorMsg(error.message || "Something went wrong.");
          }
        },
      },
    );
  }

  return (
    <div
      dir="ltr"
      className="relative h-dvh w-full overflow-hidden bg-slate-950 font-sans"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950" />

      {/* Decorative Background */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-20 h-full w-full flex items-start justify-center px-5 sm:px-8 lg:px-16 py-4">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
          {/* Left Section */}
          <div className="hidden lg:flex flex-col flex-1 max-w-xl text-white">
            {/* Brand */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <i className="fa-solid fa-plane-departure text-2xl text-purple-300" />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-wide">
                  Airport Operations
                </h2>

                <p className="text-xs text-slate-400 tracking-widest uppercase">
                  Management System
                </p>
              </div>
            </div>

            {/* Introduction */}
            <p className="text-purple-300 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Airport Management Platform
            </p>


            <p className="text-slate-400 text-base leading-relaxed max-w-md">
              Manage airport operations, coordinate flight activities, and
              monitor daily operations through one integrated platform.
            </p>

            <div className="flex items-center gap-6 mt-8 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-purple-300" />
                Secure Access
              </div>

              <div className="flex items-center gap-2">
                <i className="fa-solid fa-plane text-purple-300" />
                Flight Management
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md shrink-0">
            <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 px-7 py-5 sm:px-9 sm:py-8">
              {/* Header */}
              <div className="mb-7 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <i className="fa-solid fa-user-lock text-2xl text-purple-700" />
                </div>

                <h3 className="text-2xl text-slate-500">
                  Sign in to access your account
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="fa-regular fa-envelope text-slate-400" />
                    </div>

                    <input
                      type="email"
                      name="Email"
                      placeholder="Enter your email"
                      value={values.Email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full pl-11 pr-4 py-2 rounded-xl bg-slate-50 border text-sm text-slate-800 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-purple-100 ${
                        touched.Email && errors.Email
                          ? "border-red-400 focus:border-red-400"
                          : "border-slate-200 focus:border-purple-500"
                      }`}
                    />
                  </div>

                  {touched.Email && errors.Email && (
                    <p className="text-red-500 mt-1.5 text-xs">
                      {errors.Email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="fa-solid fa-lock text-slate-400" />
                    </div>

                    <input
                      type={showPassword ? "password" : "text"}
                      name="Password"
                      placeholder="Enter your password"
                      value={values.Password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full pl-11 pr-12 py-2 rounded-xl bg-slate-50 border text-sm text-slate-800 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-purple-100 ${
                        touched.Password && errors.Password
                          ? "border-red-400 focus:border-red-400"
                          : "border-slate-200 focus:border-purple-500"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-400 hover:text-purple-700 transition-colors"
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
                    <p className="text-red-500 mt-1.5 text-xs">
                      {errors.Password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-700 hover:to-indigo-600 text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-purple-900/20 transition-all duration-300 hover:shadow-purple-900/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loginMutation.isPending ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <i className="fa-solid fa-arrow-right" />
                    </>
                  )}
                </button>

                {/* Error Message */}
                {errorMsg && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600">
                    <i className="fa-solid fa-circle-exclamation" />
                    <p className="text-sm">{errorMsg}</p>
                  </div>
                )}

                {/* Success Message */}
                {successMsg && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100 text-green-600">
                    <i className="fa-solid fa-circle-check" />
                    <p className="text-sm">{successMsg}</p>
                  </div>
                )}
              </form>

              {/* Footer */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400">
                  Secure access to Airport Operations System
                </p>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-center text-slate-400 text-xs mt-4">
              Copyright © 2025 - IT Department
            </p>
          </div>
        </div>
      </div>

      {/* Background Wave */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gray-100 -z-0" />

      <svg
        className="absolute bottom-0 left-0 z-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "100px", width: "100%" }}
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96V320H0Z"
        />
      </svg>
    </div>
  );
}
