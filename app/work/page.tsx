import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import SplitWords from "../components/SplitWords";
import MediaPlaceholder from "../components/MediaPlaceholder";

export const metadata: Metadata = {
  title: "Work — MYSS",
  description:
    "Selected work by MYSS. Few creations. Only the brands we want to be associated with.",
};

const PROJECTS = [
  { no: "01", title: "Campaign No. 12", category: "For a maison", ratio: "aspect-[4/5]" },
  { no: "02", title: "Editorial Series", category: "Fine jewelry", ratio: "aspect-[3/4]" },
  { no: "03", title: "Brand Film", category: "Beauty house", ratio: "aspect-[16/10]" },
  { no: "04", title: "Studio Notes", category: "Marketing intelligence", ratio: "aspect-[4/5]" },
  { no: "05", title: "Launch Direction", category: "Lifestyle maison", ratio: "aspect-[3/4]" },
  { no: "06", title: "The Quiet Feed", category: "Cosmetics", ratio: "aspect-[16/10]" },
];

export default function WorkPage() {
  return (
    <main className="pt-32 md:pt-44">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal as="p" className="label">
          Selected work
        </Reveal>
        <SplitWords
          as="h1"
          text={"We show less\nthan we make."}
          className="mt-6 font-display text-6xl font-light italic leading-[1.02] md:text-[8vw]"
        />
        <Reveal
          as="p"
          delay={300}
          className="mt-12 max-w-md text-lg font-light leading-relaxed text-ink/80"
        >
          Scarcity reads as status. Each drop is framed like a campaign —
          never a content dump.
        </Reveal>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 pb-28 pt-24 md:px-10 md:pb-44 md:pt-36">
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <div
              key={p.no}
              className={`group ${
                i % 3 === 0
                  ? "md:col-span-7"
                  : i % 3 === 1
                    ? "md:col-span-5 md:mt-32"
                    : "md:col-span-8 md:col-start-3"
              }`}
            >
              <MediaPlaceholder ratio={p.ratio} delay={(i % 3) * 80} />
              <div className="mt-4 flex items-baseline justify-between">
                <p className="font-display text-2xl font-light italic">
                  {p.title}
                </p>
                <p className="label">
                  {p.no} · {p.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-32 border-t border-band pt-10">
          <p className="max-w-md text-lg font-light leading-relaxed text-ink/70">
            Full case studies are shared privately, per inquiry. Every project
            is bespoke.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
