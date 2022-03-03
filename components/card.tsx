import { FC } from "react";
import styles from "../styles/components/card.module.css";
import Image from "next/image";
import axios from "axios";

interface CardProps {
  data: any;
}

export const download = async (url: string) => {
  let fileName = "";

  try {
    const { data } = await axios.get(url, { responseType: "blob" });

    if (data.type == "image/jpeg") fileName = "isave-download.jpg";
    else fileName = "isave-download.mp4";

    const blobUrl = window.URL.createObjectURL(new Blob([data]));

    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    document.body.removeChild(link);
  } catch (err) {
    console.error(err);
  }
};

const Card: FC<CardProps> = ({ data }) => {
  if (data.type === "slide") {
    return (
      <div className={styles.cardContainer}>
        {data.links.map((d: any, index: number) => (
          <div className={styles.card} key={index} tabIndex={index}>
            <Image
              src={`data:image/png;base64,${d.image_src}`}
              alt=""
              width="200"
              height="200"
              layout="responsive"
            />
            <div className={styles.download}>
              <button
                type="button"
                onClick={() =>
                  d.type == "video" ? download(d.video) : download(d.image_url)
                }
              >
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
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.card} tabIndex={0}>
          <Image
            src={`data:image/png;base64,${data.image_src}`}
            alt=""
            width="200"
            height="200"
            layout="responsive"
          />
          <div className={styles.download}>
            <button
              type="button"
              onClick={() =>
                data.type == "video"
                  ? download(data.video)
                  : download(data.image_url)
              }
            >
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
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
