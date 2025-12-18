import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import BookingDataRow from "../../../components/Dashboard/TableRows/BookingDataRow";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Pagination from "../../../Pagination/Pagination";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 5;

const ManageBookings = () => {
    const axiosSecure = useAxiosSecure();

    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-bookings", currentPage, statusFilter, paymentFilter],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/admin/bookings?page=${currentPage}&limit=${ITEMS_PER_PAGE}&status=${statusFilter}&payment=${paymentFilter}`
            );
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    const { bookings = [], totalPages = 1 } = data || {};

    return (
        <div className="w-full h-full space-y-8">

            {/* HEADER */}
            <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300">
                <h1 className="text-3xl font-bold text-secondary">Manage Bookings</h1>
                <p className="text-gray-500 mt-1">
                    Filter, assign decorators, and manage all bookings.
                </p>
            </div>

            {/* FILTER BAR */}
            <div className="flex flex-wrap gap-4 justify-end">

                {/* STATUS FILTER */}
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="px-4 py-2 rounded-xl border border-base-300 bg-base-100 shadow-sm focus:ring-2 focus:ring-primary"
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

                {/* PAYMENT FILTER */}
                <select
                    value={paymentFilter}
                    onChange={(e) => {
                        setPaymentFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="px-4 py-2 rounded-xl border border-base-300 bg-base-100 shadow-sm focus:ring-2 focus:ring-primary"
                >
                    <option value="all">All Payments</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                </select>
            </div>

            {/* TABLE */}
            <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300 overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="text-secondary text-sm border-b">
                            <th>Image</th>
                            <th>Service</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Decorator</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center py-10 text-gray-400">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <BookingDataRow
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

export default ManageBookings;
