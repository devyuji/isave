import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { AnimatePresence, motion, Variants } from "framer-motion";

// components
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import Footer from "../../components/footer";
import Error from "../../components/modal/error";

// lib
import { instagramUrlChecker, instagramUrlParser } from "../../lib/instagram";

// styles
import styles from "../../styles/pages/post.module.css";

//redux
import { DataProps, RESET, SET_DATA } from "../../redux/reducers/postData";
import { useAppDispatch } from "../../redux/hooks";

interface PostProps {
  data: DataProps[];
  error: boolean;
}

const Post: NextPage<PostProps> = ({ data, error }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isReset, toggleReset] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error) dispatch(SET_DATA(data));

    return () => {
      dispatch(RESET());
    };
  }, [data, error, dispatch]);

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

  if (error) {
    return <Error handleClose={() => null} redirectTo="/" />;
  }

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

          <Card />

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
  const DATA: DataProps[] = [];
  try {
    const { data } = await axios.post(`${process.env.API_URL}/post`, {
      id,
    });

    if (data.type === "slide") {
      data.links.forEach((element: any) => {
        if (element.type === "image") {
          DATA.push({
            downloadLink: element.image_url,
            preview: element.image_src,
            isDownloading: false,
          });
        } else {
          DATA.push({
            downloadLink: element.video,
            preview: element.image_src,
            isDownloading: false,
          });
        }
      });
    } else if (data.type === "image") {
      DATA.push({
        downloadLink: data.image_url,
        preview: data.image_src,
        isDownloading: false,
      });
    } else {
      DATA.push({
        downloadLink: data.video,
        preview: data.image_src,
        isDownloading: false,
      });
    }

    return {
      props: {
        error: false,
        data: DATA,
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
