import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import SplitWords from "../components/SplitWords";
import MediaPlaceholder from "../components/MediaPlaceholder";
import StatCounter from "../components/StatCounter";

export const metadata: Metadata = {
  title: "Studio — MYSS",
  description:
    "The house behind MYSS. A women-led creative studio in Tel Aviv, working worldwide.",
};

export default function StudioPage() {
  return (
    <main className="pt-32 md:pt-44">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal as="p" className="label">
          The house
        </Reveal>
        <SplitWords
          as="h1"
          text={"The brands she loves\nare built by women\nwho know her."}
          className="mt-6 font-display text-5xl font-light italic leading-[1.04] md:text-[6.5vw]"
        />
      </header>

      {/* Studio portrait strip */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-36">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="group md:col-span-8">
            <MediaPlaceholder ratio="aspect-[16/10]" caption="The studio — Tel Aviv" />
          </div>
          <div className="group md:col-span-4 md:mt-24">
            <MediaPlaceholder ratio="aspect-[4/5]" delay={120} caption="Behind the scenes" />
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="p" className="label md:col-span-3">
            Why we exist
          </Reveal>
          <div className="md:col-span-9">
            <SplitWords
              as="h2"
              text={"Women make the overwhelming majority\nof consumer decisions. A studio that is\nthat audience reads it natively."}
              className="font-display text-3xl font-light leading-[1.15] md:text-5xl"
              stagger={40}
            />
            <Reveal
              as="p"
              delay={400}
              className="mt-12 max-w-xl text-lg font-light leading-relaxed text-ink/80"
            >
              Not a diversity angle — a competitive one. We work with
              established and emerging fashion, cosmetic, jewelry and
              lifestyle brands, in Israel and internationally, who understand
              that presence is a business asset, not a line item.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats on ink for rhythm */}
      <section className="bg-ink text-salt">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
          <div className="grid gap-16 md:grid-cols-3">
            <Reveal>
              <p className="font-display text-8xl font-light">
                <StatCounter value={85} suffix="%" />
              </p>
              <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-salt/70">
                of consumer purchasing decisions are made or shaped by women.
                We are those women.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="font-display text-8xl font-light">
                <StatCounter value={100} suffix="%" />
              </p>
              <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-salt/70">
                women-built, women-run. The point of view is the product.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-display text-8xl font-light">
                <StatCounter value={1} pad={2} />
              </p>
              <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-salt/70">
                brief at a time. We take few clients, deliberately.
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
              note: "Few clients. Full attention. Scarcity is the strategy.",
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
              note: "Every project is a partnership. Inquire to begin.",
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
            className="link-line mt-16 inline-block text-[11px] uppercase tracking-[0.18em]"
          >
            Work with us
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
