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
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
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
