import { Dumbbell, Flame, Swords, Bike, Wind, Timer, Heart, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";
import type { SiteClassCard } from "@/lib/gestorApi";

const ICON_MAP: Record<string, typeof Dumbbell> = {
  dumbbell: Dumbbell,
  flame: Flame,
  swords: Swords,
  bike: Bike,
  wind: Wind,
  timer: Timer,
  heart: Heart,
  zap: Zap,
};

export default function Classes({ cards = [] }: { cards?: SiteClassCard[] }) {
  return (
    <section id="clases" className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-power">
            Nuestras clases
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            Elegí tu forma de{" "}
            <span className="text-gradient-power">romperla.</span>
          </h2>
        </ScrollReveal>

        {cards.length > 0 ? (
          <ScrollReveal
            as="div"
            stagger={0.08}
            className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cards.map(({ id, title, description, icon }, i) => {
              const Icon = ICON_MAP[icon] ?? Dumbbell;
              return (
                <TiltCard key={id} className="[transform-style:preserve-3d]">
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-power/60">
                    <span
                      aria-hidden
                      className="font-display absolute right-6 top-6 text-xs text-muted-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      0{i + 1}
                    </span>
                    <div
                      aria-hidden
                      className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-power/0 blur-2xl transition-colors duration-300 group-hover:bg-power/25"
                    />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-power transition-all duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-power group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-display relative mt-5 text-2xl">{title}</h3>
                    <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </TiltCard>
              );
            })}
          </ScrollReveal>
        ) : (
          <p className="mt-14 rounded-2xl border border-dashed border-line py-10 text-center text-sm text-muted-2">
            Todavía no cargaste clases — hacelo desde Nuestras Clases en el panel.
          </p>
        )}
      </div>
    </section>
  );
}
