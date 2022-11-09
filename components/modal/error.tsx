import { FC } from "react";
import Modal from ".";
import styles from "../../styles/components/modal/error.module.css";
import Link from "next/link";

interface Props {
  handleClose: () => void;
  redirectTo: string;
}

const Error: FC<Props> = ({ handleClose, redirectTo }) => {
  return (
    <Modal handleClose={handleClose}>
      <div className={styles.container}>
        <p className={styles.message}>UH-OH 🙀</p>
        <p className={styles.message}>Something went wrong!</p>

        <div className={styles.action_btns}>
          <Link href={redirectTo} className={styles.btn_outline}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            <span>Try Again</span>
          </Link>

          <a
            href="https://github.com/devyuji/isave/issues/new"
            className={styles.btn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Report an issue</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default Error;
