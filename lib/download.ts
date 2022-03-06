import axios from "axios";

const download = async (url: string) => {
  let fileName = "";

  try {
    const { data } = await axios.get(url, {
      responseType: "blob",
    });

    if (data.type == "image/jpeg") fileName = "isave-download.jpg";
    else fileName = "isave-download.mp4";

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
  }
};

export default download;
