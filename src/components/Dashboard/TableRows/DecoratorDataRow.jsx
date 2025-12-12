import axios from "axios";
import Swal from "sweetalert2";

const DecoratorDataRow = ({ user, refetchCustomers, refetchDecorators }) => {
    const { userId, name, email, imageURL, last_login } = user;

    const handleRemoveDecorator = () => {
        Swal.fire({
            title: "Remove Decorator Role?",
            text: `You are about to change ${name} back to a Customer.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, revert"
        }).then((result) => {
            if (result.isConfirmed) {
                updateRole();
            }
        });
    };

    const updateRole = () => {
        axios
            .patch(`${import.meta.env.VITE_API_URL}/users/demote/${userId}`)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Role Updated",
                    text: `${name} is now a Customer again`,
                    timer: 1500,
                    showConfirmButton: false
                });
                refetchCustomers();
                refetchDecorators();
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: "Something went wrong!"
                });
            });
    };

    return (
        <tr className="hover:bg-base-200 transition text-gray-700">
            <td>
                <img src={imageURL} className="w-12 h-12 rounded-full object-cover shadow" />
            </td>
            <td className="font-medium capitalize">{name}</td>
            <td>{email}</td>
            <td>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    Decorator
                </span>
            </td>
            <td>{last_login ? new Date(last_login).toLocaleString() : "N/A"}</td>
            <td className="text-center">
                <button
                    onClick={handleRemoveDecorator}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Remove Decorator
                </button>
            </td>
        </tr>
    );
};

export default DecoratorDataRow;
