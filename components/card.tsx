import { FC } from "react";
import styles from "../styles/components/card.module.css";
import { downloadManager } from "../lib/download";
import ImageNext from "next/image";
import { motion } from "framer-motion";
import Spinner from "./spinner";
import { IS_DOWNLOADING } from "../redux/reducers/postData";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface CardProps {}

const Card: FC<CardProps> = () => {
  const data = useAppSelector((state) => state.POST_DATA);
  const dispatch = useAppDispatch();

  const download = async (index: number) => {
    if (data[index].isDownloading) return;

    dispatch(IS_DOWNLOADING({ index, isDownloading: true }));

    await downloadManager(data[index].downloadLink);

    dispatch(IS_DOWNLOADING({ index, isDownloading: false }));
  };

  return (
    <div className={styles.cardContainer}>
      {data.map((d, index: number) => (
        <div className={styles.card} key={index} tabIndex={index}>
          <ImageNext
            src={`data:image/png;base64,${d.preview}`}
            alt=""
            width="200"
            height="200"
            layout="responsive"
          />
          <div className={styles.download}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => download(index)}
            >
              {d.isDownloading ? (
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
      ))}
    </div>
  );
};

export default Card;
