import { FC, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// lib
import { instagram_url_parser } from "../lib/instagram_id";
import { instagramUrlChecker } from "../lib/instagramUrlCheck";

// styles
import styles from "../styles/pages/Home.module.css";

const Home: FC = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
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

        <p className={styles.highlight}>
          <span>
            <Link href="/preview">
              <a>*preview</a>
            </Link>
            {"  "}
          </span>
          your instagram.
        </p>
      </main>

      <Footer />
    </>
  );
};

export default Home;
