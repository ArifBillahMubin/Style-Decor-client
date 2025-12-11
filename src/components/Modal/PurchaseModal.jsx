import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const PurchaseModal = ({ isOpen, closeModal, service, user }) => {
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
          transition
          className="
            w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl 
            duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0
          "
        >
          {/* MODAL TITLE */}
          <DialogTitle className="text-xl font-semibold text-center text-gray-900 mb-4">
            Confirm Your Booking
          </DialogTitle>

          {/* SERVICE INFO */}
          <div className="space-y-2 text-gray-700 text-sm mb-6">
            <p>
              <span className="font-medium">Service:</span> {service.service_name}
            </p>
            <p>
              <span className="font-medium">Category:</span> {service.category}
            </p>
            <p>
              <span className="font-medium">Price:</span> {service.cost} BDT /{" "}
              {service.unit}
            </p>
          </div>

          {/* BOOKING FORM */}
          <form className="space-y-4">
            {/* USER NAME */}
            <div>
              <label className="text-sm text-gray-600">Your Name</label>
              <input
                type="text"
                readOnly
                value={user?.displayName || ""}
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 text-gray-700"
              />
            </div>

            {/* USER EMAIL */}
            <div>
              <label className="text-sm text-gray-600">Your Email</label>
              <input
                type="email"
                readOnly
                value={user?.email || ""}
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 text-gray-700"
              />
            </div>

            {/* BOOKING DATE */}
            <div>
              <label className="text-sm text-gray-600">Booking Date</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-white"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="text-sm text-gray-600">Event Location</label>
              <input
                type="text"
                required
                placeholder="Enter location"
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-white"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
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
