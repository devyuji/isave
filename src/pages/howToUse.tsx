import { FC } from "react";

// components
import Navbar from "../components/header";
import Footer from "../components/footer";

// images
import image1 from "../images/image1.png";
import image3 from "../images/image3.png";
import image4 from "../images/image4.png";
import { MobileOnlyView } from "react-device-detect";

const HowToUse: FC = () => {
  return (
    <>
      <MobileOnlyView viewClassName="mobile_container">
        <p>
          Download app from{" "}
          <a href="https://github.com/devyuji/isave-app/releases">here</a>
        </p>
      </MobileOnlyView>
      <Navbar />
      <div className="how_container">
        <h1 className="heading">How To Use</h1>
        <ul>
          <li>
            <p className="details">Open the Instagram and copy the url.</p>
            <img src={image1} alt="" />
          </li>

          <li>
            <p className="details">
              Paste the url to Isave and click on submit or press enter
            </p>
            <img src={image3} alt="" />
          </li>

          <li>
            <p className="details">
              Click the download button. The photo will immediately be saved to
              the Downloads folder.
            </p>
            <img src={image4} alt="" />
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default HowToUse;
