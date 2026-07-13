"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

/**
 * Fixed top bar in mix-blend-difference so it reads over the black hero and
 * salt sections alike. Hides on scroll down, returns on scroll up. On mobile
 * a burger opens a full-screen ink overlay with staggered menu links.
 */
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
        className={`fixed inset-x-0 top-0 z-50 mix-blend-difference transition-transform duration-500 ${
          hidden && !open ? "-translate-y-full" : ""
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-5 text-salt md:px-10">
          <Link
            href="/"
            className="font-display text-[26px] font-medium lowercase italic leading-none tracking-tight"
            aria-label="MYSS — home"
          >
            myss
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-line text-[11px] font-normal uppercase tracking-[0.18em] ${
                  pathname === l.href ? "bg-[length:100%_1px]" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
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
        {[{ href: "/", label: "Home" }, ...LINKS].map((l, i) => (
          <div key={l.href} className="overflow-hidden py-2">
            <Link
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block font-display text-6xl font-light italic text-salt transition-transform duration-700 ${
                open ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          </div>
        ))}
        <p className="label mt-12 !text-stone">
          Tel Aviv &amp; Worldwide · @myss.social
        </p>
      </div>
    </>
  );
}
