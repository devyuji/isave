import { motion, Variants } from "framer-motion";
import { FC } from "react";
import Modal from ".";
import styles from "../../styles/components/modal/loading.module.css";
import Backdrop from "./backdrop";

const Loading: FC = () => {
  const animation: Variants = {
    initial: {
      y: -20,
    },
    visible: {
      y: 0,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <Backdrop onClick={() => null}>
      <section className={styles.container}>
        <motion.div
          className={styles.circle}
          variants={animation}
          initial="initial"
          animate="visible"
          exit="exit"
        />
        <h1>loading...</h1>
      </section>
    </Backdrop>
  );
};

export default Loading;
