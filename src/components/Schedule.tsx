import { Sunrise, Sun, Moon } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const SLOTS = [
  {
    icon: Sunrise,
    title: "Mañana",
    hours: "6:00 – 10:00",
    classes: [
      { time: "6:00", name: "Musculación libre" },
      { time: "7:30", name: "Funcional" },
      { time: "8:30", name: "Spinning" },
    ],
  },
  {
    icon: Sun,
    title: "Mediodía",
    hours: "12:00 – 14:00",
    classes: [
      { time: "12:00", name: "Musculación libre" },
      { time: "13:00", name: "Yoga" },
    ],
  },
  {
    icon: Moon,
    title: "Tarde/Noche",
    hours: "17:00 – 22:00",
    classes: [
      { time: "18:00", name: "Boxeo" },
      { time: "19:00", name: "Crossfit" },
      { time: "20:00", name: "Funcional" },
      { time: "17:00 – 22:00", name: "Musculación libre" },
    ],
  },
];

export default function Schedule() {
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

        <ScrollReveal
          as="div"
          stagger={0.1}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {SLOTS.map(({ icon: Icon, title, hours, classes }) => (
            <div
              key={title}
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
                  <p className="mt-1 text-xs text-muted-2">{hours}</p>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-line">
                {classes.map((c) => (
                  <li
                    key={c.name + c.time}
                    className="group/row relative flex items-center justify-between py-3 pl-0 text-sm transition-[padding] duration-300 before:absolute before:inset-y-1.5 before:left-[-1px] before:w-0.5 before:origin-top before:scale-y-0 before:bg-power before:transition-transform before:duration-300 before:content-[''] hover:pl-3 hover:before:scale-y-100"
                  >
                    <span className="text-muted-foreground transition-colors duration-300 group-hover/row:text-white">
                      {c.name}
                    </span>
                    <span className="font-semibold text-white transition-transform duration-300 group-hover/row:scale-110 group-hover/row:text-power">
                      {c.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollReveal>

        <p className="mt-8 text-center text-sm text-muted-2">
          Sábados: 8:00 – 13:00, horario reducido de clases grupales.
        </p>
      </div>
    </section>
  );
}
