import { motion, Variants } from "framer-motion";
import { FC } from "react";
import Backdrop from "./backdrop";
import styles from "../../styles/components/model/index.module.css";

interface ModelProps {
  handleClose: () => void;
}

const Model: FC<ModelProps> = ({ handleClose, children }) => {
  const scaleUp: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
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

export default Model;
