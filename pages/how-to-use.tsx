import { FC } from "react";
import Image from "next/image";
import styles from "../styles/pages/howtouse.module.css";

// components
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// images
import image1 from "../public/images/image1.png";
import image2 from "../public/images/image2.png";
import image3 from "../public/images/image3.png";

const HowToUse: FC = () => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>How To Use</h1>
          <ul>
            <li>
              <p className={styles.title}>
                Open the Instagram and copy the url.
              </p>
              <Image src={image1} alt="" layout="responsive" />
            </li>

            <li>
              <p className={styles.title}>
                Paste the url to input field and press enter
              </p>
              <Image src={image2} alt="" layout="responsive" />
            </li>

            <li>
              <p className={styles.title}>
                Click the download button. The photo will immediately be saved
                to the Downloads folder.
              </p>
              <Image src={image3} alt="" layout="responsive" />
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default HowToUse;
