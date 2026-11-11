"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

export default function OraviaHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const exploreMenu = useRef<HTMLDivElement>(null);
  const exploreTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isExploreOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!exploreMenu.current?.contains(event.target as Node)) {
        setIsExploreOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExploreOpen(false);
        exploreTrigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isExploreOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 md:px-12 lg:px-20 py-3.5 sm:py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] shadow-sm"
            : "bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#EAEAEA]/50"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 focus:outline-none group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <Image
                src="/assets/logo.png"
                alt="Kenule Africa Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain rounded-full"
                priority
              />
            </div>
            <span className="font-sans text-sm sm:text-base font-bold tracking-tight text-[#111111]">
              KENULE AFRICA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            <Link href="/legitlab-academy" className="text-xs font-medium text-[#666666] hover:text-[#111111]">LegitLab Academy</Link>
            <Link href="/tomorrow" className="text-xs font-medium text-[#666666] transition-colors hover:text-[#111111]">Tomorrow</Link>
            <div
              ref={exploreMenu}
              className="relative"
              onMouseEnter={() => setIsExploreOpen(true)}
              onMouseLeave={() => setIsExploreOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  setIsExploreOpen(false);
                }
              }}
            >
              <button
                ref={exploreTrigger}
                type="button"
                aria-expanded={isExploreOpen}
                aria-haspopup="true"
                onClick={() => setIsExploreOpen((open) => !open)}
                onFocus={() => setIsExploreOpen(true)}
                className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
              >
                Explore
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isExploreOpen ? "rotate-180" : ""}`} />
              </button>
              {isExploreOpen && (
                <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-xl border border-[#e9e9e9] bg-white p-2 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.28)]">
                    <a
                      href="#about"
                      onClick={() => setIsExploreOpen(false)}
                      className="block rounded-lg px-3 py-3 text-xs font-medium text-[#666666] transition-colors hover:bg-[#f4f4f2] hover:text-[#111111]"
                    >
                      Our Story
                    </a>
                    <a
                      href="#ventures"
                      onClick={() => setIsExploreOpen(false)}
                      className="block rounded-lg px-3 py-3 text-xs font-medium text-[#666666] transition-colors hover:bg-[#f4f4f2] hover:text-[#111111]"
                    >
                      Ventures
                    </a>
                    <a
                      href="#lifecycle"
                      onClick={() => setIsExploreOpen(false)}
                      className="block rounded-lg px-3 py-3 text-xs font-medium text-[#666666] transition-colors hover:bg-[#f4f4f2] hover:text-[#111111]"
                    >
                      Methodology
                    </a>
                    <a
                      href="#community"
                      onClick={() => setIsExploreOpen(false)}
                      className="block rounded-lg px-3 py-3 text-xs font-medium text-[#666666] transition-colors hover:bg-[#f4f4f2] hover:text-[#111111]"
                    >
                      Community
                    </a>
                  </div>
                </div>
              )}
            </div>
            <a
              href="#community"
              className="font-sans text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
            >
              Community
            </a>
            <a
              href="#contact"
              className="font-sans text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://forms.gle/PzbnPTfnHMCd79uj8"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex group relative isolate overflow-hidden bg-[#111111] text-white text-xs font-semibold px-5 sm:px-6 py-2.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.08)] ring-1 ring-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.04] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:ring-white/20 active:scale-[0.98] focus:outline-none items-center gap-1.5"
            >
              <div className="shimmer-layer absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent z-10 pointer-events-none"></div>
              <span className="relative z-20">Apply to LegitLab</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-20 transition-transform group-hover:translate-x-0.5" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-[#111111] hover:bg-black/5 active:bg-black/10 rounded-lg border border-[#EAEAEA] bg-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAFAFA]/98 backdrop-blur-2xl xl:hidden flex flex-col justify-between p-6 pt-24 pb-8 animate-in fade-in duration-200">
          <div className="flex flex-col gap-1 text-base font-medium text-[#111111] divide-y divide-[#EAEAEA]/80">
            <div className="border-b border-[#EAEAEA]/80">
              <button
                type="button"
                aria-expanded={isExploreOpen}
                onClick={() => setIsExploreOpen((open) => !open)}
                className="w-full py-3.5 px-2 flex items-center justify-between text-[#111111] hover:text-black font-semibold text-lg"
              >
                <span>Explore</span>
                <ChevronDown className={`w-4 h-4 text-[#888888] transition-transform ${isExploreOpen ? "rotate-180" : ""}`} />
              </button>
              {isExploreOpen && (
                <div className="grid gap-1 pb-3 pl-4">
                  <a href="#about" onClick={() => { setIsMobileMenuOpen(false); setIsExploreOpen(false); }} className="py-2 text-lg font-semibold text-[#111111]">Our Story</a>
                  <a href="#ventures" onClick={() => { setIsMobileMenuOpen(false); setIsExploreOpen(false); }} className="py-2 text-lg font-semibold text-[#111111]">Ventures</a>
                  <a href="#lifecycle" onClick={() => { setIsMobileMenuOpen(false); setIsExploreOpen(false); }} className="py-2 text-lg font-semibold text-[#111111]">Methodology</a>
                  <a href="#community" onClick={() => { setIsMobileMenuOpen(false); setIsExploreOpen(false); }} className="py-2 text-lg font-semibold text-[#111111]">Community</a>
                </div>
              )}
            </div>
            <a
              href="/legitlab-academy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3.5 px-2 flex items-center justify-between text-[#111111] hover:text-black font-semibold text-lg"
            >
              <span>LegitLab</span>
              <ArrowRight className="w-4 h-4 text-[#888888]" />
            </a>
            <a
              href="/tomorrow"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3.5 px-2 flex items-center justify-between text-[#111111] hover:text-black font-semibold text-lg"
            >
              <span>Tomorrow</span>
              <ArrowRight className="w-4 h-4 text-[#888888]" />
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3.5 px-2 flex items-center justify-between text-[#111111] hover:text-black font-semibold text-lg"
            >
              <span>Contact</span>
              <ArrowRight className="w-4 h-4 text-[#888888]" />
            </a>
          </div>

          <div className="pt-6 space-y-4">
            <a
              href="https://forms.gle/PzbnPTfnHMCd79uj8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-4 bg-[#111111] text-white rounded-xl font-semibold text-sm shadow-lg shadow-black/10 flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>Apply to LegitLab Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="text-center font-mono text-[10px] text-[#777777] tracking-wider uppercase">
              RC: 8380017 · Jos, Plateau State, Nigeria
            </div>
          </div>
        </div>
      )}
    </>
  );
}
