import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { imageUpload } from "../../../utils";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddServices = ({ refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

  // TanStack Mutation for adding service
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post(`/service`, payload),

    onSuccess: () => {
      toast.success("Service added successfully!");
      if (refetch) refetch();
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
      // console.log(error);
    },
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit Data
  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageURL = await imageUpload(imageFile);

      const payload = {
        service_name: data.service_name,
        category: data.category,
        description: data.description,
        cost: Number(data.cost),
        unit: data.unit,
        image: imageURL,
        rating: Number(data.rating),
        createdByEmail: user?.email,
      };

      await mutateAsync(payload);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center bg-base-200 py-10 rounded-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 w-full max-w-5xl p-10 rounded-xl shadow-lg border border-base-300"
      >
        <h2 className="text-3xl font-semibold text-secondary mb-8">
          Add New Decoration Service
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Service Name */}
            <div>
              <label className="block text-text-primary">Service Name</label>
              <input
                type="text"
                placeholder="Wedding Stage Decoration"
                className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-100 focus:outline-primary"
                {...register("service_name", { required: "Service name is required" })}
              />
              {errors.service_name && (
                <p className="text-red-500 text-sm">{errors.service_name.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-text-primary">Category</label>
              <select
                className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-100 focus:outline-primary"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                <option value="home">Home Decoration</option>
                <option value="wedding">Wedding</option>
                <option value="ceremony">Ceremony</option>
                <option value="birthday">Birthday</option>
                <option value="seminar">Seminar</option>
                <option value="office">Office Decoration</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-text-primary">Description</label>
              <textarea
                className="w-full h-32 px-4 py-3 border border-base-300 rounded-md bg-base-100 focus:outline-primary"
                placeholder="Describe the decoration service..."
                {...register("description")}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-text-primary">Rating (0–5)</label>
              <input
                type="number"
                step="0.1"
                placeholder="4.5"
                className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-100"
                {...register("rating", {
                  required: "Rating is required",
                  min: { value: 0, message: "Min rating 0" },
                  max: { value: 5, message: "Max rating 5" },
                })}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm">{errors.rating.message}</p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Cost */}
            <div>
              <label className="block text-text-primary">Cost (BDT)</label>
              <input
                type="number"
                placeholder="15000"
                className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-100"
                {...register("cost", { required: "Cost is required" })}
              />
              {errors.cost && (
                <p className="text-red-500 text-sm">{errors.cost.message}</p>
              )}
            </div>

            {/* Unit */}
            <div>
              <label className="block text-text-primary">Unit</label>
              <input
                type="text"
                placeholder="per event / per sqft"
                className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-100"
                {...register("unit", { required: "Unit is required" })}
              />
              {errors.unit && (
                <p className="text-red-500 text-sm">{errors.unit.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="p-4 border border-base-300 bg-base-100 rounded-lg">
              <label className="block text-text-primary mb-1">Service Image *</label>
              <div className="file_upload px-5 py-3 border-2 border-dotted border-base-300 rounded-lg">
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", { required: "Image is required" })}
                  />
                  <div className="bg-primary text-white rounded font-semibold cursor-pointer 
                  p-2 px-5 hover:bg-secondary transition">
                    Upload Image
                  </div>
                </label>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 p-3 font-medium text-white rounded-md bg-primary hover:bg-secondary transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Saving...
                </>
              ) : (
                "Save Service"
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddServices;
