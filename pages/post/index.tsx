import { FC, FormEvent, useState } from "react";
import styles from "../../styles/pages/postHome.module.css";
import { useRouter } from "next/router";

// components
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Error from "../../components/model/error";

// lib
import { instagramUrlChecker } from "../../lib/instagramUrlCheck";
import { instagram_url_parser } from "../../lib/instagram_id";

const PostHome: FC = () => {
  const router = useRouter();
  const { query } = router;

  const [value, setValue] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isInstagramUrl = instagramUrlChecker(value);
    if (isInstagramUrl) {
      const id = instagram_url_parser(value);
      router.replace(`/post/${id}`);
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>
          {query.error ? (
            <Error redirectTo="/" handleClose={() => null} />
          ) : (
            <form onSubmit={submit} className={styles.form}>
              <input
                type="url"
                placeholder="e.g. https://www.instagram.com/p/CNIKAmJAiLa/"
                onChange={(text) => setValue(text.target.value)}
                required={true}
                value={value}
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PostHome;
