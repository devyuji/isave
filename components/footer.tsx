import { FC } from "react";
import styles from "../styles/components/footer.module.css";

const Footer: FC = () => {
  const date = new Date();
  return (
    <footer className={styles.footer}>
      <a href="https://instagram.com/devyuji">instagram</a>
      <p>made by yuji</p>
      <p>{date.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
