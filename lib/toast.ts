import { toast } from "react-toastify";

export const toastMessage = (msg: string) => {
  toast(msg, {
    style: {
      backgroundColor: "#EF5350",
      color: "white",
      borderRadius: "30px",
      padding: "2em",
    },
    hideProgressBar: true,
  });
};
