/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

const Image: FC<Props> = ({ src, alt, className }) => {
  return <img className={className} src={src} alt={alt} loading="lazy" />;
};

export default Image;
