import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-312a634bce834c20b95a5753a5a60c7d.r2.dev",
      },
    ],
  },
};

export default nextConfig;
