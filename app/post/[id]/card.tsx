import { useState } from "react";
import Image from "../../../components/image";
import Spinner from "../../../components/spinner";
import { downloadManager } from "../../../lib/download";
import styles from "./card.module.css";

interface Props {
  data: any;
  username: string;
}

function Card({ data, username }: Props) {
  const [isDownloading, setDownloading] = useState(false);

  const download = async () => {
    if (isDownloading) return;

    setDownloading(true);

    if (data.type === "image") {
      await downloadManager(data.image_src, true);
    } else {
      await downloadManager(data.download_url);
    }

    setDownloading(false);
  };

  return (
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
          <Image src={`data:image/png;base64,${data.image_src}`} alt="" />
        </div>

        <button type="button" onClick={download}>
          {isDownloading ? (
            <Spinner />
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Card;
