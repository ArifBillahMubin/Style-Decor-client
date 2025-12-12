import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const BookingDataRow = ({ booking, refetch }) => {
    const {
        _id,
        image,
        serviceName,
        cost,
        bookingDate,
        customer,
        payment,
        bookingStatus,
        assignedDecorator
    } = booking;

    const handleCancel = () => {
        Swal.fire({
            title: "Cancel booking?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6366F1",
            confirmButtonText: "Cancel Booking"
        }).then((res) => {
            if (res.isConfirmed) {
                axios.patch(`${import.meta.env.VITE_API_URL}/admin/bookings/cancel/${_id}`)
                    .then(() => {
                        Swal.fire("Cancelled", "Booking has been cancelled", "success");
                        refetch();
                    });
            }
        });
    };

    const handleAssignDecorator = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/decorators`).then((res) => {
            const decorators = res.data;

            const options = decorators
                .map(
                    (d) =>
                        `<option value="${d.email}">${d.name} (${d.email})</option>`
                )
                .join("");

            Swal.fire({
                title: "Assign Decorator",
                html: `
          <select id="decoratorSelect" class="swal2-input">${options}</select>
        `,
                confirmButtonText: "Assign",
                showCancelButton: true,
                confirmButtonColor: "#6366F1"
            }).then((result) => {
                if (result.isConfirmed) {
                    const decoratorEmail = document.getElementById("decoratorSelect").value;
                    const decoratorInfo = decorators.find(d => d.email === decoratorEmail);

                    axios.patch(`${import.meta.env.VITE_API_URL}/admin/bookings/assign/${_id}`, {
                        decoratorEmail,
                        decoratorName: decoratorInfo.name,
                    })
                        .then(() => {
                            Swal.fire("Success", "Decorator assigned", "success");
                            refetch();
                        });
                }
            });
        });
    };

    return (
        <tr className="hover:bg-base-200 transition">

            <td><img src={image} className="w-20 h-14 rounded-lg object-cover" /></td>

            <td className="font-medium">{serviceName}</td>

            <td>{customer?.email}</td>

            <td>{bookingDate}</td>

            <td className="text-primary font-semibold">{cost} BDT</td>

            <td>
                <span className={`
          px-3 py-1 rounded-full text-xs font-medium
          ${payment ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
        `}>
                    {payment ? "Paid" : "Unpaid"}
                </span>
            </td>

            <td>
                <span className={`
          px-3 py-1 rounded-full text-xs font-medium
          ${bookingStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : bookingStatus === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"}
        `}>
                    {bookingStatus}
                </span>
            </td>

            <td>
                {assignedDecorator?.name ? (
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs">
                        {assignedDecorator.name}
                    </span>
                ) : (
                    <span className="text-gray-400 text-xs">Not Assigned</span>
                )}
            </td>

            <td className="text-center">
                <div className="flex items-center justify-center gap-2">

                    {/* Assign Button */}
                    {payment && (
                        <button
                            onClick={handleAssignDecorator}
                            className="px-4 py-1 bg-primary text-white rounded-lg hover:bg-secondary transition"
                        >
                            Assign
                        </button>
                    )}

                    {/* Cancel Button */}
                    <button
                        onClick={handleCancel}
                        className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default BookingDataRow;
