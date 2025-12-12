import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import CustomerbookingsDataRow from "../../../components/Dashboard/TableRows/CustomerbookingsDataRow";
import useAuth from "../../../hooks/useAuth";

const MyBookings = () => {
  const { user } = useAuth();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full h-full">

      {/* PAGE HEADER */}
      <div className="mb-8 bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
        <h1 className="text-3xl font-bold text-secondary">My Bookings</h1>
        <p className="text-text-secondary mt-1">
          Manage your booked decoration services.
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 overflow-x-auto">
        <h2 className="text-2xl font-bold text-secondary mb-5">Bookings List</h2>

        <table className="table w-full">
          <thead>
            <tr className="text-secondary text-sm border-b border-base-300">
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th> {/* All buttons in one column */}
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-10">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <CustomerbookingsDataRow
                  key={booking._id}
                  booking={booking}
                  refetch={refetch}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
