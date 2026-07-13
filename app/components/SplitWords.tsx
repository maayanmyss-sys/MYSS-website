"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
} from "react";

type SplitWordsProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms between each word's reveal */
  stagger?: number;
  /** ms before the first word starts */
  delay?: number;
};

/**
 * Masked word-by-word heading reveal: each word slides up out of an
 * overflow-hidden span, staggered, when the heading scrolls into view.
 * Use "\n" in `text` to force a line break.
 */
export default function SplitWords({
  text,
  as: Tag = "h2",
  className = "",
  stagger = 70,
  delay = 0,
}: SplitWordsProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wordIndex = 0;
  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, " ")}>
      {text.split("\n").map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi) => {
            const d = delay + wordIndex++ * stagger;
            return (
              <span key={wi} className="mask" aria-hidden="true">
                <span style={{ "--mask-delay": `${d}ms` } as CSSProperties}>
                  {word}
                  {wi < line.split(" ").length - 1 ? " " : ""}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
