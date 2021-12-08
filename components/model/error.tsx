import { FC } from "react";
import Model from ".";
import styles from "../../styles/components/model/error.module.css";
import Link from "next/link";

interface ErrorProps {
  handleClose: () => void;
  redirectTo: string;
}

const Error: FC<ErrorProps> = ({ handleClose, redirectTo }) => {
  return (
    <Model handleClose={handleClose}>
      <div className={styles.container}>
        <p className={styles.message}>Something went wrong!</p>
        <p className={styles.message}>
          * Make sure you have enter right username.
        </p>
        <Link href={redirectTo}>
          <a className={styles.btn}>Try Again</a>
        </Link>
      </div>
    </Model>
  );
};

export default Error;
