import { AnimatePresence, useCycle } from "framer-motion";
import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

// components
import Header from "../../components/header";
import UsernameInput from "../../components/modal/usernameInput";
import Navbar from "../../components/navbar";
import ProfileInfo from "../../components/profileInfo";
import ProfilePost from "../../components/profilePost";
import Footer from "../../components/footer";
import Error from "../../components/modal/error";
import Upload from "../../components/modal/upload";

interface MainPreviewProps {
  data: any;
  error: boolean;
}

const MainPreview: FC<MainPreviewProps> = ({ data, error }) => {
  const [isUsernameModelOpen, toggleOpen] = useCycle(false, true);
  const [isImageUploadModel, toggleImageModelOpen] = useCycle(false, true);
  const [dataPost, setDataPost] = useState(error ? [] : data.posts);

  useEffect(() => {
    if (!error) setDataPost(data.posts);
  }, [data, error]);

  const toggleModel = () => toggleOpen();
  const toggleImageModel = () => toggleImageModelOpen();

  return (
    <>
      <Head>
        <title>isave - plan out your instagram</title>
      </Head>

      <Navbar />

      {error ? (
        <Error handleClose={() => null} redirectTo="/preview" />
      ) : (
        <>
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Header
              handleOpenUsername={toggleModel}
              handleOpenImage={toggleImageModel}
            />

            <ProfileInfo data={data.profile} />
            <ProfilePost data={dataPost} setData={setDataPost} />
          </main>

          <AnimatePresence initial={false} exitBeforeEnter={true}>
            {isUsernameModelOpen && <UsernameInput handleClose={toggleModel} />}
          </AnimatePresence>

          <AnimatePresence initial={false} exitBeforeEnter={true}>
            {isImageUploadModel && (
              <Upload handleClose={toggleImageModel} setData={setDataPost} />
            )}
          </AnimatePresence>
        </>
      )}
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const username = params!.username;

  try {
    const { data } = await axios.post(`${process.env.API_URL}/api/preview`, {
      username,
    });

    return {
      props: {
        data,
        error: false,
      },
    };
  } catch (err) {
    console.log("error = ", err);
    return {
      props: {
        error: true,
        data: null,
      },
    };
  }
};

export default MainPreview;
