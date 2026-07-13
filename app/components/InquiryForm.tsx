"use client";

import { useState, type FormEvent } from "react";

const FIELD =
  "w-full border-b border-band bg-transparent py-4 font-light outline-none transition-colors duration-500 placeholder:text-stone/60 focus:border-ink";

/**
 * Composes a mailto: draft to the studio inbox — works without a backend.
 * Swap handleSubmit for an API route when a form service is wired up.
 */
export default function InquiryForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Inquiry — ${data.get("brand") || "New brand"}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Brand: ${data.get("brand")}`,
      `Email: ${data.get("email")}`,
      "",
      `${data.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:maayan.myss@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="grid gap-10 md:grid-cols-2">
        <label className="block">
          <span className="label">Name</span>
          <input name="name" required className={FIELD} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="label">Brand</span>
          <input name="brand" required className={FIELD} placeholder="Your brand" />
        </label>
      </div>
      <label className="block">
        <span className="label">Email</span>
        <input
          name="email"
          type="email"
          required
          className={FIELD}
          placeholder="you@yourbrand.com"
        />
      </label>
      <label className="block">
        <span className="label">The brief</span>
        <textarea
          name="message"
          required
          rows={5}
          className={`${FIELD} resize-none`}
          placeholder="What are you building, and where should it be seen"
        />
      </label>

      <button
        type="submit"
        className="group mt-4 flex w-fit items-center gap-4 border border-ink px-10 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 hover:bg-ink hover:text-salt"
      >
        Send inquiry
        <span className="transition-transform duration-500 group-hover:translate-x-1.5">
          →
        </span>
      </button>

      {sent ? (
        <p className="text-sm font-light text-stone">
          Your email draft is ready — send it and we will be in touch.
        </p>
      ) : null}
    </form>
  );
}
