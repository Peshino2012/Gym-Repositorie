"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

export default function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) videoRef.current?.pause();
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden
      className="absolute inset-0 z-0 h-full w-full object-cover"
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  );
}
