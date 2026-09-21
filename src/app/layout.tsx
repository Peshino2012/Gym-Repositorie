import type { Metadata, Viewport } from "next";
import { Sora, Bebas_Neue } from "next/font/google";
import { getSiteData } from "@/lib/gestorApi";
import { siteConfig } from "@/lib/siteConfig";
import BackToTop from "@/components/BackToTop";
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

const SITE_URL = siteConfig.siteUrl;
const TAGLINE = "Entrenamiento serio, resultados medibles";
const DESCRIPTION =
  siteConfig.hero.description ??
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
    keywords: siteConfig.showPlaceholderContent
      ? ["gimnasio Villa Devoto", "gimnasio CABA", "musculación", "entrenamiento funcional", "boxeo", "spinning", gymName]
      : ["musculación", "entrenamiento funcional", "pesas libres", gymName],
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
    // No explicit `icons` entry — that used to hardcode a link to
    // /favicon.ico (deleted; see icon.tsx), which silently overrides
    // Next's automatic file-convention icon detection and would keep
    // pointing at a 404 forever otherwise. Leaving this out lets Next
    // auto-link to whatever icon.tsx generates.
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
      {siteConfig.themeColor && (
        <head>
          <style>{`:root { --primary: ${siteConfig.themeColor}; }`}</style>
        </head>
      )}
      <body className="min-h-full flex flex-col bg-ink text-white">
        {/* Invisible until focused — lets a keyboard/screen-reader user
            skip the header nav and jump straight to the page content. */}
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Saltar al contenido
        </a>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
