import { FC } from "react";
import styles from "../styles/components/fab.module.css";
import { motion } from "framer-motion";

// redux
import { useAppDispatch } from "../redux/hooks";
import { TOGGLE } from "../redux/reducers/previewEditing";

const FAB: FC = () => {
  const dispatch = useAppDispatch();

  const click = () => {
    dispatch(TOGGLE());
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={styles.container}
      onClick={click}
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
      </svg>
    </motion.button>
  );
};

export default FAB;
