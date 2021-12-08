import { FC } from "react";
import styles from "../styles/components/header.module.css";

interface HeaderProps {
  handleOpenUsername: () => void;
  handleOpenImage: () => void;
}

const Header: FC<HeaderProps> = ({ handleOpenUsername, handleOpenImage }) => {
  return (
    <section className={styles.header_container}>
      <button className={styles.btn} onClick={handleOpenImage}>
        {/* upload images */}
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </button>

      {/* enter username */}
      <button className={styles.btn} onClick={handleOpenUsername}>
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </button>
    </section>
  );
};

export default Header;
