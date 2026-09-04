import type { Metadata, Viewport } from "next";
import { Sora, Bebas_Neue } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const SITE_URL = "https://gym-repositorie.vercel.app";
const TITLE = "MI GIMNASIO — Entrenamiento serio, resultados medibles";
const DESCRIPTION =
  "Un gimnasio con equipamiento completo, entrenadores certificados y seguimiento real de tu progreso. Musculación, funcional, boxeo, spinning y más. Sumate hoy.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "gimnasio Villa Devoto",
    "gimnasio CABA",
    "musculación",
    "entrenamiento funcional",
    "boxeo",
    "spinning",
    "Mi Gimnasio",
  ],
  authors: [{ name: "Mi Gimnasio" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Mi Gimnasio",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-white">
        {children}
      </body>
    </html>
  );
}
