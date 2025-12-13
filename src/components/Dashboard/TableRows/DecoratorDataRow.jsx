import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DecoratorDataRow = ({ user, refetchCustomers, refetchDecorators }) => {
    const axiosSecure = useAxiosSecure();

    const {
        userId,
        name,
        email,
        imageURL,
        workingProjects,
        completedProjects
    } = user;

    const canRemove = workingProjects === 0;

    const handleRemoveDecorator = () => {
        Swal.fire({
            title: "Remove Decorator?",
            text: `${name} has no active projects`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Remove"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/demote/${userId}`)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Decorator Removed",
                            timer: 1500,
                            showConfirmButton: false
                        });
                        refetchCustomers();
                        refetchDecorators();
                    });
            }
        });
    };

    return (
        <tr className="hover:bg-base-200 transition text-gray-700">

            <td>
                <img src={imageURL} className="w-12 h-12 rounded-full object-cover" />
            </td>

            <td className="font-medium capitalize">{name}</td>
            <td>{email}</td>

            {/* WORKING PROJECTS */}
            <td className="text-center">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
            ${workingProjects > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"}
          `}
                >
                    {workingProjects}
                </span>
            </td>

            {/* COMPLETED PROJECTS */}
            <td className="text-center">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    {completedProjects}
                </span>
            </td>

            {/* ACTION */}
            <td className="text-center">
                {canRemove ? (
                    <button
                        onClick={handleRemoveDecorator}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Remove
                    </button>
                ) : (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                        Working on project
                    </span>
                )}
            </td>
        </tr>
    );
};

export default DecoratorDataRow;
