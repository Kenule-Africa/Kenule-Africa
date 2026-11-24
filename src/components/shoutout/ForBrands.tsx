import { brandSteps, campaignRequestUrl } from "@/data/shoutout";
import Reveal from "./Reveal";
import ShoutOutButton, { OpeningSoonNote } from "./ShoutOutButton";

export default function ForBrands() {
  return (
    <section id="brands" aria-labelledby="brands-title" className="scroll-mt-14 bg-white">
      <div className="mx-auto max-w-[1120px] px-6 py-[clamp(96px,12vw,160px)] sm:px-8">
        <Reveal className="max-w-[980px]">
          <p className="text-[15px] font-semibold text-(--so-muted) sm:text-[17px]">For brands</p>
          <h2
            id="brands-title"
            className="mt-4 text-[clamp(36px,5vw,64px)] leading-[1.03] font-semibold tracking-[-0.04em] text-balance text-(--so-ink)"
          >
            Find the voices
            <br />
            <span className="text-(--so-quiet)">your audience already trusts.</span>
          </h2>
          <p className="mt-6 max-w-[600px] text-[17px] leading-[1.6] text-(--so-muted) sm:text-[19px]">
            Partner with creators who already have your customers’ attention. We handle the matching, the management
            and the measurement, so you can focus on the message.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brandSteps.map((step, index) => (
            <li key={step.title} className="h-full">
              <Reveal delay={index * 80} className="h-full">
                <div className="flex h-full flex-col rounded-[24px] bg-(--so-mist) p-7 lg:min-h-[260px]">
                  <span className="text-[40px] leading-none font-semibold tracking-[-0.04em] text-(--so-quiet) tabular-nums">
                    {step.number}
                  </span>
                  <h3 className="mt-8 text-[22px] font-semibold tracking-[-0.02em] text-(--so-ink) lg:mt-16">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-(--so-muted)">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col items-start gap-4">
          <ShoutOutButton href={campaignRequestUrl} label="Request a campaign" tone="dark" />
          {campaignRequestUrl ? null : <OpeningSoonNote what="Campaign requests" tone="dark" />}
        </Reveal>
      </div>
    </section>
  );
}
