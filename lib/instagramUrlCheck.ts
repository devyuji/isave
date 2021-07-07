export const instagramUrlChecker = (url: string) => {
  const p = new RegExp("(https?://(?:www.)?instagram.com/p/([^/?#&]+)).*");
  const tv = new RegExp("(https?://(?:www.)?instagram.com/tv/([^/?#&]+)).*");
  const reel = new RegExp(
    "(https?://(?:www.)?instagram.com/reel/([^/?#&]+)).*"
  );

  if (url.match(p) || url.match(tv) || url.match(reel)) return true;

  return false;
};
