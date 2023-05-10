import { FC, useMemo, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

import type { Data } from "./page";
import { downloadManager } from "../../../lib/download";
import Spinner from "../../../components/spinner";
import View from "../../../components/modal/view";
import Image from "../../../components/image";

interface Props {
  data: Data;
  username: string;
  index?: number;
}

const container: Variants = {
  hidden: { opacity: 1, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
      ease: "linear",
      duration: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Card: FC<Props> = ({ data, username, index }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  const image = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_PROXY}?url=${encodeURIComponent(
        data.preview
      )}`,
    [data]
  );

  const download = async (url: string) => {
    downloadError && setDownloadError(false);
    setIsDownloading(true);

    try {
      await downloadManager(url);
    } catch (err) {
      console.error(err);
      setDownloadError(true);
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <div className="p-2 overflow-hidden rounded-lg relative hover:bg-zinc-100 transition-colors duration-500">
        {/* image  */}
        <div className=" w-full aspect-square h-96 overflow-hidden relative rounded-lg">
          {!imageLoad && (
            <div className="h-full bg-zinc-200 grid place-items-center">
              <Spinner />
            </div>
          )}

          <Image
            style={{ display: imageLoad ? "block" : "none" }}
            src={image}
            alt=""
            className="w-full h-full object-cover"
            onLoad={() => setImageLoad(true)}
            onError={() => console.log("error")}
          />

          <AnimatePresence>
            {showMenu && (
              <motion.ul
                variants={container}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute top-0 left-0 right-0 w-full bg-black/75 p-4 text-white flex flex-col items-center justify-center h-full gap-4"
              >
                <motion.li variants={item}>
                  <button
                    className="flex items-center gap-2"
                    onClick={() => setShowPreview(true)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
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
                    Preview
                  </button>
                </motion.li>
                {data.type === "video" && (
                  <motion.li variants={item}>
                    <button
                      className="flex gap-2 items-center"
                      onClick={() => download(data.preview)}
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
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      Download Thumnail
                    </button>
                  </motion.li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* download and options */}
        <div className="flex justify-between gap-2 mt-2 text-sm items-center">
          <div className="overflow-hidden text-ellipsis">
            <a
              href={`https://instagram.com/${username}`}
              className="text-sm hover:border-black border-b-2 border-transparent"
            >
              {username}
            </a>
          </div>
          <div className="flex gap-2 ">
            <button
              type="button"
              onClick={() => !isDownloading && download(data.download_url)}
              className={`flex gap-2 items-center  border-b-2 border-transparent ${
                downloadError
                  ? "text-red-500 hover:border-red-500"
                  : "text-black hover:border-black"
              }`}
            >
              {isDownloading ? (
                <Spinner />
              ) : downloadError ? (
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
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
              {downloadError ? "Failed to download" : "download"}
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              className="hover:border-black border-2 border-transparent rounded-lg"
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
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPreview && (
          <View handleClose={() => setShowPreview(false)} index={index!} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Card;
