import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import Cta from "./Cta";
import TomorrowExperience from "./TomorrowExperience";
import TomorrowMotion from "./TomorrowMotion";
import s from "./tomorrow.module.css";

export const metadata: Metadata = {
  title: { absolute: "TOMORROW | A Kenule Africa Experience" },
  description:
    "An exclusive gathering in Port Harcourt bringing together dignitaries, investors, business executives, founders and innovators to explore ideas, technology and opportunities shaping the future.",
  alternates: { canonical: "/tomorrow" },
  openGraph: {
    title: "TOMORROW | A Kenule Africa Experience",
    description: "Tomorrow begins with the people you meet today.",
    url: "https://kenuleafrica.xyz/tomorrow",
    siteName: "Kenule Africa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOMORROW | A Kenule Africa Experience",
    description: "Tomorrow begins with the people you meet today.",
    images: [
      {
        url: "/tomorrow/opengraph-image.png",
        width: 1672,
        height: 941,
        alt: "A luminous horizon over Africa",
      },
    ],
  },
};
const audience = [
  [
    "01",
    "Dignitaries & public sector leaders",
    "People shaping policy and public life.",
  ],
  [
    "02",
    "Investors & capital allocators",
    "Those who help promising ideas find room to grow.",
  ],
  [
    "03",
    "Business executives & industry leaders",
    "Leaders guiding the institutions around us.",
  ],
  [
    "04",
    "Founders & entrepreneurs",
    "People turning conviction into new ventures.",
  ],
  [
    "05",
    "Innovators & technology leaders",
    "Those exploring what technology makes possible.",
  ],
  [
    "06",
    "Forward-thinking individuals",
    "Curious minds ready to take part in what comes next.",
  ],
] as const;
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className={s.eyebrow}>{children}</p>;
}

