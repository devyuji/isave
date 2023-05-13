"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { instagramUrlParser } from "../lib/instagram";
import styles from "./intro.module.css";
import useTokenBucket from "../lib/useTokenBucket";
import { useAppDispatch } from "../redux/hooks";
import { TOGGLE } from "../redux/reducer/token";

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
  const clicked = useRef<boolean>(false);
  const router = useRouter();
  const consumeToken = useTokenBucket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFocus("url");
  }, [setFocus]);

  const onSubmit = (value: formValue) => {
    if (clicked.current) return;

    if (consumeToken()) {
      clicked.current = true;

      const id = instagramUrlParser(value.url);

      router.push(`/m/${id}`);
    } else {
      dispatch(TOGGLE());
    }
  };

  return (
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
  );
}

export default Intro;
