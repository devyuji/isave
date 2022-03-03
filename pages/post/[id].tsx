import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";

// components
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import Footer from "../../components/footer";

// lib
import { instagramUrlChecker, instagramUrlParser } from "../../lib/instagram";

// styles
import styles from "../../styles/pages/post.module.css";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface PostProps {
  data: any;
}

const Post: FC<PostProps> = ({ data }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isReset, toggleReset] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [borderRadius, setBorderRadius] = useState("64px");

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isInstagramUrl = instagramUrlChecker(value);

    if (isInstagramUrl) {
      const postId = instagramUrlParser(value);

      const { id } = router.query;

      if (postId == id) return;

      router.replace(`/post/${postId}`);
    }
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

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const text = e.target.value;
    if (text.length > 0) {
      toggleReset! && toggleReset(true);
    } else {
      toggleReset(false);
    }
    setValue(text);
  };

  const onReset = () => {
    setValue("");
    toggleReset(false);
    inputRef.current?.focus();
  };

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>
          <form onSubmit={submit} className={styles.form} onReset={onReset}>
            <label htmlFor="url">Paste instagram url</label>
            <div>
              <input
                id="url"
                ref={inputRef}
                type="url"
                placeholder="e.g. https://www.instagram.com/p/CNIKAmJAiLa/"
                onChange={onChange}
                required={true}
                value={value}
                autoComplete="off"
              />
              <AnimatePresence>
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
              </AnimatePresence>
            </div>
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
        error: false,
        data,
      },
    };
  } catch (err) {
    console.error("error");
    return {
      props: {
        error: true,
      },
    };
  }
};

export default Post;
