import { GraduationCap, Handshake, Megaphone, UsersRound, type LucideIcon } from "lucide-react";
import { services, type ServiceId } from "@/data/shoutout";
import Reveal from "./Reveal";

const icons: Record<ServiceId, LucideIcon> = {
  "digital-marketing": Megaphone,
  "influencer-management": UsersRound,
  "talent-development": GraduationCap,
  "brand-partnerships": Handshake,
};

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-14 bg-(--so-mist)">
      <div className="mx-auto max-w-[1120px] px-6 py-[clamp(96px,12vw,160px)] sm:px-8">
        <Reveal className="max-w-[980px]">
          <p className="text-[15px] font-semibold text-(--so-muted) sm:text-[17px]">Our services</p>
          <h2
            id="services-title"
            className="mt-4 text-[clamp(36px,5vw,64px)] leading-[1.03] font-semibold tracking-[-0.04em] text-balance text-(--so-ink)"
          >
            Everything influence needs.
            <br />
            <span className="text-(--so-quiet)">Under one roof.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5">
          {services.map((service, index) => {
            const Icon = icons[service.id];
            return (
              <Reveal key={service.id} delay={(index % 2) * 90} className="h-full">
                <article className="flex h-full flex-col rounded-[28px] bg-white p-8 sm:p-11">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black text-white">
                      <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="text-[13px] font-medium text-(--so-quiet) tabular-nums">{service.number}</span>
                  </div>
                  <h3 className="mt-9 text-[clamp(26px,2.6vw,34px)] sm:mt-12 leading-[1.1] font-semibold tracking-[-0.03em] text-(--so-ink)">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[17px] leading-[1.55] text-(--so-muted)">{service.description}</p>
                  <ul aria-label={`${service.title} capabilities`} className="mt-8 flex flex-wrap gap-2">
                    {service.capabilities.map((capability) => (
                      <li key={capability} className="rounded-full bg-(--so-mist) px-3.5 py-1.5 text-[13px] text-(--so-ink)">
                        {capability}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
