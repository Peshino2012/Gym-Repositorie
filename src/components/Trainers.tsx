import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import type { SiteTrainer } from "@/lib/gestorApi";
import { siteConfig } from "@/lib/siteConfig";

const GRADIENTS = [
  "from-power to-power-2",
  "from-volt to-power-2",
  "from-power-2 to-power",
  "from-volt to-power",
];

const FALLBACK_TRAINERS = [
  { name: "Nico Ferreyra", role: "Musculación & Fuerza" },
  { name: "Vale Suárez", role: "Funcional & Crossfit" },
  { name: "Tomi Aguirre", role: "Boxeo" },
  { name: "Cami Rojas", role: "Yoga & Movilidad" },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Trainers({ trainers = [] }: { trainers?: SiteTrainer[] }) {
  const showFallback = trainers.length === 0 && siteConfig.showPlaceholderContent;
  const displayTrainers =
    trainers.length > 0
      ? trainers.map((t) => ({
          key: t.id,
          name: t.name,
          role: t.specialty ?? "",
          photoUrl: t.photoUrl,
        }))
      : showFallback
        ? FALLBACK_TRAINERS.map((t) => ({ key: t.name, ...t, photoUrl: null as string | null }))
        : [];

  return (
    <section id="entrenadores" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-volt">
            El equipo
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            Los que te van a{" "}
            <span className="text-gradient-power">empujar más fuerte.</span>
          </h2>
        </ScrollReveal>

        {displayTrainers.length > 0 ? (
          <ScrollReveal
            as="div"
            stagger={0.08}
            className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4"
          >
            {displayTrainers.map((t, i) => (
              <div key={t.key} className="group text-center">
                {t.photoUrl ? (
                  <Image
                    src={t.photoUrl}
                    alt={t.name}
                    width={144}
                    height={144}
                    className="mx-auto aspect-square w-full max-w-[9rem] rounded-2xl object-cover transition-transform duration-300 ease-out group-hover:-rotate-2 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={`mx-auto flex aspect-square w-full max-w-[9rem] items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} font-display text-4xl text-ink transition-transform duration-300 ease-out group-hover:-rotate-2 group-hover:scale-105`}
                  >
                    {initialsOf(t.name)}
                  </div>
                )}
                <h3 className="mt-4 text-base font-bold transition-colors duration-300 group-hover:text-power">
                  {t.name}
                </h3>
                {t.role && (
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {t.role}
                  </p>
                )}
              </div>
            ))}
          </ScrollReveal>
        ) : (
          <p className="mt-14 rounded-2xl border border-dashed border-line py-10 text-center text-sm text-muted-2">
            Todavía no cargaste entrenadores — hacelo desde el panel.
          </p>
        )}
      </div>
    </section>
  );
}
