import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../../styles/components/model/usernameInput.module.css";
import router from "next/router";
import Model from ".";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface UsernameInputProps {
  handleClose: () => void;
}

const UsernameInput: FC<UsernameInputProps> = ({ handleClose }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isReset, toggleReset] = useState<boolean>(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    router.push(`/preview/${value}`);

    handleClose();
  };

  const change: ChangeEventHandler<HTMLInputElement> = (e) => {
    const text = e.target.value;
    if (text.length > 0) {
      toggleReset! && toggleReset(true);
    } else {
      toggleReset(false);
    }
    setValue(text);
  };

  const slitePopup: Variants = {
    end: {
      y: 15,
      opacity: 0,
    },
    start: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "linear",
      },
    },
  };

  const reset = () => {
    setValue("");
    inputRef.current?.focus();
    toggleReset(false);
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
      <form onSubmit={submit} className={styles.form} onReset={reset}>
        <label htmlFor="username">Enter your instagram username</label>
        <div className={styles.form_container}>
          <input
            ref={inputRef}
            value={value}
            id="username"
            name="username"
            type="text"
            onChange={change}
            autoComplete="off"
            required
            placeholder="e.g. devyuji"
          />
          <AnimatePresence>
            {isReset && (
              <motion.button
                variants={slitePopup}
                initial="end"
                animate="start"
                exit="end"
                type="reset"
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <div className={styles.note}>
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
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <p>only public account.</p>
        </div>
      </form>
    </Model>
  );
};

export default UsernameInput;
