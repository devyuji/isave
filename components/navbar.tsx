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
          <a href="https://github.com/devyuji/isave-nextjs">github</a>
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
        <span style={{ marginBottom: "4px" }}></span>
        <span style={{ marginBottom: "4px" }}></span>
        <span></span>
      </div>

      <ul className={styles.nav_link}>
        <NavLink />
      </ul>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [1.2, 1] }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
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
