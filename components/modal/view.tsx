import { FC } from "react";
import Backdrop from "./backdrop";
import styles from "../../styles/components/modal/view.module.css";
import Image from "../image";

interface Props {
  handleClose: () => void;
  url: string;
  isVideo: boolean;
}

const View: FC<Props> = ({ handleClose, url, isVideo }) => {
  return (
    <Backdrop onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()} className={styles.container}>
        {isVideo ? (
          <video
            className={styles.video}
            src={url}
            autoPlay={true}
            controls={true}
          />
        ) : (
          <Image
            src={`data:image/png;base64,${url}`}
            alt=""
            className={styles.image}
          />
        )}

        <button className={styles.close} type="button" onClick={handleClose}>
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
        </button>
      </div>
    </Backdrop>
  );
};

export default View;
