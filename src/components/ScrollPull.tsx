import { useEffect, useRef, type ReactNode } from "react";

interface ScrollPullProps {
  children: ReactNode;
  /** how far (in px) the content starts offset before settling into place */
  strength?: number;
  /** 0–1, how quickly it "catches up" to the scroll position — lower = heavier drag */
  ease?: number;
  className?: string;
}

/**
 * Wraps content so it lags slightly behind scroll and eases into position —
 * gives a "being pulled into place" feel as the section enters the viewport.
 */
export default function ScrollPull({
  children,
  strength = 70,
  ease = 0.08,
  className = "",
}: ScrollPullProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(strength);
  const currentRef = useRef(strength);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const computeTarget = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = element top just entering bottom of viewport, 1 = fully scrolled to top
      const raw = 1 - rect.top / vh;
      const progress = Math.min(Math.max(raw, 0), 1);
      targetRef.current = strength * (1 - progress);
    };

    const loop = () => {
      currentRef.current += (targetRef.current - currentRef.current) * ease;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(${currentRef.current.toFixed(2)}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const onScroll = () => computeTarget();

    computeTarget();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [strength, ease]);

  return (
    <div ref={wrapRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}