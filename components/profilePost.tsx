import { FC } from "react";
import Image from "next/image";
import { AnimatePresence, motion, Variant, Variants } from "framer-motion";

// css
import styles from "../styles/components/profilePost.module.css";

// redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { REMOVE } from "../redux/reducers/previewData";

interface Props {}

const ProfilePost: FC<Props> = () => {
  const data = useAppSelector((state) => state.PREVIEW_DATA.posts);
  const isEdit = useAppSelector((state) => state.PREVIEW_EDITTING);

  const dispatch = useAppDispatch();

  const remove = (index: number) => {
    dispatch(REMOVE(index));
  };

  if (data.length === 0) {
    return (
      <div>
        <h1 className={styles.no_post}>No Posts Yet | Private Account</h1>
      </div>
    );
  }

  const fade: Variants = {
    disappear: {
      opacity: 0,
    },
    appear: {
      opacity: 1,
    },
  };

  return (
    <section className={styles.container}>
      {data.map((d: any, index: number) => (
        <div className={styles.card} key={`${index}`}>
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
