import Link from "next/link";
import ScrollHero from "./components/ScrollHero";
import Reveal from "./components/Reveal";
import SplitWords from "./components/SplitWords";
import Marquee from "./components/Marquee";
import MediaPlaceholder from "./components/MediaPlaceholder";

const SELECTED_WORK = [
  { no: "01", title: "Campaign No. 12", category: "For a maison", ratio: "aspect-[4/5]" },
  { no: "02", title: "Editorial Series", category: "Fine jewelry", ratio: "aspect-[3/4]" },
  { no: "03", title: "Brand Film", category: "Beauty house", ratio: "aspect-[16/10]" },
  { no: "04", title: "Studio Notes", category: "Marketing intelligence", ratio: "aspect-[4/5]" },
  { no: "05", title: "Launch Direction", category: "Lifestyle maison", ratio: "aspect-[3/4]" },
  { no: "06", title: "The Quiet Feed", category: "Cosmetics", ratio: "aspect-[16/10]" },
];

// Placeholder slots — swap each for a client's logo image when ready
// (e.g. <img src="/clients/name.png" className="media-bw h-8 w-auto" />).
const CLIENT_SLOTS = ["01", "02", "03", "04", "05", "06", "07", "08"];

export default function Home() {
  return (
    <main>
      {/* Scroll-scrubbed hero video */}
      <ScrollHero />

      {/* Answer to the hero — quiet, small, centered on ink */}
      <section className="flex min-h-[70vh] items-center justify-center bg-ink text-salt">
        <Reveal as="p" className="font-display text-3xl font-light italic md:text-4xl">
          So are we.
        </Reveal>
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
              MYSS is a creative marketing studio for fashion and beauty
              houses. We make content you don&rsquo;t see anywhere else —
              bespoke, editorial, impossible to scroll past. Every frame is
              intentional. Every campaign is built to be noticed.
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

      {/* Brands we've worked with — logo strip */}
      <section className="border-y border-band py-10">
        <Reveal as="p" className="label mb-8 text-center">
          Brands we&rsquo;ve worked with
        </Reveal>
        <Marquee duration={35}>
          {CLIENT_SLOTS.map((n) => (
            <span
              key={n}
              className="group mx-12 flex h-10 w-36 shrink-0 items-center justify-center"
            >
              {/* Placeholder mark — replace with the client's logo image */}
              <span className="media-bw font-display text-xl font-light italic text-stone">
                Client {n}
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Selected work — auto-scrolling gallery, pauses on hover */}
      <section className="py-28 md:py-44">
        <div className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 md:px-10">
          <Reveal as="p" className="label">
            Selected work
          </Reveal>
          <Reveal delay={150}>
            <Link
              href="/work"
              className="link-line text-[11px] uppercase tracking-[0.18em]"
            >
              All work
            </Link>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-16">
          <Marquee duration={45}>
            {SELECTED_WORK.map((w) => (
              <Link
                key={w.no}
                href="/work"
                className="group mx-4 block w-[300px] shrink-0 md:w-[420px]"
              >
                <div className="media-bw aspect-[3/4] w-full bg-ink transition-transform duration-700 group-hover:scale-[0.98]" />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <p className="font-display text-xl font-light italic md:text-2xl">
                    {w.title}
                  </p>
                  <p className="label whitespace-nowrap">
                    {w.no} · {w.category}
                  </p>
                </div>
              </Link>
            ))}
          </Marquee>
        </Reveal>
      </section>

      {/* The house teaser — the one women-led note on this page */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
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
                Founders, process, instinct — and a standard of craft that
                turns a feed into a flagship. Selective by design. Bespoke,
                always.
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
        </div>
      </section>

      {/* What we do — index rows */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
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
