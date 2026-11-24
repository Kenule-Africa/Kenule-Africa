"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./shoutout.module.css";

// Motion tokens: one small vocabulary of easing, timing and distance, used everywhere.
const EASE = {
  enter: "expo.out", // confident arrivals: headlines, cards, rules
  settle: "power3.out", // supporting copy and controls
  reveal: "expo.inOut", // the hero iris
};
const DURATION = { short: 0.6, base: 0.9, long: 1.15, reveal: 1.7 };
const STAGGER = { tight: 0.06, base: 0.09 };
const MOTION_ALLOWED = "(prefers-reduced-motion: no-preference)";

/** All ShoutOut motion: the hero reveal, scroll choreography and pointer effects.
 *  Markup stays server-rendered and fully visible without it. */
export default function ShoutOutMotion() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const page = document.querySelector<HTMLElement>(`.${s.page}`);
    // Lift the pre-hydration hiding before any tween reads styles (same task, no paint between).
    root.classList.remove("so-intro");
    if (!page) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(page);
    const q = (selector: string) => Array.from(page.querySelectorAll<HTMLElement>(selector));

    media.add(MOTION_ALLOWED, () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const rise = desktop ? 32 : 24;
      const hero = page.querySelector<HTMLElement>("[data-so-hero]");
      const mark = page.querySelector<HTMLElement>("[data-so-mark]");
      const heroLine = page.querySelector<HTMLElement>("[data-so-hero-line]");

      // 1. The hero reveal: an iris opens from the mark, the mark assembles with a flash,
      //    then the headline rises and its silver line catches the light once.
      const intro = gsap.timeline({ defaults: { ease: EASE.enter } });
      if (hero && mark) {
        const heroBox = hero.getBoundingClientRect();
        const markBox = mark.getBoundingClientRect();
        const cx = markBox.left + markBox.width / 2 - heroBox.left;
        const cy = markBox.top + markBox.height / 2 - heroBox.top;
        const radius = Math.hypot(Math.max(cx, heroBox.width - cx), Math.max(cy, heroBox.height - cy)) + 60;
        intro.fromTo(
          "[data-so-iris]",
          { clipPath: `circle(0px at ${cx}px ${cy}px)` },
          { clipPath: `circle(${radius}px at ${cx}px ${cy}px)`, duration: DURATION.reveal, ease: EASE.reveal, clearProps: "clipPath" },
          0,
        );
      }
      intro
        .fromTo("[data-so-mark-top]", { x: 40, y: -24, rotate: -12, autoAlpha: 0 }, { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: DURATION.long }, 0.25)
        .fromTo("[data-so-mark-bottom]", { x: -40, y: 24, rotate: -12, autoAlpha: 0 }, { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: DURATION.long }, 0.25)
        .fromTo("[data-so-mark-flash]", { scale: 0.4, autoAlpha: 0.85 }, { scale: 2.4, autoAlpha: 0, duration: DURATION.long, ease: EASE.settle }, 0.95)
        .fromTo("[data-so-hero-word]", { yPercent: 112 }, { yPercent: 0, duration: DURATION.long, stagger: STAGGER.base }, 0.75)
        .fromTo("[data-so-hero-line]", { yPercent: 112 }, { yPercent: 0, duration: DURATION.long }, 0.95)
        .call(() => heroLine?.classList.add(s.sheenOnce), [], 1.55)
        .fromTo("[data-so-hero-fade]", { y: rise * 0.75, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: DURATION.base, stagger: STAGGER.base, ease: EASE.settle }, 1.25)
        .fromTo("[data-so-pillar]", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: DURATION.base, stagger: STAGGER.tight, ease: EASE.settle }, 1.5);

      // The hero recedes as the page takes over.
      const heroOut = { trigger: "[data-so-hero]", start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-so-hero-content]", { yPercent: desktop ? -10 : -5, autoAlpha: 0.1, ease: "none", scrollTrigger: heroOut });
      gsap.to("[data-so-rings]", { scale: 1.35, ease: "none", scrollTrigger: heroOut });

      // 2. Headings rise line by line out of their masks; silver lines catch the light once.
      q("[data-so-lines]").forEach((heading) => {
        gsap.fromTo(heading.querySelectorAll("[data-so-line]"), { yPercent: 112 }, {
          yPercent: 0, duration: DURATION.long, ease: EASE.enter, stagger: STAGGER.base,
          scrollTrigger: { trigger: heading, start: "top 86%", once: true },
        });
      });
      q(`.${s.silver}`)
        .filter((element) => element !== heroLine)
        .forEach((element) => {
          ScrollTrigger.create({
            trigger: element, start: "top 80%", once: true,
            onEnter: () => gsap.delayedCall(0.5, () => element.classList.add(s.sheenOnce)),
          });
        });

      q("[data-so-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: rise, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: DURATION.base, ease: EASE.settle,
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });

      q("[data-so-rule]").forEach((rule) => {
        gsap.fromTo(rule, { scaleX: 0 }, {
          scaleX: 1, duration: DURATION.reveal, ease: EASE.enter,
          scrollTrigger: { trigger: rule, start: "top 92%", once: true },
        });
      });

      // 3. The About statement is "spoken": each word lights up as it scrolls past.
      q("[data-so-statement]").forEach((statement) => {
        gsap.fromTo(statement.querySelectorAll("[data-so-spoken]"), { opacity: 0.14 }, {
          opacity: 1, ease: "none", stagger: 0.1,
          scrollTrigger: { trigger: statement, start: "top 82%", end: "bottom 48%", scrub: 0.6 },
        });
      });

      // 4. Service cards arrive; their icons settle with a small overshoot; capabilities follow.
      q("[data-so-card]").forEach((card, index) => {
        gsap.timeline({ scrollTrigger: { trigger: card, start: "top 88%", once: true } })
          .fromTo(card, { y: rise * 2, autoAlpha: 0, rotateX: 6, transformPerspective: 1100, transformOrigin: "50% 0%" }, {
            y: 0, autoAlpha: 1, rotateX: 0, duration: DURATION.long, ease: EASE.enter, delay: desktop ? (index % 2) * 0.1 : 0,
          })
          .fromTo(card.querySelector("[data-so-icon]"), { scale: 0.5, rotate: -20, autoAlpha: 0 }, {
            scale: 1, rotate: 0, autoAlpha: 1, duration: DURATION.base, ease: "back.out(1.8)", clearProps: "transform",
          }, "-=0.8")
          .fromTo(card.querySelectorAll("[data-so-chip]"), { y: 8, autoAlpha: 0 }, {
            y: 0, autoAlpha: 1, duration: DURATION.short, stagger: STAGGER.tight, ease: EASE.settle,
          }, "-=0.55");
      });

      // 5. Creator network: the watermark mark drifts and turns with the scroll.
      gsap.fromTo("[data-so-watermark]", { yPercent: 22, rotate: -12 }, {
        yPercent: -14, rotate: 8, ease: "none",
        scrollTrigger: { trigger: "#creators", start: "top bottom", end: "bottom top", scrub: true },
      });

      // 6. Brand steps arrive in sequence (lighting up is handled per breakpoint below).
      gsap.fromTo("[data-so-step]", { y: rise * 1.5, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: DURATION.long, stagger: STAGGER.base, ease: EASE.enter,
        scrollTrigger: { trigger: "[data-so-steps]", start: "top 86%", once: true },
      });

      // 7. Closing panels rise and settle.
      gsap.fromTo("[data-so-panel]", { y: rise * 2, scale: 0.96, autoAlpha: 0 }, {
        y: 0, scale: 1, autoAlpha: 1, duration: DURATION.long, stagger: 0.14, ease: EASE.enter,
        scrollTrigger: { trigger: "[data-so-panels]", start: "top 86%", once: true },
      });

      // 8. Header: mark the section in view.
      const links = Array.from(document.querySelectorAll<HTMLElement>("[data-so-nav]"));
      links.forEach((link) => {
        const target = page.querySelector<HTMLElement>(link.dataset.soNav ?? "");
        if (!target) return;
        const isFooter = target.tagName === "FOOTER";
        ScrollTrigger.create({
          trigger: target,
          start: isFooter ? "top 85%" : "top 50%",
          end: isFooter ? "bottom bottom" : "bottom 50%",
          onToggle: (self) => link.toggleAttribute("data-active", self.isActive),
        });
      });

      return () => {
        q(`.${s.sheenOnce}`).forEach((element) => element.classList.remove(s.sheenOnce));
        links.forEach((link) => link.removeAttribute("data-active"));
      };
    });

    // Steps light up along a drawn track where they sit in one row; one by one when stacked.
    media.add(`${MOTION_ALLOWED} and (min-width: 1024px)`, () => {
      const steps = q("[data-so-step]");
      gsap.fromTo("[data-so-track]", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: {
          trigger: "[data-so-steps]", start: "top 75%", end: "bottom 55%", scrub: 0.5,
          onUpdate: (self) => steps.forEach((step, index) => step.classList.toggle(s.stepActive, self.progress >= index / steps.length + 0.04)),
        },
      });
      return () => steps.forEach((step) => step.classList.remove(s.stepActive));
    });
    media.add(`${MOTION_ALLOWED} and (max-width: 1023px)`, () => {
      const steps = q("[data-so-step]");
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step, start: "top 70%",
          onEnter: () => step.classList.add(s.stepActive),
          onLeaveBack: () => step.classList.remove(s.stepActive),
        });
      });
      return () => steps.forEach((step) => step.classList.remove(s.stepActive));
    });

    // Pointer effects for mouse and trackpad only.
    media.add(`${MOTION_ALLOWED} and (hover: hover) and (pointer: fine)`, () => {
      const hero = page.querySelector<HTMLElement>("[data-so-hero]");
      const spotlight = page.querySelector<HTMLElement>("[data-so-spotlight]");
      const cards = page.querySelector<HTMLElement>("[data-so-cards]");
      const removers: Array<() => void> = [];
      const listen = <K extends keyof HTMLElementEventMap>(target: HTMLElement, type: K, handler: (event: HTMLElementEventMap[K]) => void) => {
        target.addEventListener(type, handler, { passive: true });
        removers.push(() => target.removeEventListener(type, handler));
      };

      // A soft spotlight follows the cursor across the hero: you are being seen.
      if (hero && spotlight) {
        let frame = 0;
        listen(hero, "pointermove", (event) => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const box = hero.getBoundingClientRect();
            spotlight.style.setProperty("--sx", `${event.clientX - box.left}px`);
            spotlight.style.setProperty("--sy", `${event.clientY - box.top}px`);
            spotlight.setAttribute("data-active", "");
          });
        });
        listen(hero, "pointerleave", () => spotlight.removeAttribute("data-active"));
        removers.push(() => cancelAnimationFrame(frame));
      }

      // Hero buttons lean gently toward the cursor.
      q("[data-so-magnetic]").forEach((button) => {
        const moveX = gsap.quickTo(button, "x", { duration: DURATION.short, ease: EASE.settle });
        const moveY = gsap.quickTo(button, "y", { duration: DURATION.short, ease: EASE.settle });
        listen(button, "pointermove", (event) => {
          const box = button.getBoundingClientRect();
          moveX((event.clientX - box.left - box.width / 2) * 0.18);
          moveY((event.clientY - box.top - box.height / 2) * 0.25);
        });
        listen(button, "pointerleave", () => {
          moveX(0);
          moveY(0);
        });
      });

      // Service cards: a soft light tracks the pointer inside the hovered card.
      if (cards) {
        listen(cards, "pointermove", (event) => {
          const card = (event.target as Element).closest<HTMLElement>("article");
          if (!card) return;
          const box = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${event.clientX - box.left}px`);
          card.style.setProperty("--my", `${event.clientY - box.top}px`);
        });
      }

      return () => removers.forEach((remove) => remove());
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
    };
  }, []);

  return null;
}
