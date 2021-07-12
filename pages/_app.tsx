import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loading from "../components/loading";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (loading) {
      (document as any).querySelector("body").style.overflow = "hidden";
    } else {
      (document as any).querySelector("body").style.overflow = "visible";
    }
  }, [loading]);

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
      <AnimatePresence>{loading && <Loading />}</AnimatePresence>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;