/* eslint-disable @next/next/no-head-element */
import "../styles/globals.css";
import { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import FirebaseInit from "./firebaseinit";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <title>Instagram Downloader | Fast, Free, Anonymous - isave</title>
        <meta
          name="description"
          content="Isave allows you to save any media from Instagram, including reels, posts, videos, IGTV, and images.
"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="white"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="white"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <FirebaseInit />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
