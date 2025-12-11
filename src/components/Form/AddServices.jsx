import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { imageUpload } from "../../../utils";
import useAuth from "../../hooks/useAuth";

const AddServices = () => {
  const { user } = useAuth();

  //TanStack Mutation for adding service
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/service`, payload),

    onSuccess: () => {
      toast.success("Service added successfully!");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    },
  });

  //React Hook Form 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // savedb data
  const onSubmit = async (data) => {
    const imageFile = data.image?.[0];
    try {
    const imageURL = await imageUpload(imageFile);
    const payload = {
      service_name: data.service_name,
      category: data.category,
      description: data.description,
      cost: Number(data.cost),
      unit: data.unit,
      image: imageURL, 
      createdByEmail: user?.email 
    };

      await mutateAsync(payload);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center 
    bg-base-200 rounded-xl">

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
            <div className="space-y-1 text-sm">
              <label className="block text-text-primary">Service Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-100 
                focus:outline-primary"
                placeholder="e.g., Wedding Stage Decoration"
                {...register("service_name", { required: "Service name is required" })}
              />
              {errors.service_name && (
                <p className="text-red-500 text-sm">{errors.service_name.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label className="block text-text-primary">Category</label>
              <select
                className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-100 
                focus:outline-primary"
                {...register("category", { required: "Category is required" })}
              >
                <option value="home">Home Decoration</option>
                <option value="wedding">Wedding</option>
                <option value="office">Office</option>
                <option value="seminar">Seminar</option>
                <option value="ceremony">Ceremony</option>
                <option value="birthday">Birthday Events</option>
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label className="block text-text-primary">Description</label>

              <textarea
                className="w-full h-32 px-4 py-3 border border-base-300 rounded-md bg-base-100 
                focus:outline-primary"
                placeholder="Describe the decoration service..."
                {...register("description")}
              ></textarea>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 flex flex-col">

            {/* Cost , Unit */}
            <div className="flex justify-between gap-2">

              {/* Cost */}
              <div className="space-y-1 text-sm w-full">
                <label className="block text-text-primary">Cost (BDT)</label>
                <input
                  type="number"
                  placeholder="e.g., 15000"
                  className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-100 
                  focus:outline-primary"
                  {...register("cost", { required: "Cost is required" })}
                />
                {errors.cost && (
                  <p className="text-red-500 text-sm">{errors.cost.message}</p>
                )}
              </div>

              {/* Unit */}
              <div className="space-y-1 text-sm w-full">
                <label className="block text-text-primary">Unit</label>
                <input
                  type="text"
                  placeholder="e.g., per event / per sqft"
                  className="w-full px-4 py-3 border border-base-300 rounded-md bg-base-100 
                  focus:outline-primary"
                  {...register("unit", { required: "Unit is required" })}
                />
                {errors.unit && (
                  <p className="text-red-500 text-sm">{errors.unit.message}</p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="p-4 border border-base-300 bg-base-100 rounded-lg">
              <label className="block text-text-primary mb-2">Service Image *</label>

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
              className="w-full p-3 text-center font-medium text-white rounded-md 
              bg-primary hover:bg-secondary transition shadow-md"
            >
              {isPending ? "Saving..." : "Save Service"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
