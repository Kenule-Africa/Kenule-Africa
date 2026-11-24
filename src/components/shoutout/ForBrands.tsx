import { brandSteps, campaignRequestUrl } from "@/data/shoutout";
import Line from "./Line";
import ShoutOutButton, { OpeningSoonNote } from "./ShoutOutButton";
import s from "./shoutout.module.css";

export default function ForBrands() {
  return (
    <section id="brands" data-so-section aria-labelledby="brands-title" className="scroll-mt-14 bg-white">
      <div className="mx-auto max-w-[1120px] px-6 py-[clamp(80px,12vw,160px)] sm:px-8">
        <div className="max-w-[980px]">
          <p data-so-reveal className="text-[15px] font-semibold text-(--so-muted) sm:text-[17px]">
            For brands
          </p>
          <h2
            id="brands-title"
            data-so-lines
            className="mt-4 text-[clamp(36px,5vw,64px)] leading-[1.03] font-semibold tracking-[-0.04em] text-balance text-(--so-ink)"
          >
            <Line>Find the voices</Line>
            <Line className="text-(--so-quiet)">your audience already trusts.</Line>
          </h2>
          <p data-so-reveal className="mt-6 max-w-[600px] text-[17px] leading-[1.6] text-(--so-muted) sm:text-[19px]">
            Partner with creators who already have your customers’ attention. We handle the matching, the management
            and the measurement, so you can focus on the message.
          </p>
        </div>

        {/* The process fills in as you scroll: the track draws and each step lights up. */}
        <div data-so-steps className="relative mt-12 md:mt-14">
          <div aria-hidden="true" className="absolute top-0 left-0 hidden h-px w-full bg-(--so-hairline) lg:block">
            <span data-so-track className="block h-full w-full origin-left bg-(--so-ink)" />
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:pt-6">
            {brandSteps.map((step) => (
              <li key={step.title} data-so-step className={`${s.step} flex h-full flex-col rounded-[24px] bg-(--so-mist) p-7 lg:min-h-[260px]`}>
                <span className={`${s.stepNumber} text-[40px] leading-none font-semibold tracking-[-0.04em] text-(--so-quiet) tabular-nums`}>
                  {step.number}
                </span>
                <h3 className="mt-8 text-[22px] font-semibold tracking-[-0.02em] text-(--so-ink) lg:mt-16">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-(--so-muted)">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div data-so-reveal className="mt-12 flex flex-col items-start gap-4">
          <ShoutOutButton href={campaignRequestUrl} label="Request a campaign" tone="dark" />
          {campaignRequestUrl ? null : <OpeningSoonNote what="Campaign requests" tone="dark" />}
        </div>
      </div>
    </section>
  );
}
