"use client";

import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { Data, DataProps } from "./page";
import styles from "./section.module.css";
import Card from "./card";
import { instagramUrlParser } from "../../../lib/instagram";
import { useAppDispatch } from "../../../redux/hooks";
import { init } from "../../../redux/reducer/media";
import useTokenBucket from "../../../lib/useTokenBucket";
import { TOGGLE } from "../../../redux/reducer/token";

interface Props {
  data: DataProps;
  id: string;
}

type formValue = {
  url: string;
};

const Section: FC<Props> = ({ data, id }) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<formValue>();

  const router = useRouter();
  const consumeToken = useTokenBucket();
  const dispatch = useAppDispatch();
  const [showTop, setTop] = useState(false);

  useEffect(() => {
    dispatch(init({ data: data.data, id: id, username: data.username }));
  }, [data, dispatch, id]);

  useEffect(() => {
    const scrollDown = () => {
      if (window.scrollY > 30) {
        setTop(true);
      } else {
        setTop(false);
      }
    };

    window.addEventListener("scroll", scrollDown);

    return () => window.removeEventListener("scroll", scrollDown);
  }, []);

  const onSubmit = ({ url }: formValue) => {
    if (consumeToken()) {
      const parsedId = instagramUrlParser(url);

      router.replace(`/m/${parsedId}`);
    } else {
      dispatch(TOGGLE());
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="p-4 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <label htmlFor="url" className="text-xl">
            Enter instagram url
          </label>
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

        <div className={styles.card_container}>
          {data.data.map((d: Data, index) => (
            <Card
              key={`${index}`}
              index={index}
              data={d}
              username={data.username}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="sticky bottom-4"
          >
            <button
              type="button"
              onClick={scrollToTop}
              className="bg-zinc-900 text-white p-2 rounded-lg ml-auto"
              aria-label="top"
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
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Section;
