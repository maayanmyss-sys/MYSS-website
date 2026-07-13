import ScrollHero from "./components/ScrollHero";

export default function Home() {
  return (
    <main>
      <ScrollHero />
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-4xl font-bold tracking-tight">MYSS</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Content below the hero — scroll back up to scrub the video.
        </p>
      </section>
    </main>
  );
}
