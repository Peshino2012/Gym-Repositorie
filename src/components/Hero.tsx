import HeroVideo from "./HeroVideo";

export default function Hero({
  titleLine1 = "MI",
  titleLine2 = "GIMNASIO",
  subtitle = "Entrenás con todo. Progreso que se mide.",
  description = "Musculación, funcional, boxeo y clases grupales con seguimiento real de tu progreso. Equipamiento moderno, entrenadores certificados, planes pensados para resultados.",
  tagline,
  whatsappPhone,
}: {
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  description?: string;
  tagline?: string;
  /** Digits-only phone. When present, "Reservar clase" opens WhatsApp directly instead of scrolling to the contact form. */
  whatsappPhone?: string;
}) {
  const reserveHref = whatsappPhone
    ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hola! Quiero reservar una clase.")}`
    : "#contacto";

  return (
    <section
      id="inicio"
      className="grain relative flex min-h-screen items-end overflow-hidden bg-hero-bg"
    >
      {/* atmospheric background loop — desaturated so its own baked-in
          lighting (warm/red in the stock footage) doesn't fight whatever
          color this gym's theme actually is; the tint layer below recolors
          it toward --primary instead. */}
      <div className="absolute inset-0 [filter:saturate(0.25)_brightness(0.85)]">
        <HeroVideo src="/media/gym-loop.mp4" />
      </div>

      {/* ties the muted footage to this gym's own brand color instead of
          neutral gray — "color" blend mode recolors by hue without
          flattening the video's own light/dark detail */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-primary/50 [mix-blend-mode:color] pointer-events-none"
      />

      {/* ambient aurora glow, layered over the video */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="animate-aurora absolute -left-32 top-0 h-[32rem] w-[32rem] rounded-full bg-power/20 blur-[110px]" />
        <div
          className="animate-aurora absolute right-0 top-1/3 h-[26rem] w-[26rem] rounded-full bg-volt/10 blur-[110px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
      </div>

      {/* dark overlay for legibility */}
      <div className="absolute inset-0 z-[1] bg-black/60 pointer-events-none" />

      {/* content, bottom-left anchored */}
      <div className="relative z-10 w-full max-w-[90%] px-6 pb-14 pt-32 pointer-events-none sm:max-w-md md:px-10 md:pb-16 lg:max-w-2xl">
        <h1 className="font-display mb-2 text-[clamp(3.5rem,9vw,7.5rem)] uppercase leading-[0.9] text-foreground md:mb-4">
          <span
            className="block opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {titleLine1}
          </span>
          <span
            className="block text-primary opacity-0 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            {titleLine2}
          </span>
        </h1>

        <p
          className="mb-3 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light text-foreground/80 opacity-0 animate-fade-up md:mb-6"
          style={{ animationDelay: "0.4s" }}
        >
          {subtitle}
        </p>

        <p
          className="mb-4 max-w-md text-[clamp(0.875rem,1.5vw,1.25rem)] font-light text-muted-foreground opacity-0 animate-fade-up md:mb-8"
          style={{ animationDelay: "0.55s" }}
        >
          {description}
        </p>

        <div
          className="flex flex-wrap gap-3 font-bold opacity-0 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href={reserveHref}
            target={whatsappPhone ? "_blank" : undefined}
            rel={whatsappPhone ? "noopener noreferrer" : undefined}
            className="pointer-events-auto cursor-pointer rounded-sm bg-primary px-6 py-3 text-sm text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97] md:px-8 md:py-4"
          >
            Reservar clase
          </a>
          <a
            href="#planes"
            className="pointer-events-auto cursor-pointer rounded-sm bg-white px-6 py-3 text-sm text-hero-bg transition-all hover:brightness-90 active:scale-[0.97] md:px-8 md:py-4"
          >
            Ver planes
          </a>
        </div>

        {tagline && (
          <p
            className="mt-4 text-xs font-light text-muted-foreground/60 opacity-0 animate-fade-up md:mt-6"
            style={{ animationDelay: "0.85s" }}
          >
            {tagline}
          </p>
        )}
      </div>
    </section>
  );
}
