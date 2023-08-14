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
  env: {
    testKey:
      "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",
  },
  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified by next.js will be dropped.
      ...config.resolve.fallback,
      fs: false, // the solution
    };

    return config;
  },
};

module.exports = nextConfig;
