import Image from "next/image";
import { pillars } from "@/data/shoutout";
import s from "./shoutout.module.css";

const RING_RADII = [180, 290, 400, 510, 620, 730];

export default function Hero() {
  return (
    <section
      aria-labelledby="shoutout-hero-title"
      className={`${s.dark} relative isolate overflow-hidden bg-black text-white`}
    >
      {/* Concentric rings: a quiet nod to a voice carrying outward. */}
      <svg className={s.rings} viewBox="0 0 1500 1500" aria-hidden="true">
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
      <div className={s.heroGlow} aria-hidden="true" />

      <div className="mx-auto flex min-h-[min(860px,calc(100svh-56px))] max-w-[1120px] flex-col items-center justify-center px-6 pt-20 pb-24 text-center sm:px-8">
        <Image
          src="/assets/shoutout/shoutout-mark-white.png"
          alt=""
          width={228}
          height={271}
          priority
          sizes="56px"
          className="h-12 w-auto sm:h-14"
        />
        <p className="mt-7 text-[12px] font-medium tracking-[0.2em] text-(--so-muted-dark) uppercase">
          A Kenule Africa company
        </p>
        <h1
          id="shoutout-hero-title"
          className="mt-6 text-[clamp(44px,6.8vw,100px)] leading-[0.98] font-semibold tracking-[-0.048em]"
        >
          Your Influence
          <br />
          <span className={`${s.silver} inline-block text-balance`}>Deserves to Be Seen.</span>
        </h1>
        <p className="mt-7 max-w-[600px] text-[17px] leading-[1.6] text-(--so-muted-dark) sm:text-[19px]">
          The creative agency where creators build careers and brands build audiences that trust them.
        </p>

        <div className="mt-10 flex w-full max-w-[360px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <a
            href="#creators"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[15px] font-medium text-black transition-colors hover:bg-[#e8e8ed]"
          >
            I’m a Creator
          </a>
          <a
            href="#brands"
            className="inline-flex h-12 items-center justify-center rounded-full px-8 text-[15px] font-medium text-white ring-1 ring-white/35 transition-[box-shadow,background-color] ring-inset hover:bg-white/8 hover:ring-white/70"
          >
            I’m a Brand
          </a>
        </div>

        <ul
          aria-label="What ShoutOut does"
          className="mt-16 flex max-w-[720px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-(--so-muted-dark) sm:text-[14px]"
        >
          {pillars.map((pillar, index) => (
            <li key={pillar} className="flex items-center gap-4">
              {index > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" /> : null}
              {pillar}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
