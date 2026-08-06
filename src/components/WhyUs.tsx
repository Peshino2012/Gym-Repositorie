import { BadgeCheck, Clock, Cpu, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Entrenadores certificados",
    desc: "Profes con formación real, siempre cerca para corregir tu técnica.",
  },
  {
    icon: Clock,
    title: "Horarios flexibles",
    desc: "Abierto de 6 a 23hs. Entrená antes de laburar o después de cenar.",
  },
  {
    icon: Cpu,
    title: "Equipamiento moderno",
    desc: "Máquinas renovadas y mantenimiento constante. Nada que se rompa a mitad de serie.",
  },
  {
    icon: TrendingUp,
    title: "Seguimiento de resultados",
    desc: "Evaluaciones periódicas y objetivos claros para que veas tu progreso, no solo lo sientas.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-volt">
            Por qué PULSO
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            No es un gimnasio más.{" "}
            <span className="text-gradient-power">Es tu gimnasio.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Nada de cadenas gigantes ni filas para las máquinas. Un espacio
            pensado para que vengas, entrenes fuerte y te vayas mejor de lo
            que llegaste — todos los días.
          </p>
        </ScrollReveal>

        <ScrollReveal
          as="div"
          stagger={0.08}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-line bg-ink p-6 transition-all duration-300 hover:-translate-y-1 hover:border-volt/50"
            >
              <div className="hover-ring relative flex h-11 w-11 items-center justify-center rounded-xl bg-volt/10 text-volt transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
