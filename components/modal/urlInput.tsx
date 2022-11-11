import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Modal from ".";
import { instagramUrlChecker, instagramUrlParser } from "../../lib/instagram";
import styles from "../../styles/components/modal/urlInput.module.css";
import { useForm } from "react-hook-form";

interface Props {
  handleClose: () => void;
}

type formValue = {
  url: string;
};

const UrlInput: FC<Props> = ({ handleClose }) => {
  const router = useRouter();
  const { register, handleSubmit, setFocus } = useForm<formValue>();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setFocus("url");
  }, [setFocus]);

  const submit = (value: formValue) => {
    if (!instagramUrlChecker(value.url) || clicked) return;

    setClicked(true);
    const id = instagramUrlParser(value.url);

    router.replace(`post/${id}`);
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

        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <label htmlFor="url">Paste instagrm url</label>
          <div className={styles.form_container}>
            <input
              id="url"
              autoComplete="off"
              placeholder="e.g. https://www.instagram.com/p/CZx2UHehfZs/"
              {...register("url", { required: true })}
            />

            <button type="submit">
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        </form>
      </>
    </Modal>
  );
};

export default UrlInput;
