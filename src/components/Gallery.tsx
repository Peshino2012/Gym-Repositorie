import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import type { SiteGalleryPhoto } from "@/lib/gestorApi";

// Same reasoning as Classes/Schedule: the old placeholder tiles + "subilas
// tus fotos reales" caption were aimed at the gym owner, not their
// customers — hide the whole section until there are real photos.
export default function Gallery({ photos = [] }: { photos?: SiteGalleryPhoto[] }) {
  if (photos.length === 0) return null;

  return (
    <section id="galeria" className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-power">
            Galería
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            Así se vive{" "}
            <span className="text-gradient-power">un día en el gimnasio.</span>
          </h2>
        </ScrollReveal>

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
      </div>
    </section>
  );
}
