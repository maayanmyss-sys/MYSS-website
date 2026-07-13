import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import SplitWords from "../components/SplitWords";
import PortfolioList from "../components/PortfolioList";

export const metadata: Metadata = {
  title: "Portfolio - MYSS",
  description:
    "Selected work by MYSS. We show less than we make - each drop is framed like a campaign.",
};

const PROJECTS = [
  { no: "01", title: "Campaign No. 12", category: "For a maison", year: "2026" },
  { no: "02", title: "Editorial Series", category: "Fine jewelry", year: "2026" },
  { no: "03", title: "Brand Film", category: "Beauty house", year: "2025" },
  { no: "04", title: "Studio Notes", category: "Marketing intelligence", year: "2025" },
  { no: "05", title: "Launch Direction", category: "Lifestyle maison", year: "2025" },
  { no: "06", title: "The Quiet Feed", category: "Cosmetics", year: "2024" },
];

export default function PortfolioPage() {
  return (
    <main className="pt-32 md:pt-44">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal as="p" className="label">
          Portfolio
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
          Move through the index - each title carries its own frame. Full
          case studies are shared privately, per inquiry.
        </Reveal>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 pb-28 pt-24 md:px-10 md:pb-44 md:pt-32">
        <PortfolioList projects={PROJECTS} />
      </section>
    </main>
  );
}
