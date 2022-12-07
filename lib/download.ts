import axios, { type AxiosRequestConfig } from "axios";

export const downloadManager = async (url: string, isBase64 = false) => {
  let fileName = "";
  let blobUrl: string | undefined;

  try {
    if (!isBase64) {
      const link = `${process.env.NEXT_PUBLIC_PROXY}?url=${encodeURIComponent(
        url
      )}`;

      const config: AxiosRequestConfig = {
        responseType: "blob",
        method: "get",
        url: link,
      };

      const { data } = await axios(config);

      if (data.type == "image/jpeg") fileName = `isave-${random()}.jpg`;
      else fileName = `isave-${random()}.mp4`;

      blobUrl = window.URL.createObjectURL(new Blob([data]));
    }

    const link = document.createElement("a");
    link.href = isBase64 ? `data:image/png;base64,${url}` : blobUrl!;
    link.download = isBase64 ? `isave-${random()}.png` : fileName;
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
  }
};

const random = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";
  for (let i = 0; i < 5; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};
