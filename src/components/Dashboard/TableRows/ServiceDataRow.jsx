import { useState } from "react";
import UpdateServiceModal from "../../Modal/UpdateServiceModal";
import DeleteServiceModal from "../../Modal/DeleteServiceModal";

const ServiceDataRow = ({ service ,refetch}) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);


  return (
    <tr className="bg-base-100 border-b border-base-300 hover:bg-base-200 transition">

      {/* IMAGE */}
      <td className="px-5 py-5 text-sm">
        <img
          src={service.image}
          alt="service"
          className="h-12 w-20 object-cover rounded-md shadow-sm"
        />
      </td>

      {/* NAME */}
      <td className="px-5 py-5 text-sm font-medium text-text-primary">
        {service.service_name}
      </td>

      {/* CATEGORY */}
      <td className="px-5 py-5 text-sm capitalize text-text-secondary">
        {service.category}
      </td>

      {/* COST */}
      <td className="px-5 py-5 text-sm text-text-primary">
        {service.cost} BDT
      </td>

      {/* UNIT */}
      <td className="px-5 py-5 text-sm text-text-secondary">
        {service.unit}
      </td>

      {/* DELETE BUTTON */}
      <td className="px-5 py-5 text-sm text-right">
        <button
          onClick={() => setDeleteOpen(true)}
          className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition"
        >
          Delete
        </button>

        {/* Delete Modal */}
        <DeleteServiceModal
          isOpen={isDeleteOpen}
          closeModal={() => setDeleteOpen(false)}
          id={service._id}
          refetch={refetch}
        />
      </td>

      {/* UPDATE BUTTON */}
      <td className="px-5 py-5 text-sm text-right">
        <button
          onClick={() => setEditOpen(true)}
          className="px-4 py-2 rounded-lg text-white bg-primary hover:bg-secondary transition"
        >
          Edit
        </button>

        {/* Edit Modal */}
        <UpdateServiceModal
          isOpen={isEditOpen}
          setIsEditModalOpen={setEditOpen}
          service={service}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default ServiceDataRow;
