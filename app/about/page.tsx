import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import SplitWords from "../components/SplitWords";
import MediaPlaceholder from "../components/MediaPlaceholder";
import StatCounter from "../components/StatCounter";
import TextFill from "../components/TextFill";
import Roll from "../components/Roll";

export const metadata: Metadata = {
  title: "About - MYSS",
  description:
    "The house behind MYSS. A creative studio in Tel Aviv, working worldwide.",
};

export default function AboutPage() {
  return (
    <main className="pt-32 md:pt-44">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal as="p" className="label">
          The house
        </Reveal>
        <SplitWords
          as="h1"
          text={"The house\nbehind the work."}
          className="mt-6 font-display text-6xl font-light italic leading-[1.02] md:text-[8vw]"
        />
      </header>

      {/* Studio portrait strip */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-36">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="group md:col-span-8">
            <MediaPlaceholder ratio="aspect-[16/10]" caption="The studio - Tel Aviv" />
          </div>
          <div className="group md:col-span-4 md:mt-24">
            <MediaPlaceholder ratio="aspect-[4/5]" delay={120} caption="Behind the scenes" />
          </div>
        </div>
      </section>

      {/* Scroll-driven manifesto - words fill from stone to ink as you read */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
        <Reveal as="p" className="label mb-12">
          What we believe
        </Reveal>
        <TextFill
          className="max-w-4xl font-display text-3xl font-light leading-[1.35] md:text-5xl md:leading-[1.3]"
          text="Presence is a business asset, so we build it with intent - content made at editorial level, for brands that refuse to look like everyone else. We take one brief at a time. We show less than we make. And everything we touch is designed to be noticed."
        />
      </section>

      {/* The advantage - stats on ink for rhythm */}
      <section className="bg-ink text-salt">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
          <Reveal as="p" className="label mb-16 !text-stone">
            The advantage
          </Reveal>
          <div className="grid gap-16 md:grid-cols-3">
            <Reveal>
              <p className="font-display text-8xl font-light">
                <StatCounter value={85} suffix="%" />
              </p>
              <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-salt/70">
                of consumer purchasing decisions are made or shaped by women.
                Our studio reads that audience natively.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="font-display text-8xl font-light">
                <StatCounter value={1} pad={2} />
              </p>
              <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-salt/70">
                brief at a time. We take few clients, deliberately - scarcity
                is the strategy.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-display text-8xl font-light">
                <StatCounter value={100} suffix="%" />
              </p>
              <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-salt/70">
                bespoke. No packages, no templates - every engagement is
                built around the brand it serves.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
        <Reveal as="p" className="label">
          How we work
        </Reveal>
        <div className="mt-12 border-t border-band">
          {[
            {
              no: "01",
              name: "Selective by design",
              note: "Few clients. Full attention.",
            },
            {
              no: "02",
              name: "Editorial standard",
              note: "We produce at the highest level. Always.",
            },
            {
              no: "03",
              name: "Instinct as method",
              note: "We are the audience your brand is speaking to.",
            },
            {
              no: "04",
              name: "Bespoke, never packaged",
              note: "Every project is a partnership.",
            },
          ].map((s, i) => (
            <Reveal key={s.no} delay={i * 80}>
              <div className="index-row flex flex-col gap-2 border-b border-band px-2 py-8 md:flex-row md:items-baseline md:gap-6 md:px-6 md:py-10">
                <span className="label w-10 shrink-0">{s.no}</span>
                <span className="grow font-display text-3xl font-light md:text-5xl">
                  {s.name}
                </span>
                <span className="max-w-xs text-sm font-light text-stone md:text-right">
                  {s.note}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <Link
            href="/contact"
            className="mt-16 inline-block text-[11px] uppercase tracking-[0.18em]"
          >
            <Roll>Work with us</Roll>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
