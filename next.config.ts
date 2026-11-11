import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90, 92, 95] },
  async redirects() {
    return [{ source: "/legitlab", destination: "/legitlab-academy", permanent: true }];
  },
};

export default nextConfig;
