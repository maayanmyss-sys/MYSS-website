import type { ReactNode } from "react";

/** Re-mounts per navigation, replaying a soft fade-up page transition. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
