/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  redirects() {
    return [
      {
        source: "/post",
        destination: "/",
        permanent: true,
      },
      {
        source: "/preview/:username*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/app",
        destination: "/app/api",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/post/:id",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
