import { motion } from 'framer-motion';
const FilterChip = ({ label }) => {
    return (
        <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary text-primary text-sm font-medium rounded-full bg-primary/10"
        >
            {label}
        </motion.span>
    );
};

export default FilterChip;
