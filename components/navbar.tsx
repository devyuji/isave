import { FC } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useCycle, Variants } from "framer-motion";
import router from "next/router";

// styles
import styles from "../styles/components/navbar.module.css";

const Navbar: FC = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const NavLink: FC = () => {
    return (
      <>
        <li>
          <Link href="/">
            <a>home</a>
          </Link>
        </li>

        <li>
          <Link href="/preview">
            <a>preview(beta)</a>
          </Link>
        </li>

        <li>
          <Link href="/how-to-use">
            <a>how-to-use</a>
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
      </>
    );
  };

  const popup: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <header className={styles.navbar}>
      <div onClick={() => router.push("/")}>
        <h1 className={styles.title}>isave</h1>
      </div>

      <div className={styles.hamburger_menu} onClick={() => toggleOpen()}>
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

      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {isOpen && (
          <motion.ul
            variants={popup}
            initial="hidden"
            animate="visible"
            exit="hidden"
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
