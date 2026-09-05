import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE = "https://anesthtr.medicode-solutions.com";

// Declara explicitamente la marca "AnesthTR" y su relacion con Medicode
// Solutions; sin esto Google no tiene con que asociar el nombre inventado.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "AnesthTR",
      alternateName: "AnesthTR — Evaluaciones de Anestesiología",
      inLanguage: "es-MX",
      description:
        "Portal interactivo de simuladores y evaluaciones para Anestesiología.",
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Medicode Solutions",
      url: "https://www.medicode-solutions.com",
      logo: `${SITE}/icon-512.png`,
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE}/#app`,
      name: "AnesthTR",
      url: SITE,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: "es-MX",
      description:
        "Simuladores clínicos, exámenes por grado y módulos temáticos para residentes de Anestesiología.",
      publisher: { "@id": `${SITE}/#organization` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anesthtr.medicode-solutions.com"),
  title: "AnesthTR — Evaluaciones de Anestesiología",
  description: "Portal interactivo de simuladores y evaluaciones para Anestesiología. Desarrollado por Medicode Solutions.",
  alternates: {
    canonical: "/",
  },
  applicationName: "AnesthTR",
  keywords: [
    "AnesthTR",
    "anestesiología",
    "residentes de anestesiología",
    "simuladores clínicos",
    "exámenes de anestesiología",
    "Medicode Solutions",
  ],
  openGraph: {
    type: "website",
    siteName: "AnesthTR",
    locale: "es_MX",
    url: "/",
    title: "AnesthTR — Evaluaciones de Anestesiología",
    description:
      "Portal interactivo de simuladores y evaluaciones para Anestesiología. Desarrollado por Medicode Solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnesthTR — Evaluaciones de Anestesiología",
    description:
      "Portal interactivo de simuladores y evaluaciones para Anestesiología. Desarrollado por Medicode Solutions.",
  },
  appleWebApp: {
    capable: true,
    title: "AnesthTR",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e2242",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={dmSans.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
