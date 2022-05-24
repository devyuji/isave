import { motion } from "framer-motion";
import { FC, ReactNode, useEffect } from "react";
import styles from "../../styles/components/modal/backdrop.module.css";

interface BackdropProp {
  onClick: () => void;
  children: ReactNode;
}

const Backdrop: FC<BackdropProp> = ({ children, onClick }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClick();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClick]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
