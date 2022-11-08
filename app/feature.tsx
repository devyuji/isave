import Image from "../components/image";
import styles from "./feature.module.css";

function Features() {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.image_cover}>
          <Image src="/icons/download.svg" alt="" />
        </div>

        <h1>Download in HD</h1>
        <p>Download original content media.</p>
      </div>

      <div className={styles.box}>
        <div className={styles.image_cover}>
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
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </div>

        <div className={styles.details}>
          <h1>No watermark</h1>
          <p>
            No video or photo will have a watermark, and all content will be
            original.
          </p>
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.image_cover}>
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>

        <div className={styles.details}>
          <h1>Well Secure</h1>
          <p>No data is being kept, and there is no login needed.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
