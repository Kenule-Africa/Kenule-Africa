import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-14 bg-white">
      <div className="mx-auto max-w-[1120px] px-6 py-[clamp(96px,13vw,168px)] sm:px-8">
        <Reveal>
          <h2 id="about-title" className="text-[15px] font-semibold text-(--so-muted) sm:text-[17px]">
            About ShoutOut
          </h2>
          <p className="mt-6 max-w-[1000px] text-[clamp(30px,4.6vw,60px)] leading-[1.1] font-semibold tracking-[-0.035em]">
            <span className="text-(--so-ink)">We believe great work should travel.</span>{" "}
            <span className="text-(--so-quiet)">
              ShoutOut helps the people behind it, and the brands that believe in it, get the attention they have earned.
            </span>
          </p>
        </Reveal>

        <Reveal className="mt-16 grid gap-4 border-t border-(--so-hairline) pt-10 md:grid-cols-[1fr_1.6fr] md:gap-10">
          <h3 className="text-[17px] font-semibold text-(--so-ink)">Our mission</h3>
          <p className="max-w-[620px] text-[19px] leading-[1.6] text-(--so-muted) sm:text-[21px]">
            To build fair, lasting partnerships between creators and brands, grounded in craft, clarity and results.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
