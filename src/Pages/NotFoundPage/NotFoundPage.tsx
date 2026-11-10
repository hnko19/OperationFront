import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      dir="ltr"
      className="relative w-full h-dvh overflow-hidden flex items-center justify-center bg-slate-100 px-4 py-3 font-sans"
    >
      {/* Background Decorations */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100/60" />
      <div className="absolute -bottom-28 -left-24 w-80 h-80 rounded-full bg-blue-100/60" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[950px] max-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
          {/* Left Section */}
          <div className="hidden lg:flex flex-col justify-center px-10 xl:px-14 py-8 bg-[#14263d] text-white">
            {/* Brand */}
            <div className="flex items-center gap-3 mb-10">
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
                Page Not Found
              </p>

              <h1 className="text-[28px] font-medium leading-snug text-white">
                Lost Your Way?
                <span className="block text-blue-400">Let's Get You Back.</span>
              </h1>

              <p className="text-[13px] leading-6 text-slate-400 mt-5 max-w-[340px]">
                The page you are looking for may have been moved, deleted, or is
                temporarily unavailable.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-5 border-t border-white/10">
              <p className="text-[11px] text-slate-500">
                Sudan Airports Company Ltd.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-center items-center bg-white px-6 py-6 sm:px-10 lg:px-10 xl:px-14 text-center">
            {/* Mobile Brand */}
            <div className="lg:hidden flex items-center gap-3 mb-7 self-start">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <i className="fa-solid fa-plane-departure text-lg text-[#174b85]" />
              </div>

              <div className="text-left">
                <h2 className="text-[16px] font-semibold text-slate-800">
                  Airport Operations
                </h2>

                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                  Management System
                </p>
              </div>
            </div>

            {/* 404 Illustration */}
            <div className="relative mb-5">
              <div className="w-28 h-28 rounded-full bg-blue-50 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-[#174b85] flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <i className="fa-solid fa-plane-slash text-3xl text-white" />
                </div>
              </div>

              <span className="absolute -top-2 -right-3 text-[10px] font-bold text-white bg-blue-400 px-3 py-1 rounded-full shadow">
                ERROR
              </span>
            </div>

            {/* Error Code */}
            <h1 className="text-[56px] leading-none font-bold tracking-tight text-[#14263d]">
              404
            </h1>

            <h3 className="text-[20px] font-semibold text-slate-800 mt-3">
              Page Not Found
            </h3>

            <p className="text-[13px] leading-6 text-slate-500 mt-2 max-w-[300px]">
              Oops! The page you're looking for doesn't exist or you don't have
              access to it.
            </p>

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="mt-6 w-full max-w-[260px] h-11 flex items-center justify-center gap-2.5 bg-[#174b85] hover:bg-[#123d70] text-white rounded-lg font-medium text-[13px] transition-all duration-200 shadow-md shadow-blue-900/10"
            >
              <i className="fa-solid fa-arrow-left text-xs" />
              Go Back
            </button>

            {/* Home Button */}
            <button
              onClick={() => navigate("/")}
              className="mt-3 text-[12px] font-medium text-[#174b85] hover:text-[#123d70] transition-colors"
            >
              <i className="fa-solid fa-house mr-1.5" />
              Back to Home
            </button>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 w-full">
              <p className="text-[11px] text-slate-400">
                Secure access to Airport Operations System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
