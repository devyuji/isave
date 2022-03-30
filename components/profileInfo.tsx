import { FC } from "react";
import styles from "../styles/components/profileInfo.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { downloadManager } from "../lib/download";

// redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { UPDATE_PROFILE } from "../redux/reducers/previewData";

interface ProfileInfoProps {}

const ProfileInfo: FC<ProfileInfoProps> = () => {
  const data: any = useAppSelector((state) => state.PREVIEW_DATA.profile);
  const isEdit = useAppSelector((state) => state.PREVIEW_EDITTING);

  const dispatch = useAppDispatch();

  const pickImage = async () => {
    const pickerOpts = {
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };
    try {
      const [FileSystemFileHandle] = await (window as any).showOpenFilePicker(
        pickerOpts
      );
      const file = await FileSystemFileHandle.getFile();

      const res: any = await toBase64(file);
      const image = res.split(",")[1];

      dispatch(UPDATE_PROFILE(image));
    } catch (_) {}
  };

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <section className={styles.container}>
      <div className={styles.image}>
        <Image
          src={`data:image/png;base64,${data.image_url}`}
          alt=""
          width="200"
          height="200"
          layout="responsive"
        />

        {!isEdit ? (
          <motion.div
            className={styles.icon}
            whileHover={{
              opacity: 1,
            }}
            onClick={() => downloadManager(data.profile_image)}
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </motion.div>
        ) : (
          <motion.div
            className={styles.icon}
            whileHover={{
              opacity: 1,
            }}
            onClick={pickImage}
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
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </motion.div>
        )}
      </div>

      {/* info */}
      <div className={styles.info_container}>
        {/* username  */}
        <h2>{data.username}</h2>

        <div className={styles.foll}>
          <p>{data.post} post</p>
          <p>{data.followers} followers</p>
          <p>{data.following} following</p>
        </div>

        {/* bio  */}
        <div>
          <h4>{data.name}</h4>
          <p className={styles.bio}>{data.bio}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
