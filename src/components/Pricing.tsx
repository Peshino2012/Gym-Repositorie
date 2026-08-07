import { Check, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import MagneticButton from "./MagneticButton";
import type { SitePlan } from "@/lib/gestorApi";

const CYCLE_PERIOD: Record<SitePlan["billingCycle"], string> = {
  MONTHLY: "/mes",
  QUARTERLY: "/trimestre",
  ANNUAL: "/año",
};

const FALLBACK_PLANS = [
  {
    key: "basico",
    name: "Básico",
    price: 12000,
    period: "/mes",
    highlight: false,
    features: [
      "Acceso a sala de musculación",
      "2 clases grupales por semana",
      "Evaluación física inicial",
    ],
  },
  {
    key: "full",
    name: "Full",
    price: 18000,
    period: "/mes",
    highlight: true,
    features: [
      "Acceso ilimitado a sala",
      "Todas las clases grupales",
      "Seguimiento mensual con entrenador",
      "Sin permanencia mínima",
    ],
  },
  {
    key: "anual",
    name: "Anual",
    price: 15000,
    period: "/mes",
    highlight: false,
    features: [
      "Todo lo del plan Full",
      "2 meses bonificados al año",
      "Congelamiento de cuota x30 días",
    ],
  },
];

export default function Pricing({ plans = [] }: { plans?: SitePlan[] }) {
  const displayPlans =
    plans.length > 0
      ? plans.map((p) => ({
          key: p.id,
          name: p.name,
          price: p.price,
          period: CYCLE_PERIOD[p.billingCycle],
          highlight: false,
          features: p.features,
        }))
      : FALLBACK_PLANS;

  return (
    <section id="planes" className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-power">
            Planes
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            Planes simples.{" "}
            <span className="text-gradient-power">Resultados medibles.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal
          as="div"
          stagger={0.1}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {displayPlans.map((plan) => (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-2xl border p-8 transition-transform duration-300 ${
                plan.highlight
                  ? "border-power bg-surface shadow-[0_0_60px_-15px_rgba(255,59,46,0.5)] md:-translate-y-3"
                  : "border-line bg-surface/60 hover:-translate-y-1.5"
              }`}
            >
              {plan.highlight && (
                <span className="animate-pulse-ring absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-power px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                  <Star className="h-3.5 w-3.5" fill="currentColor" />
                  Más elegido
                </span>
              )}

              <h3 className="font-display text-2xl">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">$</span>
                <AnimatedCounter
                  to={plan.price}
                  thousands
                  className="font-display text-4xl"
                />
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <div className="mt-7 flex-1">
                {plan.features.length > 0 && (
                  <ScrollReveal
                    as="ul"
                    variant="pop"
                    stagger={0.07}
                    duration={0.5}
                    className="flex flex-col gap-3"
                  >
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            plan.highlight ? "text-power" : "text-volt"
                          }`}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ScrollReveal>
                )}
              </div>

              <MagneticButton className="mt-8 w-full">
                <a
                  href="#contacto"
                  className={`flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                    plan.highlight
                      ? "bg-power text-white hover:bg-power-2"
                      : "border border-line text-white hover:border-volt hover:text-volt"
                  }`}
                >
                  Elegir {plan.name}
                </a>
              </MagneticButton>
            </div>
          ))}
        </ScrollReveal>

        {plans.length === 0 && (
          <p className="mt-8 text-center text-xs text-muted-2">
            *Precios de referencia. Personalizalos con tu tarifa real antes de publicar.
          </p>
        )}
      </div>
    </section>
  );
}
