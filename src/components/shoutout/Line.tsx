import type { ReactNode } from "react";

type LineProps = {
  children: ReactNode;
  className?: string;
  /** Size the inner span to its text, so a gradient fill spans the words rather than the row. */
  inline?: boolean;
};

/** One line of a heading. ShoutOutMotion slides `[data-so-line]` up out of this mask. */
export default function Line({ children, className = "", inline = false }: LineProps) {
  return (
    <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
      <span data-so-line className={`${inline ? "inline-block" : "block"} ${className}`}>
        {children}
      </span>
    </span>
  );
}
