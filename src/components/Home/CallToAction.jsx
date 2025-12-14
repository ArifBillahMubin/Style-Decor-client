import { motion } from "framer-motion";
import { Link } from "react-router";
import Container from "../Shared/Container";
import ctaBg from "../../assets/images/banner/banner3.jpg";

const CallToAction = () => {
    return (
        <section className="py-20 bg-base-100">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="
            relative
            rounded-3xl
            overflow-hidden
            shadow-2xl
            border border-base-300
          "
                >
                    {/* Background Image */}
                    <img
                        src={ctaBg}
                        alt="Decoration Service"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/55" />

                    {/* Content */}
                    <div className="relative z-10 p-10 md:p-16 text-center text-white">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Ready to Decorate Your Dream Event?
                        </h2>

                        <p className="text-white/80 max-w-2xl mx-auto mb-8">
                            Book professional decoration services for weddings, ceremonies,
                            home events, and corporate programs — all in one platform.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/services"
                                className="
                  px-8 py-3 rounded-full
                  bg-primary text-white
                  font-semibold
                  hover:bg-secondary
                  transition
                "
                            >
                                Book Decoration Service
                            </Link>

                            <Link
                                to="/contact"
                                className="
                  px-8 py-3 rounded-full
                  border border-white/40
                  text-white
                  hover:bg-white/10
                  transition
                "
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default CallToAction;
