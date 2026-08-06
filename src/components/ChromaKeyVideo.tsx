"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Props = {
  src: string;
  className?: string;
};

const WIDTH = 640;
const HEIGHT = 360;

export default function ChromaKeyVideo({ src, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const reduced = prefersReducedMotion();
    let rafId = 0;

    const keyFrame = () => {
      ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);
      const frame = ctx.getImageData(0, 0, WIDTH, HEIGHT);
      const data = frame.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (g > 70 && g > r * 1.15 && g > b * 1.15) {
          data[i + 3] = 0;
        } else if (g > 55 && g > r * 1.02 && g > b * 1.02) {
          data[i + 3] = 90;
        }
      }

      ctx.putImageData(frame, 0, 0);
    };

    const loop = () => {
      if (video.readyState >= 2) keyFrame();
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      video.play().catch(() => {});
      if (reduced) {
        keyFrame();
      } else {
        loop();
      }
    };

    if (video.readyState >= 2) start();
    else video.addEventListener("loadeddata", start, { once: true });

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadeddata", start);
    };
  }, []);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="hidden"
        aria-hidden
      />
      <canvas ref={canvasRef} className="h-full w-full object-contain" aria-hidden />
    </div>
  );
}
