import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const STATUS_OPTIONS = [
  "assigned",
  "planning_phase",
  "materials_prepared",
  "ona_the_way",
  "setup_in_progress",
  "completed"
];

const STATUS_LABEL = {
  assigned: "Assigned",
  planning_phase: "Planning Phase",
  materials_prepared: "Materials Prepared",
  ona_the_way: "On the Way",
  setup_in_progress: "Setup in Progress",
  completed: "Completed"
};

const AssigendProjectDataRow = ({ booking, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    serviceName,
    cost,
    location,
    bookingStatus,
    customer,
    bookingDate
  } = booking;

  const handleStatusUpdate = (newStatus) => {
    if (newStatus === bookingStatus) return;

    Swal.fire({
      title: "Update Project Status?",
      text: `Change status to "${STATUS_LABEL[newStatus]}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366F1",
      confirmButtonText: "Update"
    }).then((res) => {
      if (res.isConfirmed) {
        axiosSecure
          .patch(`/decorator/projects/status/${_id}`, {
            status: newStatus
          })
          .then(() => {
            Swal.fire("Updated", "Project status updated", "success");
            refetch();
          });
      }
    });
  };

  return (
    <tr className="hover:bg-base-200 text-sm">

      <td className="px-5 py-4 font-medium">{serviceName}</td>

      <td className="px-5 py-4">{customer?.email}</td>

      <td className="px-5 py-4 text-primary font-semibold">
        {cost} BDT
      </td>

      <td className="px-5 py-4">
        {bookingDate}
      </td>

      <td className="px-5 py-4">{location}</td>

      <td className="px-5 py-4">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
          {STATUS_LABEL[bookingStatus]}
        </span>
      </td>

      <td className="px-5 py-4 text-center">
        {bookingStatus !== "completed" ? (
          <select
            className="px-3 py-1 border rounded-md bg-white text-sm"
            value={bookingStatus}
            onChange={(e) => handleStatusUpdate(e.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABEL[status]}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-green-600 text-xs font-semibold">
            Work Completed
          </span>
        )}
      </td>
    </tr>
  );
};

export default AssigendProjectDataRow;
