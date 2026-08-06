import { Zap } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./icons/SocialIcons";

const LINKS = [
  { href: "#clases", label: "Clases" },
  { href: "#planes", label: "Planes" },
  { href: "#entrenadores", label: "Entrenadores" },
  { href: "#horarios", label: "Horarios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer({
  address = "Av. Nazca 1234, Villa Devoto, CABA",
}: {
  address?: string;
}) {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <a
              href="#inicio"
              className="font-display flex items-center gap-1.5 text-2xl tracking-wide"
            >
              <Zap className="h-5 w-5 fill-power text-power" strokeWidth={0} />
              PULSO
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Entrenamiento serio, resultados medibles, todos los días.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:border-power hover:text-power"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:border-power hover:text-power"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 sm:justify-end">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PULSO Gym. Todos los derechos reservados.</p>
          <p>{address}</p>
        </div>
      </div>
    </footer>
  );
}
