import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  createRef,
  FC,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from ".";
import { instagramUrlChecker, instagramUrlParser } from "../../lib/instagram";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "../../styles/components/modal/urlInput.module.css";
import ReCAPTCHA from "react-google-recaptcha";

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

interface Props {
  handleClose: () => void;
}

const UrlInput: FC<Props> = ({ handleClose }) => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const [isReset, toggleReset] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const recaptchaRef = useRef<ReCAPTCHA>();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const isInstagramUrl = instagramUrlChecker(value);
    if (isInstagramUrl) {
      const id = instagramUrlParser(value);

      router.replace(`/post/${id}`);
    }

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

  const reset: FormEventHandler<HTMLFormElement> = () => {
    setValue("");
    toggleReset(false);
  };

  return (
    <Modal handleClose={handleClose}>
      <>
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
          <label htmlFor="username">Paste instagrm url</label>
          <div className={styles.form_container}>
            <input
              ref={inputRef}
              value={value}
              id="username"
              name="url"
              type="url"
              onChange={change}
              autoComplete="off"
              required
              placeholder="e.g. https://www.instagram.com/p/CZx2UHehfZs/"
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
      </>
    </Modal>
  );
};

export default UrlInput;
