import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { NavLink, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/coverage", label: "Coverage" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full z-20 bg-white border-b border-base-300 shadow-sm">
      <div className="py-3">
        <Container>
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link to="/">
              <img src={logo} alt="logo" className="h-10" />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex gap-8 text-sm font-medium">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition ${isActive
                      ? "bg-base-300 text-secondary"
                      : "hover:bg-base-200"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* USER MENU */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full cursor-pointer"
              >
                <AiOutlineMenu size={20} />
                <img
                  src={user?.photoURL || avatarImg}
                  className="hidden md:block w-8 h-8 rounded-full"
                  alt="profile"
                />
              </div>

              {/* DROPDOWN */}
              {isOpen && (
                <div className="absolute right-0 top-14 w-[70vw] md:w-48 bg-base-100 border border-base-300 rounded-xl shadow-lg py-2">

                  {/* MOBILE: ALL LINKS */}
                  <div className="block md:hidden">
                    {navLinks.map(({ path, label }) => (
                      <NavLink
                        key={path}
                        to={path}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-base-200"
                      >
                        {label}
                      </NavLink>
                    ))}
                    <div className="border-t my-2" />
                  </div>

                  {/* AUTH LINKS */}
                  {user ? (
                    <>
                      <NavLink
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-base-200"
                      >
                        Dashboard
                      </NavLink>
                      <div
                        onClick={() => {
                          logOut();
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-base-200 cursor-pointer"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-base-200"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/signup"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-base-200"
                      >
                        Sign Up
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
