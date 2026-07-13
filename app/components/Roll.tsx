import type { ReactNode } from "react";

/**
 * Roll-hover text: when the parent link/button is hovered, the line glides
 * up and its twin re-enters from below. Wrap the visible text of any
 * <a>/<button> (or an element with .rollable) in this.
 */
export default function Roll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`roll ${className}`}>
      <span className="roll-track">
        <span className="roll-line">{children}</span>
        <span className="roll-line" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}
