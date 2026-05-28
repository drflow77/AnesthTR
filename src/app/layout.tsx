import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anesthtr.medicode-solutions.com"),
  title: "AnesthTR — Evaluaciones de Anestesiología",
  description: "Portal interactivo de simuladores y evaluaciones para Anestesiología. Desarrollado por Medicode Solutions.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
