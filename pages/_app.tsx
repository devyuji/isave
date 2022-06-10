import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import axios from "axios";

// firebase
import { app } from "../firebase/index";
import { getAnalytics } from "firebase/analytics";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

// components
import Loading from "../components/modal/loading";
import Footer from "../components/footer";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const startUp = useCallback(async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/startup`);
  }, []);

  useEffect(() => {
    getAnalytics(app);

    startUp();
  }, [startUp]);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteCompleted = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteCompleted);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>isave - instagram downloader</title>
        <meta
          name="description"
          content="Download Instagram Videos, Images, And Reels In One Place."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {loading && <Loading />}
      </AnimatePresence>

      <Provider store={store}>
        <Component {...pageProps} />

        <Footer />
      </Provider>

      <ToastContainer />
    </>
  );
};

export default MyApp;
