"use client";

import { useRef, useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** format with locale thousands separators, e.g. 12000 -> "12.000" */
  thousands?: boolean;
};

export default function AnimatedCounter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
  thousands = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (value: number) => {
      const rounded = Math.round(value);
      const num = thousands ? rounded.toLocaleString("es-AR") : String(rounded);
      return `${prefix}${num}${suffix}`;
    };

    if (prefersReducedMotion()) {
      el.textContent = render(to);
      return;
    }

    const counter = { value: 0 };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(counter, {
          value: to,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = render(counter.value);
          },
        });
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [to, suffix, prefix, duration, thousands]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {thousands ? (0).toLocaleString("es-AR") : 0}
      {suffix}
    </span>
  );
}
