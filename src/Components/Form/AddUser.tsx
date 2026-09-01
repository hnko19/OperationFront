import { useState, } from "react";
import {  useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRegister } from "../../Hooks/AuthHooks/useRegister";
import { useNavigate } from "react-router-dom";
import SelectSingle from "../DropdownList/SelectSingle";
import { useRoles } from "../../Hooks/AuthHooks/useRoles";

export default function AddUserHtmlForm() {
    const {data : roles =[]} = useRoles();
    const roleOptions =
    roles?.map((c) => ({
      value: c,
      label: c,
    }))
const [errorMsg, setErrorMsg] = useState("");
const [successMsg, setSuccessMsg] = useState("");

const navigate = useNavigate();
const registerMutation = useRegister();

const { handleSubmit, values, handleChange, handleBlur,setFieldValue  ,errors, touched  } = useFormik({
initialValues: {
FirstName: "",
LastName: "",
UserName: "",
UserRoles: "مستخدم",
Email: "",
PhoneNumber: "",
Password: "",
},
validationSchema: Yup.object({
FirstName: Yup.string().required("الاسم الأول مطلوب"),
LastName: Yup.string().required("اسم العائلة مطلوب"),
UserName: Yup.string().required("اسم المستخدم مطلوب"),
UserRoles: Yup.string().required("اختر الصلاحية"),
Email: Yup.string().email("أدخل بريد إلكتروني صحيح").required("البريد الإلكتروني مطلوب"),
PhoneNumber: Yup.string(),
Password: Yup.string().required("كلمة المرور مطلوبة"),
}),
onSubmit: handleRegister,
});

function handleRegister() {
setErrorMsg("");
setSuccessMsg("");

const payload = {
  FirstName: values.FirstName,
  LastName: values.LastName,
  UserName: values.UserName,
  UserRoles: [values.UserRoles],
  Email: values.Email,
  PhoneNumber: values.PhoneNumber,
  Password: values.Password,
};

registerMutation.mutate(payload, {
    
    onSuccess: () => {
    setSuccessMsg("تم تسجيل المستخدم بنجاح");
    navigate("/users"); // أو أي صفحة تريد
  },
  onError: (error) => {
    console.log(payload);
    if (axios.isAxiosError(error)) {
      setErrorMsg(error.response?.data?.message || "حدث خطأ ما");
    } else {
      setErrorMsg(error.message || "حدث خطأ ما");
    }
  },
});
}

return <> <div className="flex items-center justify-center px-5 py-5" > <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"> <div className="md:flex w-full">


        {/* الجانب الأيسر */}
       
        {/* الجانب الأيمن */}
        <div className="w-full  py-10 px-5 md:px-10">

          {/* عنوان الفورم */}
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">تسجيل مستخدم جديد</h1>
            <p>أدخل معلومات المستخدم للتسجيل</p>
          </div>

          {/* الفورم */}
          <form onSubmit={handleSubmit}>

            {/* الاسم الأول واسم العائلة */}
            <div className="flex -mx-3">
              <div className="w-1/2 px-3 mb-5">
                <label className="text-xs font-semibold px-1">الاسم الأول</label>
                <div className="flex">
                  <div className="w-10 z-10 pr-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    name="FirstName"
                    value={values.FirstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full -mr-10 pr-10 pl-3 py-1.5  border-1 rounded-sm bg-white border-[#B3B3B3] outline-none focus:border-indigo-500"
                    placeholder="محمد"
                  />
                </div>
                {touched.FirstName && errors.FirstName && <p className="text-red-500 text-sm mt-1 text-end">{errors.FirstName}</p>}
              </div>

              <div className="w-1/2 px-3 mb-5">
                <label className="text-xs font-semibold px-1">اسم العائلة</label>
                <div className="flex">
                  <div className="w-10 z-10 pr-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    name="LastName"
                    value={values.LastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full -mr-10 pr-10 pl-3 py-1.5  border-1 rounded-sm bg-white border-[#B3B3B3] outline-none focus:border-indigo-500"
                    placeholder="أحمد"
                  />
                </div>
                {touched.LastName && errors.LastName && <p className="text-red-500 text-sm mt-1 text-end">{errors.LastName}</p>}
              </div>
            </div>

            {/* اسم المستخدم و الصلاحية */}
            <div className="flex -mx-3">
              <div className="w-1/2 px-3 mb-5">
                <label className="text-xs font-semibold px-1">اسم المستخدم</label>
                <div className="flex">
                  <div className="w-10 z-10 pr-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    name="UserName"
                    value={values.UserName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full -mr-10 pr-10 pl-3 py-1.5  border-1 rounded-sm bg-white border-[#B3B3B3] outline-none focus:border-indigo-500"
                    placeholder="user123"
                  />
                </div>
                {touched.UserName && errors.UserName && <p className="text-red-500 text-sm mt-1 text-end">{errors.UserName}</p>}
              </div>

              <div className="w-1/2 px-3 mb-5">
                <label className="text-xs font-semibold px-1">الصلاحية</label>
                
                <SelectSingle
                    options={roleOptions}
                    name="UserRoles"
                    value={values.UserRoles}
                    onChange={(val) => setFieldValue("UserRoles", val)}
                    />
                {touched.UserRoles && errors.UserRoles && <p className="text-red-500 text-sm mt-1 text-end">{errors.UserRoles}</p>}
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">البريد الإلكتروني</label>
                <div className="flex">
                  <div className="w-10 z-10 pr-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="email"
                    name="Email"
                    value={values.Email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full -mr-10 pr-10 pl-3 py-1.5  border-1 rounded-sm bg-white border-[#B3B3B3] outline-none focus:border-indigo-500"
                    placeholder="example@mail.com"
                  />
                </div>
                {touched.Email && errors.Email && <p className="text-red-500 text-sm mt-1 text-end">{errors.Email}</p>}
              </div>
            </div>

            {/* رقم الهاتف */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">رقم الهاتف</label>
                <div className="flex">
                  <div className="w-10 z-10 pr-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-phone-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    name="PhoneNumber"
                    value={values.PhoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full -mr-10 pr-10 pl-3 py-1.5  border-1 rounded-sm bg-white border-[#B3B3B3] outline-none focus:border-indigo-500"
                    placeholder="0123456789"
                  />
                </div>
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-12">
                <label className="text-xs font-semibold px-1">كلمة المرور</label>
                <div className="flex">
                  <div className="w-10 z-10 pr-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="password"
                    name="Password"
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full -mr-10 pr-10 pl-3 py-1.5  border-1 rounded-sm bg-white border-[#B3B3B3] outline-none focus:border-indigo-500"
                    placeholder="************"
                  />
                </div>
                {touched.Password && errors.Password && <p className="text-red-500 text-sm mt-1 text-end">{errors.Password}</p>}
              </div>
            </div>

            {/* زر التسجيل */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white  px-3 py-3 font-semibold"
                >
                  سجل الآن
                  {registerMutation.isPending && <i className="fa fa-spinner fa-spin ms-2"></i>}
                </button>
              </div>
            </div>

            {/* رسائل الخطأ والنجاح */}
            {errorMsg && <p className="text-red-500 text-center mt-2">{errorMsg}</p>}
            {successMsg && <p className="text-green-500 text-center mt-2">{successMsg}</p>}

          </form>

        </div>
      </div>
    </div>
  </div>
</>


}
