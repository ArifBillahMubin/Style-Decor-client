import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

import {
    PieChart, Pie, Cell,
    BarChart, Bar,
    XAxis, YAxis, Tooltip, Legend,
    ResponsiveContainer
} from "recharts";

import { FiDollarSign, FiShoppingBag, FiLayers } from "react-icons/fi";

import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/Shared/Container";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CHART_COLORS = {
    home: "#6366F1",
    wedding: "#FB923C",
    ceremony: "#10B981",
    birthday: "#EF4444",
    seminar: "#3B82F6",
    office: "#8B5CF6",
};

const PaymentHistoryPage = () => {
    const { user } = useAuth();
    const axiosSecure =useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payment-history", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments/history`
            );
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    // SUMMARY
    const totalPaid = payments.reduce((sum, p) => sum + p.cost, 0);
    const totalBookings = payments.length;

    // CATEGORY COUNT
    const categoryMap = payments.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});

    const categoryCount = Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key],
        color: CHART_COLORS[key],
    }));

    // BAR CHART DATA
    const barData = payments.map((p) => ({
        name: p.serviceName,
        amount: p.cost,
        fill: CHART_COLORS[p.category] || "#6366F1",
    }));

    return (
        <Container>
            <div className="pt-24 pb-16">

                {/* MAIN TITLE */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-secondary text-center mb-12"
                >
                    Payment Analytics Dashboard
                </motion.h1>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

                    {/* Total Paid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl p-6 shadow-xl border border-base-300 bg-white flex items-center gap-4"
                    >
                        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-primary/15 text-primary text-3xl">
                            <FiDollarSign />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Paid</p>
                            <p className="text-3xl font-bold text-primary">{totalPaid} BDT</p>
                        </div>
                    </motion.div>

                    {/* Total Bookings */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl p-6 shadow-xl border border-base-300 bg-white flex items-center gap-4"
                    >
                        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-secondary/15 text-secondary text-3xl">
                            <FiShoppingBag />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Bookings</p>
                            <p className="text-3xl font-bold">{totalBookings}</p>
                        </div>
                    </motion.div>

                    {/* Categories Used */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl p-6 shadow-xl border border-base-300 bg-white flex items-center gap-4"
                    >
                        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-green-500/15 text-green-600 text-3xl">
                            <FiLayers />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Categories Used</p>
                            <p className="text-3xl font-bold text-green-600">{categoryCount.length}</p>
                        </div>
                    </motion.div>

                </div>

                {/* CHARTS BOX */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-base-300 mb-14"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-secondary">
                        Payment Insights
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* PIE CHART */}
                        <div>
                            <h3 className="text-lg font-medium mb-3">Bookings by Category</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryCount}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={120}
                                        label
                                    >
                                        {categoryCount.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* BAR CHART */}
                        <div>
                            <h3 className="text-lg font-medium mb-3">Amount Paid Per Service</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="amount">
                                        {barData.map((entry, index) => (
                                            <Cell key={index} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </motion.div>

                {/* PAYMENT TABLE */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-base-300"
                >
                    <h2 className="text-2xl font-bold mb-6 text-secondary">
                        Payment Records
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-gray-600 border-b text-sm">
                                    <th>Image</th>
                                    <th>Service</th>
                                    <th>Payment Date</th>
                                    <th>Amount</th>
                                    <th>Txn ID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {payments.map((item) => (
                                    <tr key={item._id} className="hover:bg-base-200 text-gray-700">
                                        <td>
                                            <img
                                                src={item.image}
                                                className="h-14 w-20 rounded-lg object-cover shadow"
                                            />
                                        </td>

                                        <td className="font-medium">{item.serviceName}</td>

                                        {/* NEW: PAYMENT DATE */}
                                        <td className="text-sm">
                                            {item.paymentDate
                                                ? new Date(item.paymentDate).toISOString().split("T")[0]
                                                : "-"}
                                        </td>

                                        <td className="text-primary font-bold">{item.cost} BDT</td>

                                        <td className="text-gray-500 text-xs">{item.transactionId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

            </div>
        </Container>
    );
};

export default PaymentHistoryPage;
