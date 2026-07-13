import Link from "next/link";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";

/** Ink-ground closing section: oversized inquiry CTA + site map + sign-off. */
export default function Footer() {
  return (
    <footer className="bg-ink text-salt">
      <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-28 md:px-10 md:pt-40">
        <Reveal as="p" className="label !text-stone">
          New business
        </Reveal>
        <SplitWords
          as="h2"
          text={"Ready to be seen\ndifferently?"}
          className="mt-6 font-display text-[13vw] font-light italic leading-[0.95] md:text-[7.5vw]"
        />
        <Reveal delay={200}>
          <Link
            href="/contact"
            className="link-line mt-10 inline-block text-[13px] uppercase tracking-[0.18em]"
          >
            Inquire to begin
          </Link>
        </Reveal>

        <div className="mt-28 flex flex-col gap-10 border-t border-salt/15 pt-10 md:mt-40 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <a
              href="mailto:maayan.myss@gmail.com"
              className="link-line w-fit text-sm font-light"
            >
              maayan.myss@gmail.com
            </a>
            <a
              href="https://instagram.com/myss.social"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line w-fit text-sm font-light"
            >
              @myss.social
            </a>
          </div>

          <nav className="flex gap-8">
            {[
              { href: "/", label: "Home" },
              { href: "/work", label: "Work" },
              { href: "/studio", label: "Studio" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-line text-[11px] uppercase tracking-[0.18em] text-stone"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-[11px] uppercase tracking-[0.18em] text-stone md:flex-row md:justify-between">
          <p>© 2026 MYSS · Tel Aviv &amp; Worldwide</p>
          <p>Made by women. Noticed by everyone.</p>
        </div>
      </div>
    </footer>
  );
}
