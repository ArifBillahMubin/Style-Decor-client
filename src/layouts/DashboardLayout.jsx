import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-base-200">

      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 md:ml-74 bg-base-100 shadow-inner rounded-l-3xl overflow-hidden">
        <div className="p-6 md:p-8">

          {/* Outlet for dynamic page content */}
          <Outlet />

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
