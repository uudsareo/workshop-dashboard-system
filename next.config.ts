import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`http://10.97.20.209:4000/**`)],
  },
};

export default nextConfig;
