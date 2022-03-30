import { motion, Variants } from "framer-motion";
import { FC } from "react";
import Backdrop from "./backdrop";
import styles from "../../styles/components/modal/index.module.css";

interface ModalProps {
  handleClose: () => void;
}

const Modal: FC<ModalProps> = ({ handleClose, children }) => {
  const scaleUp: Variants = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: 0,
    },
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
        className={styles.container}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
