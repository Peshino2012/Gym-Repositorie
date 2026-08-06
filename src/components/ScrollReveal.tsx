"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  /** animate direct children as a stagger group instead of the wrapper as one block */
  stagger?: number;
  as?: "div" | "section" | "ul";
  /** "fade" slides+fades in; "pop" scales in with a slight overshoot — better for small, discrete items like checkmarks */
  variant?: "fade" | "pop";
};

export default function ScrollReveal({
  children,
  className,
  y = 40,
  delay = 0,
  duration = 0.8,
  stagger,
  as = "div",
  variant = "fade",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : [el];
    const from = variant === "pop" ? { opacity: 0, scale: 0.5 } : { opacity: 0, y };
    const to = variant === "pop" ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 };
    const ease = variant === "pop" ? "back.out(1.7)" : "power3.out";

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(targets, from);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(targets, {
          ...to,
          duration,
          delay,
          ease,
          stagger: stagger ?? 0,
        });
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [y, delay, duration, stagger, variant]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
