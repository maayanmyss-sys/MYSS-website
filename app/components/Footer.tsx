import Reveal from "./Reveal";
import Roll from "./Roll";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/myss.social" },
  { label: "TikTok", href: "https://tiktok.com/@myss.social" },
  { label: "LinkedIn", href: "https://linkedin.com/company/myss" },
];

/** Oversized closing statement, contact and socials on an ink ground. */
export default function Footer() {
  return (
    <footer
      id="contact"
      className="flex min-h-screen flex-col justify-between bg-ink px-6 pt-32 pb-10 text-salt md:px-10 md:pt-44"
    >
      <div>
        <Reveal>
          <p className="label mb-8 !text-stone">Next</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="footer-title font-display font-light">
            <span className="block leading-[0.92]">Ready to be</span>
            <span className="block italic leading-[0.92]">
              seen differently?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={250}>
          <a
            href="mailto:maayan.myss@gmail.com"
            className="link-line mt-14 inline-block font-display text-2xl font-light italic text-salt md:text-4xl"
          >
            maayan.myss@gmail.com
          </a>
        </Reveal>
      </div>

      <div className="mt-24 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <ul className="flex gap-8">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-light text-salt"
              >
                <Roll>{s.label}</Roll>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between gap-8 md:flex-col md:items-end md:gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-salt.png" alt="myss" className="h-10 w-auto md:h-12" />
          <p className="label !text-stone">
            © {new Date().getFullYear()} · MYSS — Tel Aviv &amp; worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
