import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AssignedProjectsCalendar from "./AssignedProjectsCalendar";
import TodayScheduleCard from "./TodayScheduleCard";
import useAuth from "../../../hooks/useAuth";

const TodaySchedule = () => {
    const { user } = useAuth();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["decorator-bookings", user?.email],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/decorator/bookings`,
                { params: { email: user?.email } }
            );
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <LoadingSpinner />;

    const today = new Date().toISOString().split("T")[0];
    const todayBookings = bookings.filter(
        (b) => b.bookingDate === today
    );

    return (
        <div className="container mx-auto px-4 py-8">

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondary">
                    Today’s Schedule
                </h1>
                <p className="text-gray-500">
                    Calendar view & today’s assigned projects
                </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* CALENDAR */}
                <div className="lg:col-span-2">
                    <AssignedProjectsCalendar bookings={bookings} />
                </div>

                {/* TODAY LIST */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-secondary">
                        Today’s Tasks
                    </h2>

                    {todayBookings.length > 0 ? (
                        todayBookings.map((booking) => (
                            <TodayScheduleCard
                                key={booking._id}
                                booking={booking}
                            />
                        ))
                    ) : (
                        <div className="bg-base-100 p-6 rounded-xl text-center text-gray-500 shadow">
                            No tasks scheduled for today
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TodaySchedule;
