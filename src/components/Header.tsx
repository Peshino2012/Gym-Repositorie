"use client";

import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Header({
  classesEnabled = true,
  horariosEnabled = true,
  planesEnabled = true,
}: {
  classesEnabled?: boolean;
  horariosEnabled?: boolean;
  planesEnabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const LINKS = [
    ...(classesEnabled ? [{ href: "#clases", label: "Clases" }] : []),
    ...(planesEnabled ? [{ href: "#planes", label: "Planes" }] : []),
    { href: "#entrenadores", label: "Equipo" },
    ...(horariosEnabled ? [{ href: "#horarios", label: "Horarios" }] : []),
    { href: "#contacto", label: "Contacto" },
  ];

  const ctaHref = planesEnabled ? "#planes" : "#contacto";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 py-5 lg:px-16">
      <div className="flex items-center justify-between">
        <a
          href="#inicio"
          className="flex items-center gap-1.5 text-xl font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          <Zap className="h-4 w-4 fill-primary text-primary" strokeWidth={0} />
          Mi Gimnasio
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden rounded-lg bg-nav-button px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-foreground transition-all hover:bg-nav-button/80 active:scale-[0.97] md:inline-flex md:items-center"
        >
          Sumate gratis
        </a>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-nav-button text-foreground transition-transform active:scale-[0.93] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="animate-fade-up mt-4 flex flex-col gap-1 rounded-2xl border border-border bg-ink/95 p-3 backdrop-blur-md md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:bg-nav-button hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all active:scale-[0.97]"
          >
            Sumate gratis
          </a>
        </nav>
      )}
    </header>
  );
}
