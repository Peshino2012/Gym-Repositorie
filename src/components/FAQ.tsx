import { ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// Generic, true-for-any-gym copy — no fabricated specifics (hours, prices,
// policies) that would need to be right for every client this template
// gets deployed to. A gym with something to add can extend this list from
// real content later; this is the honest floor.
const FAQS = [
  {
    q: "¿Necesito experiencia previa para empezar?",
    a: "No, para nada. Te acompañamos desde el día uno con una evaluación inicial y te vamos guiando en cada ejercicio.",
  },
  {
    q: "¿Puedo probar antes de anotarme?",
    a: "Sí — escribinos por WhatsApp y coordinamos tu clase de prueba sin compromiso.",
  },
  {
    q: "¿Qué tengo que llevar?",
    a: "Ropa cómoda, una botella de agua y toalla. El resto del equipamiento lo ponemos nosotros.",
  },
  {
    q: "¿Cómo se paga la cuota?",
    a: "Coordinalo directamente con nosotros — te contamos las opciones disponibles cuando te acerques o nos escribas.",
  },
  {
    q: "¿Puedo pausar o cancelar cuando quiera?",
    a: "Consultanos las condiciones de tu plan puntual — te las explicamos claro antes de que te anotes, sin letra chica.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-power">
            Preguntas frecuentes
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            ¿Tenés dudas?{" "}
            <span className="text-gradient-power">Empecemos por acá.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal as="div" stagger={0.06} className="mt-10 flex flex-col gap-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-line bg-surface/60 p-5 open:border-power/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white marker:content-none">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-power transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
