import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";
import { siteConfig } from "@/lib/siteConfig";

const STATS = [
  { to: 500, suffix: "+", label: "Miembros activos" },
  { to: 8, suffix: "", label: "Años de trayectoria" },
  { to: 20, suffix: "+", label: "Clases por semana" },
  { to: 98, suffix: "%", label: "Nos recomienda" },
];

// These numbers aren't backed by real data anywhere — fine as sales-demo
// flourish, but showing them on a real client's site would be fabricating
// stats about their business.
export default function Stats() {
  if (!siteConfig.showPlaceholderContent) return null;

  return (
    <section className="border-b border-line bg-surface">
      <ScrollReveal
        as="div"
        stagger={0.1}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4"
      >
        {STATS.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="font-display text-4xl text-gradient-power sm:text-5xl">
              <AnimatedCounter to={s.to} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
