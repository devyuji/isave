import { toast } from "react-toastify";

export const toastMessage = (msg: string) => {
  toast(msg, {
    hideProgressBar: true,
  });
};
