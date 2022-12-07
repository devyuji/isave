import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "../../../components/image";
import CardMenu from "../../../components/modal/cardMenu";
import Spinner from "../../../components/spinner";
import { downloadManager } from "../../../lib/download";
import styles from "./card.module.css";
import { Data } from "./page";

interface Props {
  data: Data;
  username: string;
}

function Card({ data, username }: Props) {
  const [isDownloading, setDownloading] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const [menu, setMenu] = useState(false);

  const preview = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_PROXY}?url=${encodeURIComponent(
        data.preview
      )}`,
    [data]
  );

  const download = async () => {
    setDownloading(true);

    await downloadManager(data.download_url);

    setDownloading(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
          <p>{username}</p>

          {data.type === "image" ? (
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
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          ) : (
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
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          )}
        </div>

        <div className={styles.main}>
          <div className={styles.image_container}>
            {!imageLoad && <div className={styles.shimmer}></div>}

            <Image
              style={{ display: imageLoad ? "block" : "none" }}
              src={preview}
              alt=""
              onLoad={() => setImageLoad(true)}
            />
          </div>

          <div className={styles.action_btn}>
            <button
              type="button"
              onClick={isDownloading ? undefined : download}
            >
              {isDownloading ? (
                <Spinner />
              ) : (
                <>
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
                  <span>Download</span>
                </>
              )}
            </button>

            <button type="button" onClick={() => setMenu(true)}>
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
        </div>
      </div>
      <AnimatePresence>
        {menu && <CardMenu handleClose={() => setMenu(false)} data={data} />}
      </AnimatePresence>
    </>
  );
}

export default Card;
