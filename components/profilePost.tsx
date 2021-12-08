import { Dispatch, FC } from "react";
import styles from "../styles/components/profilePost.module.css";
import Image from "next/image";
import update from "immutability-helper";

interface ProfilePostProps {
  data: any;
  setData: Dispatch<any>;
}

const ProfilePost: FC<ProfilePostProps> = ({ data, setData }) => {
  if (data.length === 0) {
    return (
      <div style={{ marginTop: "1rem" }}>
        <h1>No Posts Yet | Private Account</h1>
      </div>
    );
  }

  const remove = (index: number) => {
    setData((prev: any) => update(prev, { $splice: [[index, 1]] }));
  };

  return (
    <section className={styles.container}>
      {data.map((d: any, index: number) => (
        <div className={styles.card} key={`${index}`}>
          <Image
            src={
              d.type === "image"
                ? URL.createObjectURL(d.image)
                : `data:image/png;base64,${d.image_url}`
            }
            alt=""
            width="100"
            height="100"
            layout="responsive"
            quality="100"
          />
          <button onClick={() => remove(index)}>
            <svg
              viewBox="0 0 24 24"
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
      ))}
    </section>
  );
};
export default ProfilePost;
