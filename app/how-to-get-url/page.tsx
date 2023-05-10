"use client";

import { useState } from "react";
import Image from "../../components/image";
import styles from "./styles.module.css";
import Container from "../../components/container";

function HowToGetUrlPage() {
  const [tab, setTab] = useState("web");

  return (
    <main
      className="grid place-items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* main content goes here */}
      <Container className="p-4">
        <div
          className={styles.modal_content}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-3xl font-bold text-center mb-4">
            How to get instagram link?
          </h1>
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

          <ul className="list-disc	">
            <li>
              Open the instagram post you want to download.
              <div>
                <Image
                  src={`/images/how-to-get-url/image-${tab}-1.png`}
                  alt=""
                />
              </div>
            </li>
            <li>
              Copy the link of the post.
              <div>
                <Image
                  src={`/images/how-to-get-url/image-${tab}-2.png`}
                  alt=""
                />
              </div>
            </li>
            <li>
              On isave downloader page paste a link to a field next to the
              Download button.
              <div>
                <Image
                  src={`/images/how-to-get-url/image-${tab}-3.png`}
                  alt=""
                />
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </main>
  );
}

export default HowToGetUrlPage;
