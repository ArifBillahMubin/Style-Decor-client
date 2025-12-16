import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    FaStar,
    FaMapMarkerAlt,
    FaClock,
    FaBriefcase
} from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "../Shared/Container";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25
        }
    }
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.97
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

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

    const featuredDecorators = decorators.slice(0, 2);

    return (
        <section className="py-28 bg-base-100">
            <Container>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl font-bold text-secondary">
                        Top Decorators
                    </h2>
                    <p className="mt-4 text-base-content/60 text-lg">
                        Trusted professionals delivering premium decoration experiences
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-14"
                >
                    {featuredDecorators.map((decorator, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -6,
                                transition: { duration: 0.3 }
                            }}
                            className="
                                relative rounded-3xl p-10
                                bg-base-200/70 backdrop-blur
                                border-l-8 border-primary
                                shadow-lg hover:shadow-2xl
                                transition-shadow duration-300
                            "
                        >
                            {/* Top Row */}
                            <div className="flex items-center gap-6">
                                {/* Avatar */}
                                <img
                                    src={decorator.imageURL}
                                    alt={decorator.name}
                                    className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/30"
                                />

                                {/* Name + Rating */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-semibold text-base-content">
                                        {decorator.name}
                                    </h3>
                                    <p className="text-sm text-base-content/60">
                                        Wedding & Event Decorator
                                    </p>

                                    <div className="flex items-center gap-1 text-yellow-400 mt-1 text-sm">
                                        <FaStar /><FaStar /><FaStar /><FaStar />
                                        <FaStar className="text-base-300" />
                                        <span className="ml-2 text-base-content/60">
                                            4.8
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Meta Row */}
                            <div className="flex flex-wrap gap-8 mt-6 text-sm text-base-content/70">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-primary" />
                                    Dhaka
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-primary" />
                                    Fast Response
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaBriefcase className="text-primary" />
                                    6+ Years
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-8">
                                <div className="rounded-2xl bg-primary/10 p-4 text-center">
                                    <p className="text-2xl font-bold text-primary">150+</p>
                                    <p className="text-xs text-base-content/60">
                                        Projects
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-secondary/10 p-4 text-center">
                                    <p className="text-2xl font-bold text-secondary">6 yrs</p>
                                    <p className="text-xs text-base-content/60">
                                        Experience
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-accent/10 p-4 text-center">
                                    <p className="text-2xl font-bold text-accent">৳25k</p>
                                    <p className="text-xs text-base-content/60">
                                        Starting
                                    </p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mt-8">
                                <span className="px-4 py-1.5 rounded-full text-sm bg-primary/10 text-primary">
                                    Wedding
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-sm bg-secondary/10 text-secondary">
                                    Event
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-sm bg-accent/10 text-accent">
                                    Home Decor
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </Container>
        </section>
    );
};

export default TopDecorators;
