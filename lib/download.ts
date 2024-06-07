import axios, { type AxiosRequestConfig } from "axios";

export async function downloadManager(url: string) {
  let fileName = "";
  let blobUrl: string | undefined;

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

  const anchorTag = document.createElement("a");
  anchorTag.href = blobUrl!;
  anchorTag.download = fileName;
  document.body.appendChild(anchorTag);

  anchorTag.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  document.body.removeChild(anchorTag);
}

function random() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";
  for (let i = 0; i < 5; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
}
