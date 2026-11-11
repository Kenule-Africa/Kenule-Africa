import Image from "next/image";
import { ArrowLeft, ArrowRight, UsersRound } from "lucide-react";
import s from "./tomorrow.module.css";

const experiences = [
  {
    number: "01",
    title: "THE FUTURE SHOWCASE",
    description:
      "Discover emerging ideas, technologies, innovations and possibilities shaping our collective future.",
    visual: "showcase",
    image: "/assets/tomorrow/hero-section-bg.png",
    alt: "A light-filled horizon above Africa, representing emerging possibilities",
    note: "IDEAS MADE VISIBLE",
  },
  {
    number: "02",
    title: "PRODUCT EXHIBITION & EXPERIENCE",
    description:
      "Explore Kenule Africa's new products, interact with emerging solutions and experience technology differently.",
    visual: "products",
    alt: "Kenule Africa product identities presented together",
    note: "FROM POSSIBILITY TO PRODUCT",
  },
  {
    number: "03",
    title: "CONVERSATIONS",
    description:
      "Engage with distinguished personalities, investors, executives, entrepreneurs and other forward-thinking individuals.",
    visual: "conversations",
    image: "/assets/builderCircle.png",
    alt: "Builders Circle, a community for people building new ideas",
    note: "PERSPECTIVES IN THE ROOM",
  },
  {
    number: "04",
    title: "DRINKS & NETWORKING",
    description:
      "Connect, exchange ideas and build relationships in an exceptional atmosphere.",
    visual: "networking",
    image: "/assets/tomorrow/new-assets.png",
    alt: "Sculptural silver light in an atmospheric event space",
    note: "GOOD COMPANY, NEW CONNECTIONS",
  },
  {
    number: "05",
    title: "THE AFTER PARTY",
    description:
      "An evening of celebration, entertainment and unforgettable experiences.",
    visual: "afterParty",
    image: "/assets/tomorrow/TOMORROW-BEGINS-TODAY-bg-image.png",
    alt: "A bright horizon over Africa marking the close of the evening",
    note: "THE NIGHT, CONTINUED",
  },
] as const;

export default function TomorrowExperience() {
  return (
    <section className={s.experience} id="experience" aria-labelledby="experience-title">
      <div className={s.experienceCanvas} data-experience-canvas>
        <div className={s.experienceOpening} data-experience-opening>
          <Image
            className={s.experienceOpeningImage}
            src="/assets/tomorrow/new-assets.png"
            alt=""
            fill
            priority={false}
            quality={90}
            sizes="100vw"
            aria-hidden="true"
          />
          <div className={s.experienceOpeningTexture} aria-hidden="true" />
          <p className={s.experienceOpeningEyebrow}>A KENULE AFRICA EXPERIENCE</p>
          <p className={s.experienceOpeningAside} data-experience-aside>
            ONE EVENING.
            <br />
            FIVE EXPERIENCES.
          </p>
          <h2 className={s.experienceOpeningTitle} id="experience-title" data-experience-title>
            <span>AN EVENING</span>
            <span>OF POSSIBILITIES.</span>
          </h2>
          <div className={s.experienceOpeningFooter} data-experience-aside>
            <span>PORT HARCOURT · NIGERIA</span>
            <span>SCROLL TO DISCOVER <b>↓</b></span>
          </div>
        </div>

        <div className={s.experiencePresentation} data-experience-presentation>
          <div className={s.experiencePresentationTexture} aria-hidden="true" />
          {/* <p className={s.experiencePresentationEyebrow}>
            FIVE EXPERIENCES <span>·</span> ONE GATHERING
          </p> */}
          {experiences.map((experience) => (
            <article
              className={s.experienceState}
              data-experience-state
              data-visual={experience.visual}
              key={experience.number}
              aria-label={`${experience.number}: ${experience.title}`}
            >
              <div className={s.experienceNumber}>
                <span>EXPERIENCE</span>
                <strong>{experience.number}</strong>
                <span className={s.experienceIndexRail} aria-hidden="true">
                  <b data-rail-number="01">01</b><i />
                  <b data-rail-number="02">02</b><i />
                  <b data-rail-number="03">03</b><i />
                  <b data-rail-number="04">04</b><i />
                  <b data-rail-number="05">05</b>
                </span>
              </div>

              <div className={`${s.experienceVisual} ${s[experience.visual]}`}>
                {experience.visual === "products" ? (
                  <div className={s.experienceProductArt}>
                    <Image src="/assets/depay.png" alt="DeyPay" width={500} height={275} />
                    <Image src="/assets/legitlab.png" alt="LegitLab" width={500} height={500} />
                    <Image src="/assets/kude.png" alt="Kedu" width={368} height={368} />
                  </div>
                ) : experience.visual === "networking" ? (
                  <div className={s.experienceNetworkArt}>
                    <Image src={experience.image} alt={experience.alt} fill sizes="(max-width:720px) 80vw, 48vw" />
                    <div aria-hidden="true" />
                    <UsersRound size={88} strokeWidth={0.8} aria-hidden="true" />
                  </div>
                ) : (
                  <Image
                    src={experience.image}
                    alt={experience.alt}
                    fill
                    quality={92}
                    sizes="(max-width:720px) 90vw, 48vw"
                  />
                )}
                <span className={s.experienceVisualNote}>{experience.note}</span>
              </div>

              <div className={s.experienceCopy}>
                <span className={s.experienceCopyEyebrow}>TOMORROW / {experience.number}</span>
                <h3>{experience.title}</h3>
                <p>{experience.description}</p>
                <span className={s.experienceCopyEnd}>KENULE AFRICA</span>
              </div>
            </article>
          ))}
          <div className={s.experiencePresentationFooter} aria-hidden="true">
            <span>THE EXPERIENCE</span>
            <span>SCROLL TO CONTINUE</span>
          </div>
          <nav className={s.mobileExperienceControls} data-mobile-experience-controls aria-label="Experience presentation controls">
            <button type="button" data-experience-exit>
              <ArrowLeft size={16} aria-hidden="true" />
              <span>BACK TO PAGE</span>
            </button>
            <span className={s.mobileExperienceCount} data-experience-count aria-live="polite">01 <i>/</i> 05</span>
            <button type="button" data-experience-next>
              <span>NEXT EXPERIENCE</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
