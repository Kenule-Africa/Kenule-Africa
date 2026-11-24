import Image from "next/image";
import { creatorApplicationUrl, creatorBenefits } from "@/data/shoutout";
import Reveal from "./Reveal";
import ShoutOutButton, { OpeningSoonNote } from "./ShoutOutButton";
import s from "./shoutout.module.css";

export default function CreatorNetwork() {
  return (
    <section
      id="creators"
      aria-labelledby="creators-title"
      className={`${s.dark} relative isolate scroll-mt-14 overflow-hidden bg-black text-white`}
    >
      <Image
        src="/assets/shoutout/shoutout-mark-white.png"
        alt=""
        width={228}
        height={271}
        sizes="520px"
        className={s.markWatermark}
      />
      <div className="relative z-10 mx-auto max-w-[1120px] px-6 py-[clamp(96px,12vw,160px)] sm:px-8">
        <Reveal className="max-w-[980px]">
          <p className="text-[15px] font-semibold text-(--so-muted-dark) sm:text-[17px]">Creator network</p>
          <h2
            id="creators-title"
            className="mt-4 text-[clamp(36px,5vw,64px)] leading-[1.03] font-semibold tracking-[-0.04em] text-balance"
          >
            Your audience is
            <br />
            <span className={s.silver}>just the beginning.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="max-w-[480px] text-[17px] leading-[1.6] text-(--so-muted-dark) sm:text-[19px]">
              Join the ShoutOut network for access to brand opportunities, management support and the tools to grow
              your craft.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4">
              <ShoutOutButton href={creatorApplicationUrl} label="Join the network" tone="light" />
              {creatorApplicationUrl ? null : <OpeningSoonNote what="Creator applications" tone="light" />}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="border-t border-(--so-hairline-dark)">
              {creatorBenefits.map((benefit) => (
                <li key={benefit.title} className="flex gap-6 border-b border-(--so-hairline-dark) py-7">
                  <span className="pt-1 text-[13px] font-medium text-(--so-silver) tabular-nums">{benefit.number}</span>
                  <div>
                    <h3 className="text-[21px] font-semibold tracking-[-0.02em]">{benefit.title}</h3>
                    <p className="mt-2 text-[16px] leading-[1.6] text-(--so-muted-dark)">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
