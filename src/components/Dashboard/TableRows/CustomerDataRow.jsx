import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomerDataRow = ({ user, refetchCustomers, refetchDecorators }) => {
    const axiosSecure = useAxiosSecure();
    const { _id, name, email, imageURL, role, last_login } = user;

    // Only customers are shown here, so button only converts customer → decorator
    const handleMakeDecorator = () => {
        Swal.fire({
            title: "Promote to Decorator?",
            text: `You are about to make ${name} a Decorator.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366F1",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, promote",
        }).then((result) => {
            if (result.isConfirmed) {
                updateRole();
            }
        });
    };

    const updateRole = () => {
        axiosSecure
            .patch(`/users/promote/${_id}`)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Role Updated",
                    text: `${name} is now a Decorator`,
                    timer: 1500,
                    showConfirmButton: false,
                });
                refetchCustomers();
                refetchDecorators();
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: "Something went wrong!",
                });
            });
    };

    return (
        <tr className="hover:bg-base-200 transition text-gray-700">

            {/* IMAGE */}
            <td>
                <img
                    src={imageURL}
                    alt={name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover shadow"
                />
            </td>

            {/* NAME */}
            <td className="font-medium capitalize">{name}</td>

            {/* EMAIL */}
            <td>{email}</td>

            {/* ROLE */}
            <td className="capitalize font-bold">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    Customer
                </span>
            </td>

            {/* LAST LOGIN */}
            <td className="text-sm text-gray-500">
                {last_login ? new Date(last_login).toLocaleString() : "N/A"}
            </td>

            {/* ACTION */}
            <td className="text-center">
                <button
                    onClick={handleMakeDecorator}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
                >
                    Make Decorator
                </button>
            </td>

        </tr>
    );
};

export default CustomerDataRow;
