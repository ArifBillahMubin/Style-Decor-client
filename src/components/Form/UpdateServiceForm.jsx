import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { imageUpload } from "../../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const UpdateServiceForm = ({ service, closeModal, refetch }) => {
  const axiosSecure =useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service_name: "",
      category: "",
      description: "",
      cost: "",
      unit: "",
      rating: "",
    },
  });

  // Keep form values in sync when `service` changes
  useEffect(() => {
    if (service) {
      reset({
        service_name: service.service_name ?? "",
        category: service.category ?? "",
        description: service.description ?? "",
        cost: service.cost ?? "",
        unit: service.unit ?? "",
        rating: service.rating ?? "",
      });
    }
  }, [service, reset]);

  // mutation for updating service
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => {
      const id = service?._id;
      const res = await axiosSecure.put(
        `/services/${id}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Service updated successfully!");
      if (refetch) refetch();
      if (closeModal) closeModal();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
      console.error(error);
    },
  });

  const onSubmit = async (data) => {
    try {
      let imageURL = service?.image || "";

      if (data.image && data.image[0]) {
        imageURL = await imageUpload(data.image[0]);
      }

      const payload = {
        service_name: data.service_name,
        category: data.category,
        description: data.description,
        cost: Number(data.cost),
        unit: data.unit,
        image: imageURL,
        rating: Number(data.rating),
      };

      await mutateAsync(payload);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating.");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center bg-base-200 py-6 rounded-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 w-full max-w-4xl p-6 rounded-xl shadow-lg border border-base-300"
      >
        <h2 className="text-2xl font-semibold text-secondary mb-6">
          Update Service
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            <div>
              <label className="block text-text-primary">Service Name</label>
              <input
                type="text"
                placeholder="Wedding Stage Decoration"
                className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100 focus:outline-primary"
                {...register("service_name", { required: "Service name is required" })}
              />
              {errors.service_name && (
                <p className="text-red-500 text-sm">{errors.service_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-text-primary">Category</label>
              <select
                className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100 focus:outline-primary"
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

            <div>
              <label className="block text-text-primary">Description</label>
              <textarea
                className="w-full h-28 px-4 py-2 border border-base-300 rounded-md bg-base-100 focus:outline-primary"
                placeholder="Describe the decoration service..."
                {...register("description")}
              />
            </div>

            <div>
              <label className="block text-text-primary">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                placeholder="4.5"
                className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100"
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

          {/* RIGHT */}
          <div className="space-y-4">
            <div>
              <label className="block text-text-primary">Cost (BDT)</label>
              <input
                type="number"
                placeholder="15000"
                className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100"
                {...register("cost", { required: "Cost is required" })}
              />
              {errors.cost && (
                <p className="text-red-500 text-sm">{errors.cost.message}</p>
              )}
            </div>

            <div>
              <label className="block text-text-primary">Unit</label>
              <input
                type="text"
                placeholder="per event / per sqft"
                className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100"
                {...register("unit", { required: "Unit is required" })}
              />
              {errors.unit && (
                <p className="text-red-500 text-sm">{errors.unit.message}</p>
              )}
            </div>

            <div className="p-3 border border-base-300 bg-base-100 rounded-lg">
              <label className="block text-text-primary mb-2">Service Image</label>

              {/* show small current preview if available */}
              {service?.image && (
                <div className="mb-3">
                  <img src={service.image} alt="current" className="h-24 w-36 object-cover rounded-md shadow-sm" />
                </div>
              )}

              <div className="file_upload px-3 py-2 border-2 border-dotted border-base-300 rounded-lg">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image")}
                  />
                  <div className="bg-primary text-white rounded font-semibold cursor-pointer p-2 px-4 hover:bg-secondary transition text-center">
                    Upload New Image 
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-3 p-3 font-medium text-white rounded-md bg-primary hover:bg-secondary transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                "Update Service"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateServiceForm;
