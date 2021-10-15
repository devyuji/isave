import { FC, useState } from "react";
import styles from "../styles/components/navbar.module.css";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const Navbar: FC = () => {
  const [isOpen, setOpen] = useState(false);

  const NavLink: FC = () => {
    return (
      <>
        <li>
          <Link href="/">
            <a>home</a>
          </Link>
        </li>
        <li>
          <a
            href="https://github.com/devyuji/isave"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </li>
        <li>
          <Link href="/how-to-use">
            <a>how-to-use</a>
          </Link>
        </li>
      </>
    );
  };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "90%" },
  };

  return (
    <header className={styles.navbar}>
      {/* title */}
      <div>
        <h1 className={styles.title}>isave</h1>
      </div>

      <div className={styles.hamburger_menu} onClick={() => setOpen(!isOpen)}>
        <svg
          viewBox="0 0 24 24"
          className="icon"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>

      <ul className={styles.nav_link}>
        <NavLink />
      </ul>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0 }}
            className={styles.nav_link_mobile}
          >
            <NavLink />
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
