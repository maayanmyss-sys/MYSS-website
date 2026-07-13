"use client";

import { useState } from "react";

export type Service = {
  no: string;
  name: string;
  tagline: string;
  body: string;
  points: string[];
};

/**
 * Expanding index rows: click a service to unfold its detail panel.
 * Height animates via the grid-template-rows 0fr -> 1fr technique.
 */
export default function ServicesAccordion({ services }: { services: Service[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-band">
      {services.map((s, i) => {
        const open = openIndex === i;
        return (
          <div
            key={s.no}
            data-open={open}
            className="border-b border-band"
          >
            <button
              type="button"
              data-acc-toggle
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-baseline justify-between gap-6 px-2 py-8 text-left md:px-4 md:py-10"
            >
              <span className="label w-10 shrink-0">{s.no}</span>
              <span className="grow font-display text-3xl font-light transition-colors duration-700 md:text-5xl">
                {s.name}
              </span>
              <span className="label hidden md:block">{s.tagline}</span>
              <span
                className="acc-mark ml-4 shrink-0 font-display text-3xl font-light leading-none text-stone md:text-4xl"
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div className="acc-panel">
              <div>
                <div className="grid gap-10 px-2 pb-12 pt-2 md:grid-cols-12 md:px-4">
                  <p className="max-w-md text-lg font-light leading-relaxed text-ink/80 md:col-span-6 md:col-start-2">
                    {s.body}
                  </p>
                  <ul className="flex flex-col gap-3 md:col-span-4">
                    {s.points.map((p) => (
                      <li key={p} className="label border-b border-band pb-3">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
