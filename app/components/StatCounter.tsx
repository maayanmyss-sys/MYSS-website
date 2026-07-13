"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  /** printed after the number, e.g. "%" */
  suffix?: string;
  /** zero-pad to this many digits, e.g. 2 → "01" */
  pad?: number;
  className?: string;
};

/** Counts up from 0 when scrolled into view, easing out. */
export default function StatCounter({
  value,
  suffix = "",
  pad = 0,
  className = "",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const durationMs = 1400;
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(Math.round(eased * value));
          if (t < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [value]);

  const text = pad ? String(display).padStart(pad, "0") : String(display);
  return (
    <span
      ref={ref}
      className={`stat-counter ${className}`}
      data-value={value}
      data-suffix={suffix}
      data-pad={pad}
    >
      {text}
      {suffix}
    </span>
  );
}
