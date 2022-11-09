import { FC, useState } from "react";
import styles from "../../styles/components/modal/howToGetUrl.module.css";
import Backdrop from "./backdrop";
import { motion, Variants } from "framer-motion";
import Image from "../image";

interface Props {
  onClick: () => void;
}

const slideUp: Variants = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

const HowToGetUrl: FC<Props> = ({ onClick }) => {
  const [tab, setTab] = useState("web");

  return (
    <Backdrop onClick={onClick}>
      <div className={styles.close}>
        <button type="button" onClick={onClick}>
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
      <motion.div
        variants={slideUp}
        initial="initial"
        animate="animate"
        exit="initial"
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        {/* main content goes here */}
        <div
          className={styles.modal_content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modal_tab}>
            <button
              type="button"
              onClick={() => setTab("web")}
              style={{
                borderBottom: tab == "web" ? "2px solid black" : undefined,
              }}
            >
              Web
            </button>
            <button
              type="button"
              onClick={() => setTab("app")}
              style={{
                borderBottom: tab == "app" ? "2px solid black" : undefined,
              }}
            >
              App
            </button>
          </div>

          <ul>
            <li>
              Open the instagram post you want to download.
              <picture>
                <Image
                  src={`/images/how-to-get-url/image-${tab}-1.png`}
                  alt=""
                />
              </picture>
            </li>
            <li>
              Copy the link of the post.
              <Image src={`/images/how-to-get-url/image-${tab}-2.png`} alt="" />
            </li>
            <li>
              On isave downloader page paste a link to a field next to the
              Download button.
              <Image src={`/images/how-to-get-url/image-${tab}-3.png`} alt="" />
            </li>
          </ul>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default HowToGetUrl;
