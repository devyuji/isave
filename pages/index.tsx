/* eslint-disable @next/next/no-img-element */
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { motion, Variants } from "framer-motion";

// components
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { AnimatedComponent } from "../components/AnimatedComponent";

// lib
import { instagramUrlParser, instagramUrlChecker } from "../lib/instagram";

// css
import styles from "../styles/pages/Home.module.css";

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isReset, toggleReset] = useState<boolean>(false);

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const isInstagramUrl = instagramUrlChecker(value);
    if (isInstagramUrl) {
      const id = instagramUrlParser(value);

      router.push(`/post/${id}`);
    }
  };

  const scroll = () => {
    inputRef.current?.focus();
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
    inputRef.current?.focus();
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

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.sections}>
          <div className={styles.logo_container}>
            <img src="images/logo.svg" alt="logo" />
          </div>
          <h1 className={styles.tagline}>Download all the things.</h1>
          <p className={styles.tagline_description}>
            A simple tool to download all media from instagram
          </p>
          <button type="button" className={styles.action_btn} onClick={scroll}>
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
              <polyline points="10 15 15 20 20 15"></polyline>
              <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
            </svg>
            Get Started.
          </button>
        </section>

        <section className={styles.sections}>
          <form className={styles.form} onReset={reset} onSubmit={submit}>
            <label htmlFor="input">Paste instagram url</label>
            <div className={styles.form_container}>
              <input
                ref={inputRef}
                id="input"
                value={value}
                onChange={change}
                type="url"
                required={true}
                autoComplete="off"
                placeholder="e.g. https://www.instagram.com/p/CNIKAmJAiLa/"
              />
              <AnimatedComponent>
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
              </AnimatedComponent>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
