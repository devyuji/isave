"use client";

import { motion, Variants } from "framer-motion";

const styles = {
  span: {
    display: "block",
    backgroundColor: "var(--primary-clr)",
    borderRadius: "100%",
    height: "2rem",
    width: "2rem",
  },
  container: {
    width: "100%",
    height: "calc(100vh - 5rem)",
    display: "grid",
    placeItems: "center",
  },
  box: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
};

const wave: Variants = {
  animate: {
    y: [-20, 20],
  },
};

function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            variants={wave}
            animate="animate"
            transition={{
              duration: 0.9,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: d * 0.3,
            }}
            style={styles.span}
          />
        ))}
      </div>
    </div>
  );
}

export default Loading;
