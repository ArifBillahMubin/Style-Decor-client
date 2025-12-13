import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DecoratorEarnings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ["decorator-earnings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/decorator/earnings`
            );
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const {
        totalEarnings,
        monthlyEarnings,
        completedCount,
        pendingEarnings,
        bookings
    } = data;

    return (
        <div className="w-full h-full">

            {/* HEADER */}
            <div className="mb-8 bg-base-100 p-6 rounded-xl shadow border border-base-300">
                <h1 className="text-3xl font-bold text-secondary">
                    Earnings Summary
                </h1>
                <p className="text-gray-500 mt-1">
                    Overview of your completed and ongoing projects earnings.
                </p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                <div className="bg-base-100 p-6 rounded-xl shadow border-l-4 border-primary">
                    <p className="text-sm text-gray-500">Total Earnings</p>
                    <h2 className="text-2xl font-bold text-primary mt-2">
                        {totalEarnings} BDT
                    </h2>
                </div>

                <div className="bg-base-100 p-6 rounded-xl shadow border-l-4 border-green-500">
                    <p className="text-sm text-gray-500">This Month</p>
                    <h2 className="text-2xl font-bold text-green-600 mt-2">
                        {monthlyEarnings} BDT
                    </h2>
                </div>

                <div className="bg-base-100 p-6 rounded-xl shadow border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500">Completed Projects</p>
                    <h2 className="text-2xl font-bold text-blue-600 mt-2">
                        {completedCount}
                    </h2>
                </div>

                <div className="bg-base-100 p-6 rounded-xl shadow border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-500">Pending Earnings</p>
                    <h2 className="text-2xl font-bold text-yellow-600 mt-2">
                        {pendingEarnings} BDT
                    </h2>
                </div>

            </div>

            {/* EARNINGS TABLE */}
            <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300 overflow-x-auto">
                <h2 className="text-2xl font-bold text-secondary mb-5">
                    Earnings Breakdown
                </h2>

                <table className="table w-full">
                    <thead>
                        <tr className="text-secondary text-sm border-b border-base-300">
                            <th>Service</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map(b => (
                            <tr key={b._id} className="hover:bg-base-200">
                                <td className="font-medium">{b.serviceName}</td>
                                <td>{b.bookingDate}</td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${b.bookingStatus === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {b.bookingStatus}
                                    </span>
                                </td>
                                <td className="font-semibold text-primary">
                                    {b.cost} BDT
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default DecoratorEarnings;
