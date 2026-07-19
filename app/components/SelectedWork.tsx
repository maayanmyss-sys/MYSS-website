"use client";

import { useRef } from "react";
import Reveal from "./Reveal";

type Project = {
  name: string;
  category: string;
  cover: string;
  clip: string;
  year: string;
};

const PROJECTS: Project[] = [
  {
    name: "Atelier Noir",
    category: "Brand film",
    cover: "/work-1.jpg",
    clip: "/work-1.mp4",
    year: "2026",
  },
  {
    name: "Solstice",
    category: "Campaign",
    cover: "/work-2.jpg",
    clip: "/work-2.mp4",
    year: "2026",
  },
  {
    name: "Verre",
    category: "Art direction",
    cover: "/work-3.jpg",
    clip: "/work-3.mp4",
    year: "2025",
  },
  {
    name: "Maison Une",
    category: "Spatial identity",
    cover: "/work-4.jpg",
    clip: "/work-4.mp4",
    year: "2025",
  },
];

function WorkCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => undefined);
  };
  const stop = () => videoRef.current?.pause();

  return (
    <Reveal
      as="article"
      className={index % 2 === 1 ? "md:mt-[22vh]" : ""}
      delay={(index % 2) * 120}
    >
      <a
        href="#contact"
        className="work-card group block"
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={start}
        onBlur={stop}
        aria-label={`${project.name} — ${project.category}`}
      >
        <div className="work-media relative aspect-[3/4] overflow-hidden bg-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover}
            alt=""
            loading="lazy"
            className="work-cover absolute inset-0 h-full w-full object-cover"
          />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            className="work-clip absolute inset-0 h-full w-full object-cover"
          >
            <source src={project.clip.replace(".mp4", ".webm")} type="video/webm" />
            <source src={project.clip} type="video/mp4" />
          </video>
          <span className="work-index label !text-salt">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-3xl font-light italic leading-none md:text-4xl">
            {project.name}
          </h3>
          <p className="label whitespace-nowrap">
            {project.category} — {project.year}
          </p>
        </div>
      </a>
    </Reveal>
  );
}

/** Asymmetric two-column editorial grid; films surface on hover. */
export default function SelectedWork() {
  return (
    <section id="work" aria-label="Selected work" className="bg-salt px-6 py-28 md:px-10 md:py-40">
      <div className="mb-16 flex items-end justify-between md:mb-24">
        <Reveal>
          <p className="label mb-4">Selected work</p>
          <h2 className="font-display text-5xl font-light leading-[0.95] md:text-7xl">
            Chosen
            <span className="italic"> pieces.</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="hidden max-w-[220px] text-sm leading-relaxed text-stone md:block">
            Four projects that say it better than any deck could.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-x-[6vw] gap-y-20 md:grid-cols-2 md:gap-y-8">
        {PROJECTS.map((p, i) => (
          <WorkCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
