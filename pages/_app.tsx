import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

// components
import Loading from "../components/model/loading";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
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

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
