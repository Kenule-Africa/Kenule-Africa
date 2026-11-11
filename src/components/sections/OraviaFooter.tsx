import Image from "next/image";

export default function OraviaFooter() {
  return (
    <footer className="bg-white py-14 sm:py-20 px-4 sm:px-8 lg:px-0 z-10 relative border-t border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 sm:gap-12">
        {/* Brand & Legal */}
        <div className="max-w-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src="/assets/logo.png"
                alt="Kenule Africa Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <span className="font-bold text-base tracking-tight text-[#111111]">
              KENULE AFRICA
            </span>
          </div>

          <p className="text-xs text-[#666666] leading-relaxed">
            Engineering products, infrastructure, and digital talent that move Africa forward.
            Jos, Plateau State, Nigeria.
          </p>

          <div className="text-[10px] text-gray-400 font-mono">
            RC: 8380017 · © {new Date().getFullYear()} Kenule Africa Ltd. All rights reserved.
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Ventures
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <a href="#ventures" className="hover:text-[#111111] transition-colors">
                  DeyPay Neobank
                </a>
              </li>
              <li>
                <a href="/legitlab-academy" className="hover:text-[#111111] transition-colors">
                  LegitLab Academy
                </a>
              </li>
              <li>
                <a href="/tomorrow" className="hover:text-[#111111] transition-colors">
                  TOMORROW Experience
                </a>
              </li>
              <li>
                <a href="#ventures" className="hover:text-[#111111] transition-colors">
                  Jos Tech Expo
                </a>
              </li>
              <li>
                <a
                  href="https://mykedu.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111111] transition-colors"
                >
                  Kédu Marketplace ↗
                </a>
              </li>
              <li>
                <a
                  href="https://forms.gle/PzbnPTfnHMCd79uj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-medium hover:underline"
                >
                  Cohort Application ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <a href="#about" className="hover:text-[#111111] transition-colors">
                  Our Purpose
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-[#111111] transition-colors">
                  Builders Circle
                </a>
              </li>
              <li>
                <a href="#lifecycle" className="hover:text-[#111111] transition-colors">
                  Methodology
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#111111] transition-colors">
                  Partner with Us
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <a
                  href="https://chat.whatsapp.com/Hhu3IVicy470u0yVdWjF8J?mode=gi_t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Builders Circle (WhatsApp)</span>
                  <span>↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/kenuleafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111111] transition-colors"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/kenuleafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111111] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@kenuleafrica.xyz"
                  className="hover:text-[#111111] transition-colors"
                >
                  admin@kenuleafrica.xyz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
