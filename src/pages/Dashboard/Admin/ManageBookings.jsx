import { useQuery } from "@tanstack/react-query";
import BookingDataRow from "../../../components/Dashboard/TableRows/BookingDataRow";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ["admin-bookings"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/bookings`);
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full h-full">

            {/* HEADER */}
            <div className="mb-8 bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
                <h1 className="text-3xl font-bold text-secondary">Manage Bookings</h1>
                <p className="text-gray-500 mt-1">
                    Manage user bookings and assign decorators.
                </p>
            </div>

            {/* TABLE */}
            <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 overflow-x-auto">
                <h2 className="text-2xl font-bold text-secondary mb-5">All Bookings</h2>

                <table className="table w-full">
                    <thead>
                        <tr className="text-secondary text-sm border-b border-base-300">
                            <th>Image</th>
                            <th>Service</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Decorator</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <BookingDataRow
                                key={booking._id}
                                booking={booking}
                                refetch={refetch}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
