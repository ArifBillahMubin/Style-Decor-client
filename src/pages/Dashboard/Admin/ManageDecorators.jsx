import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UserDataRow from "../../../components/Dashboard/TableRows/UserDataRow";

const ManageDecorators = () => {
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full h-full">

      {/* PAGE HEADER */}
      <div className="mb-8 bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
        <h1 className="text-3xl font-bold text-secondary">Manage User Roles</h1>
        <p className="text-gray-500 mt-1">
          Assign and update user roles: Customer, Decorator, Admin
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 overflow-x-auto">
        <h2 className="text-2xl font-bold text-secondary mb-5">All Users</h2>

        <table className="table w-full">
          <thead>
            <tr className="text-secondary text-sm border-b border-base-300">
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Last Login</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <UserDataRow key={user._id} user={user} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDecorators;
