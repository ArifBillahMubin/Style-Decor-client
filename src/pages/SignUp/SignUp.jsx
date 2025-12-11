import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";

// Change path if needed
import signupBanner from "../../assets/images/signup-banner.jpg";
import { imageUpload, saveOrUpdateUser } from "../../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submit
  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    console.log(data);
    const imageFile = image[0];
    console.log(imageFile);

    try {
      // Upload image to imageBb
      const imageURL = await imageUpload(imageFile);

      // Create user
      await createUser(email, password);

      //save in db user data
      await saveOrUpdateUser({ name, email, imageURL })

      await updateUserProfile(
        name,
        imageURL
      );

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Google Sign-up
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      //save user to db
      await saveOrUpdateUser({ name: user?.displayName, email: user?.email, imageUrl: user?.photoURL })

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

          {/* LEFT SIDE IMAGE */}
          <div className="relative hidden md:block">
            <img
              src={signupBanner}
              alt="StyleDecor signup"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-center px-10 space-y-4 text-white">
              <h2 className="text-3xl font-bold leading-tight">
                Create your StyleDecor account
              </h2>
              <p className="text-sm md:text-base text-white/85 max-w-md">
                Book decorators, manage bookings and track events easily.
              </p>
              <p className="text-xs md:text-sm text-white/70">
                Smart Home & Ceremony Decoration Booking System
              </p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <div className="mb-6 text-center md:text-left">
              <h1 className="my-2 text-3xl font-bold text-secondary">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500">
                Welcome to <span className="font-semibold text-primary">StyleDecor</span>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">

                {/* NAME */}
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border rounded-md border-base-300 bg-base-100 focus:outline-primary"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* IMAGE UPLOAD */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Profile Image
                  </label>
                  <input
                    name='image'
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary/10 file:text-primary
                      hover:file:bg-primary/20
                      bg-base-100 border border-dashed border-base-300 rounded-md cursor-pointer
                      focus:outline-none focus:ring-2 focus:ring-primary/40 py-2"
                    {...register("image", { required: "Profile image is required" })}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG or JPEG (max 2MB)
                  </p>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded-md border-base-300 bg-base-100 focus:outline-primary"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="*******"
                    autoComplete="new-password"
                    className="w-full px-3 py-2 border rounded-md border-base-300 bg-base-100 focus:outline-primary"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
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
            </form>

            {/* DIVIDER */}
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px bg-base-300"></div>
              <p className="px-3 text-sm text-gray-500">Signup with Google</p>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            {/* GOOGLE SIGNUP */}
            <div
              onClick={handleGoogleSignIn}
              className="flex justify-center items-center space-x-2 border mt-3 p-2 border-base-300 rounded-md cursor-pointer hover:bg-base-200 transition"
            >
              <FcGoogle size={28} />
              <p className="text-sm font-medium text-gray-700">
                Continue with Google
              </p>
            </div>

            {/* LOGIN LINK */}
            <p className="mt-4 text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
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
