import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

/*  STATUS COLORS  */
const STATUS_CONFIG = {
    pending: { label: "Pending", color: "#F59E0B" },
    assigned: { label: "Assigned", color: "#6366F1" },
    planning_phase: { label: "Planning Phase", color: "#8B5CF6" },
    materials_prepared: { label: "Materials Prepared", color: "#06B6D4" },
    ona_the_way: { label: "On The Way", color: "#3B82F6" },
    setup_in_progress: { label: "Setup In Progress", color: "#22C55E" },
    completed: { label: "Completed", color: "#16A34A" },
    cancelled: { label: "Cancelled", color: "#EF4444" },
};

/*  CUSTOM X AXIS LABEL  */
const CustomXAxisTick = ({ x, y, payload }) => {
    const words = payload.value.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
        if ((currentLine + word).length > 12) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine += ` ${word}`;
        }
    });
    lines.push(currentLine);

    return (
        <g transform={`translate(${x},${y + 10})`}>
            <title>{payload.value}</title>
            <text textAnchor="middle" fill="#6B7280" fontSize={12}>
                {lines.map((line, index) => (
                    <tspan x={0} dy={index === 0 ? 0 : 14} key={index}>
                        {line.trim()}
                    </tspan>
                ))}
            </text>
        </g>
    );
};

const RevenueMonitoring = () => {
    const axiosSecure = useAxiosSecure();
    /*  SUMMARY  */
    const { data: summary = {}, isLoading: loadingSummary } = useQuery({
        queryKey: ["admin-summary"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/admin/analytics/summary`
            );
            return res.data;
        },
    });

    /*  SERVICE DEMAND  */
    const { data: demand = [], isLoading: loadingDemand } = useQuery({
        queryKey: ["service-demand"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/admin/analytics/service-demand`
            );
            return res.data;
        },
    });

    /*  STATUS DISTRIBUTION  */
    const { data: statusData = [], isLoading: loadingStatus } = useQuery({
        queryKey: ["status-distribution"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/admin/analytics/status-distribution`
            );
            return res.data;
        },
    });

    if (loadingSummary || loadingDemand || loadingStatus) {
        return <LoadingSpinner />;
    }

    const formattedStatusData = statusData.map((item) => ({
        name: STATUS_CONFIG[item.status]?.label || item.status,
        value: item.count,
        color: STATUS_CONFIG[item.status]?.color || "#9CA3AF",
    }));

    return (
        <div className="w-full h-full">

            {/*  HEADER  */}
            <div className="mb-8 bg-base-100 p-6 rounded-xl shadow border border-base-300">
                <h1 className="text-3xl font-bold text-secondary">
                    Revenue Monitoring
                </h1>
                <p className="text-gray-500 mt-1">
                    Revenue, bookings & workflow analytics overview
                </p>
            </div>

            {/*  SUMMARY  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                <SummaryCard title="Total Revenue" value={`${summary.totalRevenue || 0} BDT`} color="primary" />
                <SummaryCard title="Total Bookings" value={summary.totalBookings || 0} color="secondary" />
                <SummaryCard title="Working On" value={summary.workingOn || 0} color="warning" />
                <SummaryCard title="Completed" value={summary.completed || 0} color="success" />
                <SummaryCard title="Unpaid Amount" value={`${summary.unpaidAmount || 0} BDT`} color="error" />
            </div>

            {/*  CHARTS = */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

                {/* SERVICE DEMAND  */}
                <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300">
                    <h2 className="text-xl font-bold text-secondary mb-6">
                        Service Demand (Histogram)
                    </h2>

                    <ResponsiveContainer width="100%" height={420}>
                        <BarChart data={demand} margin={{ bottom: 80 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="serviceName"
                                tick={<CustomXAxisTick />}
                                interval={0}
                            />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar
                                dataKey="totalBookings"
                                fill="#6366F1"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* STATUS PIE */}
                <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300">
                    <h2 className="text-xl font-bold text-secondary mb-6">
                        Booking Status Distribution
                    </h2>

                    <div className="flex flex-col items-center">

                        {/* PIE CHART */}
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={formattedStatusData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    innerRadius={60}
                                    paddingAngle={3}
                                >
                                    {formattedStatusData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* LEGEND BELOW */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 w-full max-w-xl">
                            {formattedStatusData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-base-200 px-3 py-2 rounded-lg"
                                >
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm text-gray-700 font-medium">
                                        {item.name}
                                    </span>
                                    <span className="ml-auto text-sm font-semibold text-gray-900">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

/* SUMMARY CARD  */
const SummaryCard = ({ title, value, color }) => {
    const colorMap = {
        primary: "border-primary text-primary",
        secondary: "border-secondary text-secondary",
        warning: "border-yellow-500 text-yellow-600",
        success: "border-green-500 text-green-600",
        error: "border-red-500 text-red-600",
    };

    return (
        <div className={`bg-base-100 p-6 rounded-xl shadow border-l-4 ${colorMap[color]}`}>
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold mt-2">{value}</h2>
        </div>
    );
};

export default RevenueMonitoring;
