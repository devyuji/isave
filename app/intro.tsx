"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import { instagramUrlParser } from "../lib/instagram";
import styles from "./intro.module.css";
import useTokenBucket from "../lib/useTokenBucket";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TOGGLE } from "../redux/reducer/token";
import Container from "../components/container";
import Card from "./m/[id]/card";

type formValue = {
  url: string;
};

function Intro() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isValid, errors },
  } = useForm<formValue>();
  const [showCacheData, setShowCacheData] = useState(false);
  const router = useRouter();
  const consumeToken = useTokenBucket();
  const dispatch = useAppDispatch();
  const dataCached = useAppSelector((state) => state.media);

  useEffect(() => {
    setFocus("url");
  }, [setFocus]);

  const onSubmit = (value: formValue) => {
    const id = instagramUrlParser(value.url);

    if (id === dataCached.id) {
      console.log("data is present in state");
      setShowCacheData(true);
      return;
    }

    if (consumeToken()) {
      router.push(`/m/${id}`);
    } else {
      dispatch(TOGGLE());
    }
  };

  const handleClose = () => {
    setShowCacheData(false);
  };

  return (
    <>
      <section className="flex flex-col gap-6 justify-center">
        <h1 className="md:text-5xl text-4xl  font-bold">
          <span className={styles.instagram_like}>instagram</span> media
          downloader!
        </h1>

        <h2>
          Copy and paste the URL of the Instagram videos, photos, reels, or IGTV
          link you wish to download.
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex items-center bg-zinc-100 p-2 gap-4 mt-2 h-14 border-b-2 border-black">
            <div>
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-500"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>

            <input
              id="url"
              placeholder="paste it here!"
              {...register("url", {
                required: true,
                pattern:
                  /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:[a-zA-Z0-9_\-]+\/)?([a-zA-Z0-9_\-]+)(?:\/|$)/,
              })}
              className="w-full h-full bg-transparent outline-none text-sm"
            />

            <button
              disabled={!isValid}
              className="p-2 h-full bg-black rounded-lg text-white text-sm disabled:bg-zinc-400 transition-color duration-500"
            >
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
          {errors.url?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">Field is empty</p>
          )}
          {errors.url?.type === "pattern" && (
            <p className="text-red-500 text-sm">Enter valid url</p>
          )}
        </form>
      </section>
      <AnimatePresence>
        {showCacheData && (
          <motion.div
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 100,
              opacity: 0,
            }}
            className="bg-white w-full h-full overflow-hidden flex justify-center fixed top-0 left-0 right-0 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Container className="p-4">
              <div className="flex justify-end">
                <button onClick={handleClose}>
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="h-full overflow-y-auto mt-4">
                <div className={`${styles.card_container}`}>
                  {dataCached.data.map((d, index) => (
                    <Card
                      key={`${index}`}
                      data={d}
                      username={dataCached.username}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Intro;
