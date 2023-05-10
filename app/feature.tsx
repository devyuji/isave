import Image from "../components/image";
import styles from "./feature.module.css";

function Features() {
  return (
    <section>
      <div>
        <Image src="/images/landing_page_cover.webp" alt="" />
      </div>

      <div className={styles.container}>
        {/* box  */}
        <div className="p-4 flex flex-col gap-2">
          <div>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>

          <h1 className="text-semibold text-lg">Download in HD</h1>
          <p className="text-sm text-gray-500">
            Download original content media.
          </p>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-pink-400"
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </div>

          <h1 className="text-semibold text-lg">No watermark</h1>
          <p className="text-sm text-gray-500">
            No video or photo will have a watermark, and all content will be
            original format.
          </p>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-500"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>

          <h1 className="text-semibold text-lg">Well Secure</h1>
          <p className="text-sm text-gray-500">
            No data is being kept, and there is no login needed.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
