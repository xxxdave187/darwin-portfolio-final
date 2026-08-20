import { useEffect, useRef } from "react";

/**
 * Sakura petals falling from the top corners with real physics:
 * - gravity + per-petal terminal velocity
 * - gusting wind field (layered sine noise)
 * - flutter/tumble rotation (petals rock side to side as they fall)
 * - depth layers (far petals are smaller, slower, fainter)
 * - pointer interaction: moving the cursor creates a gust that pushes petals
 */

type Petal = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  depth: number; // 0.35 (far) -> 1 (near)
  angle: number;
  spin: number;
  swayPhase: number;
  swaySpeed: number;
  hue: number; // color variant
  alpha: number;
};

const PETAL_COUNT = 46;

export default function SakuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const petals: Petal[] = [];
    const pointer = { x: -9999, y: -9999, vx: 0, px: -9999 };
    let raf = 0;
    let time = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (initial: boolean): Petal => {
      // spawn zones: top-left corner and top-right corner
      const fromLeft = Math.random() < 0.5;
      const depth = 0.35 + Math.random() * 0.65;
      const size = (5 + Math.random() * 9) * depth;
      return {
        x: fromLeft
          ? -30 + Math.random() * w * 0.3
          : w * 0.7 + Math.random() * (w * 0.3 + 30),
        y: initial ? Math.random() * h : -30 - Math.random() * h * 0.15,
        vx: (fromLeft ? 1 : -1) * (0.15 + Math.random() * 0.4) * depth,
        vy: 0,
        size,
        depth,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.045,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.008 + Math.random() * 0.018,
        hue: Math.random(),
        alpha: 0.45 + depth * 0.55,
      };
    };

    for (let i = 0; i < PETAL_COUNT; i++) petals.push(spawn(true));

    // wind field: slow base + medium gusts + fast ripple
    const windAt = (x: number, y: number, t: number) =>
      Math.sin(t * 0.0006 + y * 0.0012) * 0.35 +
      Math.sin(t * 0.0017 + x * 0.002) * 0.18 +
      Math.sin(t * 0.004) * 0.08;

    const onMove = (e: PointerEvent) => {
      pointer.vx = e.clientX - pointer.px;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.px = e.clientX;
    };
    window.addEventListener("pointermove", onMove);

    const drawPetal = (p: Petal) => {
      const s = p.size;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      // sakura petal: rounded body with a small notch at the tip
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.9, -s * 0.7, s * 0.75, s * 0.55, 0, s);
      ctx.bezierCurveTo(-s * 0.75, s * 0.55, -s * 0.9, -s * 0.7, 0, -s);
      const grad = ctx.createLinearGradient(0, -s, 0, s);
      if (p.hue < 0.6) {
        grad.addColorStop(0, `rgba(255, 183, 197, ${p.alpha})`);
        grad.addColorStop(1, `rgba(238, 130, 150, ${p.alpha * 0.9})`);
      } else if (p.hue < 0.9) {
        grad.addColorStop(0, `rgba(255, 205, 214, ${p.alpha})`);
        grad.addColorStop(1, `rgba(244, 160, 175, ${p.alpha * 0.9})`);
      } else {
        // rare deep-crimson petal to tie into the theme
        grad.addColorStop(0, `rgba(214, 60, 70, ${p.alpha})`);
        grad.addColorStop(1, `rgba(160, 25, 32, ${p.alpha * 0.9})`);
      }
      ctx.fillStyle = grad;
      ctx.fill();
      // notch
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(-s * 0.12, -s * 0.72);
      ctx.lineTo(s * 0.12, -s * 0.72);
      ctx.closePath();
      ctx.fillStyle = "rgba(7, 7, 7, 0.85)";
      ctx.fill();
      ctx.restore();
    };

    const step = (now: number) => {
      time = now;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // --- forces ---
        // gravity toward terminal velocity (heavier-looking near petals fall faster)
        const terminal = (0.55 + p.size * 0.09) * p.depth;
        p.vy += (terminal - p.vy) * 0.02;

        // wind + horizontal flutter (tumbling side-sway)
        const sway = Math.sin(p.swayPhase) * 0.45 * p.depth;
        const wind = windAt(p.x, p.y, time);
        p.vx += (wind + sway - p.vx) * 0.015;

        // pointer gust: push petals away from fast cursor movement
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 140 * 140) {
          const dist = Math.sqrt(distSq) || 1;
          const force = (1 - dist / 140) * (Math.abs(pointer.vx) * 0.06 + 0.35);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force * 0.4;
        }

        p.x += p.vx;
        p.y += p.vy;

        // tumble: rotation speed breathes with the sway phase
        p.swayPhase += p.swaySpeed;
        p.angle += p.spin + Math.sin(p.swayPhase * 1.3) * 0.012;

        // recycle when off-screen
        if (p.y > h + 40 || p.x < -60 || p.x > w + 60) {
          petals[i] = spawn(false);
          continue;
        }
        drawPetal(p);
      }

      pointer.vx *= 0.9; // gust decays
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  );
}
