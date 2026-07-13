"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Roll from "./Roll";

const PILL_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

/**
 * Fixed top bar in mix-blend-difference so it reads over the black hero and
 * salt sections alike. Desktop: logo left; a hairline capsule holding the
 * page links in display italic, with Contact outside it in body type.
 * Hides on scroll down, returns on scroll up. Mobile: burger + full-screen
 * ink overlay with staggered links.
 */
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 mix-blend-difference transition-transform duration-700 ${
          hidden && !open ? "-translate-y-full" : ""
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-4 text-salt md:px-10">
          <Link href="/" aria-label="MYSS - home">
            {/* Salt artwork + blend-difference inverts correctly over any ground */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-salt.png"
              alt="myss"
              className="h-9 w-auto min-w-[90px]"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <div className="flex items-center rounded-full border border-salt/60">
              {PILL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-7 py-2.5 font-display text-[19px] font-normal italic leading-none"
                >
                  <Roll>{l.label}</Roll>
                </Link>
              ))}
            </div>
            <Link href="/contact" className="text-[15px] font-light">
              <Roll>Contact</Roll>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={`h-px w-6 bg-salt transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-salt transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 transition-opacity duration-500 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {[{ href: "/", label: "Home" }, ...PILL_LINKS, { href: "/contact", label: "Contact" }].map(
          (l, i) => (
            <div key={l.href} className="overflow-hidden py-2">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block font-display text-5xl font-light italic text-salt transition-transform duration-700 ${
                  open ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
              >
                {l.label}
              </Link>
            </div>
          ),
        )}
        <p className="label mt-12 !text-stone">
          Tel Aviv &amp; Worldwide · @myss.social
        </p>
      </div>
    </>
  );
}
