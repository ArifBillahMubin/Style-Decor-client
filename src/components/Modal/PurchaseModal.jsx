import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const PurchaseModal = ({ isOpen, closeModal, service, user }) => {
  const {
    _id,
    service_name,
    category,
    description,
    cost,
    unit,
    image,
    rating
  } = service || {};

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  
  const onSubmit = (formData) => {
    const paymentInfo = {
      serviceId: _id,
      serviceName: service_name,
      category,
      description,
      cost,
      unit,
      image,
      rating,
      quantity: 1,

      bookingDate: formData.bookingDate,
      location: formData.location,

      customer: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo)
      .then((res) => {
        const url = res?.data?.url;

        if (!url) {
          toast.error("Unable to start payment session.");
          return;
        }

        toast.success("Redirecting to payment...");
        window.location.href = url;
      })
      .catch(() => {
        toast.error("Payment request failed. Try again.");
      });
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel
          className="
            w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl 
            transition-all duration-300
          "
        >
          {/* MODAL TITLE */}
          <DialogTitle className="text-xl font-semibold text-center text-gray-900 mb-4">
            Confirm Your Booking
          </DialogTitle>

          {/* SERVICE INFO */}
          <div className="space-y-2 text-gray-700 text-sm mb-6">
            <p><span className="font-medium">Service:</span> {service_name}</p>
            <p><span className="font-medium">Category:</span> {category}</p>
            <p>
              <span className="font-medium">Price:</span> {cost} BDT / {unit}
            </p>
          </div>

          {/* BOOKING FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* USER NAME */}
            <div>
              <label className="text-sm text-gray-600">Your Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100"
              />
            </div>

            {/* USER EMAIL */}
            <div>
              <label className="text-sm text-gray-600">Your Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100"
              />
            </div>

            {/* BOOKING DATE */}
            <div>
              <label className="text-sm text-gray-600">Booking Date *</label>
              <input
                type="date"
                {...register("bookingDate", { required: "Booking date is required" })}
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-white"
              />
              {errors.bookingDate && (
                <p className="text-red-500 text-sm mt-1">{errors.bookingDate.message}</p>
              )}
            </div>

            {/* EVENT LOCATION */}
            <div>
              <label className="text-sm text-gray-600">Event Location *</label>
              <input
                type="text"
                placeholder="Enter location"
                {...register("location", { required: "Event location is required" })}
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-white"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between pt-4">
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
              >
                Book Now
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
              >
                Cancel
              </button>
            </div>

          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
