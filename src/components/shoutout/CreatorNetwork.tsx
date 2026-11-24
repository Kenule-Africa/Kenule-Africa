import Image from "next/image";
import { creatorApplicationUrl, creatorBenefits } from "@/data/shoutout";
import Line from "./Line";
import ShoutOutButton, { OpeningSoonNote } from "./ShoutOutButton";
import s from "./shoutout.module.css";

export default function CreatorNetwork() {
  return (
    <section
      id="creators"
      data-so-section
      aria-labelledby="creators-title"
      className={`${s.dark} relative isolate scroll-mt-14 overflow-hidden bg-black text-white`}
    >
      <Image
        data-so-watermark
        src="/assets/shoutout/shoutout-mark-white.png"
        alt=""
        width={228}
        height={271}
        sizes="520px"
        className={s.watermark}
      />
      <div className="relative z-10 mx-auto max-w-[1120px] px-6 py-[clamp(80px,12vw,160px)] sm:px-8">
        <div className="max-w-[980px]">
          <p data-so-reveal className="text-[15px] font-semibold text-(--so-muted-dark) sm:text-[17px]">
            Creator network
          </p>
          <h2
            id="creators-title"
            data-so-lines
            className="mt-4 text-[clamp(36px,5vw,64px)] leading-[1.03] font-semibold tracking-[-0.04em] text-balance"
          >
            <Line>Your audience is</Line>
            <Line inline className={s.silver}>
              just the beginning.
            </Line>
          </h2>
        </div>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p data-so-reveal className="max-w-[480px] text-[17px] leading-[1.6] text-(--so-muted-dark) sm:text-[19px]">
              Join the ShoutOut network for access to brand opportunities, management support and the tools to grow
              your craft.
            </p>
            <div data-so-reveal className="mt-10 flex flex-col items-start gap-4">
              <ShoutOutButton href={creatorApplicationUrl} label="Join the network" tone="light" />
              {creatorApplicationUrl ? null : <OpeningSoonNote what="Creator applications" tone="light" />}
            </div>
          </div>

          <ul data-so-benefits>
            {creatorBenefits.map((benefit, index) => (
              <li key={benefit.title} className="relative flex gap-6 py-7">
                <span data-so-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-(--so-hairline-dark)" />
                {index === creatorBenefits.length - 1 ? (
                  <span data-so-rule aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-(--so-hairline-dark)" />
                ) : null}
                <span data-so-reveal className="pt-1 text-[13px] font-medium text-(--so-silver) tabular-nums">
                  {benefit.number}
                </span>
                <div data-so-reveal>
                  <h3 className="text-[21px] font-semibold tracking-[-0.02em]">{benefit.title}</h3>
                  <p className="mt-2 text-[16px] leading-[1.6] text-(--so-muted-dark)">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
