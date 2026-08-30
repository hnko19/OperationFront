import { useFormik } from "formik";
import * as Yup from "yup";

import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

// import sacLogo from "../../assets/sacLogo.png";
import { useLogin } from "../../Hooks/AuthHooks/useLogin";
import axios from "axios";

export function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // ⭐ React Query Login Hook
  const loginMutation = useLogin();

  // ⭐ Formik
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        Email: "",
        Password: "",
      },
      validationSchema: Yup.object({
        Email: Yup.string()
          .required("البريد الإلكتروني مطلوب")
          .email("أدخل بريد إلكتروني صحيح"),

        Password: Yup.string().required("كلمة المرور مطلوبة"),
      }),
      onSubmit: handleLogin,
    });

  // ⭐ Login using React Query
  function handleLogin() {
    setErrorMsg("");
    setSuccessMsg("");

    loginMutation.mutate(
      {
        Email: values.Email,
        Password: values.Password,
      },
      {
        onSuccess: ({ data }) => {
          setSuccessMsg("تم تسجيل الدخول بنجاح");

          setUserToken(data.Token);
          localStorage.setItem("fidsToken", data.Token);

          if (location.pathname == "/login") {
            navigate("/");
          }
          navigate(location.pathname);
        },

        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setErrorMsg(error.response?.data?.message || "حدث خطأ ما");
          } else {
            setErrorMsg(error.message || "حدث خطأ ما");
          }
        },
      },
    );
  }

  return (
    <>
      {/* الخلفية الأساسية */}
      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>

      <div className="relative z-50 min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        {/* النص اليسار */}
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">
              {" "}
              نظام تشغيل المطار - Operations{" "}
            </h1>
            <p className="pr-3 opacity-75">
              نظام معني بتشغيل وادارة المطار و ادارة الرحلات
            </p>
          </div>
        </div>

        {/* الصندوق */}
        <div className="flex justify-center self-center z-10 shadow-xl rounded-3xl py-3">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96">
            {/* عنوان */}
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-center text-gray-800">
                {" "}
                تسجيل دخول{" "}
              </h3>
              {/* <img className="w-15 mx-auto my-6" src={ sacLogo} /> */}
            </div>

            {/* ⭐⭐ Formik Form ⭐⭐ */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <input
                  className="text-end w-full text-sm px-4 py-3 bg-gray-100 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="email"
                  name="Email"
                  placeholder="E-mail"
                  value={values.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.Email && errors.Email && (
                  <p className="text-red-500 mt-1 text-sm text-end">
                    {errors.Email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  placeholder="Password"
                  type={showPassword ? "password" : "text"}
                  name="Password"
                  value={values.Password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-end text-sm px-4 py-3 rounded-lg w-full bg-gray-100 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                />

                <div className="flex items-center absolute inset-y-0 right-0 ms-3 text-sm leading-5 cursor-pointer">
                  {showPassword ? (
                    <i
                      className="fa-regular fa-eye"
                      onClick={() => setShowPassword(false)}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-eye-slash"
                      onClick={() => setShowPassword(true)}
                    ></i>
                  )}
                </div>

                {touched.Password && errors.Password && (
                  <p className="text-red-500 mt-1 text-sm text-end">
                    {errors.Password}
                  </p>
                )}
              </div>

              {/* زر الدخول */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full mt-10 flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold transition ease-in duration-500 disabled:bg-gray-500"
              >
                تسجيل دخول
                {loginMutation.isPending && (
                  <i className="fa fa-spinner fa-spin ms-2"></i>
                )}
              </button>

              {/* رسائل الخطأ والنجاح */}
              {errorMsg && (
                <p className="text-red-500 text-center mt-2">{errorMsg}</p>
              )}
              {successMsg && (
                <p className="text-green-500 text-center mt-2">{successMsg}</p>
              )}
            </form>

            {/* Footer */}
            <div className="mt-7 text-center text-xs">
              <span className="bg-gray-200 py-1 px-2">
                Copyright © 2025 - IT Department
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* خلفية بيضاء */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gray-100 -z-10"></div>

      {/* الموجة */}
      <svg
        className="absolute bottom-0 left-0 z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96V320H0Z"
        ></path>
      </svg>
    </>
  );
}
