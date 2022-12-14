"use client";

import { FC, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

const slide: Variants = {
  initial: {
    scale: 0,
    opacity: 0.5,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.7,
    },
  },
};

const hamburgerAnimation: Variants = {
  initial: {
    strokeDasharray: "60 31 60 300",
    strokeDashoffset: 0,
  },
  animate: {
    strokeDasharray: "60 105 60 300",
    strokeDashoffset: -90,
    transition: {
      duration: 0.3,
    },
  },
};

function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isModalOpen]);

  const toggle = () => setModalOpen((prev) => !prev);

  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <Link href="/">isave</Link>
      </div>

      <button
        type="button"
        aria-label="hamburger menu"
        className={styles.menu}
        onClick={toggle}
      >
        <motion.svg
          animate={
            isModalOpen
              ? {
                  rotate: "0.125turn",
                }
              : {
                  rotate: 0,
                }
          }
          stroke="black"
          fill="none"
          viewBox="-10 -10 120 120"
          width="40"
        >
          <motion.path
            variants={hamburgerAnimation}
            initial="initial"
            animate={isModalOpen ? "animate" : "initial"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
          ></motion.path>
        </motion.svg>
      </button>

      <nav className={styles.desktop}>
        <ul className={styles.nav_list}>
          <NavLink />
        </ul>
      </nav>

      <AnimatePresence>
        {isModalOpen && (
          <motion.nav
            variants={slide}
            initial="initial"
            animate="animate"
            exit="initial"
            className={styles.mobile}
          >
            <ul className={styles.nav_list}>
              <NavLink />
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const NavLink: FC = () => {
  return (
    <>
      <li>
        <a href="https://instagram.com/devyuji">
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
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          instagram
        </a>
      </li>
      <li>
        <a href="https://github.com/devyuji">
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
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          github
        </a>
      </li>
    </>
  );
};

export default Navbar;
