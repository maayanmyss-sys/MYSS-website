import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** seconds for one full loop */
  duration?: number;
};

/** Infinite horizontal ticker. Content is duplicated for a seamless loop. */
export default function Marquee({
  children,
  className = "",
  duration = 28,
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center" aria-hidden="false">
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
