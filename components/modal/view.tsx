import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import Backdrop from "./backdrop";
import Image from "../image";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  handleClose: () => void;
  index: number;
}

const slide: Variants = {
  initial: (direction) => ({
    x: direction * 100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction * -100,
    opacity: 0,
  }),
};

const View: FC<Props> = ({ handleClose, index }) => {
  const [idx, setIndex] = useState(index);
  const data = useAppSelector((state) => state.media.data[idx]);
  const totalLength = useAppSelector((state) => state.media.data.length);
  const [prevIdx, setPrevIdx] = useState([null, idx]);

  if (idx !== prevIdx[1]) {
    setPrevIdx([prevIdx[1], idx]);
  }

  let direction = idx > prevIdx[0]! ? 1 : -1;

  const movePrev = useCallback(() => {
    if (idx === 0) {
      return;
    }

    setIndex((prev) => prev - 1);
  }, [idx]);

  const moveNext = useCallback(() => {
    if (idx >= totalLength - 1) {
      return;
    }
    setIndex((prev) => prev + 1);
  }, [idx, totalLength]);

  const handleTouchStart = useCallback((evt: any) => {
    const firstTouch = getTouches(evt)[0];
    xDown.current = firstTouch.clientX;
    yDown.current = firstTouch.clientY;
  }, []);

  const handleTouchMove = useCallback(
    (evt: any) => {
      if (!xDown.current || !yDown.current) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown.current - xUp;
      var yDiff = yDown.current - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          moveNext();
        } else {
          movePrev();
        }
      }

      xDown.current = null;
      yDown.current = null;
    },
    [moveNext, movePrev]
  );

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        movePrev();
      } else if (e.key === "ArrowRight") {
        moveNext();
      }
    };
    window.addEventListener("keydown", close);
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    return () => {
      window.removeEventListener("keydown", close);
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
    };
  }, [handleTouchMove, handleTouchStart, moveNext, movePrev]);

  const source = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_PROXY}?url=${encodeURIComponent(
        data.download_url
      )}`,
    [data.download_url]
  );

  let xDown = useRef(null);
  let yDown = useRef(null);

  function getTouches(evt: any) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }

  return (
    <Backdrop onClick={handleClose}>
      <AnimatePresence custom={direction}>
        <motion.div
          layoutId={`${index}`}
          key={idx}
          variants={slide}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          className="w-10/12 2xl:w-[90rem] h-full overflow-hidden p-2 absolute"
        >
          {data.type == "image" ? (
            <Image
              src={source}
              alt=""
              className="object-contain w-full h-full"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={source}
              autoPlay={true}
              controls
              className="w-full h-full absolute"
              onClick={(e) => e.stopPropagation()}
            ></video>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-0 right-5 p-2 text-white">
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

      <div
        className="absolute top-1/2 flex justify-between w-full px-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={movePrev}
          disabled={idx === 0}
          className="disabled:text-gray-600"
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
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <button
          onClick={moveNext}
          disabled={idx === totalLength - 1}
          className="disabled:text-gray-600"
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
    </Backdrop>
  );
};

export default View;
