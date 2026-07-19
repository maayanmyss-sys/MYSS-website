"use client";

import { useEffect, useRef } from "react";

/** How aggressively the playhead chases the scroll target (0-1).
    Low value = long cinematic glide. */
const LERP = 0.085;

/**
 * Scroll-scrubbed hero film.
 *
 * A 420vh container provides the scroll distance; a sticky, viewport-filling
 * <video> stays pinned while progress through the container maps onto
 * video.currentTime, lerped in a rAF loop so scrubbing glides. The film is
 * encoded all-intra (every frame a keyframe) so seeks land instantly.
 *
 * DOM overlays ride the same progress value: a scroll cue at rest and the
 * studio statement once the film has played out.
 */
export default function HeroScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const cue = cueRef.current;
    const outro = outroRef.current;
    if (!container || !video || !cue || !outro) return;

    let target = 0;
    let playhead = 0;
    let rafId = 0;

    const onScroll = () => {
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = -container.getBoundingClientRect().top;
      target = Math.min(Math.max(scrolled / scrollable, 0), 1);
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      // Leave a small tail so the final frame holds before the unpin.
      const t = target * duration * 0.995;
      playhead += (t - playhead) * LERP;
      if (Math.abs(t - playhead) < 0.001) playhead = t;
      if (video.currentTime !== playhead) video.currentTime = playhead;

      const p = duration ? playhead / duration : 0;
      cue.style.opacity = String(Math.max(0, 1 - p * 14));
      const o = Math.min(Math.max((p - 0.9) / 0.08, 0), 1);
      outro.style.opacity = String(o);
      outro.style.transform = `translateY(${(1 - o) * 24}px)`;
    };

    video.pause();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[420vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          poster="/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* rest state: scroll cue */}
        <div
          ref={cueRef}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-salt"
        >
          <span className="label !text-salt/80">Scroll</span>
          <span className="hero-cue-line" aria-hidden />
        </div>

        {/* end state: studio statement */}
        <div
          ref={outroRef}
          className="absolute inset-x-0 bottom-14 flex flex-col items-center gap-2 px-6 text-center opacity-0"
        >
          <p className="label">Creative studio &amp; marketing agency</p>
          <p className="font-display text-2xl font-light italic text-ink md:text-3xl">
            For companies that refuse to be ignored.
          </p>
        </div>
      </div>
    </div>
  );
}
