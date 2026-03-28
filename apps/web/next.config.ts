import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable server actions
  },
  // Allow importing from packages workspace
  transpilePackages: ["agents"],
};

export default nextConfig;
