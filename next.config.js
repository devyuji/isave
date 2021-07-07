module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/post",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
