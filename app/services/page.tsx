import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import SplitWords from "../components/SplitWords";
import ServicesAccordion from "../components/ServicesAccordion";
import Roll from "../components/Roll";

export const metadata: Metadata = {
  title: "Services - MYSS",
  description:
    "Brand strategy, editorial content, social direction and campaign production - four disciplines, one standard.",
};

const SERVICES = [
  {
    no: "01",
    name: "Brand Strategy",
    tagline: "The thinking before the making",
    body: "Positioning, messaging and the presence to carry them. We define what your brand stands for, who it speaks to and why it deserves the attention - before a single frame is produced.",
    points: ["Positioning & messaging", "Audience & market reading", "Brand voice & language", "Launch strategy"],
  },
  {
    no: "02",
    name: "Editorial Content",
    tagline: "Authority, beautifully set",
    body: "Designed carousels and studio notes with real marketing intelligence. One insight per post, set at editorial level - the kind of feed that earns trust before the first call.",
    points: ["Designed carousels", "Content systems", "Copy & art direction", "Save-driven formats"],
  },
  {
    no: "03",
    name: "Social Direction",
    tagline: "The feed as a flagship",
    body: "A grid that reads like a campaign, not a calendar. We direct the rhythm, the ratio and the look - so every post belongs to one recognisable world.",
    points: ["Feed curation", "Content pillars & cadence", "Community tone", "Monthly direction"],
  },
  {
    no: "04",
    name: "Campaign Production",
    tagline: "Cinematic, selective, bespoke",
    body: "From concept to final cut - campaigns produced at the highest level. Few projects, full attention, results you can recognise without reading the credit.",
    points: ["Concept & creative direction", "Photo & film production", "Post & finishing", "Launch assets"],
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-32 md:pt-44">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal as="p" className="label">
          Services
        </Reveal>
        <SplitWords
          as="h1"
          text={"Four disciplines.\nOne standard."}
          className="mt-6 font-display text-6xl font-light italic leading-[1.02] md:text-[8vw]"
        />
        <Reveal
          as="p"
          delay={300}
          className="mt-12 max-w-md text-lg font-light leading-relaxed text-ink/80"
        >
          Open each discipline to see how it works. Every engagement is
          bespoke - nothing here comes as a package.
        </Reveal>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 pb-28 pt-24 md:px-10 md:pb-44 md:pt-32">
        <ServicesAccordion services={SERVICES} />
        <Reveal delay={200}>
          <Link
            href="/contact"
            className="mt-16 inline-block text-[11px] uppercase tracking-[0.18em]"
          >
            <Roll>Inquire to begin</Roll>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
