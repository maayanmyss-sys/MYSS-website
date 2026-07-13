import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import SplitWords from "../components/SplitWords";
import InquiryForm from "../components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact - MYSS",
  description:
    "Inquire to begin. MYSS takes few clients, deliberately. Tel Aviv & worldwide.",
};

export default function ContactPage() {
  return (
    <main className="pt-32 md:pt-44">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal as="p" className="label">
          New business
        </Reveal>
        <SplitWords
          as="h1"
          text="Inquire."
          className="mt-6 font-display text-7xl font-light italic leading-none md:text-[10vw]"
        />
        <Reveal
          as="p"
          delay={250}
          className="mt-12 max-w-md text-lg font-light leading-relaxed text-ink/80"
        >
          Every project is bespoke. Tell us about your brand - we respond to
          every serious inquiry, and we take one brief at a time.
        </Reveal>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 pb-28 pt-24 md:px-10 md:pb-44 md:pt-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal className="flex flex-col gap-8">
              <div>
                <p className="label">Email</p>
                <a
                  href="mailto:maayan.myss@gmail.com"
                  className="link-line mt-2 inline-block font-light"
                >
                  maayan.myss@gmail.com
                </a>
              </div>
              <div>
                <p className="label">Instagram</p>
                <a
                  href="https://instagram.com/myss.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line mt-2 inline-block font-light"
                >
                  @myss.social
                </a>
              </div>
              <div>
                <p className="label">Studio</p>
                <p className="mt-2 font-light">Tel Aviv &amp; Worldwide</p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={150}>
              <InquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
