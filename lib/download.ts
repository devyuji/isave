import axios from "axios";

const downloadUrl = "http://localhost:5002/download";

export const downloadManager = async (url: string, isBase64 = false) => {
  let fileName = "";
  let blobUrl: string | undefined;

  try {
    if (!isBase64) {
      const { data } = await axios.get(downloadUrl, {
        responseType: "blob",
        headers: {
          "x-url": url,
        },
      });

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
