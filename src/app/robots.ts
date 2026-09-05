import type { MetadataRoute } from "next";

const BASE = "https://anesthtr.medicode-solutions.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /roles y /protocolos NO se bloquean aqui: necesitan ser rastreados
      // para que Google lea su <meta robots="noindex">. Bloquearlos en
      // robots.txt impediria justamente eso.
      disallow: ["/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
