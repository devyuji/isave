/* eslint-disable @next/next/no-head-element */
import Navbar from "./navbar";
import "../styles/globals.css";
import { ReactNode } from "react";
import Footer from "./footer";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <title>Instagram Downloader | Fast, Free, Anonymous - isave</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
