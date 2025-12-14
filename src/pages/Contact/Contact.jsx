import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contactHero from "../../assets/images/banner/contact.jpg";
import Container from "../../components/Shared/Container";

const Contact = () => {
    return (
        <>
            {/* HERO SECTION */}
            <section className="relative h-[50vh]">
                <img
                    src={contactHero}
                    alt="Contact StyleDecor"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />

                <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-white max-w-2xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">
                            Contact Us
                        </h1>
                        <p className="text-white/85">
                            We'd love to hear from you. Get in touch with StyleDecor today.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="py-20 bg-base-100">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                        {/* CONTACT FORM */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-base-200 p-8 rounded-2xl border border-base-300"
                        >
                            <h2 className="text-2xl font-bold text-secondary mb-6">
                                Send Us a Message
                            </h2>

                            <form className="space-y-5">
                                <div>
                                    <label className="block mb-1 text-sm text-gray-600">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 rounded-md border border-base-300 bg-base-100 focus:outline-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm text-gray-600">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="w-full px-4 py-3 rounded-md border border-base-300 bg-base-100 focus:outline-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm text-gray-600">
                                        Message
                                    </label>
                                    <textarea
                                        rows="4"
                                        placeholder="Write your message..."
                                        className="w-full px-4 py-3 rounded-md border border-base-300 bg-base-100 focus:outline-primary"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-md bg-primary text-white font-medium hover:bg-secondary transition"
                                >
                                    Send Message
                                </button>
                            </form>
                        </motion.div>

                        {/* CONTACT INFO */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-secondary">
                                Get in Touch
                            </h2>

                            <p className="text-gray-600 max-w-md">
                                Reach out to us for booking inquiries, support, or partnership
                                opportunities.
                            </p>

                            {/* INFO CARDS */}
                            <div className="space-y-4">

                                <div className="flex items-center gap-4 bg-base-200 p-5 rounded-xl border border-base-300">
                                    <FaPhoneAlt className="text-primary text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium text-gray-800">
                                            +880 1XXX-XXXXXX
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-base-200 p-5 rounded-xl border border-base-300">
                                    <FaEnvelope className="text-primary text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium text-gray-800">
                                            support@styledecor.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-base-200 p-5 rounded-xl border border-base-300">
                                    <FaMapMarkerAlt className="text-primary text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium text-gray-800">
                                            Dhaka, Bangladesh
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </motion.div>

                    </div>
                </Container>
            </section>
        </>
    );
};

export default Contact;
