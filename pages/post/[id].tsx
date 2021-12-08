import { FC, FormEventHandler, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";

// components
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import Footer from "../../components/footer";

// lib
import { instagram_url_parser } from "../../lib/instagram_id";
import { instagramUrlChecker } from "../../lib/instagramUrlCheck";

// styles
import styles from "../../styles/pages/post.module.css";

interface PostProps {
  data: any;
}

const Post: FC<PostProps> = ({ data }) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
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

          <Card data={data} />
          <div className={styles.info}>
            <p>
              isave is not affiliated with Instagram™. We do not host any
              Instagram content. All rights belong to their respective owners.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params!.id;
  try {
    const { data } = await axios.post(`${process.env.API_URL}/post`, {
      id,
    });
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.error("error");
    return {
      props: {},
      redirect: {
        destination: "/post?error=true",
      },
    };
  }
};

export default Post;
