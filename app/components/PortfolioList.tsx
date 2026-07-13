"use client";

import { useRef, useState } from "react";

export type Project = {
  no: string;
  title: string;
  category: string;
  year: string;
};

/**
 * Desktop: an index of large italic titles; a black media block glides after
 * the cursor while a row is hovered (swap its background for the project
 * image later). Mobile: simple stacked cards with media placeholders.
 */
export default function PortfolioList({ projects }: { projects: Project[] }) {
  const floatRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [active, setActive] = useState<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = floatRef.current;
      if (!el) return;
      el.style.left = `${clientX + 32}px`;
      el.style.top = `${clientY - 180}px`;
    });
  };

  return (
    <div data-cursor-list onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
      {/* Cursor-following preview (desktop only) */}
      <div
        ref={floatRef}
        data-cursor-float
        className={`cursor-float media-bw hidden md:block ${active !== null ? "on" : ""}`}
        aria-hidden="true"
      >
        <p className="label flex h-full items-end p-4 !text-stone">
          {active !== null ? `${projects[active].no} · ${projects[active].category}` : ""}
        </p>
      </div>

      {/* Desktop index rows */}
      <div className="hidden border-t border-band md:block">
        {projects.map((p, i) => (
          <div
            key={p.no}
            data-row
            onMouseEnter={() => setActive(i)}
            className="group flex items-baseline justify-between gap-8 border-b border-band px-2 py-10 transition-colors duration-700"
          >
            <span className="label w-12 shrink-0">{p.no}</span>
            <h2
              className={`grow font-display text-5xl font-light italic leading-none transition-all duration-700 lg:text-7xl ${
                active !== null && active !== i ? "opacity-30" : ""
              } ${active === i ? "translate-x-4" : ""}`}
            >
              {p.title}
            </h2>
            <span className="label">{p.category}</span>
            <span className="label w-14 text-right">{p.year}</span>
          </div>
        ))}
      </div>

      {/* Mobile stacked cards */}
      <div className="flex flex-col gap-16 md:hidden">
        {projects.map((p) => (
          <div key={p.no} className="group">
            <div className="media-bw aspect-[4/5] w-full bg-ink" />
            <div className="mt-4 flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-light italic">{p.title}</h2>
              <p className="label">
                {p.no} · {p.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
