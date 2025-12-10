import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { NavLink, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full z-20 backdrop-blur-md bg-white/70 border-b border-base-300 shadow-sm">
      <div className="py-3">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">

            {/* LOGO */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="h-10 w-auto opacity-90 hover:opacity-100 transition"
              />
            </Link>

            {/* NAV LINKS (Desktop) */}
            <div className="hidden md:flex gap-8 text-[15px] font-medium tracking-wide">

              {["/", "/services", "/about", "/contact"].map((path, i) => {
                const labels = ["Home", "Services", "About", "Contact"];

                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition-all duration-300 ${isActive
                        ? "bg-base-300 text-secondary shadow-sm"
                        : "text-text-primary hover:text-primary hover:bg-base-200"
                      }`
                    }
                  >
                    {labels[i]}
                  </NavLink>
                );
              })}
            </div>

            {/* USER MENU */}
            <div className="relative">
              <div className="flex items-center gap-3">

                {/* MENU BUTTON */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-primary text-white rounded-full cursor-pointer border border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <AiOutlineMenu size={20} />
                  <img
                    className="hidden md:block rounded-full border border-white/40 shadow-sm"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || avatarImg}
                    alt="profile"
                    width="34"
                    height="34"
                  />
                </div>
              </div>

              {/* DROPDOWN */}
              {isOpen && (
                <div className="absolute rounded-xl shadow-xl w-[55vw] md:w-[13vw] bg-white border border-base-300 right-0 top-14 py-2 transition-all">
                  <div className="flex flex-col cursor-pointer">

                    {/* Mobile Home Link */}
                    <NavLink
                      to="/"
                      className="block md:hidden px-4 py-3 hover:bg-base-200 transition font-medium"
                    >
                      Home
                    </NavLink>

                    {user ? (
                      <>
                        <NavLink
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-base-200 transition font-medium"
                        >
                          Dashboard
                        </NavLink>

                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-base-200 transition font-medium cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          className="px-4 py-3 hover:bg-base-200 transition font-medium"
                        >
                          Login
                        </NavLink>

                        <NavLink
                          to="/signup"
                          className="px-4 py-3 hover:bg-base-200 transition font-medium"
                        >
                          Sign Up
                        </NavLink>
                      </>
                    )}
                  </div>
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
