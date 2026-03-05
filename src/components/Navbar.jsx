import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const navItems = [
  { label: "Home", to: "/Home" },
  { label: "Services", to: "/Services" },
  { label: "Projects", to: "/Projects" },
];

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleSignOut = () => {
    logout();
    navigate("/Login");
  };

  const linkClass = (to) => {
    const isActive = pathname === to;
    return [
      "text-sm font-medium transition",
      isActive ? "text-[#4d9843]" : "text-slate-700 hover:text-slate-900",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/Home" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4d9843] text-xs font-bold text-[#4d9843]">
              EZ
            </span>
            <span className="text-base font-semibold text-slate-900">
              EverZone
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={linkClass(item.to)}
                aria-current={pathname === item.to ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <button className="font-semibold text-[#4d9843]" type="button">
              EN
            </button>
            <span className="text-slate-300">|</span>
            <button className="font-semibold transition hover:text-slate-900" type="button">
              MM
            </button>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-slate-700 transition hover:border-black/20 hover:text-slate-900"
            onClick={handleSignOut}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            <span className="text-sm font-medium">Sign out</span>
          </button>
        </div>
      </div>

      <nav aria-label="Primary" className="border-t border-black/5 md:hidden">
        <div className="flex items-center gap-6 px-6 py-3 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={linkClass(item.to)}
              aria-current={pathname === item.to ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;