import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PULSO GYM — Entrenamiento serio, resultados medibles",
  description:
    "PULSO es un gimnasio con equipamiento completo, entrenadores certificados y seguimiento real de tu progreso. Musculación, funcional, boxeo, spinning y más. Sumate hoy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-white">
        {children}
      </body>
    </html>
  );
}
