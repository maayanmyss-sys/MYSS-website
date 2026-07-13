import Reveal from "./Reveal";

type MediaPlaceholderProps = {
  /** aspect-ratio utility, e.g. "aspect-[4/5]" */
  ratio?: string;
  className?: string;
  /** small stone caption shown under the block */
  caption?: string;
  delay?: number;
};

/**
 * Blank black stand-in for a photo or video. Real media drops in later -
 * keep the wrapper and swap the inner block for an <Image> or <video>.
 * .media-bw renders media grayscale until hovered (invisible on the solid
 * black placeholder, but live the moment a real image lands here).
 */
export default function MediaPlaceholder({
  ratio = "aspect-[4/5]",
  className = "",
  caption,
  delay = 0,
}: MediaPlaceholderProps) {
  return (
    <div className={className}>
      <Reveal variant="clip" delay={delay}>
        <div className={`media-bw w-full bg-ink group-hover:scale-[0.98] ${ratio}`} />
      </Reveal>
      {caption ? <p className="label mt-3">{caption}</p> : null}
    </div>
  );
}
