"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

interface Props {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reload = () => {
    reset();
    window.location.reload();
  };

  return (
    <main className={styles.container}>
      <div className={styles.box}>
        <h1>Oops!</h1>
        <p>
          Please retry in a few seconds. {"We'll"} be back up and running in no
          time. If the problem persists, please report it to a developer on
          GitHub.
        </p>

        <div className={styles.action}>
          <button
            type="button"
            onClick={reload}
            className={styles.action_button}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            Retry
          </button>
          <a
            href="https://github.com/devyuji/isave/issues/new"
            className={styles.action_button}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Report a bug.
          </a>
        </div>
      </div>
    </main>
  );
}

export default Error;
