import Spinner from "../../../components/spinner";
import styles from "./loading.module.css";

function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 5rem)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ width: "2rem", height: "2rem" }}>
        <Spinner />
      </div>
    </div>
  );
}

export default Loading;
