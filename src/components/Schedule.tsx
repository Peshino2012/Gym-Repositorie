import { Sunrise, Sun, Sunset, Moon, Dumbbell, CalendarDays } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import type { SiteScheduleBlock } from "@/lib/gestorApi";

const ICON_MAP: Record<string, typeof Sun> = {
  sunrise: Sunrise,
  sun: Sun,
  sunset: Sunset,
  moon: Moon,
  dumbbell: Dumbbell,
  calendar: CalendarDays,
};

export default function Schedule({ blocks }: { blocks: SiteScheduleBlock[] }) {
  return (
    <section id="horarios" className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-power">
            Horarios
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            Lunes a sábado.{" "}
            <span className="text-gradient-power">Sin excusas.</span>
          </h2>
        </ScrollReveal>

        {blocks.length > 0 ? (
          <ScrollReveal
            as="div"
            stagger={0.1}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {blocks.map(({ id, title, hoursLabel, icon, entries }) => {
              const Icon = ICON_MAP[icon] ?? Sun;
              return (
                <div
                  key={id}
                  className="rounded-2xl border border-line bg-surface p-7"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-power">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl leading-none">
                        {title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-2">{hoursLabel}</p>
                    </div>
                  </div>

                  <ul className="mt-6 divide-y divide-line">
                    {entries.map((entry) => (
                      <li
                        key={entry.id}
                        className="group/row relative flex items-center justify-between py-3 pl-0 text-sm transition-[padding] duration-300 before:absolute before:inset-y-1.5 before:left-[-1px] before:w-0.5 before:origin-top before:scale-y-0 before:bg-power before:transition-transform before:duration-300 before:content-[''] hover:pl-3 hover:before:scale-y-100"
                      >
                        <span className="text-muted-foreground transition-colors duration-300 group-hover/row:text-white">
                          {entry.name}
                        </span>
                        <span className="font-semibold text-white transition-transform duration-300 group-hover/row:scale-110 group-hover/row:text-power">
                          {entry.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </ScrollReveal>
        ) : (
          <p className="mt-14 rounded-2xl border border-dashed border-line py-10 text-center text-sm text-muted-2">
            Todavía no cargaste horarios — hacelo desde Horarios en el panel.
          </p>
        )}
      </div>
    </section>
  );
}
