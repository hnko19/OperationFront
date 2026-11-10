import type React from 'react';

interface AdditionalBtnProps {
  text: string;
  btnType: 'alert' | 'info' | 'warning' | 'confirm' | string;
  fun: () => void;
  disabled?: boolean;
}

export default function AdditionalBtn({
  text,
  btnType,
  fun,
  disabled = false,
}: AdditionalBtnProps) {
  let bgColor: string;
  let icon: React.ReactNode | null = null;
  let attentionEffect = false;

  if (btnType === 'alert') {
    bgColor = 'bg-amber-600 hover:bg-amber-700';
    // أيقونة جرس مع حركة اهتزاز للفت الانتباه
    icon = <i className="fa-solid fa-bell animate-bounce"></i>;
    attentionEffect = true;
  } else if (btnType === 'warning') {
    bgColor = 'bg-yellow-500 hover:bg-yellow-600';
    icon = <i className="fa-solid fa-triangle-exclamation"></i>;
  } else if (btnType === 'info') {
    bgColor = 'bg-sky-600 hover:bg-sky-700';
    icon = <i className="fa-solid fa-circle-info"></i>;
  } else if (btnType === 'confirm') {
    bgColor = 'bg-emerald-600 hover:bg-emerald-700';
    icon = <i className="fa-solid fa-check-double"></i>;
  } else {
    bgColor = 'bg-gray-600';
  }

  return (
    <button
      type="button"
      onClick={fun}
      disabled={disabled}
      className={`
        relative
        ${bgColor}
        px-3 py-1 rounded-md text-white outline-none shadow-lg
        flex items-center gap-1.5 transition-all
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : 'cursor-pointer focus:ring-4 transform active:scale-95'
        }
        ${attentionEffect && !disabled ? 'ring-2 ring-amber-400 animate-pulse' : ''}
      `}
    >
      {/* مؤثر لفت الانتباه (نقطة وميض حمراء أعلى الزر تظهر في حالة alert) */}
      {attentionEffect && !disabled && (
        <span className="flex h-3 w-3 absolute -top-1.5 -right-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
      )}
      {icon} {text}
    </button>
  );
}
