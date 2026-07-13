"use client";

import { useEffect, useRef, useState } from "react";

/** How aggressively the playhead chases the scroll target (0–1). */
const LERP_FACTOR = 0.22;

/**
 * Apple-style scroll-scrubbed hero video.
 *
 * A 300vh container provides the scroll distance; a sticky, viewport-filling
 * <video> stays pinned while scroll progress through the container (0 → 1)
 * is mapped onto video.currentTime. A requestAnimationFrame loop lerps the
 * playhead toward the target so scrubbing glides instead of snapping.
 */
export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let targetProgress = 0;
    let playhead = 0;
    let rafId = 0;

    const onScroll = () => {
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = -container.getBoundingClientRect().top;
      targetProgress = Math.min(Math.max(scrolled / scrollable, 0), 1);
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      const target = targetProgress * duration;
      playhead += (target - playhead) * LERP_FACTOR;

      // Skip the seek once we've settled — constant sub-frame seeks burn
      // CPU/battery while the page is idle.
      if (Math.abs(target - playhead) < 0.001) playhead = target;
      if (video.currentTime !== playhead) video.currentTime = playhead;
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

  useEffect(() => {
    // Flip visible on the next frame so the opacity transition actually runs.
    const rafId = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          className={`h-full w-full object-cover transition-opacity duration-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
