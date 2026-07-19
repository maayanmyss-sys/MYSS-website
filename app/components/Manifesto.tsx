"use client";

import { useEffect, useRef } from "react";

const WORDS = ["WHO.", "WE.", "ARE."];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 4);

/**
 * Kinetic typography: one scroll step per word. A sticky screen pins for
 * 340vh while local progress hands the stage to WHO. / WE. / ARE. in turn.
 * Each word slams in from scale ~2.4 with a blur that resolves as it lands.
 * The final word flips the whole stage to ink.
 */
export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    let rafId = 0;
    let target = 0;

    const onScroll = () => {
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      target = clamp01(-container.getBoundingClientRect().top / scrollable);
    };

    let p = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      p += (target - p) * 0.16;

      const seg = 1 / WORDS.length;
      WORDS.forEach((_, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        // local progress of this word's segment
        const lp = clamp01((p - i * seg) / seg);
        const isLast = i === WORDS.length - 1;

        // enter across the first 30% of the segment
        const enter = easeOut(lp / 0.3);
        // exit across the last 18% (the final word holds)
        const exit = isLast ? 0 : clamp01((lp - 0.82) / 0.18);

        const active = lp > 0 && (isLast || lp < 1);
        el.style.visibility = active ? "visible" : "hidden";
        if (!active) return;

        const scale = 2.4 - 1.4 * enter - 0.06 * exit;
        const alpha = enter * (1 - easeOut(exit));
        const blur = 18 * (1 - enter) + 10 * easeOut(exit);
        el.style.opacity = alpha.toFixed(3);
        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.filter = `blur(${blur.toFixed(1)}px)`;
      });

      // the stage floods to ink while ARE. lands
      const lastIn = clamp01((p - (WORDS.length - 1) / WORDS.length) / (0.3 / WORDS.length));
      stage.style.backgroundColor = lastIn > 0.5 ? "var(--color-ink)" : "var(--color-salt)";
      stage.style.color = lastIn > 0.5 ? "var(--color-salt)" : "var(--color-ink)";
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={containerRef} aria-label="Who we are" className="relative h-[340vh]">
      <div
        ref={stageRef}
        className="manifesto-stage sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        <p className="label absolute top-24 left-1/2 -translate-x-1/2">The studio</p>
        {WORDS.map((w, i) => (
          <span
            key={w}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className="manifesto-word"
            style={{ visibility: "hidden", opacity: 0 }}
            aria-hidden={i > 0}
          >
            {w}
          </span>
        ))}
        <span className="sr-only">Who we are.</span>
      </div>
    </section>
  );
}
