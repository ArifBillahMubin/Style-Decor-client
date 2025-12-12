import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
                sessionId,
            });
        }
    }, [sessionId]);

    return (
        <Container>
            <div className="min-h-screen flex items-center justify-center py-20">

                {/* CARD */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center border border-base-300"
                >
                    {/* SUCCESS ICON */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                        className="flex justify-center mb-6"
                    >
                        <IoBagCheckOutline className="w-20 h-20 text-primary" />
                    </motion.div>

                    {/* TITLE */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Payment Successful!
                    </h1>

                    <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                        Thank you for booking with <span className="text-secondary font-semibold">StyleDecor</span>.
                        Your order is being processed and you will receive an email confirmation shortly.
                    </p>

                    {/* BUTTON */}
                    <Link
                        to="/dashboard/my-bookings"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-white bg-primary hover:bg-secondary transition-all text-lg font-medium shadow-md">
                        View My Bookings
                    </Link>
                </motion.div>
            </div>
        </Container>
    );
};

export default PaymentSuccess;
