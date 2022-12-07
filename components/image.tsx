/* eslint-disable @next/next/no-img-element */
import type { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
}

const Image: FC<Props> = ({ src, alt, className, ...props }) => {
  return <img className={className} src={src} alt={alt} {...props} />;
};

export default Image;
