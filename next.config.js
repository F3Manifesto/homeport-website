/** @type {import('next').NextConfig} */

const allowedOrigins = [
  "https://api-v2-mumbai.lens.dev/",
  "https://api-v2.lens.dev/",
  "https://thedial.infura-ipfs.io",
  "https://thedial.infura-ipfs.io",
  "https://api.thegraph.com",
  "https://arweave.net/",
  "https://gw.ipfs-lens.dev",
  "https://hey.xyz",
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thedial.infura-ipfs.io",
        pathname: "/ipfs/**",
      },
    ],
    unoptimized: true,
  },
  async headers() {
    let headersConfig = [];

    allowedOrigins.forEach((origin) => {
      headersConfig.push({
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: origin,
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
        ],
      });
    });

    return headersConfig;
  },
};

module.exports = nextConfig;
