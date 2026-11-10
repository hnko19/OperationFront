import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../Hooks/AuthHooks/useLogout";

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
  const logout = useLogout();
  const [sidenav, setSidenav] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const menuItems: MenuItem[] = [
    {
      type: "link",
      title: "Home",
      path: "/",
      svgPath:
        "M10 20a1 1 0 01-1-1V11H6a1 1 0 01-1-1V9a1 1 0 011-1h3V5a1 1 0 012 0v3h3a1 1 0 011 1v1a1 1 0 01-1 1h-3v8a1 1 0 01-1 1z",
    },
    {
      type: "submenu",
      title: "Officer",
      svgPath:
        "M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 00-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z",
      children: [
        { name: "Today Flight", path: "/officerData" },
        { name: "Flight Not Complete", path: "/filghtNotComplate" },
        { name: "Officer Flight Search", path: "/officerFlightSearch" },
      ],
    },
    {
      type: "submenu",
      title: "Agent",
      svgPath:
        "M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z",
      children: [{ name: "Today Flight", path: "/flightagentPage" }],
    },
    {
      type: "submenu",
      title: "Start Up",
      svgPath:
        "M10 4a1 1 0 011 1v1h2V5a1 1 0 012 0v1h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a1 1 0 110-2h1V8H7a1 1 0 110-2h1V5a1 1 0 011-1z",
      children: [
        { name: "Country", path: "/" },
        { name: "Handling Company", path: "/handlingAgentsCompany" },
        { name: "Aircraft Registration", path: "/aircraftRegistration" },
        { name: "Company Information", path: "/companyInfo" },
        { name: "Aircraft Size", path: "/aircraftSize" },
        { name: "Aircraft Agent", path: "/airlineagent" },
      ],
    },
  ];

  return (
    <div className="font-poppins antialiased min-h-screen flex flex-col">
      <div className="w-full p-3 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm sm:hidden">
        <button
          onClick={() => setSidenav(true)}
          className="p-2 border border-slate-200 bg-white rounded-md shadow-sm text-slate-600 hover:bg-slate-50 transition"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h2 className="font-bold text-slate-800 text-sm">
          Airport Operation System
        </h2>
      </div>

      <div className="flex-1 flex flex-row relative">
        {sidenav && (
          <div
            onClick={() => setSidenav(false)}
            className="fixed inset-0 bg-slate-950/50 z-30 sm:hidden"
          />
        )}

        <aside
          className={`min-h-screen w-64 shrink-0 px-3 py-4 overflow-y-auto shadow-lg bg-gradient-to-b from-[#2050a3] via-[#1E3A5F] to-[#526f8f] transition-transform duration-300 ease-in-out
            fixed inset-y-0 left-0 z-40 sm:static sm:z-auto sm:block sm:transform-none
            ${sidenav ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
          `}
        >
          <div className="flex justify-end p-2 sm:hidden">
            <button
              onClick={() => setSidenav(false)}
              className="p-1 bg-white/10 rounded-full text-white hover:bg-white/20 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 111.414 1.414L11.414 8l2.293 2.293a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6 md:space-y-10 mt-4 sm:mt-10 text-white">
            <div className="space-y-3" id="profile">
              <img
                src="/airport-logo-short.png"
                alt="User Avatar"
                className="w-24 h-24 object-contain rounded-full mx-auto bg-white p-2.5 shadow-md ring-2 ring-blue-300/30"
              />
              <div className="text-center">
                <h2 className="font-semibold text-sm text-blue-200">
                  Mohaned Sameer
                </h2>
                <p className="text-xs text-slate-300">Administrator</p>
              </div>
            </div>

            <div className="flex flex-col space-y-2" id="menu">
              {menuItems.map((item, index) => {
                if (item.type === "link") {
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setSidenav(false)}
                      className="flex items-center text-sm font-medium text-slate-100 py-2.5 px-3 hover:bg-white/10 hover:text-white rounded-lg transition"
                    >
                      <svg
                        className="w-5 h-5 fill-current shrink-0"
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
                        className="flex items-center justify-between w-full py-2.5 px-3 text-sm font-semibold text-slate-100 hover:bg-white/10 hover:text-white rounded-lg transition"
                      >
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 fill-current shrink-0"
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
                        <div className="ml-8 mt-1 flex flex-col space-y-1 border-l border-white/20 pl-2">
                          {item.children.map((child, cIndex) => (
                            <Link
                              key={cIndex}
                              to={child.path}
                              onClick={() => setSidenav(false)}
                              className="text-xs text-slate-300 py-2 px-2 hover:text-white hover:bg-white/10 rounded-md transition"
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

              <div className="pt-4 border-t border-white/15">
                <button
                  onClick={logout}
                  className="flex items-center w-full text-sm font-medium text-slate-100 py-2.5 px-3 hover:bg-red-500/20 hover:text-red-100 rounded-lg transition"
                >
                  <svg
                    className="w-5 h-5 fill-current shrink-0"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 2a1 1 0 000 2h6a1 1 0 100-2H6zm0 14a1 1 0 000 2h6a1 1 0 100-2H6zM4 7h12v2H4V7zm0 4h12v2H4v-2z" />
                  </svg>
                  <span className="ml-3">تسجيل خروج</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 bg-slate-100 min-h-screen p-4 lg:p-7 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
