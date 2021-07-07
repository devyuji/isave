import { FC, useState } from "react";
import styles from "../styles/components/navbar.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

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
          <a href="https://github.com/devyuji">github</a>
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

      {isOpen && (
        <ul className={styles.nav_link_mobile}>
          <NavLink />
        </ul>
      )}
    </header>
  );
};

export default Navbar;
