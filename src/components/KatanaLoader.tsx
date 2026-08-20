import { useEffect, useState } from "react";

/**
 * Katana unsheathing loading screen.
 * Timeline (3.4s): grip tightens -> blade slides out of the saya ->
 * gleam runs down the steel -> red flash + slash -> screen reveals.
 */
export default function KatanaLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 3400;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease progress so it tracks the blade motion
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        setTimeout(onDone, 620);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070707] ${
        leaving ? "loader-done" : ""
      }`}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />

      {/* kanji backdrop */}
      <span className="font-jp pointer-events-none absolute select-none text-[26rem] font-black leading-none text-white/[0.03]">
        抜刀
      </span>

      {/* red flash when blade is free */}
      <div className="loader-flash pointer-events-none absolute inset-0 bg-[#c1171c]" />
      {/* white slash streak */}
      <div className="loader-slash pointer-events-none absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 -rotate-6 bg-white" />

      <div className="relative w-[min(92vw,880px)] overflow-hidden">
        <svg viewBox="0 0 1500 120" className="w-full">
          <defs>
            <linearGradient id="blade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f4f4f4" />
              <stop offset="45%" stopColor="#b9bec6" />
              <stop offset="55%" stopColor="#8f959e" />
              <stop offset="100%" stopColor="#dfe3e8" />
            </linearGradient>
            <linearGradient id="sayaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2a2e" />
              <stop offset="45%" stopColor="#0c0c0e" />
              <stop offset="100%" stopColor="#1b1b1f" />
            </linearGradient>
            <pattern id="ito" width="14" height="12" patternUnits="userSpaceOnUse">
              <rect width="14" height="12" fill="#141416" />
              <path d="M0 12 L14 0 M-4 4 L4 -4 M10 16 L18 8" stroke="#c1171c" strokeWidth="2.4" />
            </pattern>
          </defs>

          {/* ===== KATANA (slides out) ===== */}
          <g className="katana-blade-group">
            {/* tsuka (handle) */}
            <rect x="30" y="46" width="150" height="28" rx="12" fill="url(#ito)" stroke="#000" />
            <circle cx="46" cy="60" r="4" fill="#d8d8d8" opacity="0.7" />
            <circle cx="164" cy="60" r="4" fill="#d8d8d8" opacity="0.7" />
            {/* kashira (pommel) */}
            <rect x="22" y="47" width="12" height="26" rx="5" fill="#3a3a3f" stroke="#000" />
            {/* tsuba (guard) */}
            <circle cx="186" cy="60" r="21" fill="#1c1c20" stroke="#c1171c" strokeWidth="2" />
            <circle cx="186" cy="60" r="7" fill="#0a0a0a" />
            {/* blade */}
            <path
              d="M200 51 L1230 51 Q1295 55 1338 60 Q1295 65 1230 69 L200 69 Z"
              fill="url(#blade)"
              stroke="#e8eaee"
              strokeWidth="0.6"
            />
            {/* hamon (temper line) */}
            <path
              d="M210 63 Q300 58 390 63 T570 63 T750 63 T930 63 T1110 63 T1290 61"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.6"
              opacity="0.75"
            />
          </g>

          {/* ===== SAYA / scabbard (stays, drawn on top to hide the blade inside it) ===== */}
          <g className="katana-saya">
            {/* widened to fully cover the blade's resting length (tip sits at x=1338) */}
            <rect x="196" y="44" width="1160" height="32" rx="15" fill="url(#sayaGrad)" stroke="#000" />
            <rect x="196" y="46" width="1160" height="5" rx="2" fill="#ffffff" opacity="0.08" />
            {/* kojiri (end cap) — repositioned to the new right edge */}
            <rect x="1342" y="46" width="16" height="28" rx="7" fill="#3a3a3f" stroke="#000" />
            {/* sageo cord wraps */}
            {[210, 226, 242, 258, 274].map((x) => (
              <rect key={x} x={x} y="42" width="7" height="36" rx="3" fill="#c1171c" stroke="#7a0d10" />
            ))}
          </g>

          {/* gleam that runs along the exposed blade */}
          <g className="loader-gleam" opacity="0">
            <rect x="200" y="57" width="1140" height="6" fill="#ffffff" opacity="0.9" />
          </g>
        </svg>
      </div>

      <div className="relative mt-14 flex flex-col items-center gap-3">
        <p className="font-display text-sm tracking-[0.5em] text-[#e8e2d5]/80">
          UNSHEATHING<span className="text-[#c1171c]">…</span>
        </p>
        <p className="font-jp text-xs tracking-[0.6em] text-white/40">抜刀術</p>
        <div className="mt-2 h-px w-64 bg-white/15">
          <div
            className="h-full bg-[#c1171c] transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono2 text-xs text-white/50">{progress}%</p>
      </div>
    </div>
  );
}