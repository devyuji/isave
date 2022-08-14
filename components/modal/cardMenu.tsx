import { AnimatePresence, useCycle } from "framer-motion";
import { FC } from "react";
import Modal from ".";
import { downloadManager } from "../../lib/download";
import { DataProps } from "../../redux/reducers/postData";
import styles from "../../styles/components/modal/cardMenu.module.css";
import View from "./view";
import axios from "axios";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

interface Props {
  handleClose: () => void;
  data: DataProps;
}

const CardMenu: FC<Props> = ({ handleClose, data }) => {
  const [show, toggleShow] = useCycle(false, true);

  const videoToAudio = async () => {
    try {
      const res = await axios.get(data.downloadLink, {
        responseType: "arraybuffer",
      });

      const ffmpeg = createFFmpeg({
        log: true,
        corePath: "/dist/ffmpeg-core.js",
      });
      await ffmpeg.load();

      ffmpeg.FS(
        "writeFile",
        "input.mp4",
        new Uint8Array(res.data, 0, res.data.byteLength)
      );

      await ffmpeg.run("-i", "input.mp4", "output.mp3");

      const output = ffmpeg.FS("readFile", "output.mp3");

      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([output.buffer]));

      link.download = "isave-audio.mp3";

      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
    } catch (err) {
      console.error("error extracting audio");
    }
  };

  return (
    <>
      <Modal handleClose={handleClose}>
        <ul className={styles.container}>
          <li>
            <button
              type="button"
              onClick={() => downloadManager(data.preview, true)}
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
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span>Download thumnails</span>
            </button>
          </li>
          {data.type === "video" && (
            <li>
              <button type="button" onClick={videoToAudio}>
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
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
                <span>Extract audio (beta)</span>
              </button>
            </li>
          )}
          <li>
            <button onClick={() => toggleShow()}>
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
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
              <span>View in full size</span>
            </button>
          </li>
          <li>
            <button onClick={handleClose}>
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
              <span>Cancel</span>
            </button>
          </li>
        </ul>
      </Modal>
      <AnimatePresence>
        {show && (
          <View
            url={data.type === "video" ? data.downloadLink : data.preview}
            handleClose={toggleShow}
            isVideo={data.type === "video"}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CardMenu;
