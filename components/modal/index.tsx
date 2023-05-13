import { motion, Variants } from "framer-motion";
import { FC, ReactNode } from "react";
import Backdrop from "./backdrop";

interface ModalProps {
  handleClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ handleClose, children }) => {
  const scaleUp: Variants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
    },
    exit: {
      scale: 0,
    },
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-200 p-4 rounded-lg w-1/2 lg:w-96"
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
