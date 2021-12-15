export const instagramUrlParser = (url: string) => {
  const urlSplit = url.split("/");
  const length = urlSplit.length;

  const last = urlSplit[length - 1];

  if (last[0] === "?") return urlSplit[length - 2];

  return urlSplit[length - 1];
};

export const instagramUrlChecker = (url: string) => {
  const p = new RegExp("(https?://(?:www.)?instagram.com/([^/?#&]+)).*");

  if (url.match(p)) return true;

  return false;
};
