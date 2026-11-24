import Image from "next/image";
import { ArrowRight } from "lucide-react";

// The fixed 3D Africa canvas passes behind this copy on small screens. A halo in the page
// background colour (#FAFAFA) clears the dots only around each letter, keeping the text
// legible while the 3D stays visible. Over plain background it is invisible.
const legibleOverCanvas =
  "[text-shadow:0_0_1px_#FAFAFA,0_0_4px_#FAFAFA,0_0_8px_#FAFAFA,0_0_14px_#FAFAFA,0_0_22px_#FAFAFA]";

export default function OraviaHeroSection() {
  const initiatives = [
    {
      name: "DeyPay",
      category: "Fintech Rails",
      logo: "/assets/depay.png",
      href: "#ventures",
      isExternal: false,
    },
    {
      name: "LegitLab",
      category: "Talent Academy",
      logo: "/assets/legitlab.png",
      href: "/legitlab-academy",
      isExternal: false,
    },
    {
      name: "Jos Tech Expo",
      category: "Innovation Summit",
      logo: "/assets/joetechexpo.png",
      href: "#ventures",
      isExternal: false,
    },
    {
      name: "ShoutOut",
      category: "Creator Agency",
      logo: "/assets/shoutout/shoutout-mark-white.png",
      href: "/shoutout",
      isExternal: false,
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-0 pt-28 sm:pt-36 pb-16 sm:pb-20 gap-12 lg:gap-16 max-w-7xl mx-auto w-full z-10">
        <div className="max-w-2xl space-y-6 sm:space-y-8 relative z-10 w-full">
          <div className="space-y-4 sm:space-y-6">
            {/* Status Pill Badge */}
            

            {/* Giant Title */}
            <h1 className={`font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-[#111111] leading-[1.02] sm:leading-[0.95] ${legibleOverCanvas}`}>
              African Reality.
              <br />
              <span className="text-[#666666]">Engineered.</span>
            </h1>

            {/* Description */}
            <p className={`max-w-lg font-sans text-sm sm:text-base text-[#666666] leading-relaxed ${legibleOverCanvas}`}>
              The foundational technology and digital talent layer for Africa’s next decade.
              Engineering fintech rails, democratizing high-income digital skills, and uniting
              regional ecosystems, designed specifically for how Africa actually works.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <a
              href="#ventures"
              className="group relative isolate overflow-hidden bg-[#111111] text-white text-sm font-semibold px-8 py-3.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.08)] ring-1 ring-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)] hover:ring-white/20 active:scale-[0.98] focus:outline-none flex items-center justify-center gap-2"
            >
              <div className="shimmer-layer absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent z-0 pointer-events-none"></div>
              <span className="relative z-10">Explore Our Ventures</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#about"
              className="px-8 py-3.5 bg-white text-[#111111] text-sm font-medium rounded shadow-sm text-center transition-all duration-300 ease-out hover:bg-gray-50 hover:text-black hover:shadow-md active:scale-[0.97] focus:outline-none"
            >
              Our Philosophy
            </a>
          </div>
        </div>

        {/* Visual: Live African Innovation Logic Graph */}
        <div className="relative w-full max-w-lg aspect-square lg:aspect-[4/3] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FAFAFA] via-white to-[#FAFAFA] opacity-50 blur-3xl"></div>
          <div className="premium-card w-full h-full p-6 relative overflow-hidden rounded-xl">
            <div className="h-full w-full flex flex-col justify-between">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#666666]">
                  Kenule Innovation Engine
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#666666]">
                  <span>RC: 8380017</span>
                </div>
              </div>

              {/* Animated SVG Graph */}
              <div className="flex-1 relative flex items-center justify-center">
                <svg className="w-full h-full max-h-[240px]" viewBox="0 0 400 240">
                  <style>{`
                    .signal-path-top {
                      stroke-dasharray: 60 400;
                      stroke-dashoffset: 60;
                      animation: signal-flow-top 5s linear infinite;
                    }
                    .signal-path-bottom {
                      stroke-dasharray: 60 400;
                      stroke-dashoffset: 60;
                      animation: signal-flow-bottom 5s linear infinite 0.5s;
                    }
                    @keyframes signal-flow-top {
                      0% { stroke-dashoffset: 60; opacity: 0; }
                      5% { opacity: 1; }
                      90% { stroke-dashoffset: -360; opacity: 1; }
                      95% { opacity: 0; }
                      100% { stroke-dashoffset: -360; opacity: 0; }
                    }
                    @keyframes signal-flow-bottom {
                      0% { stroke-dashoffset: 60; opacity: 0; }
                      5% { opacity: 1; }
                      90% { stroke-dashoffset: -360; opacity: 1; }
                      95% { opacity: 0; }
                      100% { stroke-dashoffset: -360; opacity: 0; }
                    }
                    .node-context { animation: pulse-context 5s infinite ease-out; transform-origin: 50px 120px; }
                    @keyframes pulse-context {
                      0% { transform: scale(1); fill: #111; }
                      5% { transform: scale(1.3); fill: #000; }
                      15% { transform: scale(1); fill: #111; }
                    }
                    .node-assumptions { animation: pulse-assumptions 5s infinite ease-out; transform-origin: 190px 60px; }
                    @keyframes pulse-assumptions {
                      25% { stroke-width: 1.5; transform: scale(1); }
                      30% { stroke-width: 2.5; transform: scale(1.05); stroke: #000; }
                      40% { stroke-width: 1.5; transform: scale(1); stroke: #111; }
                    }
                    .node-iteration { animation: pulse-iteration 5s infinite ease-out 0.5s; transform-origin: 190px 180px; }
                    @keyframes pulse-iteration {
                      25% { stroke-width: 1.5; transform: scale(1); }
                      30% { stroke-width: 2.5; transform: scale(1.05); stroke: #000; }
                      40% { stroke-width: 1.5; transform: scale(1); stroke: #111; }
                    }
                    .node-evidence { animation: pulse-evidence 5s infinite ease-out; transform-origin: 280px 100px; }
                    @keyframes pulse-evidence {
                      55% { stroke-width: 1.5; transform: scale(1); }
                      60% { stroke-width: 2.5; transform: scale(1.05); stroke: #000; }
                      70% { stroke-width: 1.5; transform: scale(1); stroke: #111; }
                    }
                    .node-scale { animation: pulse-scale 5s infinite ease-out 0.5s; transform-origin: 280px 140px; }
                    @keyframes pulse-scale {
                      55% { stroke-width: 1.5; transform: scale(1); }
                      60% { stroke-width: 2.5; transform: scale(1.05); stroke: #000; }
                      70% { stroke-width: 1.5; transform: scale(1); stroke: #111; }
                    }
                    .node-outcome { animation: pulse-outcome 5s infinite ease-out; transform-origin: 330px 120px; }
                    @keyframes pulse-outcome {
                      85% { transform: scale(1); fill: #111; }
                      90% { transform: scale(1.25); fill: #000; }
                      100% { transform: scale(1); fill: #111; }
                    }
                    .outcome-check {
                      stroke-dasharray: 12;
                      stroke-dashoffset: 12;
                      animation: check-draw 5s linear infinite;
                    }
                    @keyframes check-draw {
                      0%, 88% { stroke-dashoffset: 12; opacity: 0; }
                      92% { stroke-dashoffset: 0; opacity: 1; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                  `}</style>

                  {/* Static Base Paths */}
                  <path d="M50,120 C100,120 100,60 150,60" fill="none" stroke="#EAEAEA" strokeWidth="2"></path>
                  <path d="M50,120 C100,120 100,180 150,180" fill="none" stroke="#EAEAEA" strokeWidth="2"></path>
                  <path d="M150,60 C200,60 200,100 250,100" fill="none" stroke="#EAEAEA" strokeWidth="2"></path>
                  <path d="M150,180 C200,180 200,140 250,140" fill="none" stroke="#EAEAEA" strokeWidth="2"></path>
                  <path d="M250,100 L330,120" fill="none" stroke="#EAEAEA" strokeWidth="2"></path>
                  <path d="M250,140 L330,120" fill="none" stroke="#EAEAEA" strokeWidth="2"></path>

                  {/* Active Signal Paths: Both Top and Bottom Branches */}
                  <path d="M50,120 C100,120 100,60 150,60 C200,60 200,100 250,100 L330,120" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" className="signal-path-top"></path>
                  <path d="M50,120 C100,120 100,180 150,180 C200,180 200,140 250,140 L330,120" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" className="signal-path-bottom"></path>

                  {/* Nodes & Labels */}
                  <circle cx="50" cy="120" r="6" fill="#111111" className="node-context"></circle>
                  <text x="50" y="142" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="600" fill="#111111">
                    Context
                  </text>

                  {/* Top Branch Node 1: Local Problem */}
                  <rect x="150" y="50" width="84" height="20" rx="4" fill="white" stroke="#111111" strokeWidth="1.5" className="node-assumptions"></rect>
                  <text x="192" y="63" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fontWeight="600" fill="#111111" dy="1">
                    Local Problem
                  </text>

                  {/* Bottom Branch Node 1: Iteration */}
                  <rect x="150" y="170" width="84" height="20" rx="4" fill="white" stroke="#111111" strokeWidth="1.5" className="node-iteration"></rect>
                  <text x="192" y="183" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fontWeight="600" fill="#111111" dy="1">
                    Iteration
                  </text>

                  {/* Top Branch Node 2: Execution */}
                  <rect x="250" y="90" width="70" height="20" rx="4" fill="white" stroke="#111111" strokeWidth="1.5" className="node-evidence"></rect>
                  <text x="285" y="103" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fontWeight="600" fill="#111111" dy="1">
                    Execution
                  </text>

                  {/* Bottom Branch Node 2: Scale */}
                  <rect x="250" y="130" width="70" height="20" rx="4" fill="white" stroke="#111111" strokeWidth="1.5" className="node-scale"></rect>
                  <text x="285" y="143" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fontWeight="600" fill="#111111" dy="1">
                    Scale
                  </text>

                  {/* Convergence Output Node: Impact */}
                  <circle cx="330" cy="120" r="11" fill="#111111" className="node-outcome"></circle>
                  <path d="M326 120l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="outcome-check"></path>
                  <text x="330" y="144" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="600" fill="#111111">
                    Impact
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM LOGOS TICKER */}
      <section className="border-y border-neutral-800 py-10 sm:py-12 bg-black z-10 relative px-4 sm:px-8 lg:px-0">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="text-center lg:text-left shrink-0">
            <p className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-[0.2em] whitespace-nowrap">
              KENULE INITIATIVES & HUBS
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-end gap-x-8 sm:gap-x-12 lg:gap-x-14 gap-y-6 w-full lg:w-auto">
            {initiatives.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 sm:gap-3.5 group transition-all duration-300 hover:opacity-100 opacity-90"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <Image
                    src={item.logo}
                    alt={`${item.name} Logo`}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-[#f0b90b] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
