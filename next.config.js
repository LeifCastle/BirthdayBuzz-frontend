/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bootdey.com",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
};

module.exports = nextConfig;
