module.exports = {
  reactStrictMode: true,
  swcMinify: true,

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
