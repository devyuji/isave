import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/pages/Home.module.css";
import { useRouter } from "next/router";

// components
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// lib
import { instagram_url_parser } from "../lib/instagram_id";
import { instagramUrlChecker } from "../lib/instagramUrlCheck";

const Home: FC = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const submit = async (e: any) => {
    e.preventDefault();
    const isInstagramUrl = instagramUrlChecker(value);
    if (isInstagramUrl) {
      const id = instagram_url_parser(value);
      router.push(`/post/${id}`);
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>Download instagram images, video, and reels in one place</h1>
        </div>

        <form onSubmit={submit} className={styles.form}>
          <input
            type="url"
            placeholder="e.g. https://www.instagram.com/p/CNIKAmJAiLa/"
            onChange={(text) => setValue(text.target.value)}
            required={true}
            value={value}
          />
          <button>Submit</button>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Home;
