const statement = [
  { text: "We believe great work should travel.", tone: "text-(--so-ink)" },
  {
    text: "ShoutOut helps the people behind it, and the brands that believe in it, get the attention they have earned.",
    tone: "text-(--so-quiet)",
  },
];

export default function About() {
  return (
    <section id="about" data-so-section aria-labelledby="about-title" className="scroll-mt-14 bg-white">
      <div className="mx-auto max-w-[1120px] px-6 py-[clamp(80px,13vw,168px)] sm:px-8">
        <h2 id="about-title" data-so-reveal className="text-[15px] font-semibold text-(--so-muted) sm:text-[17px]">
          About ShoutOut
        </h2>
        {/* Each word lights up in turn as the statement scrolls past, as if spoken. */}
        <p
          data-so-statement
          className="mt-6 max-w-[1000px] text-[clamp(30px,4.6vw,60px)] leading-[1.1] font-semibold tracking-[-0.035em]"
        >
          {statement.map((sentence, sentenceIndex) => (
            <span key={sentence.text} className={sentence.tone}>
              {sentenceIndex > 0 ? " " : null}
              {sentence.text.split(" ").map((word, wordIndex) => (
                <span key={`${word}-${wordIndex}`}>
                  {wordIndex > 0 ? " " : null}
                  <span data-so-spoken>{word}</span>
                </span>
              ))}
            </span>
          ))}
        </p>

        <div className="relative mt-16 grid gap-4 pt-10 md:grid-cols-[1fr_1.6fr] md:gap-10">
          <span data-so-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-(--so-hairline)" />
          <h3 data-so-reveal className="text-[17px] font-semibold text-(--so-ink)">
            Our mission
          </h3>
          <p data-so-reveal className="max-w-[620px] text-[19px] leading-[1.6] text-(--so-muted) sm:text-[21px]">
            To build fair, lasting partnerships between creators and brands, grounded in craft, clarity and results.
          </p>
        </div>
      </div>
    </section>
  );
}
