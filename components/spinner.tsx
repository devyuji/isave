"use client";

import { FC } from "react";
import { motion } from "framer-motion";

const Spinner: FC = () => {
  return (
    <div style={{ height: "1rem", width: "1rem" }}>
      <motion.span
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
        }}
        style={{
          display: "block",
          border: "2px solid transparent",
          borderTopColor: "black",
          borderRadius: "100%",
          width: "100%",
          height: "100%",
        }}
      ></motion.span>
    </div>
  );
};

export default Spinner;
