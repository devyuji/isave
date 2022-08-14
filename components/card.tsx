import { FC } from "react";
import styles from "../styles/components/card.module.css";
import { downloadManager } from "../lib/download";
import ImageNext from "next/image";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Spinner from "./spinner";
import { DataProps, IS_DOWNLOADING } from "../redux/reducers/postData";
import { useAppDispatch } from "../redux/hooks";
import CardMenu from "./modal/cardMenu";
import Link from "next/link";

interface Props {
  index: number;
  data: DataProps;
}

const Card: FC<Props> = ({ index, data }) => {
  const dispatch = useAppDispatch();

  const [isToggleMenu, toggleMenu] = useCycle(false, true);

  const download = async () => {
    if (data.isDownloading) return;

    dispatch(IS_DOWNLOADING({ index, isDownloading: true }));

    if (data.type === "image") {
      await downloadManager(data.preview, true);
    } else {
      await downloadManager(data.downloadLink);
    }

    dispatch(IS_DOWNLOADING({ index, isDownloading: false }));
  };

  return (
    <>
      <div className={styles.card} tabIndex={0}>
        <div className={styles.info}>
          <Link href={`/preview/${data.username}`}>
            <a>{data.username}</a>
          </Link>

          <button type="button" onClick={() => toggleMenu()}>
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
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
        <ImageNext
          src={`data:image/png;base64,${data.preview}`}
          alt=""
          width="200"
          height="200"
          layout="responsive"
        />
        <div className={styles.download}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={download}
          >
            {data.isDownloading ? (
              <Spinner />
            ) : (
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            )}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isToggleMenu && <CardMenu data={data} handleClose={toggleMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Card;
