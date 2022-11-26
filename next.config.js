/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: "https://p.scdn.co/mp3-preview/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
