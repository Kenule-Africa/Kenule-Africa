import { campaignRequestUrl, creatorApplicationUrl } from "@/data/shoutout";
import ShoutOutButton from "./ShoutOutButton";
import s from "./shoutout.module.css";

export default function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="bg-white">
      <h2 id="closing-title" className="sr-only">
        Get started with ShoutOut
      </h2>
      <div
        data-so-panels
        className="mx-auto grid max-w-[1120px] gap-4 px-6 pb-[clamp(80px,12vw,160px)] sm:px-8 lg:grid-cols-2 lg:gap-5"
      >
        <div
          data-so-panel
          className={`${s.dark} flex min-h-[340px] flex-col justify-between gap-12 rounded-[32px] bg-black p-8 text-white sm:min-h-[400px] sm:p-12`}
        >
          <p className="text-[15px] font-semibold text-(--so-muted-dark)">For creators</p>
          <div>
            <h3 className="text-[clamp(34px,4vw,52px)] leading-[1.03] font-semibold tracking-[-0.04em]">
              Ready to
              <br />
              <span className={`${s.silver} inline-block`}>be seen?</span>
            </h3>
            <p className="mt-4 max-w-[380px] text-[17px] leading-[1.6] text-(--so-muted-dark)">
              Join a network built to open doors for your work.
            </p>
            <div className="mt-8">
              <ShoutOutButton href={creatorApplicationUrl} label="Join the network" tone="light" />
            </div>
          </div>
        </div>

        <div
          data-so-panel
          className="flex min-h-[340px] flex-col justify-between gap-12 rounded-[32px] bg-(--so-mist) p-8 sm:min-h-[400px] sm:p-12"
        >
          <p className="text-[15px] font-semibold text-(--so-muted)">For brands</p>
          <div>
            <h3 className="text-[clamp(34px,4vw,52px)] leading-[1.03] font-semibold tracking-[-0.04em] text-(--so-ink)">
              Ready to
              <br />
              <span className="text-(--so-quiet)">be heard?</span>
            </h3>
            <p className="mt-4 max-w-[380px] text-[17px] leading-[1.6] text-(--so-muted)">
              Tell us what you want to achieve and we will find the voices to carry it.
            </p>
            <div className="mt-8">
              <ShoutOutButton href={campaignRequestUrl} label="Request a campaign" tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
