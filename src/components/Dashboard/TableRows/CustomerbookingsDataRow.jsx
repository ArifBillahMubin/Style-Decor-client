import axios from "axios";
import toast from "react-hot-toast";

const statusStyle = {
  pending: "bg-yellow-100 text-yellow-700",
  assigned: "bg-blue-100 text-blue-700",
  planning_phase: "bg-indigo-100 text-indigo-700",
  materials_prepared: "bg-purple-100 text-purple-700",
  ona_the_way: "bg-cyan-100 text-cyan-700",
  setup_in_progress: "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

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

  const handleCancel = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/bookings/cancel/${_id}`)
      .then(() => {
        toast.success("Booking cancelled");
        refetch();
      })
      .catch(() => toast.error("Failed to cancel booking"));
  };

  const handlePayment = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, booking)
      .then((res) => {
        window.location.href = res.data.url;
      });
  };

  return (
    <tr className="hover:bg-base-200 transition">

      <td>
        <img src={image} className="w-20 h-14 rounded-lg object-cover" />
      </td>

      <td className="font-medium">{serviceName}</td>
      <td>{bookingDate}</td>
      <td>{location}</td>

      <td className="text-primary font-semibold">{cost} BDT</td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium 
            ${statusStyle[bookingStatus]}
          `}
        >
          {bookingStatus.replaceAll("_", " ")}
        </span>
      </td>

      <td className="flex gap-2">

        {payment ? (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
            Paid
          </span>
        ) : (
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
          >
            Pay
          </button>
        )}

        {!payment && bookingStatus === "pending" && (
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
};

export default CustomerbookingsDataRow;
