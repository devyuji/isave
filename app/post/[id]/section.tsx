"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import UrlInput from "../../../components/modal/urlInput";
import Spinner from "../../../components/spinner";
import { downloadManager } from "../../../lib/download";
import Card from "./card";
import styles from "./section.module.css";

interface Props {
  data: any;
}

function Section({ data }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDownloading, setDownloading] = useState(false);

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  const downloadAll = async () => {
    if (isDownloading) return;

    setDownloading(true);

    const downloadPromises = data.data.map((d: any) => {
      if (d.type === "image") return downloadManager(d.image_src, true);
      return downloadManager(d.download_url);
    });

    await Promise.all(downloadPromises);

    setDownloading(false);
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles.option}>
          <button type="button" onClick={open}>
            <span>
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
            <span>Another url</span>
          </button>

          <button type="button" onClick={downloadAll}>
            {isDownloading ? (
              <Spinner />
            ) : (
              <>
                <span>
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
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </span>
                <span>Download all</span>
              </>
            )}
          </button>
        </div>

        <div className={styles.card_container}>
          {data.data.map((d: any, index: number) => (
            <Card key={`${index}`} data={d} username={data.username} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && <UrlInput handleClose={close} />}
      </AnimatePresence>
    </>
  );
}

export default Section;
