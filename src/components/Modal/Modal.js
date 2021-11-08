import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop.js";
import Button from "../Button/Button.js";
import "./Modal.css";

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "string",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: { y: "100vh", opacity: 0 },
};

const Modal = ({ handleClose, text }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal orange-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{text}</p>
        <Button onClick={handleClose}>Close</Button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
