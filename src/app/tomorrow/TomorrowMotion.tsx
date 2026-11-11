"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import s from "./tomorrow.module.css";

export default function TomorrowMotion() {
  useLayoutEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-tomorrow-page]");
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      lerp: 0.15,
      smoothWheel: true,
      syncTouch: false,
    });
    const syncLenisWithGsap = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(syncLenisWithGsap);
    gsap.ticker.lagSmoothing(0);
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(page);

    const context = gsap.context(() => {
      const experienceCanvas = page.querySelector<HTMLElement>("[data-experience-canvas]");
      const experienceOpening = experienceCanvas?.querySelector<HTMLElement>("[data-experience-opening]");
      const experienceTitle = experienceCanvas?.querySelector<HTMLElement>("[data-experience-title]");
      const experienceAsides = experienceCanvas
        ? gsap.utils.toArray<HTMLElement>("[data-experience-aside]", experienceCanvas)
        : [];
      const experiencePresentation = experienceCanvas?.querySelector<HTMLElement>("[data-experience-presentation]");
      const experienceStates = experienceCanvas
        ? gsap.utils.toArray<HTMLElement>("[data-experience-state]", experienceCanvas)
        : [];
      const experienceVisuals = experienceStates.map((state) => state.querySelector<HTMLElement>(`.${s.experienceVisual}`)).filter((node): node is HTMLElement => Boolean(node));
      const experienceNumbers = experienceStates.map((state) => state.querySelector<HTMLElement>(`.${s.experienceNumber}`)).filter((node): node is HTMLElement => Boolean(node));
      const experienceCopies = experienceStates.map((state) => state.querySelector<HTMLElement>(`.${s.experienceCopy}`)).filter((node): node is HTMLElement => Boolean(node));

      const buildExperienceSequence = (isMobile: boolean) => {
        if (!experienceCanvas || !experienceOpening || !experienceTitle || !experiencePresentation || experienceStates.length !== 5 || experienceVisuals.length !== 5 || experienceNumbers.length !== 5 || experienceCopies.length !== 5) return;

        gsap.set(experiencePresentation, { autoAlpha: 0, scale: 0.035, borderRadius: "50%", transformOrigin: "50% 50%" });
        gsap.set(experienceStates, { autoAlpha: 0, y: isMobile ? 18 : 28, scale: 0.98 });
        gsap.set(experienceVisuals, { scale: 1.07 });
        experienceCanvas.classList.add(s.experienceEnhanced);

        try {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: experienceCanvas,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * (isMobile ? 6.25 : 7.5))}`,
              pin: experienceCanvas,
              pinType: "transform",
              pinSpacing: true,
              scrub: isMobile ? 0.12 : 0.18,
              anticipatePin: 1,
              invalidateOnRefresh: true,
          },
          });

          timeline
            .to(experienceTitle, {
              scale: isMobile ? 18 : 32,
              duration: isMobile ? 1.1 : 1.3,
              ease: "power1.in",
              transformOrigin: "48% 54%",
            })
            .to(experienceAsides, { autoAlpha: 0, y: isMobile ? -10 : -18, duration: 0.28 }, "-=0.34")
            .to(experiencePresentation, {
              autoAlpha: 1,
              scale: 1,
              borderRadius: "0%",
              duration: 1.05,
              ease: "power2.out",
            }, "-=0.48")
            .to(experienceTitle, { autoAlpha: 0, duration: 0.08 }, "-=0.08")
            .to(experienceOpening, { autoAlpha: 0, duration: 0.12 }, "-=0.08")
            .to(experienceStates[0], {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: isMobile ? 0.34 : 0.42,
              ease: "power2.out",
            }, "-=0.02")
            .to(experienceVisuals[0], {
              scale: 1,
              duration: isMobile ? 0.58 : 0.72,
              ease: "power2.out",
            }, "<")
            .fromTo(experienceNumbers[0], {
              autoAlpha: 0,
              x: isMobile ? 0 : -24,
              y: isMobile ? 12 : 0,
            }, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.42,
              ease: "power2.out",
            }, "<0.08")
            .fromTo(experienceCopies[0], {
              autoAlpha: 0,
              x: isMobile ? 0 : 30,
              y: isMobile ? 12 : 0,
            }, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.46,
              ease: "power2.out",
            }, "<0.06")
            .to({}, { duration: isMobile ? 0.4 : 0.52 });

          for (let index = 1; index < experienceStates.length; index += 1) {
            timeline
              .to(experienceVisuals[index - 1], {
                scale: isMobile ? 1.09 : 1.12,
                xPercent: isMobile ? 0 : 1.5,
                duration: isMobile ? 0.42 : 0.56,
                ease: "power1.in",
              }, `+=${isMobile ? 0.28 : 0.38}`)
              .to(experienceStates[index - 1], {
                autoAlpha: 0,
                y: isMobile ? -10 : -16,
                scale: 0.99,
                duration: isMobile ? 0.26 : 0.34,
                ease: "power1.inOut",
              })
              .fromTo(experienceStates[index], {
                autoAlpha: 0,
                y: isMobile ? 18 : 28,
                scale: 0.98,
              }, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: isMobile ? 0.38 : 0.46,
                ease: "power2.out",
              }, "<")
              .fromTo(experienceVisuals[index], {
                scale: 1.1,
                xPercent: isMobile ? 0 : 1.5,
              }, {
                scale: 1,
                xPercent: 0,
                duration: isMobile ? 0.58 : 0.72,
                ease: "power2.out",
              }, "<")
              .fromTo(experienceNumbers[index], {
                autoAlpha: 0,
                x: isMobile ? 0 : -22,
                y: isMobile ? 12 : 0,
              }, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: isMobile ? 0.34 : 0.42,
                ease: "power2.out",
              }, "<0.06")
              .fromTo(experienceCopies[index], {
                autoAlpha: 0,
                x: isMobile ? 0 : 28,
                y: isMobile ? 12 : 0,
              }, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: isMobile ? 0.38 : 0.46,
                ease: "power2.out",
              }, "<0.05")
              .to({}, { duration: isMobile ? 0.4 : 0.52 });
          }
          timeline.to({}, { duration: 0.12 });
        } catch (error) {
          experienceCanvas.classList.remove(s.experienceEnhanced);
          gsap.set([experiencePresentation, ...experienceStates], { clearProps: "all" });
          console.error("Tomorrow experience scroll sequence could not start", error);
        }

        return () => experienceCanvas.classList.remove(s.experienceEnhanced);
      };

      media.add("(min-width: 721px)", () => buildExperienceSequence(false));
      media.add("(max-width: 720px)", () => buildExperienceSequence(true));

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .fromTo("[data-hero-visual]", { clipPath: "inset(100% 0 0 0)", scale: 1.08 }, {
          clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.5, ease: "power3.inOut",
        })
        .fromTo("[data-title-char]", { yPercent: 125, rotateX: -75, autoAlpha: 0 }, {
          yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 1.15, stagger: 0.055, ease: "back.out(1.55)",
        }, "-=0.85")
        .fromTo("[data-hero-copy]", { y: 28, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.12,
        }, "-=0.55")
        .fromTo("[data-hero-action]", { y: 18, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.1,
        }, "-=0.4");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 44, rotateX: 4, autoAlpha: 0 }, {
          y: 0, rotateX: 0, autoAlpha: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal-image]").forEach((element) => {
        gsap.fromTo(element, { clipPath: "inset(0 0 100% 0)", scale: 1.07 }, {
          clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.15, ease: "power3.inOut",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      media.add("(min-width: 721px)", () => {
        gsap.to("[data-hero-parallax] img", {
          yPercent: 18, scale: 1.18, ease: "none",
          scrollTrigger: { trigger: "[data-tomorrow-hero]", start: "top top", end: "bottom top", scrub: 0.9 },
        });
        gsap.utils.toArray<HTMLElement>("[data-scene-parallax] img").forEach((image) => {
          gsap.to(image, {
            yPercent: 15, scale: 1.16, ease: "none",
            scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-future-art]").forEach((art, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          gsap.fromTo(art, { yPercent: -direction * 12, xPercent: -direction * 2, scale: 1.12 }, {
            yPercent: direction * 12, xPercent: direction * 2, scale: 1.2, ease: "none",
            scrollTrigger: { trigger: art.closest("[data-future-card]"), start: "top bottom", end: "bottom top", scrub: 0.8 },
          });
        });
      });
      media.add("(max-width: 720px)", () => {
        gsap.to("[data-hero-parallax] img", {
          yPercent: 8, scale: 1.1, ease: "none",
          scrollTrigger: { trigger: "[data-tomorrow-hero]", start: "top top", end: "bottom top", scrub: 0.8 },
        });
        gsap.utils.toArray<HTMLElement>("[data-future-art]").forEach((art, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          gsap.fromTo(art, { yPercent: -direction * 6, scale: 1.1 }, {
            yPercent: direction * 6, scale: 1.15, ease: "none",
            scrollTrigger: { trigger: art.closest("[data-future-card]"), start: "top bottom", end: "bottom top", scrub: 0.7 },
          });
        });
      });
    }, page);
    return () => {
      media.revert();
      context.revert();
      gsap.ticker.remove(syncLenisWithGsap);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);
  return null;
}
