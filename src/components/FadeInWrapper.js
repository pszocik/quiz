import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

const FadeInWrapper = ({ children, className }) => {
  return (
    <motion.section
      className={className}
      key={uuidv4()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.section>
  );
};

export default FadeInWrapper;
