import { ArrowUpRight } from "lucide-react";
import { contact } from "@/data/shoutout";

type Tone = "light" | "dark";

// whitespace-nowrap keeps each label on one line; px-6 leaves room for the "Soon" badge
// inside the closing panels on 360px phones.
const base =
  "inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-full px-6 text-[16px] font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,scale] duration-200 sm:h-12 sm:text-[15px]";
const pressable = "active:scale-[0.97]";
const tones: Record<Tone, string> = {
  light: "bg-white text-black hover:bg-[#e8e8ed]",
  dark: "bg-black text-white hover:bg-[#2c2c2e]",
};

type ShoutOutButtonProps = {
  href: string;
  label: string;
  /** "light" is a white button for dark backgrounds, "dark" a black button for light ones. */
  tone: Tone;
};

/** Primary call to action. With no destination configured it renders a visibly
 *  disabled button rather than a dead link. */
export default function ShoutOutButton({ href, label, tone }: ShoutOutButtonProps) {
  if (!href) {
    const disabled = tone === "light" ? "bg-white/20 text-white/75" : "bg-black/10 text-black/60";
    const badge = tone === "light" ? "bg-white/15 text-white/80" : "bg-black/10 text-black/65";
    return (
      <span aria-disabled="true" className={`${base} ${disabled} cursor-not-allowed pr-3`}>
        {label}
        <span className={`rounded-full px-2 py-1 text-[11px] font-semibold tracking-[0.02em] ${badge}`}>
          <span className="sr-only">, opening </span>Soon
        </span>
      </span>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={`${base} ${tones[tone]} ${pressable}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {label}
      {external ? <ArrowUpRight size={16} aria-hidden="true" /> : null}
    </a>
  );
}

/** Shown beside a call to action whose destination is not configured yet. */
export function OpeningSoonNote({ what, tone }: { what: string; tone: Tone }) {
  const color = tone === "light" ? "text-(--so-muted-dark)" : "text-(--so-muted)";
  const link = tone === "light" ? "text-white" : "text-(--so-ink)";
  return (
    <p className={`text-[14px] leading-[1.6] ${color}`}>
      {what} open soon. Questions in the meantime?{" "}
      <a className={`${link} underline decoration-1 underline-offset-4`} href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
    </p>
  );
}
