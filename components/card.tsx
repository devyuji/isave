import { FC } from "react";
import styles from "../styles/components/card.module.css";

interface CardProps {
  data: any;
}

const download = (url: string) => {
  window.location.href = `${url}&dl=1`;
};

const Card: FC<CardProps> = ({ data }) => {
  if (data.type === "slide") {
    return (
      <div className={styles.cardContainer}>
        {data.links.map((d: any, index: number) => (
          <div className={styles.card} key={index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/png;base64,${d.image_src}`} alt="" />
            <div className={styles.download}>
              <button
                type="button"
                onClick={() =>
                  d.type == "video" ? download(d.video) : download(d.image_url)
                }
              >
                download
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${data.image_src}`} alt="" />
          <div className={styles.download}>
            <button
              type="button"
              onClick={() =>
                data.type == "video"
                  ? download(data.video)
                  : download(data.image_url)
              }
            >
              download
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
