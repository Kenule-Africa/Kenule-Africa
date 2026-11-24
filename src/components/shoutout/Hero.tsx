import Image from "next/image";
import { pillars } from "@/data/shoutout";
import s from "./shoutout.module.css";

const RING_RADII = [180, 290, 400, 510, 620, 730];
const HEADLINE_WORDS = ["Your", "Influence"];

function PillarItems() {
  return pillars.map((pillar) => (
    <span key={pillar} className="flex shrink-0 items-center gap-[22px]">
      <span className="text-[15px] font-medium whitespace-nowrap text-white/85">{pillar}</span>
      <Image src="/assets/shoutout/shoutout-mark-white.png" alt="" width={228} height={271} sizes="12px" className="h-3 w-auto opacity-50" />
    </span>
  ));
}

export default function Hero() {
  return (
    <section
      data-so-hero
      aria-labelledby="shoutout-hero-title"
      className={`${s.dark} relative isolate flex min-h-[calc(100svh-56px)] flex-col overflow-hidden bg-black text-white md:min-h-[min(860px,calc(100svh-56px))]`}
    >
      {/* The stage opens like an iris from the mark on load: the reveal of the page. */}
      <div data-so-intro data-so-iris className="absolute inset-0 -z-10" aria-hidden="true">
        <svg data-so-rings className={s.rings} viewBox="0 0 1500 1500">
          {RING_RADII.map((radius, index) => (
            <circle
              key={radius}
              cx="750"
              cy="750"
              r={radius}
              fill="none"
              stroke="#ffffff"
              strokeOpacity={0.11 - index * 0.014}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div className={s.heroGlow} />
      </div>
      <div data-so-spotlight className={s.spotlight} aria-hidden="true" />

      <div
        data-so-hero-content
        className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col items-center justify-center px-6 pt-16 pb-10 text-center sm:px-8 md:pt-20 md:pb-24"
      >
        {/* The mark assembles from its two swooshes with a single flash of light. */}
        <div data-so-mark className="relative h-12 w-[41px] sm:h-14 sm:w-[48px]" aria-hidden="true">
          <span data-so-mark-flash className={s.markFlash} />
          <Image
            data-so-intro
            data-so-mark-top
            src="/assets/shoutout/shoutout-mark-top.png"
            alt=""
            fill
            priority
            sizes="48px"
            className="object-contain"
          />
          <Image
            data-so-intro
            data-so-mark-bottom
            src="/assets/shoutout/shoutout-mark-bottom.png"
            alt=""
            fill
            priority
            sizes="48px"
            className="object-contain"
          />
        </div>

        <h1
          id="shoutout-hero-title"
          className="mt-9 text-[clamp(44px,6.8vw,100px)] leading-[0.98] font-semibold tracking-[-0.048em] sm:mt-10"
        >
          <span className="block">
            {HEADLINE_WORDS.map((word, index) => (
              <span key={word}>
                {index > 0 ? " " : null}
                <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top">
                  <span data-so-intro data-so-hero-word className="inline-block">
                    {word}
                  </span>
                </span>
              </span>
            ))}
          </span>
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <span data-so-intro data-so-hero-line className={`${s.silver} inline-block text-balance`}>
              Deserves to Be Seen.
            </span>
          </span>
        </h1>

        <p
          data-so-intro
          data-so-hero-fade
          className="mt-7 max-w-[600px] text-[17px] leading-[1.6] text-(--so-muted-dark) sm:text-[19px]"
        >
          The creative agency where creators build careers and brands build audiences that trust them.
        </p>

        <div className="mt-10 flex w-full max-w-[360px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <a
            data-so-intro
            data-so-hero-fade
            data-so-magnetic
            href="#creators"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-white px-8 text-[16px] font-medium text-black transition-[background-color,scale] duration-200 hover:bg-[#e8e8ed] active:scale-[0.98] sm:h-12 sm:text-[15px]"
          >
            I’m a Creator
          </a>
          <a
            data-so-intro
            data-so-hero-fade
            data-so-magnetic
            href="#brands"
            className="inline-flex h-[52px] items-center justify-center rounded-full px-8 text-[16px] font-medium text-white ring-1 ring-white/35 transition-[box-shadow,background-color,scale] duration-200 ring-inset hover:bg-white/8 hover:ring-white/70 active:scale-[0.98] sm:h-12 sm:text-[15px]"
          >
            I’m a Brand
          </a>
        </div>

        <ul
          aria-label="What ShoutOut does"
          className="mt-16 hidden max-w-[760px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] text-(--so-muted-dark) md:flex"
        >
          {pillars.map((pillar, index) => (
            <li key={pillar} data-so-intro data-so-pillar className="flex items-center gap-4">
              {index > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" /> : null}
              {pillar}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: the four pillars run as an edge-to-edge marquee. */}
      <div data-so-intro data-so-pillar className="pb-[max(28px,env(safe-area-inset-bottom))] md:hidden">
        <p className="sr-only">What ShoutOut does: {pillars.join(", ")}.</p>
        <div className={s.marquee} aria-hidden="true">
          <div className={s.marqueeTrack}>
            <div className={s.marqueeGroup}>
              <PillarItems />
            </div>
            <div className={s.marqueeGroup} aria-hidden="true">
              <PillarItems />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
