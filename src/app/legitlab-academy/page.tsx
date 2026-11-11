import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Sparkles,
  Users,
  FolderOpen,
} from "lucide-react";
import AcademyHeader from "@/components/legitlab/AcademyHeader";
import TrackVisual from "@/components/legitlab/TrackVisual";
import { applicationUrl, contactUrl, faqs, tracks } from "@/data/legitlab";
import "./academy.css";

export const metadata: Metadata = {
  title: "LegitLab Academy",
  description:
    "Explore five tuition-free digital learning tracks at LegitLab Academy, a Kenule Africa initiative for practical skills, mentorship, and portfolio development.",
  alternates: { canonical: "/legitlab-academy" },
  openGraph: {
    title: "LegitLab Academy | Kenule Africa",
    description:
      "Practical skills. Real possibilities. Explore five digital learning tracks.",
    url: "https://kenuleafrica.xyz/legitlab-academy",
    images: [
      {
        url: "/assets/legitlab/wordmark.png",
        width: 1080,
        height: 1080,
        alt: "LegitLab, Nigeria&apos;s Digital Talent Launchpad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LegitLab Academy | Kenule Africa",
    description:
      "Practical digital skills, mentorship, and portfolio development.",
    images: ["/assets/legitlab/wordmark.png"],
  },
};
function ApplyLink({ light = false }: { light?: boolean }) {
  return (
    <a
      href={applicationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={"academy-button" + (light ? " light" : "")}
    >
      Apply to LegitLab <ArrowUpRight size={17} />
    </a>
  );
}

export default function AcademyPage() {
  return (
    <div className="academy-page">
      <a className="academy-skip" href="#academy-content">
        Skip to content
      </a>
      <AcademyHeader />
      <main id="academy-content">
        <section className="academy-shell academy-hero">
          <div className="hero-copy">
            <p className="academy-eyebrow">
              <span /> A KENULE AFRICA INITIATIVE
            </p>
            <h1>
              Your potential.
              <br />A new set of
              <br />
              <span className="hero-serif">possibilities.</span>
            </h1>
            <p className="academy-lead">
              Build digital skills. Create your next opportunity.
            </p>
            <p className="academy-muted">
              Practical learning, creative ambition, and a community to grow
              with. Welcome to LegitLab Academy, your starting point for what
              comes next.
            </p>
            <div className="academy-actions">
              <ApplyLink />
              <a href="#tracks" className="academy-text-link">
                Explore the tracks <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-footnote">
              <span>ZERO TUITION</span>
              <i />
              <span>FIVE LEARNING TRACKS</span>
            </div>
          </div>
          <div className="academy-hero-art">
            <div className="hero-art-top">
              <span>THE NEXT CHAPTER STARTS HERE</span>
              <ArrowUpRight size={18} />
            </div>
            <Image
              src="/assets/legitlab/monogram.png"
              alt="LegitLab monogram"
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 767px) 90vw, 45vw"
              className="hero-monogram"
            />
            <div className="hero-art-bottom">
              <div>
                <span>LEARN. BUILD. BECOME.</span>
                <strong>Made of possibility.</strong>
              </div>
              <span className="hero-art-index">LL / 01</span>
            </div>
            <div className="hero-float">
              <Sparkles size={18} />
              <span>
                Your next chapter,
                <br />
                <strong>built by you.</strong>
              </span>
            </div>
          </div>
        </section>
        <div className="academy-manifesto">
          <div className="academy-shell">
            <span>A SPACE FOR THE CURIOUS.</span>
            <span>THE CREATORS.</span>
            <span>THE BUILDERS.</span>
            <span>THE NEXT GENERATION.</span>
          </div>
        </div>
        <section
          className="academy-shell academy-overview"
          aria-labelledby="overview-title"
        >
          <div>
            <p className="academy-eyebrow">01 / THE IDEA</p>
            <h2 id="overview-title">
              Talent is everywhere.
              <br />
              <span className="muted-heading">Opportunity should be, too.</span>
            </h2>
          </div>
          <div>
            <p className="overview-description">
              LegitLab is Kenule Africa&apos;s digital skills initiative for young
              Africans in Jos and beyond. We bring practical learning,
              mentorship, and portfolio development together to help you take a
              meaningful next step.
            </p>
            <div className="overview-benefits">
              {[
                [
                  FolderOpen,
                  "Make real things",
                  "Put your learning into practice.",
                ],
                [
                  Users,
                  "Learn with people",
                  "Exchange ideas and get feedback.",
                ],
                [
                  Sparkles,
                  "Find your direction",
                  "Explore the work that interests you.",
                ],
              ].map(([Icon, title, copy]) => {
                const BenefitIcon = Icon as typeof FolderOpen;
                return (
                  <div key={String(title)}>
                    <BenefitIcon size={19} />
                    <strong>{String(title)}</strong>
                    <p>{String(copy)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section id="tracks" className="academy-tracks">
          <div className="academy-shell">
            <div className="section-heading">
              <div>
                <p className="academy-eyebrow">02 / FIND YOUR CRAFT</p>
                <h2>
                  Five tracks.
                  <br />
                  <span className="hero-serif">Your kind of future.</span>
                </h2>
              </div>
              <p>
                Follow your curiosity. Explore the skills, tools, and ideas
                behind the work you want to do.
              </p>
            </div>
            <div className="track-grid">
              {tracks.map((track) => (
                <article
                  className={"track-card track-" + track.id}
                  key={track.id}
                  id={"track-" + track.id}
                >
                  <TrackVisual kind={track.id} />
                  <div className="track-copy">
                    <p className="track-category">
                      <span>
                        {track.number} / {track.category}
                      </span>
                      <ArrowUpRight size={17} />
                    </p>
                    <h3>{track.title}</h3>
                    <p className="track-tagline">{track.tagline}</p>
                    <p className="track-description">{track.description}</p>
                    <p className="track-tools">{track.tools}</p>
                    <details className="track-details">
                      <summary>
                        Explore this track <Plus size={17} />
                      </summary>
                      <div>
                        <h4>What you will explore</h4>
                        <ul>
                          {track.topics.map((topic) => (
                            <li key={topic}>
                              <Check size={14} />
                              {topic}
                            </li>
                          ))}
                        </ul>
                        <h4>Illustrative project</h4>
                        <p>{track.project}</p>
                        <a
                          href={applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="academy-text-link"
                        >
                          Apply to LegitLab <ArrowUpRight size={15} />
                        </a>
                      </div>
                    </details>
                  </div>
                </article>
              ))}
              <aside className="track-help">
                <span className="academy-eyebrow">
                  THE FIRST STEP IS CURIOSITY
                </span>
                <div className="help-symbol" aria-hidden="true"><ArrowUpRight size={64} strokeWidth={1} /></div>
                <h3>
                  Not sure where
                  <br />
                  to start?
                </h3>
                <p>
                  You do not have to figure it all out alone. Tell us what you
                  enjoy, what you want to learn, and where you hope to go.
                </p>
                <a
                  href={contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="academy-text-link"
                >
                  Talk to the team <ArrowUpRight size={18} />
                </a>
              </aside>
            </div>
            <p className="track-disclaimer">
              Visuals and project ideas illustrate each field. Confirm the
              current cohort curriculum and requirements with the team.
            </p>
          </div>
        </section>
        <section id="experience" className="academy-experience">
          <div className="academy-shell">
            <div className="experience-heading">
              <div>
                <p className="academy-eyebrow">03 / MORE THAN INFORMATION</p>
                <h2>
                  Learn it.
                  <br />
                  Make it <span className="hero-serif">yours.</span>
                </h2>
                <p>
                  Build understanding through practice. Develop your ideas with
                  feedback. Leave room to discover what you can do.
                </p>
              </div>
              <Image
                src="/assets/legitlab/wordmark.png"
                width={1080}
                height={1080}
                alt="LegitLab, Nigeria&apos;s Digital Talent Launchpad"
                sizes="(max-width: 767px) 80vw, 360px"
              />
            </div>
            <div className="experience-steps">
              {[
                [
                  "01",
                  "Learn the foundations",
                  "Get familiar with the concepts and tools behind your chosen field.",
                ],
                [
                  "02",
                  "Put ideas into practice",
                  "Explore hands-on exercises and develop your own approach.",
                ],
                [
                  "03",
                  "Refine with feedback",
                  "Learn from conversations, mentorship, and different perspectives.",
                ],
                [
                  "04",
                  "Show your thinking",
                  "Bring your process and work together in a portfolio.",
                ],
              ].map(([n, title, copy]) => (
                <div key={n}>
                  <span>{n}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="academy-shell academy-details">
          <div>
            <p className="academy-eyebrow">04 / YOUR NEXT STEP</p>
            <h2>
              Bring your curiosity.
              <br />
              Start a conversation.
            </h2>
            <p className="academy-muted">
              Explore a track, complete the application form, and contact the
              team with questions about the upcoming cohort.
            </p>
            <div className="academy-actions">
              <ApplyLink />
              <a
                href={contactUrl}
                className="academy-text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask a question <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <dl className="program-facts">
            <div>
              <dt>Tuition</dt>
              <dd>100% free</dd>
            </div>
            <div>
              <dt>Our community</dt>
              <dd>Young African builders</dd>
            </div>
            <div>
              <dt>Our roots</dt>
              <dd>Jos, Nigeria. Looking forward.</dd>
            </div>
            <div>
              <dt>Dates & delivery</dt>
              <dd>Contact us for cohort details</dd>
            </div>
          </dl>
        </section>
        <section id="faq" className="academy-shell academy-faq">
          <div>
            <p className="academy-eyebrow">A LITTLE MORE CLARITY</p>
            <h2>
              Good questions.
              <br />A place to start.
            </h2>
            <p className="academy-muted">
              Still curious about something?
              <br />
              <a href="mailto:admin@kenuleafrica.xyz">Write to the team <ArrowUpRight size={14} aria-hidden="true" /></a>
            </p>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="academy-closing">
          <div className="academy-shell">
            <p className="academy-eyebrow">YOUR FUTURE IS A WORK IN PROGRESS</p>
            <h2>
              Give it something
              <br />
              <span className="hero-serif">to build on.</span>
            </h2>
            <ApplyLink light />
            <p>Practical skills. Fresh perspectives. New possibilities.</p>
          </div>
        </section>
      </main>
      <footer className="academy-footer academy-shell">
        <div>
          <Link href="/" className="academy-brand">
            <Image src="/assets/logo.png" width={32} height={32} alt="" />
            <span>
              KENULE AFRICA<small>Building people. Building possibility.</small>
            </span>
          </Link>
          <p>Jos, Plateau State, Nigeria | RC: 8380017</p>
        </div>
        <nav aria-label="Footer">
          <Link href="/">Back to Kenule Africa</Link>
          <Link href="/#community">Builders Circle</Link>
          <a href="mailto:admin@kenuleafrica.xyz">Get in touch</a>
        </nav>
        <small>&copy; {new Date().getFullYear()} Kenule Africa</small>
      </footer>
    </div>
  );
}
