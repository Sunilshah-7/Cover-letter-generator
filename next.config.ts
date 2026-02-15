import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config to acknowledge we're using Turbopack
  turbopack: {},
  // Moved from experimental to top-level in Next.js 16
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
