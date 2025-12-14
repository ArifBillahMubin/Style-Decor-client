import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import aboutHero from "../../assets/images/banner/aboutbanner.jpg";
import aboutImg from "../../assets/images/banner/banner2.jpg";
import { FaPaintBrush, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

const About = () => {
    return (
        <>
            {/* HERO SECTION */}
            <section className="relative h-[60vh]">
                <img
                    src={aboutHero}
                    alt="About StyleDecor"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />

                <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-white max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            About StyleDecor
                        </h1>
                        <p className="text-white/85 text-lg">
                            Smart Home & Ceremony Decoration Booking Platform
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ABOUT CONTENT */}
            <section className="py-20 bg-base-100">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                        {/* TEXT */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-secondary mb-4">
                                Who We Are
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                StyleDecor is a modern decoration service platform that connects
                                users with professional decorators for weddings, ceremonies,
                                home decoration, and corporate events.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our goal is to simplify the decoration booking process while
                                maintaining creativity, transparency, and quality service.
                            </p>
                        </motion.div>

                        {/* IMAGE */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src={aboutImg}
                                alt="Decoration Work"
                                className="rounded-2xl shadow-xl"
                            />
                        </motion.div>

                    </div>
                </Container>
            </section>

            {/* MISSION & VISION */}
            <section className="py-20 bg-base-100">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">
                            Our Mission & Vision
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <motion.div
                            whileHover={{ y: -6 }}
                            className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm text-center"
                        >
                            <FaPaintBrush className="text-primary text-4xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2">Creative Excellence</h4>
                            <p className="text-sm text-gray-600">
                                Delivering unique and elegant decoration designs for every event.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -6 }}
                            className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm text-center"
                        >
                            <FaUsers className="text-primary text-4xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2">Trusted Professionals</h4>
                            <p className="text-sm text-gray-600">
                                Verified decorators with real-world experience.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -6 }}
                            className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm text-center"
                        >
                            <FaMapMarkedAlt className="text-primary text-4xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2">Wide Coverage</h4>
                            <p className="text-sm text-gray-600">
                                Services available across multiple districts in Bangladesh.
                            </p>
                        </motion.div>

                    </div>
                </Container>
            </section>
        </>
    );
};

export default About;
