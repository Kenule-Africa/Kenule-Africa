"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 360);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      }}
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[100] grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-[#111216]/90 text-white/80 shadow-[0_8px_35px_#0008] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#111216] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-7 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <ArrowUp size={19} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

