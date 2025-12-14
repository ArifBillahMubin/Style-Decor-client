import { motion } from "framer-motion";
import { FaUsers, FaMoneyBillWave, FaPaintBrush, FaMapMarkedAlt } from "react-icons/fa";
import whyChooseImg from "../../assets/images/why_chose_us.jpg"; 
import Container from "../Shared/Container";

const features = [
    {
        icon: FaUsers,
        title: "Expert Decorators",
        desc: "Verified professionals with years of real-world decoration experience."
    },
    {
        icon: FaPaintBrush,
        title: "Custom Designs",
        desc: "Personalized decoration styles tailored to your event and taste."
    },
    {
        icon: FaMoneyBillWave,
        title: "Transparent Pricing",
        desc: "No hidden costs. Clear and affordable service packages."
    },
    {
        icon: FaMapMarkedAlt,
        title: "Wide Coverage",
        desc: "Decoration services available across multiple districts in Bangladesh."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-base-100">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <img
                            src={whyChooseImg}
                            alt="Why Choose StyleDecor"
                            className="rounded-2xl shadow-xl object-cover w-full h-[420px]"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-black/10" />
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-10"
                        >
                            <h2 className="text-4xl font-bold text-secondary">
                                Why Choose StyleDecor
                            </h2>
                            <p className="text-gray-500 mt-3 max-w-lg">
                                We combine creativity, professionalism, and technology to deliver
                                unforgettable decoration experiences.
                            </p>
                        </motion.div>

                        {/* FEATURE GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="
                    p-6 rounded-xl
                    bg-base-200
                    border border-base-300
                    hover:shadow-lg
                    transition-all
                  "
                                >
                                    <item.icon className="text-primary text-3xl mb-3" />
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default WhyChooseUs;
