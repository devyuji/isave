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

      <main className={styles.mainContainer}>
        <section className={styles.container}>
          <div>
            <p>Plan out your instagram</p>
            <button className={styles.action} onClick={toggleModel}>
              click to get started
            </button>
          </div>

          <div className={styles.image}>
            <img src="/images/preview.png" alt="preview" />
          </div>
        </section>

        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {isModelOpen && <UsernameInput handleClose={toggleModel} />}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
};

export default Preview;
