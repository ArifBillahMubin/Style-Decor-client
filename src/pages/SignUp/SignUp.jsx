import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";

// TODO: change this path to your real image
import signupBanner from "../../assets/images/signup-banner.jpg";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password);

      await updateUserProfile(
        name,
        "https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c"
      );
      console.log(result);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
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
              src={signupBanner}
              alt="StyleDecor signup"
              className="w-full h-full object-cover"
            />
            {/* Dim overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Text over image */}
            <div className="absolute inset-0 flex flex-col justify-center px-10 space-y-4 text-white">
              <h2 className="text-3xl font-bold leading-tight">
                Create your StyleDecor account
              </h2>
              <p className="text-sm md:text-base text-white/85 max-w-md">
                Book home & ceremony decoration services, track your bookings, and
                manage your events from a single dashboard.
              </p>
              <p className="text-xs md:text-sm text-white/70">
                Smart Home & Ceremony Decoration Booking System
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <div className="mb-6 text-center md:text-left">
              <h1 className="my-2 text-3xl font-bold text-secondary">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500">
                Welcome to <span className="font-semibold text-primary">StyleDecor</span>
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
            >
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-primary bg-base-100 text-gray-900"
                  />
                </div>

                {/* Profile Image */}
                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Profile Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    id="image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary/10 file:text-primary
                      hover:file:bg-primary/20
                      bg-base-100 border border-dashed border-base-300 rounded-md cursor-pointer
                      focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40
                      py-2"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or JPEG (max 2MB)
                  </p>
                </div>

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
                  </div>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    id="password"
                    required
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-primary bg-base-100 text-gray-900"
                  />
                </div>
              </div>

              {/* Submit button */}
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
                Signup with social accounts
              </p>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            {/* Google Sign Up */}
            <div
              onClick={handleGoogleSignIn}
              className="flex justify-center items-center space-x-2 border mt-3 p-2 border-base-300 rounded-md cursor-pointer hover:bg-base-200 transition"
            >
              <FcGoogle size={28} />
              <p className="text-sm font-medium text-gray-700">
                Continue with Google
              </p>
            </div>

            {/* Login link */}
            <p className="mt-4 text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="hover:underline text-primary font-medium"
              >
                Login
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

export default SignUp;
