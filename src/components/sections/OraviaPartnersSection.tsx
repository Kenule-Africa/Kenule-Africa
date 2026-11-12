import Image from "next/image";

const partners = [
  { name: "Jos North", logo: "/assets/partners/jos_north.png", alt: "Jos North logo" },
  { name: "Tukshopp", logo: "/assets/partners/tukshopp.png", alt: "Tukshopp logo" },
  { name: "Blockfuse Labs", logo: "/assets/partners/blockfuse_labs.png", alt: "Blockfuse Labs logo" },
  { name: "BlueHouse Technologies", logo: "/assets/partners/bluehouse_technologies.png", alt: "BlueHouse Technologies logo" },
];

export default function OraviaPartnersSection() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="relative z-10 overflow-hidden bg-[#F5F5F3] px-4 py-20 sm:px-8 sm:py-28 lg:px-0"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#777]">
              Our partners
            </p>
            <h2
              id="partners-heading"
              className="max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.055em] text-[#111] sm:text-4xl md:text-5xl"
            >
              Progress is built <span className="font-serif font-normal italic text-[#777]">together.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#666] sm:text-base">
            We work alongside people and teams committed to moving Africa forward.
          </p>
        </div>

        <div className="grid grid-cols-2 border-y border-[#111]/10 md:grid-cols-4">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`group flex min-h-[174px] flex-col items-center justify-center gap-3 px-3 py-7 sm:min-h-[208px] sm:gap-4 sm:px-6 ${
                index % 2 === 0 ? "border-r border-[#111]/10 md:border-r-0" : ""
              } ${index < 2 ? "border-b border-[#111]/10 md:border-b-0" : ""} ${index > 0 ? "md:border-l md:border-[#111]/10" : ""}`}
            >
              <div className="relative flex h-[76px] w-full max-w-[190px] items-center justify-center sm:h-[96px] sm:max-w-[220px]">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  fill
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 220px"
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <p className="text-center text-[10px] font-medium tracking-[0.02em] text-[#4d5153] sm:text-xs">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
