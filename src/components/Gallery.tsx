import Image from "next/image";
import { Camera } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import type { SiteGalleryPhoto } from "@/lib/gestorApi";

const TILES = [
  { label: "Sala de musculación", span: "sm:col-span-2 sm:row-span-2", gradient: "from-power/40 via-ink to-ink" },
  { label: "Clase funcional", span: "", gradient: "from-volt/30 via-ink to-ink" },
  { label: "Boxeo", span: "", gradient: "from-power-2/40 via-ink to-ink" },
  { label: "Spinning", span: "sm:col-span-2", gradient: "from-power/30 via-ink to-ink" },
  { label: "Yoga", span: "", gradient: "from-volt/25 via-ink to-ink" },
  { label: "Equipamiento", span: "", gradient: "from-power-2/30 via-ink to-ink" },
];

export default function Gallery({ photos = [] }: { photos?: SiteGalleryPhoto[] }) {
  return (
    <section id="galeria" className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-power">
            Galería
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            Así se vive{" "}
            <span className="text-gradient-power">un día en PULSO.</span>
          </h2>
        </ScrollReveal>

        {photos.length > 0 ? (
          <ScrollReveal
            as="div"
            stagger={0.06}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative flex aspect-square items-end overflow-hidden rounded-2xl border border-line"
              >
                <Image
                  src={photo.url}
                  alt={photo.caption ?? "Foto del gimnasio"}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                {photo.caption && (
                  <span className="relative bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white">
                    {photo.caption}
                  </span>
                )}
              </div>
            ))}
          </ScrollReveal>
        ) : (
          <>
            <ScrollReveal
              as="div"
              stagger={0.06}
              className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:[grid-auto-rows:9rem]"
            >
              {TILES.map((tile) => (
                <div
                  key={tile.label}
                  className={`group relative flex items-end overflow-hidden rounded-2xl border border-line p-4 ${tile.span}`}
                >
                  <div
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-out group-hover:scale-110 ${tile.gradient}`}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"
                  />
                  <Camera
                    aria-hidden
                    className="absolute right-4 top-4 h-5 w-5 text-white/20 transition-all duration-300 group-hover:rotate-12 group-hover:text-white/50"
                  />
                  <span className="relative translate-y-0 text-xs font-semibold uppercase tracking-wide text-white/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:tracking-wider group-hover:text-white">
                    {tile.label}
                  </span>
                </div>
              ))}
            </ScrollReveal>
            <p className="mt-6 text-center text-xs text-muted-2">
              Espacio para fotos reales del gimnasio — subilas desde el panel antes de publicar.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
