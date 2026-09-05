import type { MetadataRoute } from "next";

const BASE = "https://anesthtr.medicode-solutions.com";

// /roles y /protocolos quedan fuera a proposito: ambos declaran
// robots: { index: false } en su layout.
const routes: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
  ["/", 1.0, "weekly"],
  ["/general", 0.9, "weekly"],
  ["/r1", 0.8, "monthly"],
  ["/r2", 0.8, "monthly"],
  ["/opioides", 0.8, "monthly"],
  ["/ecoestudio", 0.8, "monthly"],
  ["/anafilaxia", 0.8, "monthly"],
  ["/cefalea-post-puncion", 0.8, "monthly"],
  ["/general/40-intoxicacion-last-simulador.html", 0.6, "monthly"],
  ["/general/DAS Anestesia.html", 0.6, "monthly"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(([path, priority, changeFrequency]) => ({
    url: new URL(path, BASE).toString(),
    lastModified,
    changeFrequency,
    priority,
  }));
}
