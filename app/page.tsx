import Link from "next/link";
import ScrollHero from "./components/ScrollHero";
import Reveal from "./components/Reveal";
import SplitWords from "./components/SplitWords";
import Marquee from "./components/Marquee";
import MediaPlaceholder from "./components/MediaPlaceholder";
import StatCounter from "./components/StatCounter";

const SELECTED_WORK = [
  { no: "01", title: "Campaign No. 12", category: "For a maison", ratio: "aspect-[4/5]" },
  { no: "02", title: "Editorial Series", category: "Fine jewelry", ratio: "aspect-[3/4]" },
  { no: "03", title: "Brand Film", category: "Beauty house", ratio: "aspect-[16/10]" },
  { no: "04", title: "Studio Notes", category: "Marketing intelligence", ratio: "aspect-[4/5]" },
];

export default function Home() {
  return (
    <main>
      {/* Scroll-scrubbed hero video */}
      <ScrollHero />

      {/* Answer to the hero — stays on ink so the cut from video is seamless */}
      <section className="flex min-h-[90vh] items-center bg-ink text-salt">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <SplitWords
            as="h1"
            text="So are we."
            className="font-display text-[16vw] font-light italic leading-none md:text-[11vw]"
            stagger={120}
          />
          <Reveal as="p" delay={500} className="label mt-10 !text-stone">
            MYSS — a women-led creative studio · Tel Aviv &amp; Worldwide
          </Reveal>
        </div>
      </section>

      {/* Who we are */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="p" className="label md:col-span-3">
            Who we are
          </Reveal>
          <div className="md:col-span-9">
            <SplitWords
              as="h2"
              text={"The studio for brands\nready to be seen differently."}
              className="font-display text-5xl font-light leading-[1.05] md:text-7xl"
            />
            <Reveal
              as="p"
              delay={300}
              className="mt-12 max-w-xl text-lg font-light leading-relaxed text-ink/80"
            >
              MYSS is a women-led creative marketing studio building premium
              brand presence for fashion and beauty houses. We work
              selectively. We produce at editorial level. We bring the
              instinct of women who are also the consumer.
            </Reveal>
            <Reveal delay={450}>
              <Link
                href="/studio"
                className="link-line mt-10 inline-block text-[11px] uppercase tracking-[0.18em]"
              >
                Meet the studio
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Signature line ticker */}
      <section className="border-y border-band py-6">
        <Marquee duration={30}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-16 whitespace-nowrap font-display text-3xl font-light italic md:text-4xl"
            >
              Not for everyone. Exactly for you.
              <span className="h-1 w-1 rounded-full bg-stone" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
        <div className="flex items-end justify-between">
          <div>
            <Reveal as="p" className="label">
              Selected work
            </Reveal>
            <SplitWords
              as="h2"
              text="Few creations. Only the ones that matter."
              className="mt-6 max-w-3xl font-display text-4xl font-light leading-[1.08] md:text-6xl"
            />
          </div>
          <Reveal delay={200} className="hidden md:block">
            <Link
              href="/work"
              className="link-line text-[11px] uppercase tracking-[0.18em]"
            >
              All work
            </Link>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-20 md:grid-cols-12">
          {SELECTED_WORK.map((w, i) => (
            <Link
              key={w.no}
              href="/work"
              className={`group block ${
                i % 2 === 0
                  ? "md:col-span-7"
                  : "md:col-span-5 md:mt-40"
              }`}
            >
              <MediaPlaceholder ratio={w.ratio} delay={i * 80} />
              <div className="mt-4 flex items-baseline justify-between">
                <p className="font-display text-2xl font-light italic">
                  {w.title}
                </p>
                <p className="label">
                  {w.no} · {w.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Reveal className="mt-20 md:hidden">
          <Link
            href="/work"
            className="link-line text-[11px] uppercase tracking-[0.18em]"
          >
            All work
          </Link>
        </Reveal>
      </section>

      {/* The advantage — stats band */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
          <Reveal as="p" className="label">
            The advantage
          </Reveal>
          <div className="mt-16 grid gap-16 md:grid-cols-3">
            <Reveal>
              <p className="font-display text-8xl font-light">
                <StatCounter value={85} suffix="%" />
              </p>
              <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-ink/70">
                of consumer purchasing decisions are made or shaped by women.
                We are those women.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="font-display text-8xl font-light">
                <StatCounter value={100} suffix="%" />
              </p>
              <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-ink/70">
                women-built, women-run. The point of view is the product.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-display text-8xl font-light">
                <StatCounter value={1} pad={2} />
              </p>
              <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-ink/70">
                brief at a time. We take few clients, deliberately. Scarcity
                is the strategy.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The house teaser */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="group">
            <MediaPlaceholder ratio="aspect-[4/5]" caption="The house — portrait" />
          </div>
          <div>
            <Reveal as="p" className="label">
              The house
            </Reveal>
            <SplitWords
              as="h2"
              text={"A studio of women,\nfor the brands women love."}
              className="mt-6 font-display text-4xl font-light leading-[1.08] md:text-6xl"
            />
            <Reveal
              as="p"
              delay={300}
              className="mt-10 max-w-md text-lg font-light leading-relaxed text-ink/80"
            >
              The brands she loves are built by women who know her. Founders,
              process, instinct — the point of view lives in everything we
              make.
            </Reveal>
            <Reveal delay={450}>
              <Link
                href="/studio"
                className="link-line mt-10 inline-block text-[11px] uppercase tracking-[0.18em]"
              >
                Inside the studio
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we do — index rows */}
      <section className="mx-auto max-w-[1400px] px-6 pb-28 md:px-10 md:pb-44">
        <Reveal as="p" className="label">
          What we do
        </Reveal>
        <div className="mt-12 border-t border-band">
          {[
            { no: "01", name: "Brand Strategy", note: "Positioning · messaging · presence" },
            { no: "02", name: "Editorial Content", note: "Designed carousels · studio notes" },
            { no: "03", name: "Social Direction", note: "The feed as a flagship" },
            { no: "04", name: "Campaign Production", note: "Cinematic · selective · bespoke" },
          ].map((s, i) => (
            <Reveal key={s.no} delay={i * 80}>
              <Link
                href="/contact"
                className="index-row flex items-baseline justify-between gap-6 border-b border-band px-2 py-8 md:px-6 md:py-10"
              >
                <span className="label w-10 shrink-0">{s.no}</span>
                <span className="grow font-display text-3xl font-light md:text-5xl">
                  {s.name}
                </span>
                <span className="label hidden text-right md:block">
                  {s.note}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
