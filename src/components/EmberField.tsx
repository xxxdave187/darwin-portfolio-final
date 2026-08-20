import { useEffect, useRef } from "react";

/**
 * Rising ember particles — glowing red motes that drift upward with
 * flicker and sideways waver. Used as an animated section background.
 */
export default function EmberField({
  density = 40,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    type Ember = {
      x: number; y: number; r: number;
      vy: number; waver: number; phase: number; speed: number; life: number;
    };
    const embers: Ember[] = [];

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const spawn = (initial: boolean): Ember => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 2.2,
      vy: 0.15 + Math.random() * 0.5,
      waver: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.025,
      life: 0.4 + Math.random() * 0.6,
    });
    for (let i = 0; i < density; i++) embers.push(spawn(true));

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.phase += e.speed;
        e.x += Math.sin(e.phase) * e.waver * 0.4;
        e.y -= e.vy;

        // flicker
        const flicker = 0.55 + Math.sin(e.phase * 3.1) * 0.45;
        const fadeTop = Math.min(1, e.y / (h * 0.25)); // fade near the top
        const a = e.life * flicker * fadeTop;

        if (e.y < -12) {
          embers[i] = spawn(false);
          continue;
        }
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 3.2);
        g.addColorStop(0, `rgba(255, 120, 90, ${a})`);
        g.addColorStop(0.4, `rgba(214, 40, 45, ${a * 0.7})`);
        g.addColorStop(1, "rgba(120, 10, 14, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}
