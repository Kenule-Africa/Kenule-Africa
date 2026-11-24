import type { Metadata } from "next";
import About from "@/components/shoutout/About";
import ClosingCta from "@/components/shoutout/ClosingCta";
import CreatorNetwork from "@/components/shoutout/CreatorNetwork";
import ForBrands from "@/components/shoutout/ForBrands";
import Hero from "@/components/shoutout/Hero";
import Services from "@/components/shoutout/Services";
import ShoutOutFooter from "@/components/shoutout/ShoutOutFooter";
import ShoutOutHeader from "@/components/shoutout/ShoutOutHeader";
import ShoutOutMotion from "@/components/shoutout/ShoutOutMotion";
import s from "@/components/shoutout/shoutout.module.css";

// Runs during HTML parsing, before the hero paints, so the reveal starts from a clean
// slate instead of flashing the finished hero first. ShoutOutMotion removes the class;
// a CSS failsafe reveals everything if scripts never run.
const introScript =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('so-intro')}catch(e){}";

const title = "ShoutOut | A Kenule Africa Company";
const description =
  "ShoutOut connects creators and brands through digital marketing, influencer management, talent development and brand partnerships.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/shoutout" },
  openGraph: {
    title,
    description,
    url: "https://kenuleafrica.xyz/shoutout",
    siteName: "Kenule Africa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/shoutout/opengraph-image.png", width: 1200, height: 630, alt: "ShoutOut logo" }],
  },
  icons: {
    icon: "/assets/shoutout/shoutout-icon.png",
    apple: "/assets/shoutout/shoutout-icon.png",
  },
};

export default function ShoutOutPage() {
  return (
    <div id="top" className={s.page}>
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <ShoutOutMotion />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-[14px] focus:text-black"
      >
        Skip to content
      </a>
      <ShoutOutHeader />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <CreatorNetwork />
        <ForBrands />
        <ClosingCta />
      </main>
      <ShoutOutFooter />
    </div>
  );
}
