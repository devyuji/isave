import { FC } from "react";
import styles from "../styles/components/profileInfo.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import download from "../lib/download";

interface ProfileInfoProps {
  data: any;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ data }) => {
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

        <motion.div
          className={styles.icon}
          whileHover={{
            opacity: 1,
          }}
          onClick={() => download(data.profile_image)}
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
