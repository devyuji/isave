import { FC } from "react";
import styles from "../styles/components/loading.module.css";
import { motion } from "framer-motion";

const Loading: FC = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <div className={styles.box}>
        <motion.span
          initial={{ y: 12, opacity: 1 }}
          animate={{ y: -12 }}
          transition={{
            duration: 1,
            type: "spring",
            damping: 10,
            stiffness: 100,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className={styles.circle}
        />
        <motion.span
          initial={{ y: 12, opacity: 1 }}
          animate={{ y: -12 }}
          transition={{
            duration: 1,
            type: "spring",
            damping: 10,
            stiffness: 100,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5,
          }}
          className={styles.circle}
        />
        <motion.span
          initial={{ y: 12, opacity: 1 }}
          animate={{ y: -12 }}
          transition={{
            duration: 1,
            type: "spring",
            damping: 10,
            stiffness: 100,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
          }}
          className={styles.circle}
        />
      </div>
    </motion.div>
  );
};

export default Loading;
