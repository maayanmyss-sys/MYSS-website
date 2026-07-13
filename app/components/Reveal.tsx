"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** ms before the transition starts once in view */
  delay?: number;
  /** "fade" slides up + fades; "clip" wipes media in from the bottom */
  variant?: "fade" | "clip";
};

/** Adds .is-in when the element scrolls into view, driving the CSS reveal. */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "fade",
}: RevealProps) {
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${variant === "clip" ? "clip-reveal" : "reveal"} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
