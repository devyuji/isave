import { FC, FormEvent, useState } from "react";
import styles from "../../styles/components/model/usernameInput.module.css";
import router from "next/router";
import Model from ".";

interface UsernameInputProps {
  handleClose: () => void;
}

const UsernameInput: FC<UsernameInputProps> = ({ handleClose }) => {
  const [value, setValue] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/preview/${value}`);

    handleClose();
  };

  return (
    <Model handleClose={handleClose}>
      <div className={styles.close_container}>
        <button className={styles.close} onClick={handleClose}>
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <form onSubmit={submit} className={styles.form}>
        <label htmlFor="username">Enter your instagram username</label>
        <input
          value={value}
          id="username"
          name="username"
          type="text"
          onChange={(text) => setValue(text.target.value)}
          autoComplete="off"
          required
        />
        <p>Note : only public account</p>
        <button type="submit">submit</button>
      </form>
    </Model>
  );
};

export default UsernameInput;
