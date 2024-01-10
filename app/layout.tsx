import "../styles/globals.css";
import { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import FirebaseInit from "./firebaseinit";
import ReduxInit from "./redux";
import ShowLimitError from "./showLimitError";
import type { Metadata } from "next";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Instagram Downloader | Fast, Free, Anonymous - isave",
  description:
    "Isave allows you to save any media from Instagram, including reels, posts, videos, IGTV, and images.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <FirebaseInit />

        <ReduxInit>
          <Navbar />
          {children}
          <Footer />
          <ShowLimitError />
        </ReduxInit>
      </body>
    </html>
  );
}
