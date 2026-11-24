"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { sectionLinks } from "@/data/shoutout";
import s from "./shoutout.module.css";

export default function ShoutOutHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  // The blur is skipped while the menu is open: backdrop-filter would make the header the
  // containing block for the fixed mobile menu and collapse it to the header's height.
  const translucent = scrolled && !open;

  return (
    <header
      className={`${s.dark} sticky top-0 z-50 text-white transition-[background-color,box-shadow] duration-300 ${
        translucent ? "bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-xl backdrop-saturate-150" : "bg-black"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-6 sm:px-8">
        <a href="#top" aria-label="ShoutOut, back to top" className="flex items-center">
          <Image
            src="/assets/shoutout/shoutout-logo-white.png"
            alt="ShoutOut"
            width={1098}
            height={271}
            priority
            sizes="112px"
            className="h-[26px] w-auto"
          />
        </a>

        <nav aria-label="ShoutOut sections" className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href} data-so-nav={link.href} className={`${s.navLink} text-[13px] text-white/70 hover:text-white`}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden items-center gap-1 text-[13px] text-white/70 transition-colors hover:text-white md:inline-flex"
          >
            Kenule Africa <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <button
            ref={trigger}
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center text-white md:hidden"
            aria-expanded={open}
            aria-controls="shoutout-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="shoutout-mobile-nav"
          aria-label="ShoutOut sections"
          className={`${s.menuSheet} fixed inset-x-0 top-14 bottom-0 flex flex-col overflow-y-auto bg-black px-6 pt-4 pb-[max(40px,env(safe-area-inset-bottom))] md:hidden`}
        >
          {sectionLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${60 + index * 55}ms` }}
              className={`${s.menuItem} flex items-center justify-between border-b border-(--so-hairline-dark) py-5 text-[30px] font-semibold tracking-[-0.03em] text-white active:text-white/60`}
            >
              {link.label}
              <span className="text-[13px] font-medium text-(--so-muted-dark) tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            </a>
          ))}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ animationDelay: `${60 + sectionLinks.length * 55}ms` }}
            className={`${s.menuItem} mt-auto inline-flex items-center gap-1.5 pt-10 text-[15px] text-(--so-muted-dark)`}
          >
            Back to Kenule Africa <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
