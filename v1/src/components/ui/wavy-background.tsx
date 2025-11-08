"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import { createNoise3D, type NoiseFunction3D } from "simplex-noise";

type Speed = "slow" | "fast";

type WavyBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: Speed;
  waveOpacity?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef<number>(0); // time accumulator
  const noiseRef = useRef<NoiseFunction3D | null>(null);

  // init noise once
  if (!noiseRef.current) {
    noiseRef.current = createNoise3D();
  }

  const waveColors = useMemo(
    () =>
      colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
    [colors]
  );

  const speedScalar = useMemo<number>(() => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
      default:
        return 0.002;
    }
  }, [speed]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    // Work in CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.filter = `blur(${blur}px)`;
  }, [blur]);

  const drawWave = useCallback(
    (w: number, h: number, layers: number) => {
      const ctx = ctxRef.current;
      const noise = noiseRef.current;
      if (!ctx || !noise) return;

      tRef.current += speedScalar;

      for (let i = 0; i < layers; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        // opacity handled globally in render()

        for (let x = 0; x <= w; x += 5) {
          const y = noise(x / 800, 0.3 * i, tRef.current) * 100;
          if (x === 0) ctx.moveTo(x, y + h * 0.5);
          else ctx.lineTo(x, y + h * 0.5);
        }

        ctx.stroke();
        ctx.closePath();
      }
    },
    [speedScalar, waveWidth, waveColors]
  );

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Background fill and global alpha
    ctx.globalAlpha = 1;
    ctx.fillStyle = backgroundFill;
    ctx.fillRect(0, 0, w, h);

    ctx.globalAlpha = waveOpacity;
    drawWave(w, h, 5);
    ctx.globalAlpha = 1;

    rafRef.current = requestAnimationFrame(render);
  }, [backgroundFill, waveOpacity, drawWave]);

  useEffect(() => {
    resizeCanvas();
    // reset time to avoid jumps
    tRef.current = 0;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(render);

    const onResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [resizeCanvas, render]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "relative h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full"
        id="canvas"
        style={{ ...(isSafari ? { filter: `blur(${blur}px)` } : {}) }}
        aria-hidden
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
