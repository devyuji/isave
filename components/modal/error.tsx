import { FC } from "react";
import Modal from ".";
import styles from "../../styles/components/modal/error.module.css";
import Link from "next/link";

interface ErrorProps {
  handleClose: () => void;
  redirectTo: string;
}

const Error: FC<ErrorProps> = ({ handleClose, redirectTo }) => {
  return (
    <Modal handleClose={handleClose}>
      <div className={styles.container}>
        <p className={styles.message}>Something went wrong!</p>

        <Link href={redirectTo}>
          <a className={styles.btn}>Try Again</a>
        </Link>
      </div>
    </Modal>
  );
};

export default Error;
