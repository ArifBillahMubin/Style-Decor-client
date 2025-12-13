import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import AssignDecoratorModal from "../../Modal/AssignDecoratorModal";

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
        assignedDecorator,
    } = booking;

    const [isOpen, setIsOpen] = useState(false);

    // STATUS FLAGS
    const isPending = bookingStatus === "pending";
    const isAssigned = bookingStatus === "assigned";
    const isCancelled = bookingStatus === "cancelled";

    // CANCEL BOOKING
    const handleCancel = () => {
        Swal.fire({
            title: "Cancel booking?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Cancel Booking",
        }).then((res) => {
            if (res.isConfirmed) {
                axios
                    .delete(`${import.meta.env.VITE_API_URL}/bookings/cancel/${_id}`)
                    .then(() => {
                        Swal.fire("Cancelled", "Booking has been cancelled", "success");
                        refetch();
                    });
            }
        });
    };

    return (
        <>
            <tr className="hover:bg-base-200 transition text-gray-700">

                {/* IMAGE */}
                <td>
                    <img
                        src={image}
                        alt={serviceName}
                        className="w-20 h-14 rounded-lg object-cover shadow"
                    />
                </td>

                {/* SERVICE */}
                <td className="font-medium">{serviceName}</td>

                {/* USER */}
                <td className="text-sm">{customer?.email}</td>

                {/* DATE */}
                <td className="text-sm">{bookingDate}</td>

                {/* PRICE */}
                <td className="text-primary font-semibold">{cost} BDT</td>

                {/* PAYMENT */}
                <td>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
              ${payment
                                ? "bg-success/15 text-success"
                                : "bg-error/15 text-error"
                            }
            `}
                    >
                        {payment ? "Paid" : "Unpaid"}
                    </span>
                </td>

                {/* STATUS (SINGLE LINE ONLY) */}
                <td>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
              ${isPending
                                ? "bg-warning/15 text-warning"
                                : isAssigned
                                    ? "bg-info/15 text-info"
                                    : "bg-error/15 text-error"
                            }
            `}
                    >
                        {bookingStatus}
                    </span>
                </td>

                {/* DECORATOR */}
                <td className="max-w-[180px]">
                    {assignedDecorator?.name ? (
                        <span
                            className="inline-block px-3 py-1 rounded-lg bg-info/10 text-info text-xs font-medium truncate"
                            title={assignedDecorator.name}
                        >
                            {assignedDecorator.name}
                        </span>
                    ) : (
                        <span className="text-xs text-base-content/50">
                            Not Assigned
                        </span>
                    )}
                </td>

                {/* ACTIONS */}
                <td className="text-center min-w-[160px]">

                    {/* PENDING + PAID → ASSIGN */}
                    {payment && isPending && (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-1 bg-primary text-white rounded-lg hover:bg-primary-focus transition"
                        >
                            Assign
                        </button>
                    )}

                    {/* ASSIGNED → CHANGE DECORATOR */}
                    {payment && isAssigned && (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-1 bg-info text-white rounded-lg hover:bg-info-focus transition"
                        >
                            Change
                        </button>
                    )}

                    {/* PENDING + UNPAID → CANCEL */}
                    {!payment && isPending && (
                        <button
                            onClick={handleCancel}
                            className="px-4 py-1 bg-error text-white rounded-lg hover:bg-error-focus transition"
                        >
                            Cancel
                        </button>
                    )}

                    {/* NO ACTION */}
                    {!isPending && !isAssigned && (
                        <span className="text-xs text-base-content/50">—</span>
                    )}

                </td>
            </tr>

            {/* ASSIGN / CHANGE MODAL */}
            <AssignDecoratorModal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                bookingId={_id}
                refetch={refetch}
            />
        </>
    );
};

export default BookingDataRow;
