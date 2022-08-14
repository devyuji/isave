import { motion, Variants } from "framer-motion";
import { FC, ReactNode } from "react";
import Backdrop from "./backdrop";
import styles from "../../styles/components/modal/index.module.css";

interface ModalProps {
  handleClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ handleClose, children }) => {
  const scaleUp: Variants = {
    hidden: {
      scale: 2,
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
        className={styles.container}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
