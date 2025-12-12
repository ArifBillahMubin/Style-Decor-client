import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const UserDataRow = ({ user, refetch }) => {
  const { _id, name, email, imageUrl, role, last_login } = user;
  console.log(imageUrl)

  const handleUpdateRole = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to change this user's role.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366F1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, continue",
    }).then((result) => {
      if (result.isConfirmed) {
        openRoleSelection();
      }
    });
  };

  const openRoleSelection = () => {
    Swal.fire({
      title: "Update User Role",
      html: `
        <div style="display:flex; flex-direction:column; gap:14px;">
          <img 
            src="${imageUrl}" 
            style="width:80px;height:80px;border-radius:50%;object-cover;margin:auto;"
          />

          <p style="font-size:16px;font-weight:600;text-align:center;">${name}</p>

          <select id="newRole"
            style="
              padding:10px;
              width:100%;
              border-radius:8px;
              border:1px solid #d1d5db;
              outline:none;
            ">
            <option value="customer" ${role === "customer" ? "selected" : ""}>Customer</option>
            <option value="decorator" ${role === "decorator" ? "selected" : ""}>Decorator</option>
            <option value="admin" ${role === "admin" ? "selected" : ""}>Admin</option>
          </select>
        </div>
      `,
      confirmButtonText: "Update",
      showCancelButton: true,
      confirmButtonColor: "#6366F1",
      preConfirm: () => {
        return document.getElementById("newRole").value;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newRole = result.value;

        axios
          .patch(`${import.meta.env.VITE_API_URL}/users/role/${_id}`, {
            role: newRole,
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Role Updated",
              text: `${name}'s role changed to ${newRole}`,
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  return (
    <tr className="hover:bg-base-200 transition text-gray-700">

      {/* IMAGE */}
      <td>
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover shadow"
        />
      </td>

      {/* NAME */}
      <td className="font-medium capitalize">{name}</td>

      {/* EMAIL */}
      <td>{email}</td>

      {/* ROLE */}
      <td className="capitalize">
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {role}
        </span>
      </td>

      {/* LAST LOGIN */}
      <td className="text-sm text-gray-500">
        {last_login ? new Date(last_login).toLocaleString() : "N/A"}
      </td>

      {/* ACTION */}
      <td className="text-center">
        <button
          onClick={handleUpdateRole}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
        >
          Update Role
        </button>
      </td>
    </tr>
  );
};

export default UserDataRow;
