import { motion } from "framer-motion";
import { Link } from "react-router";

const ServiceCard = ({ service}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="
        bg-white rounded-2xl overflow-hidden shadow-lg 
        border border-base-300 hover:shadow-2xl 
        transition-all duration-300
      "
    >
      <div className="h-48 w-full overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.service_name}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold">{service.service_name}</h3>
        <p className="text-gray-500 capitalize">{service.category}</p>

        <p className="text-primary font-bold mt-2">
          {service.cost} BDT{" "}
          <span className="text-gray-500 text-sm">({service.unit})</span>
        </p>

        <Link
          to={`/services/${service._id}`}
          className="
            block mt-4 w-full py-2 text-center bg-primary text-white 
            rounded-lg hover:bg-secondary transition
          "
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
