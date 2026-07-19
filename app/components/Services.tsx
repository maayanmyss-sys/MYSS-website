import Reveal from "./Reveal";

const SERVICES = [
  {
    n: "01",
    title: "Strategy",
    copy: "Positioning, narrative and creative direction that give a brand something worth saying — before anything gets made.",
    tags: ["Brand strategy", "Positioning", "Creative direction"],
  },
  {
    n: "02",
    title: "Content",
    copy: "Films, campaigns and photography produced end-to-end. Cinematic by default, never filler.",
    tags: ["Film & video", "Campaigns", "Photography"],
  },
  {
    n: "03",
    title: "Design",
    copy: "Identities, art direction and digital experiences with an editorial eye and an allergy to templates.",
    tags: ["Identity", "Art direction", "Web"],
  },
  {
    n: "04",
    title: "Growth",
    copy: "Social, launch and media programmes that put the work in front of the people it was made to move.",
    tags: ["Social", "Launch", "Media"],
  },
];

/** Editorial two-column services: a held statement on the left,
    oversized numbered entries on the right. */
export default function Services() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="bg-mist px-6 py-28 md:px-10 md:py-44"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-[6vw]">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <p className="label mb-6">Services</p>
            <h2 className="font-display text-5xl font-light leading-[1.02] md:text-[4.6vw]">
              What we<br />
              <span className="italic">actually</span> do.
            </h2>
            <p className="mt-8 max-w-[340px] text-[15px] leading-relaxed text-stone">
              No menus of deliverables. Four disciplines, practised properly,
              in whatever combination the work demands.
            </p>
          </Reveal>
        </div>

        <ul>
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90} className="service-row group">
              <div className="flex items-start gap-6 py-10 md:gap-10 md:py-14">
                <span className="label mt-3 md:mt-6">{s.n}</span>
                <div className="flex-1">
                  <h3 className="service-title font-display font-light leading-[0.95]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-stone md:text-base">
                    {s.copy}
                  </p>
                  <p className="label mt-5 !normal-case !tracking-[0.06em]">
                    {s.tags.join("  ·  ")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
