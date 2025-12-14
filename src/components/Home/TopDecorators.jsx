import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Container from "../Shared/Container";

const TopDecorators = () => {
    const { data: decorators = [], isLoading } = useQuery({
        queryKey: ["top-decorators"],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/decorators`
            );
            return res.data;
        },
    });

    if (isLoading || decorators.length === 0) return null;

    // duplicate for infinite loop
    const loopData = [...decorators, ...decorators];

    return (
        <section className="py-16 bg-base-100 overflow-hidden">
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl font-bold text-secondary">
                        Top Decorators
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Trusted professionals delivering elegant decoration services
                    </p>
                </motion.div>

                {/* Viewport (shows only 3 cards) */}
                <div className="overflow-hidden">
                    <motion.div
                        className="flex gap-8"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        }}
                    >
                        {loopData.map((decorator, index) => (
                            <div
                                key={index}
                                className="min-w-[220px] md:min-w-[260px] lg:min-w-[320px] bg-base-10 rounded-2xl p-5 md:p-6 lg:p-8 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-3 md:gap-4"
                            >
                                {/* Avatar */}
                                <img
                                    src={decorator.imageURL}
                                    alt={decorator.name}
                                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover ring-4 ring-primary/30"
                                />

                                {/* Name */}
                                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
                                    {decorator.name}
                                </h3>

                                {/* Email */}
                                <p className="text-[11px] md:text-xs text-gray-400 truncate w-full">
                                    {decorator.email}
                                </p>

                                {/* Rating */}
                                <div className="flex gap-1 text-yellow-400 text-sm">
                                    <FaStar /><FaStar /><FaStar /><FaStar />
                                    <FaStar className="text-gray-300" />
                                </div>

                                {/* Divider */}
                                <div className="w-10 h-[2px] bg-primary/30 rounded-full" />

                                {/* Specialty */}
                                <p className="text-xs md:text-sm text-gray-600">
                                    Wedding • Home • Event Decoration
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

export default TopDecorators;
