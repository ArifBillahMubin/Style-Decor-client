import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";

import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import toast from "react-hot-toast";

const ServiceDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // MODAL STATE
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // FETCH SERVICE DETAILS
    const { data: service, isLoading } = useQuery({
        queryKey: ["service-details", id],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/services/${id}`
            );
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <Container>
            <div className="pt-24 pb-16">

                {/* BACK BUTTON */}
                <motion.button
                    onClick={() => navigate(-1)}
                    whileHover={{ x: -3 }}
                    className="
                        inline-flex items-center gap-2 mb-8 
                        px-5 py-2 rounded-xl 
                        bg-white border border-gray-300 shadow-sm
                        text-gray-700 font-medium
                        hover:shadow-md transition-all
                    "
                >
                    ← Back
                </motion.button>

                {/* SIDE-BY-SIDE LAYOUT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                >
                    {/* LEFT: IMAGE */}
                    <div className="w-full h-[420px] rounded-2xl overflow-hidden shadow-lg">
                        <motion.img
                            src={service.image}
                            alt={service.service_name}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.03 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    {/* RIGHT: DETAILS */}
                    <div className="space-y-8">

                        {/* TITLE + BADGES */}
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                {service.service_name}
                            </h1>

                            <div className="flex gap-4 text-gray-500 items-center">
                                <span className="px-4 py-1 bg-gray-100 rounded-full text-sm capitalize">
                                    {service.category}
                                </span>

                                {service.rating && (
                                    <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                                        ⭐ {service.rating}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {service.description || "No description available."}
                        </p>

                        {/* PRICE + BOOK BUTTON */}
                        <div
                            className="
                                bg-white p-6 rounded-2xl shadow-xl 
                                border border-gray-200 space-y-6 
                                max-w-md
                            "
                        >
                            <div>
                                <p className="text-gray-600 text-sm">Price</p>
                                <h2 className="text-3xl font-bold text-primary">
                                    {service.cost} BDT
                                    <span className="text-gray-500 text-sm">
                                        {" "} / {service.unit}
                                    </span>
                                </h2>
                            </div>

                            <button
                                onClick={() => {
                                    if (!user) {
                                        toast.error("Please login to book this service");
                                        return navigate("/login", {
                                            state: `/services/${id}`,
                                        });
                                    }
                                    openModal();
                                }}
                                className="w-full py-3 bg-primary text-white rounded-xl text-lg font-medium hover:bg-secondary transition-all duration-200"
                            >
                                Book This Service
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* BOOKING MODAL */}
            <PurchaseModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                service={service}
                user={user}
            />
        </Container>
    );
};

export default ServiceDetailsPage;
