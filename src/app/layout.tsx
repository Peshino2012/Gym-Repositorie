import type { Metadata, Viewport } from "next";
import { Sora, Bebas_Neue } from "next/font/google";
import { getSiteData } from "@/lib/gestorApi";
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
const TAGLINE = "Entrenamiento serio, resultados medibles";
const DESCRIPTION =
  "Un gimnasio con equipamiento completo, entrenadores certificados y seguimiento real de tu progreso. Musculación, funcional, boxeo, spinning y más. Sumate hoy.";

// Metadata needs the same real gym name the page itself shows (site.gym.name)
// — a static title/siteName here would repeat the same mistake Header/Footer
// had: every client's site tab/search-result would read as some OTHER gym.
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  const gymName = site.gym.name;
  const title = `${gymName} — ${TAGLINE}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: DESCRIPTION,
    keywords: [
      "gimnasio Villa Devoto",
      "gimnasio CABA",
      "musculación",
      "entrenamiento funcional",
      "boxeo",
      "spinning",
      gymName,
    ],
    authors: [{ name: gymName }],
    alternates: { canonical: SITE_URL },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: SITE_URL,
      siteName: gymName,
      title,
      description: DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: DESCRIPTION,
    },
    robots: { index: true, follow: true },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

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
