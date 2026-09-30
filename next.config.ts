import type { NextConfig } from "next";

const bucketUrl = process.env.BUCKET_URL as string;

if (!bucketUrl) {
  throw new Error("BUCKET_URL is not defined");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: bucketUrl,
      },
    ],
  },
};

export default nextConfig;
