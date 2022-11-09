import Link from "next/link";
import { FC } from "react";

import styles from "../styles/components/footer.module.css";

const Footer: FC = () => {
  const date = new Date();

  return (
    <footer className={styles.footer}>
      <p>Made with ❤️</p>
      <p>Copyright © {date.getFullYear()} - isave.cc</p>
      <p>
        <span>
          <Link href="/privacy-policy">Privacy policy</Link>
        </span>{" "}
        |{" "}
        <span>
          <a
            href="https://instagram.com/devyuji"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
