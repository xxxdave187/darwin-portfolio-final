import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /**
   * How fast this layer moves relative to normal scroll.
   * 0.2–0.5 = background layer (drifts slowly, feels "far away")
   * 1 = moves exactly with the page (no effect)
   * 1.2–1.6 = foreground layer (moves faster, feels "close")
   */
  speed?: number;
  className?: string;
}

/**
 * Wraps a decorative element so it scrolls at a different rate than the
 * page — background layers lag behind, creating a sense of depth.
 */
export default function Parallax({ children, speed = 0.4, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const translate = centerOffset * (speed - 1);
      el.style.transform = `translateY(${translate.toFixed(2)}px)`;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}