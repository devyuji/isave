import { AnimatePresence, motion, type Variants } from "framer-motion";
import { FC, useState } from "react";
import Modal from ".";
import { Data } from "../../app/post/[id]/page";
import { downloadManager } from "../../lib/download";
import styles from "../../styles/components/modal/cardmenu.module.css";
import View from "./view";

interface Props {
  handleClose: () => void;
  data: Data;
}

const slideRight: Variants = {
  initial: {
    x: "-100%",
  },
  animate: {
    x: "100%",
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
  exit: {
    opacity: 0,
  },
};

const CardMenu: FC<Props> = ({ handleClose, data }) => {
  const [view, setView] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const open = () => {
    setView(true);
  };

  const downloadThumnail = async () => {
    setDownloading(true);

    await downloadManager(data.preview);
    setDownloading(false);
  };

  return (
    <>
      <Modal handleClose={handleClose}>
        <ul className={styles.container}>
          <li>
            <button type="button" onClick={open}>
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
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>

              <span>Preview</span>
            </button>
          </li>
          {data.type === "video" && (
            <li>
              <button type="button" onClick={downloadThumnail}>
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

                <span>Download thumnails</span>
              </button>
              <AnimatePresence>
                {downloading && (
                  <motion.span
                    variants={slideRight}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={styles.loading}
                  ></motion.span>
                )}
              </AnimatePresence>
            </li>
          )}

          <li>
            <button type="button" onClick={handleClose}>
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

              <span>Close</span>
            </button>
          </li>
        </ul>
      </Modal>
      <AnimatePresence>
        {view && (
          <View
            handleClose={() => setView(false)}
            isVideo={data.type === "video"}
            url={data.download_url}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CardMenu;
