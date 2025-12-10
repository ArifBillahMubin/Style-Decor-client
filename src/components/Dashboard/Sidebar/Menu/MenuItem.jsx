/* eslint-disable no-unused-vars */
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-3 my-2 rounded-lg
        transition-all duration-300 
        ${isActive
          ? "bg-base-300 text-secondary font-semibold shadow-sm"
          : "text-text-secondary hover:bg-base-200 hover:text-secondary"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
