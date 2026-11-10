import type React from 'react';

interface CrudBtnProps {
  text?: string; // جعل النص اختيارياً في حال أردت زر أيقونة فقط
  title?: string; // تلميح يظهر عند الوقوف بالماوس (مفيد لأزرار الأيقونات فقط)
  btnType: string;
  fun: () => void;
  disabled?: boolean;
  customClass?: string; // لإضافة أي تعديلات في الحجم أو الشكل
}

export default function CrudBtn({
  text,
  title,
  btnType,
  fun,
  disabled = false,
  customClass = 'px-3 py-1 text-base', // الحجم الافتراضي
}: CrudBtnProps) {
  let bgColor: string;
  let icon: React.ReactNode | null = null;

  if (btnType === 'create') {
    bgColor = 'bg-[#31213F]';
    icon = <i className="fa-solid fa-plus"></i>;
  } else if (btnType === 'addCar') {
    bgColor = 'bg-[#31213F]';
    icon = <i className="fa-solid fa-caravan"></i>;
  } else if (btnType === 'editCar') {
    bgColor = 'bg-green-600';
    icon = <i className="fa-solid fa-truck"></i>;
  } else if (btnType === 'details') {
    // حالة عرض التفاصيل: لون سماوي/أزرق وأيقونة تفاصيل التقرير
    bgColor = 'bg-sky-600 hover:bg-sky-700';
    icon = <i className="fa-solid fa-file-lines"></i>; // أو fa-solid fa-circle-info
  } else if (btnType === 'save') {
    bgColor = 'bg-blue-600';
    icon = <i className="fa-solid fa-check"></i>;
  } else if (btnType === 'cancel') {
    bgColor = 'bg-orange-600';
    icon = <i className="fa-solid fa-xmark"></i>;
  } else if (btnType === 'delete') {
    bgColor = 'bg-red-600';
    icon = <i className="fa-solid fa-trash-can"></i>;
  } else if (btnType === 'edit') {
    bgColor = 'bg-green-600';
    icon = <i className="fa-solid fa-pen-to-square"></i>;
  } else if (btnType === 'view') {
    bgColor = 'bg-indigo-500';
    icon = <i className="fa-regular fa-eye"></i>;
  } else if (btnType === 'close') {
    bgColor = 'bg-red-500';
    icon = <i className="fa-solid fa-lock"></i>;
  } else if (btnType === 'open') {
    bgColor = 'bg-green-500';
    icon = <i className="fa-solid fa-key"></i>;
  } else {
    bgColor = 'bg-gray-600';
  }

  return (
    <button
      type="button"
      onClick={fun}
      disabled={disabled}
      title={title ?? text} // يعرض title أو text عند الوقوف بالماوس
      className={`
        ${bgColor}
        ${customClass}
        rounded-md text-white outline-none shadow-lg
        flex items-center justify-center gap-1.5 transition-all
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : 'cursor-pointer focus:ring-4 transform active:scale-95'
        }
      `}
    >
      {icon}
      {text && <span>{text}</span>}
    </button>
  );
}
