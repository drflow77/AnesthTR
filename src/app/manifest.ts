import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AnesthTR — Evaluaciones de Anestesiología",
    short_name: "AnesthTR",
    description:
      "Portal interactivo de simuladores y evaluaciones para Anestesiología. Desarrollado por Medicode Solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#040a16",
    theme_color: "#0e2242",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
