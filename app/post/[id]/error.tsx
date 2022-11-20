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

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Oops!</h1>
        <p>
          Please retry in a few seconds. {"We'll"} be back up and running in no
          time. If the problem persists, please report it to a developer on
          GitHub.
        </p>

        <a
          href="https://github.com/devyuji/isave/issues/new"
          className={styles.action_button}
        >
          <span>
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
          </span>
          Report a bug.
        </a>
      </div>
    </div>
  );
}

export default Error;
