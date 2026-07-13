"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-driven manifesto: words start faint stone and fill to ink as the
 * block travels through the viewport, one word at a time.
 */
export default function TextFill({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".tf-word"));
    let rafId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top reaches 85% of the viewport,
      // 1 when its bottom passes 45%.
      const start = vh * 0.85;
      const end = vh * 0.45;
      const total = rect.height + (start - end);
      const progress = Math.min(Math.max((start - rect.top) / total, 0), 1);
      const lit = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle("tf-on", i < lit));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <p ref={ref} className={`text-fill ${className}`} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="tf-word">{word}</span>{" "}
        </span>
      ))}
    </p>
  );
}
