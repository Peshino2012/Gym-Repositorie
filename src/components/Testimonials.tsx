import { Star, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const REVIEWS = [
  {
    name: "Fernanda G.",
    since: "Socia desde 2022",
    quote:
      "Probé gimnasios grandes y siempre era un número más. Acá los profes se acuerdan hasta de mi lesión de rodilla.",
  },
  {
    name: "Diego M.",
    since: "Socio desde 2021",
    quote:
      "Empecé sin idea de nada. Hoy entreno funcional 4 veces por semana y bajé 12 kilos. El grupo te empuja.",
  },
  {
    name: "Rocío P.",
    since: "Socia desde 2023",
    quote:
      "Los horarios flexibles me salvan la semana. Entro a las 6am antes de laburar y ya arranco el día con otra energía.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-volt">
            Resultados reales
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            No te lo contamos nosotros.{" "}
            <span className="text-gradient-power">Te lo cuentan ellos.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal
          as="div"
          stagger={0.08}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="group flex flex-col rounded-2xl border border-line bg-ink p-7 transition-all duration-300 hover:-translate-y-1 hover:border-volt/40"
            >
              <Quote
                className="h-6 w-6 text-power/50 transition-transform duration-300 group-hover:scale-110 group-hover:text-power"
                fill="currentColor"
              />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                “{r.quote}”
              </blockquote>
              <ScrollReveal
                as="div"
                variant="pop"
                stagger={0.06}
                duration={0.4}
                className="mt-6 flex items-center gap-1 text-volt"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
                ))}
              </ScrollReveal>
              <figcaption className="mt-3">
                <p className="text-sm font-bold text-white">{r.name}</p>
                <p className="text-xs text-muted-2">{r.since}</p>
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
