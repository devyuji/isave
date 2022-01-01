/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import Head from "next/head";
import { AnimatePresence, useCycle } from "framer-motion";

// styles
import styles from "../../styles/pages/preview.module.css";

// components
import Navbar from "../../components/navbar";
import UsernameInput from "../../components/model/usernameInput";
import Footer from "../../components/footer";

const Preview: FC = () => {
  const [isModelOpen, toggleOpen] = useCycle(false, true);

  const toggleModel = () => toggleOpen();

  return (
    <>
      <Head>
        <title>isave - plan out your instagram</title>
      </Head>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.image_container}>
          <img src="images/logo.svg" alt="logo" />
        </div>
        <h1 className={styles.tagline}>Introducing Preview (beta).</h1>
        <p className={styles.tagline_description}>
          Plan your instagram profile before posting online.
        </p>
        <button className={styles.btn} onClick={toggleModel}>
          Get Started.
        </button>

        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {isModelOpen && <UsernameInput handleClose={toggleModel} />}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
};

export default Preview;
