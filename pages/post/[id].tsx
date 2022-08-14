import { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import axios from "axios";
import { AnimatePresence, useCycle } from "framer-motion";

// components
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import Error from "../../components/modal/error";
import UrlInput from "../../components/modal/urlInput";

// lib
import { downloadManager } from "../../lib/download";

// styles
import styles from "../../styles/pages/post.module.css";

//redux
import {
  DataProps,
  IS_DOWNLOADING,
  RESET,
  SET_DATA,
} from "../../redux/reducers/postData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface Props {
  data: DataProps[];
  error: boolean;
}

const Post: NextPage<Props> = ({ data, error }) => {
  const [loading, setLoading] = useState(true);
  const isDownloadingAll = useRef<boolean>(false);

  const [isMOdalOpen, toggleModal] = useCycle(false, true);

  const postData = useAppSelector((data) => data.POST_DATA);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error) {
      dispatch(SET_DATA(data));

      setLoading(false);
    }

    return () => {
      dispatch(RESET());
    };
  }, [data, error, dispatch]);

  const downloadAll = () => {
    if (isDownloadingAll.current) return;

    isDownloadingAll.current = true;

    postData.forEach((element, index) => {
      setTimeout(async () => {
        try {
          if (element.type === "image") {
            dispatch(IS_DOWNLOADING({ index: index, isDownloading: true }));
            await downloadManager(element.preview, true);
            dispatch(IS_DOWNLOADING({ index: index, isDownloading: false }));
          } else {
            dispatch(IS_DOWNLOADING({ index: index, isDownloading: true }));
            await downloadManager(element.downloadLink);
            dispatch(IS_DOWNLOADING({ index: index, isDownloading: false }));
          }
        } catch (err) {
          console.error("error downloading");
        }

        if (postData.length == index + 1) isDownloadingAll.current = false;
      }, 0);
    });
  };

  if (error) return <Error handleClose={() => null} redirectTo="/" />;

  if (loading) return null;

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.another}>
            <button
              type="button"
              className={styles.action_btn}
              onClick={() => toggleModal()}
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Another one
            </button>
            <button
              type="button"
              onClick={downloadAll}
              className={styles.action_btn}
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>

              <span>Download all</span>
            </button>
          </div>

          <div className={styles.card_container}>
            {postData.map((d, indx) => (
              <Card key={`${indx}`} index={indx} data={d} />
            ))}
          </div>

          <div className={styles.info}>
            <p>
              isave is not affiliated with Instagram™. We do not host any
              Instagram content. All rights belong to their respective owners.
            </p>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isMOdalOpen && <UrlInput handleClose={toggleModal} />}
      </AnimatePresence>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;

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
            username: data.username,
            type: "image",
          });
        } else {
          DATA.push({
            downloadLink: element.video,
            preview: element.image_src,
            isDownloading: false,
            username: data.username,
            type: "video",
          });
        }
      });
    } else if (data.type === "image") {
      DATA.push({
        downloadLink: data.image_url,
        preview: data.image_src,
        isDownloading: false,
        username: data.username,
        type: "image",
      });
    } else {
      DATA.push({
        downloadLink: data.video,
        preview: data.image_src,
        isDownloading: false,
        username: data.username,
        type: "video",
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
