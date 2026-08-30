import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
// import logo from "../../assets/sacLogo.png";

type MenuItem =
  | {
      type: "link";
      title: string;
      path: string;
      svgPath: string;
    }
  | {
      type: "submenu";
      title: string;
      svgPath: string;
      children: { name: string; path: string }[];
    };

export default function SideMenu({ children }: { children: ReactNode }) {
  //   const logout = useLogout()
  const [sidenav, setSidenav] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const menuItems: MenuItem[] = [
    {
      type: "link",
      title: "الرئيسية",
      path: "/",
      svgPath:
        "M10 20a1 1 0 01-1-1V11H6a1 1 0 01-1-1V9a1 1 0 011-1h3V5a1 1 0 012 0v3h3a1 1 0 011 1v1a1 1 0 01-1 1h-3v8a1 1 0 01-1 1z",
    },
    {
      type: "submenu",
      title: "البيانات الاولية",
      svgPath:
        "M10 4a1 1 0 011 1v1h2V5a1 1 0 012 0v1h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a1 1 0 110-2h1V8H7a1 1 0 110-2h1V5a1 1 0 011-1z",
      children: [
        { name: "المطارات", path: "/airports" },
        { name: "خطوط الطيران", path: "/airlines" },
        { name: "الصالات", path: "/terminals" },
        { name: "العرض الافتراضي", path: "/defaultviews" },
      ],
    },

    {
      type: "submenu",
      title: "ادارة الكاونترات",
      svgPath:
        "M10 4a1 1 0 011 1v1h2V5a1 1 0 012 0v1h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a1 1 0 110-2h1V8H7a1 1 0 110-2h1V5a1 1 0 011-1z",
      children: [{ name: "ادراة الكاونترات", path: "/counter/openclose" }],
    },

    {
      type: "submenu",
      title: "الرحلات",
      svgPath:
        "M10 4a1 1 0 011 1v1h2V5a1 1 0 012 0v1h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a1 1 0 110-2h1V8H7a1 1 0 110-2h1V5a1 1 0 011-1z",
      children: [
        { name: "رحلات المغادرة", path: "/flights/2" },
        { name: "رحلات الوصول ", path: "/flights/1" },
        { name: "اضافة رحلة", path: "/flights/addflight" },
        { name: " بحث", path: "/flights/FlightSearch" },
      ],
    },
    {
      type: "link",
      title: "ادرة المستخدمين",
      path: "/users",
      svgPath:
        "M10 4a1 1 0 011 1v1h2V5a1 1 0 012 0v1h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a1 1 0 110-2h1V8H7a1 1 0 110-2h1V5a1 1 0 011-1z",
    },
  ];

  return (
    <div className="font-poppins antialiased">
      {/* زر الموبايل */}
      <div className="w-screen p-3 flex justify-between sm:hidden">
        <button
          onClick={() => setSidenav(true)}
          className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white z-50 sm:hidden"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h2>Fids System</h2>
      </div>

      <div className="min-h-full max-w-screen flex flex-row bg-gradient-to-b from-[#2b1f3a] via-[#593260] to-[#d66d9e]">
        {/* Sidebar */}
        {(sidenav || window.innerWidth >= 640) && (
          <div
            className={` min-h-screen shadow-xl px-3 w-64 overflow-y-auto transition-transform duration-300 ease-in-out
              ${sidenav && window.innerWidth < 640 ? "fixed top-0 start-0 z-40" : ""}
            `}
          >
            {/* زر اغلاق الموبايل */}
            {window.innerWidth < 640 && (
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setSidenav(false)}
                  className="p-1 bg-gray-100 rounded-full text-gray-500 hover:text-red-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 111.414 1.414L11.414 8l2.293 2.293a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="space-y-6 md:space-y-10 mt-10 text-white">
              <h1 className="hidden md:block font-bold text-xl text-center ">
                Fids System
              </h1>

              {/* البروفايل */}
              <div className="space-y-3" id="profile">
                <img
                //   src={logo}
                  alt="User Avatar"
                  className="w-16 rounded-full mx-auto"
                />
                <div className="text-center">
                  <h2 className="font-medium text-sm text-teal-500">
                    {" "}
                    Mohaned Sameer{" "}
                  </h2>
                  <p className="text-xs text-white"> Adminstartor </p>
                </div>
              </div>

              {/* القائمة */}
              <div className="flex flex-col space-y-2" id="menu">
                {menuItems.map((item, index) => {
                  if (item.type === "link") {
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center text-sm font-medium text-white py-2 px-3 hover:bg-[#2b1f3a]  rounded-md transition"
                      >
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d={item.svgPath}></path>
                        </svg>
                        <span className="ml-3">{item.title}</span>
                      </Link>
                    );
                  }

                  if (item.type === "submenu") {
                    const isOpen = openSubmenu === item.title;
                    return (
                      <div key={index} className="flex flex-col">
                        <button
                          onClick={() => toggleSubmenu(item.title)}
                          className="flex items-center justify-between w-full py-2 px-3 font-semibold text-white hover:bg-[#2b1f3a] rounded-md transition"
                        >
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d={item.svgPath}></path>
                            </svg>
                            <span className="ml-3">{item.title}</span>
                          </div>
                          <svg
                            className={`w-4 h-4 transform transition-transform ${
                              isOpen ? "rotate-90" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>

                        {isOpen && (
                          <div className="ml-8 flex flex-col space-y-1">
                            {item.children.map((child, cIndex) => (
                              <Link
                                key={cIndex}
                                to={child.path}
                                className="text-sm text-white py-1 px-2 hover:bg-teal-500 rounded-md transition"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return null;
                })}
                {/* زر تسجيل الخروج */}
                <div className="mt-4">
                  <button
                    //   onClick={logout}
                    className="flex items-center w-full text-sm font-medium text-white py-2 px-3 hover:bg-red-600 rounded-md transition"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M6 2a1 1 0 000 2h6a1 1 0 100-2H6zm0 14a1 1 0 000 2h6a1 1 0 100-2H6zM4 7h12v2H4V7zm0 4h12v2H4v-2z" />
                    </svg>
                    <span className="ml-3">تسجيل خروج</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* محتوى الصفحة */}
        <div className="flex-1 bg-gray-100 min-h-screen container mx-auto py-7 lg:px-7">
          {children}
        </div>
      </div>
    </div>
  );
}
