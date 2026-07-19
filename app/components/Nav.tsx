"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Roll from "./Roll";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

/**
 * Fixed top bar in mix-blend-difference so it reads over the ink hero and
 * salt sections alike. Hides on scroll down, returns on scroll up.
 */
export default function Nav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 160);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 mix-blend-difference transition-transform duration-700 ${
        hidden ? "-translate-y-full" : ""
      }`}
    >
      <nav className="flex items-center justify-between px-6 py-5 text-salt md:px-10">
        <Link href="/" aria-label="MYSS — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-salt.png"
            alt="myss"
            className="h-8 w-auto min-w-[82px] md:h-9"
          />
        </Link>

        <div className="flex items-center gap-6 md:gap-10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-[17px] italic leading-none md:text-[19px]"
            >
              <Roll>{l.label}</Roll>
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
