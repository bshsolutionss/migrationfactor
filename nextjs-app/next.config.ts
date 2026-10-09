import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // The assessment markup, controller and CSS are shared with the static site.
    root: path.resolve(__dirname, '..'),
  },
};

export default nextConfig;
