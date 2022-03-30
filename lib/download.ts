import axios from "axios";
import { toastMessage } from "./toast";

export const downloadManager = async (url: string) => {
  let fileName = "";

  try {
    const { data } = await axios.get(url, {
      responseType: "blob",
    });

    if (data.type == "image/jpeg") fileName = `isave-${random()}.jpg`;
    else fileName = `isave-${random()}.mp4`;

    const blobUrl = window.URL.createObjectURL(new Blob([data]));

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    document.body.removeChild(link);
  } catch (err) {
    console.error(err);
    toastMessage("Failed to download!");
  }
};

const random = () => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";
  for (let i = 0; i < 5; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};
