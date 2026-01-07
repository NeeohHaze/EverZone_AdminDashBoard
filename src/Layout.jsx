import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;