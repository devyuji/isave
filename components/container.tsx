import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`2xl:w-[70rem] lg:w-9/12 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
