import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Container from "../Shared/Container";

// Static testimonial data
const testimonials = [
    {
        name: "Sarah Ahmed",
        role: "Wedding Decoration",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        review:
            "StyleDecor made our wedding unforgettable. Elegant design, professional team, and perfect execution.",
    },
    {
        name: "Tanvir Rahman",
        role: "Home Decoration",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        review:
            "Very professional service with great attention to detail. Everything was smooth and on time.",
    },
    {
        name: "Nusrat Jahan",
        role: "Birthday Event",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        review:
            "Beautiful decoration and friendly staff. Highly recommended for any kind of event.",
    },
];

const CustomerTestimonials = () => {
    return (
        <section className="py-20 bg-base-100">
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl font-bold text-secondary">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Real experiences from clients who trusted StyleDecor
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="
                bg-base-100
                rounded-2xl
                p-6
                border border-base-300
                shadow-sm
                hover:shadow-lg
                transition-all
                text-center
                flex flex-col gap-4
              "
                        >
                            {/* Avatar */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="
                  w-16 h-16 md:w-20 md:h-20
                  rounded-full
                  object-cover
                  mx-auto
                  ring-4 ring-primary/20
                "
                            />

                            {/* Rating */}
                            <div className="flex justify-center gap-1 text-yellow-400">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>

                            {/* Review */}
                            <p className="text-sm text-gray-600 leading-relaxed">
                                “{item.review}”
                            </p>

                            {/* Divider */}
                            <div className="w-10 h-[2px] bg-primary/30 mx-auto rounded-full" />

                            {/* Name & Role */}
                            <div>
                                <h4 className="font-semibold text-gray-800">
                                    {item.name}
                                </h4>
                                <p className="text-xs text-gray-400">
                                    {item.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default CustomerTestimonials;
