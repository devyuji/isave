import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const metadata = {
  title: "How to get url from instagram - isave",
  description:
    "How to get url from instagram and use to download media to my devices",
};

export default function Layout({ children }: Props) {
  return children;
}
