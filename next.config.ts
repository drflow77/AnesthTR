import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // El subproyecto guía-interactiva-das-2025 (Vite) es independiente
    // y no debe ser type-checked por Next.js
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
