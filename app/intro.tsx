"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import Image from "../components/image";
import HowToGetUrl from "../components/modal/howToGetUrl";
import { instagramUrlChecker, instagramUrlParser } from "../lib/instagram";
import styles from "./intro.module.css";

type formValue = {
  url: string;
};

function Intro() {
  const { register, handleSubmit, setFocus } = useForm<formValue>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFocus("url");
  }, [setFocus]);

  const submit = (value: formValue) => {
    if (!instagramUrlChecker(value.url) || clicked) return;

    setClicked(true);

    const id = instagramUrlParser(value.url);

    router.push(`/post/${id}`);
  };

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.box}>
          <h1>Instagram media downloader! 🤩</h1>

          <h3>
            Copy and paste the URL of the Instagram videos, photos, reels, or
            IGTV link you wish to download.
          </h3>

          <form onSubmit={handleSubmit(submit)} className={styles.form}>
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
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>

            <input
              placeholder="paste link here"
              autoComplete="off"
              type="url"
              {...register("url", { required: true })}
            />
            <button type="submit">
              <span className={styles.mobile}>
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
              </span>
              <span className={styles.desktop}>Download</span>
            </button>
          </form>

          <div className={styles.helper}>
            <button type="button" onClick={open}>
              how to get url?
            </button>
          </div>
        </div>

        <div className="cover">
          <Image src="/images/landing_page_cover.png" alt="" />
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && <HowToGetUrl onClick={close} />}
      </AnimatePresence>
    </>
  );
}

export default Intro;