export default function TomorrowPage() {
  const mobileHero = getImageProps({
    src: "/assets/tomorrow/mobile-hero-bg.png",
    alt: "A sunrise over Africa beneath a star-filled sky",
    width: 941,
    height: 1672,
    quality: 95,
    sizes: "100vw",
  });
  const mobileClosing = getImageProps({
    src: "/assets/tomorrow/TOMORROW-BEGINS-TODAY-bg-image-mobile.png",
    alt: "A luminous horizon above Africa",
    width: 941,
    height: 1672,
    quality: 95,
    sizes: "100vw",
  });
  return (
    <div className={s.page} data-tomorrow-page>
      <TomorrowMotion />
      <a className={s.skip} href="#main">
        Skip to content
      </a>
      <main id="main">
        <section
          className={s.hero}
          data-tomorrow-hero
          aria-labelledby="hero-title"
        >
          <div className={s.heroVisual} data-hero-visual data-hero-parallax>
            <picture className={s.heroPicture}>
              <source
                media="(max-width: 720px)"
                srcSet={mobileHero.props.srcSet}
                sizes="100vw"
              />
              <Image
                src="/assets/tomorrow/hero-section-bg.png"
                alt="A luminous horizon rising over a night-lit map of Africa"
                fill
                priority
                quality={95}
                sizes="100vw"
                className={s.heroImage}
              />
            </picture>
            <div className={s.heroImageShade} />
          </div>
          <div className={s.heroCopy}>
            <Eyebrow>
              <span data-hero-copy>A KENULE AFRICA EXPERIENCE</span>
            </Eyebrow>
            <h1 id="hero-title" aria-label="TOMORROW">
              <span className={s.titleVisual} aria-hidden="true">
                {"TOMORROW".split("").map((letter, i) => (
                  <span className={s.titleMask} key={i}>
                    <span className={s.titleChar} data-title-char>
                      {letter}
                    </span>
                  </span>
                ))}
                <span className={s.titleMask}>
                  <span
                    className={s.titleChar + " " + s.titleDot}
                    data-title-char
                  >
                    .
                  </span>
                </span>
              </span>
            </h1>
            <p className={s.lead} data-hero-copy>
              An evening bringing together the people shaping the future.
            </p>
            <p className={s.promise} data-hero-copy>
              Tomorrow begins with the people you meet today.
            </p>
            <div className={s.actions}>
              <a className={s.discoverLink} href="#idea" data-hero-action>
                <span>Scroll to discover</span>
                <i>
                  <ArrowDown size={15} aria-hidden="true" />
                </i>
              </a>
            </div>
          </div>
          <div className={s.place}>
            <MapPin className={s.placeIcon} size={14} aria-hidden="true" />
            <span>PORT HARCOURT</span>
            <span>NIGERIA</span>
          </div>
        </section>
        <section className={s.idea} id="idea" aria-labelledby="idea-title">
          
          <div className={s.ideaBody}>
            <h2 id="idea-title" data-reveal>
              THE FUTURE IS
              <br />
              <em>SHAPED TOGETHER.</em>
            </h2>
            <div className={s.ideaCopy} data-reveal>
              <p>
                TOMORROW is a curated gathering for people with the influence,
                resources, ideas and ambition to shape what comes next.
              </p>
              <p>
                Through meaningful conversations, emerging technologies, product
                experiences and unexpected connections, possibilities meet
                opportunity.
              </p>
            </div>
          </div>
          <p className={s.manifesto} data-reveal>
            The people shaping tomorrow
            <br />
            belong in the room today.
          </p>
        </section>
        <TomorrowExperience />
        <section className={s.audience} aria-labelledby="audience-title">
          <div className={s.audIntro}>
            <h2 id="audience-title" data-reveal>
              WHO SHOULD
              <br />
              BE IN THE <em>ROOM?</em>
            </h2>
            <p data-reveal>
              The future is shaped by people who think differently, build
              boldly, lead with purpose and recognise opportunities before they
              become obvious.
            </p>
          </div>
          <ol className={s.audList}>
            {audience.map(([n, title, copy]) => (
              <li data-reveal key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          className={s.waitlist}
          id="waitlist"
          aria-labelledby="waitlist-title"
        >
          <div className={s.glow} aria-hidden="true" />
          <Eyebrow data-reveal>
            THE NEXT CHAPTER STARTS WITH AN INTRODUCTION
          </Eyebrow>
          <h2 id="waitlist-title" data-reveal>
            BE PART OF
            <br />
            WHAT <em>COMES NEXT.</em>
          </h2>
          <p data-reveal>
            The most meaningful opportunities often begin with an introduction.
            Continue to the final invitation below to join the TOMORROW waitlist
            and hear when further details become available.
          </p>
          <a className={s.waitlistNext} href="#closing-waitlist" data-reveal>
            <span>Be the first to hear what&apos;s next.</span>
            <i aria-hidden="true"><ArrowDown size={24} strokeWidth={1.5} /></i>
            <small>CONTINUE TO THE FINAL INVITATION</small>
          </a>
        </section>
        <section className={s.closing} aria-labelledby="closing-title">
          <picture className={s.closingPicture} data-scene-parallax>
            <source
              media="(max-width: 720px)"
              srcSet={mobileClosing.props.srcSet}
              sizes="100vw"
            />
            <Image
              src="/assets/tomorrow/TOMORROW-BEGINS-TODAY-bg-image.png"
              alt=""
              fill
              quality={95}
              sizes="100vw"
            />
          </picture>
          <div className={s.closingShade} />
          <h2 id="closing-title" data-reveal>
            TOMORROW
            <br />
            <em>BEGINS TODAY.</em>
          </h2>
          <p data-reveal>It begins with the people you meet today.</p>
          <span id="closing-waitlist" data-reveal>
            <Cta label="Join the waitlist" />
          </span>
        </section>
      </main>
      <footer className={s.footer}>
        <div className={s.footerMain}>
          <div className={s.footerIdentity}>
            <Link className={s.brand} href="/">
              <Image src="/assets/logo.png" alt="" width={34} height={34} />
              <span>
                KENULE AFRICA
                <small>BUILDING PEOPLE. BUILDING POSSIBILITY.</small>
              </span>
            </Link>
            <p>
              Building technology, talent and experiences for Africa&apos;s next
              chapter.
            </p>
            <span className={s.footerLocation}>JOS, NIGERIA · RC 8380017</span>
          </div>
          <nav className={s.footerNav} aria-label="Explore Kenule Africa">
            <div>
              <span>EXPLORE</span>
              <Link href="/">Kenule Africa</Link>
              <Link href="/legitlab-academy">LegitLab Academy</Link>
              <Link href="/#ventures">Our ventures</Link>
            </div>
            <div>
              <span>TOMORROW</span>
              <Link href="/tomorrow#idea">The idea</Link>
              <Link href="/tomorrow#experience">The evening</Link>
              <Link href="/tomorrow#waitlist">Join the waitlist</Link>
            </div>
            <div>
              <span>CONNECT</span>
              <a href="mailto:admin@kenuleafrica.xyz">
                Contact the team <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/kenuleafrica"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a
                href="https://x.com/kenuleafrica"
                target="_blank"
                rel="noreferrer"
              >
                X / Twitter <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
        <div className={s.footerBottom}>
          <span className={s.footerCopyright}>
            © {new Date().getFullYear()} KENULE AFRICA LTD. ALL RIGHTS RESERVED.
          </span>
        </div>
      </footer>
    </div>
  );
}
