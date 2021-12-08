import { FC } from "react";
import styles from "../styles/components/footer.module.css";

const Footer: FC = () => {
  const date = new Date();

  return (
    <footer className={styles.footer}>
      <p>
        made by{" "}
        <span>
          <a
            href="https://instagram.com/devyuji"
            target="_blank"
            rel="noopener noreferrer"
          >
            yuji
          </a>
        </span>{" "}
        - {date.getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
