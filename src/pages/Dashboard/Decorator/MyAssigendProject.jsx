import { useQuery } from "@tanstack/react-query";
import AssigendProjectDataRow from "../../../components/Dashboard/TableRows/AssigendProjectDataRow";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAssigendProject = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: projects = [], isLoading, refetch } = useQuery({
    queryKey: ["assigned-projects", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorator/projects`
      );
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300">
        <h1 className="text-3xl font-bold text-secondary mb-1">
          My Assigned Projects
        </h1>
        <p className="text-gray-500 mb-6">
          Update project progress and manage assigned bookings.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="border-b text-sm text-gray-600">
                <th className="px-5 py-3 text-left">Service</th>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left">Price</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Address</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((booking) => (
                <AssigendProjectDataRow
                  key={booking._id}
                  booking={booking}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>

          {projects.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              No assigned projects yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAssigendProject;
