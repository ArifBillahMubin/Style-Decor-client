import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/logo.png";

// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import DecoratorMenu from "./Menu/DecoratorMenu";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const { role, iseRoleLoading } = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  if(iseRoleLoading) <LoadingSpinner></LoadingSpinner>

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="bg-base-100 border-b border-base-300 text-text-primary flex justify-between md:hidden shadow-sm">
        <div className="p-4">
          <Link to="/">
            <img src={logo} alt="logo" width="100" height="100" />
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="p-4 hover:bg-base-200 transition rounded-lg"
        >
          <AiOutlineBars className="h-6 w-6 text-secondary" />
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`z-20 md:fixed flex flex-col justify-between overflow-x-hidden
          bg-base-100 border-r border-base-300 w-74 space-y-6 px-4 py-6 absolute inset-y-0 left-0 
          transform ${isActive ? "-translate-x-full" : "translate-x-0"} 
          md:translate-x-0 transition duration-300 ease-in-out shadow-lg`}
      >
        <div className="flex flex-col h-full">

          {/* LOGO */}
          <div className="hidden md:flex items-center justify-center p-4 mb-4 bg-base-200 border border-base-300 rounded-xl shadow-sm">
            <Link to="/">
              <img src={logo} alt="logo" width="100" height="100" className="opacity-90 hover:opacity-100 transition" />
            </Link>
          </div>

          {/* MENU SECTION */}
          <div className="flex flex-col flex-1 mt-4">

            <nav className="space-y-2">

              {/* Common Menu */}
              <MenuItem
                icon={BsGraphUp}
                label="Overview"
                address="/dashboard"
              />

              {/* Role-based Menus */}
              {role === 'customer' && <CustomerMenu />}
              {role === 'decorator' && <DecoratorMenu></DecoratorMenu>}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>

          {/* BOTTOM SECTION */}
          <div className="pt-4 border-t border-base-300">

            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            />

            <button
              onClick={logOut}
              className="flex items-center w-full px-4 py-3 mt-3 rounded-lg 
                text-text-primary hover:bg-base-200 transition font-medium gap-3"
            >
              <GrLogout className="w-5 h-5 text-secondary" />

              Logout
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
