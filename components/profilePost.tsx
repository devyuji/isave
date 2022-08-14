import React, { DragEventHandler, FC, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";

// css
import styles from "../styles/components/profilePost.module.css";

// redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  ProfilePostProps,
  REMOVE,
  UPDATA_POST,
} from "../redux/reducers/previewData";

interface Props {}

const fade: Variants = {
  disappear: {
    opacity: 0,
  },
  appear: {
    opacity: 1,
  },
};

const ProfilePost: FC<Props> = () => {
  const data: ProfilePostProps[] = useAppSelector(
    (state) => state.PREVIEW_DATA.posts
  );
  const isEdit = useAppSelector((state) => state.PREVIEW_EDITTING);
  const dragStart = useRef<number | null>(null);
  const dragEnter = useRef<number | null>(null);

  const dispatch = useAppDispatch();

  const remove = (index: number) => {
    dispatch(REMOVE(index));
  };

  const dragEnd = () => {
    if (!isEdit) return;

    let demoData = [...data];

    const removeData = demoData.splice(dragStart.current!, 1)[0];

    demoData.splice(dragEnter.current!, 0, removeData);

    dispatch(UPDATA_POST(demoData));
  };

  if (data.length === 0) {
    return (
      <div>
        <h1 className={styles.no_post}>No Posts Yet | Private Account</h1>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      {data.map((d, index) => (
        <div
          className={styles.card}
          key={`${index}`}
          draggable
          onDragStart={(e) => (dragStart.current = index)}
          onDragEnter={(e) => (dragEnter.current = index)}
          onDragEnd={dragEnd}
          onDragOver={(e) => e.preventDefault()}
          style={{
            cursor: isEdit ? "move" : "default",
          }}
        >
          <Image
            src={
              d.type == "image "
                ? d.image_url
                : `data:image/png;base64,${d.image_url}`
            }
            alt=""
            width="100"
            height="100"
            layout="responsive"
            quality="100"
          />
          <AnimatePresence>
            {isEdit && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                variants={fade}
                initial="disappear"
                animate="appear"
                exit="disappear"
                onClick={() => remove(index)}
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
};

export default ProfilePost;
