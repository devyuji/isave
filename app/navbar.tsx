"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { motion, AnimatePresence, Variants } from "framer-motion";

const links = [
  {
    label: "downloader",
    url: "/",
  },
  {
    label: "profile",
    url: "/profile",
  },
  {
    label: "preview",
    url: "/preview",
  },
  {
    label: "github",
    url: "https://github.com/devyuji/isave",
  },
];

const slideUp: Variants = {
  down: {
    y: "100%",
    opacity: 0,
  },
  up: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duaration: 250,
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

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <h1>isave</h1>
      </div>

      <button type="button" className={styles.menu} onClick={open}>
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
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <nav className={styles.desktop}>
        <ul className={styles.nav_list}>
          {links.map((link, index) => (
            <li key={`${index}-${link.label}`}>
              <Link href={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {isModalOpen && (
          <motion.nav
            variants={slideUp}
            initial="down"
            animate="up"
            exit="down"
            className={styles.mobile}
          >
            <button type="button" className={styles.close} onClick={close}>
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <ul className={styles.nav_list}>
              {links.map((link, index) => (
                <li key={`${index}-${link.label}`}>
                  <Link href={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
