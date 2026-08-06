import { Dumbbell } from "lucide-react";

const WORDS = [
  "FUERZA",
  "DISCIPLINA",
  "RESULTADOS",
  "PROGRESO",
  "CONSTANCIA",
  "ENERGÍA",
  "SUPERACIÓN",
];

export default function Marquee() {
  const track = [...WORDS, ...WORDS];

  return (
    <div
      aria-hidden
      className="relative -rotate-1 overflow-hidden border-y-2 border-ink bg-power py-3"
    >
      <div className="animate-marquee flex w-max items-center gap-6">
        {track.map((word, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-6 text-xl tracking-wide text-ink sm:text-2xl"
          >
            {word}
            <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
          </span>
        ))}
      </div>
    </div>
  );
}
