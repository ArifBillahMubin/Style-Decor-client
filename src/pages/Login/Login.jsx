import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";

import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";

// Banner image — update path
import loginBanner from "../../assets/images/signup-banner.jpg";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  if (loading) return <div className="mt-20 text-center">Loading...</div>;
  if (user) return <Navigate to={from} replace={true} />;

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Google Sign-in handler
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-200 flex items-center justify-center py-24">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">

          {/* LEFT SIDE: IMAGE + OVERLAY TEXT */}
          <div className="relative hidden md:block">
            <img
              src={loginBanner}
              alt="StyleDecor login"
              className="w-full h-full object-cover"
            />

            {/* Dim overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Text over image */}
            <div className="absolute inset-0 flex flex-col justify-center px-10 space-y-4 text-white">
              <h2 className="text-3xl font-bold leading-tight">
                Welcome back to StyleDecor
              </h2>
              <p className="text-sm md:text-base text-white/85 max-w-md">
                Sign in to manage your events, decorations, bookings and dashboard.
              </p>
              <p className="text-xs md:text-sm text-white/70">
                Smart Home & Ceremony Decoration Booking System
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: LOGIN FORM */}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <div className="mb-6 text-center md:text-left">
              <h1 className="my-2 text-3xl font-bold text-secondary">
                Log In
              </h1>
              <p className="text-sm text-gray-500">
                Sign in to access your account
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-primary bg-base-100 text-gray-900"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm mb-2 text-gray-700">
                      Password
                    </label>
                    <span className="text-xs text-primary cursor-pointer hover:underline">
                      Forgot password?
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-primary bg-base-100 text-gray-900"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-primary w-full rounded-md py-3 text-white font-medium hover:bg-secondary transition"
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin m-auto" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px bg-base-300"></div>
              <p className="px-3 text-sm text-gray-500">
                Or sign in with
              </p>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            {/* Google Login */}
            <div
              onClick={handleGoogleSignIn}
              className="flex justify-center items-center space-x-2 border mt-3 p-2 border-base-300 rounded-md cursor-pointer hover:bg-base-200 transition"
            >
              <FcGoogle size={28} />
              <p className="text-sm font-medium text-gray-700">
                Continue with Google
              </p>
            </div>

            {/* Signup link */}
            <p className="mt-4 text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                state={from}
                className="hover:underline text-primary font-medium"
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
