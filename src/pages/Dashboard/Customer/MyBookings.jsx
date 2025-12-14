import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import CustomerbookingsDataRow from "../../../components/Dashboard/TableRows/CustomerbookingsDataRow";
import Pagination from "../../../Pagination/Pagination";

const ITEMS_PER_PAGE = 5;

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-bookings", statusFilter, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?status=${statusFilter}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  const { bookings = [], totalPages = 1 } = data || {};

  return (
    <div className="w-full h-full space-y-8">

      {/* HEADER */}
      <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300">
        <h1 className="text-3xl font-bold text-secondary">My Bookings</h1>
        <p className="text-gray-500 mt-1">
          Track, manage, and pay for your bookings.
        </p>
      </div>

      {/* FILTER */}
      <div className="flex justify-end">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="
            px-4 py-2 rounded-xl border border-base-300
            bg-base-100 text-secondary font-medium
            shadow-sm focus:outline-none focus:ring-2 focus:ring-primary
          "
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="planning_phase">Planning Phase</option>
          <option value="materials_prepared">Materials Prepared</option>
          <option value="ona_the_way">On The Way</option>
          <option value="setup_in_progress">Setup In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300 overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-secondary text-sm border-b">
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400">
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

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default MyBookings;
