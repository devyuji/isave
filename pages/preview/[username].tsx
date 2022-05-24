import { AnimatePresence, useCycle } from "framer-motion";
import type { GetServerSideProps } from "next";
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
import FAB from "../../components/fab";

//redux
import { useAppDispatch } from "../../redux/hooks";
import { RESET, SET_DATA } from "../../redux/reducers/previewData";

interface Props {
  data: any;
  error: boolean;
}

const MainPreview: FC<Props> = ({ data, error }) => {
  const [isUsernameModelOpen, toggleOpen] = useCycle(false, true);
  const [isImageUploadModel, toggleImageModelOpen] = useCycle(false, true);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error) {
      dispatch(SET_DATA(data));
      setLoading(false);
    }

    return () => {
      dispatch(RESET());
    };
  }, [data, error, dispatch]);

  const toggleModel = () => toggleOpen();
  const toggleImageModel = () => toggleImageModelOpen();

  if (error) {
    return <Error handleClose={() => null} redirectTo="/preview" />;
  }

  if (loading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>isave - plan out your instagram feed</title>
      </Head>

      <Navbar sticky={false} />

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

        <ProfileInfo />
        <ProfilePost />
      </main>

      <AnimatePresence>
        {isUsernameModelOpen && <UsernameInput handleClose={toggleModel} />}
      </AnimatePresence>

      <AnimatePresence>
        {isImageUploadModel && <Upload handleClose={toggleImageModel} />}
      </AnimatePresence>

      <FAB />

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
    console.log("error #preview");
    return {
      props: {
        error: true,
        data: null,
      },
    };
  }
};

export default MainPreview;
