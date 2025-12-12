import axios from "axios";
import toast from "react-hot-toast";

const CustomerbookingsDataRow = ({ booking, refetch }) => {
  const {
    _id,
    image,
    serviceName,
    bookingDate,
    location,
    cost,
    bookingStatus,
    payment,
  } = booking;

  console.log(booking);

  // CANCEL BOOKING
  const handleCancel = () => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/bookings/cancel/${_id}`)
      .then(() => {
        toast.success("Booking cancelled");
        refetch();
      })
      .catch(() => toast.error("Failed to cancel booking"));
  };

  // PAYMENT
  const handlePayment = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, booking)
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
    <tr className="hover:bg-base-200 transition">
      {/* Image */}
      <td>
        <img src={image} className="w-20 h-14 rounded-lg object-cover" />
      </td>

      {/* Name */}
      <td className="font-medium">{serviceName}</td>

      {/* Booking Date */}
      <td>{bookingDate}</td>

      {/* Location */}
      <td>{location}</td>

      {/* Price */}
      <td className="text-primary font-semibold">{cost} BDT</td>

      {/* Booking Status */}
      <td>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium 
            ${bookingStatus === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : bookingStatus === "approved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {bookingStatus}
        </span>
      </td>

      {/* ACTION BUTTONS */}
      <td className="flex gap-2 items-center">

        {/* PAY BUTTON */}
        {payment ? (
          <button
            disabled
            className="
              px-4 py-2 bg-green-100 text-green-700 
              rounded-lg cursor-not-allowed
            "
          >
            Payment Completed
          </button>
        ) : (
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
          >
            Pay
          </button>
        )}

        {!payment && (
          <button
            onClick={handleCancel}
            className="
              px-4 py-2 bg-red-100 text-red-600 
              rounded-lg hover:bg-red-200
            "
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
};

export default CustomerbookingsDataRow;
