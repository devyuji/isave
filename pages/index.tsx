/* eslint-disable @next/next/no-img-element */

import type { NextPage } from "next";
import { AnimatePresence, useCycle } from "framer-motion";

// components
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import UrlInput from "../components/modal/urlInput";

// css
import styles from "../styles/pages/Home.module.css";

interface Props {}

const Home: NextPage<Props> = () => {
  const [isMOdalOpen, toggleModal] = useCycle(false, true);

  const openModal = () => {
    toggleModal();
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
          <button
            type="button"
            className={styles.action_btn}
            onClick={openModal}
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
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Get Started.
          </button>
        </section>
      </main>

      <AnimatePresence>
        {isMOdalOpen && <UrlInput handleClose={() => toggleModal()} />}
      </AnimatePresence>
    </>
  );
};

export default Home;
