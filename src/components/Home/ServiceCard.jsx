import { motion } from "framer-motion";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        bg-white rounded-xl overflow-hidden
        border border-gray-200 shadow-md hover:shadow-xl 
        transition-all duration-300
        flex flex-col
        h-[380px]    /* FIXED HEIGHT HERE */
      "
    >
      <div className="h-44 w-full overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.service_name}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* CONTENT AREA */}
      <div className="p-4 flex flex-col flex-1 justify-between">

        {/* TOP CONTENT */}
        <div className="space-y-1.5 overflow-hidden">
          <h3 className="text-[17px] font-semibold text-gray-800 leading-snug line-clamp-2">
            {service.service_name}
          </h3>

          <p className="text-gray-500 capitalize text-sm">
            {service.category}
          </p>

          <p className="text-primary font-bold text-[17px] pt-1">
            {service.cost} BDT
            <span className="text-gray-500 font-normal text-sm"> / {service.unit}</span>
          </p>
        </div>

        {/* BUTTON ALWAYS AT BOTTOM */}
        <Link
          to={`/services/${service._id}`}
          className="
            block w-full mt-4 py-2.5 text-center 
            bg-primary text-white rounded-lg 
            hover:bg-secondary transition-all duration-200
            text-sm font-medium tracking-wide
          "
        >
          View Details
        </Link>

      </div>
    </motion.div>
  );
};

export default ServiceCard;
