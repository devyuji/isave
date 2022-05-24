import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useCycle, Variants } from "framer-motion";
import router from "next/router";

// styles
import styles from "../styles/components/navbar.module.css";

interface Props {
  sticky?: boolean;
}

const Navbar: FC<Props> = ({ sticky = true }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  useEffect(() => {
    if (sticky) {
      window.addEventListener("scroll", onScroll);
    }

    () => window.removeEventListener("scroll", onScroll);
  }, [sticky]);

  const onScroll = () => {
    if (window.scrollY > 0) {
      setBackgroundColor("#ECEFF1");
    } else {
      setBackgroundColor("#ffffff");
    }
  };

  const popup: Variants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "backInOut",
      },
    },
  };

  return (
    <header
      className={styles.navbar}
      style={{
        backgroundColor,
        position: sticky ? "sticky" : "relative",
        top: 0,
      }}
    >
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

      <AnimatePresence>
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
          <a>preview</a>
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

export default Navbar;
