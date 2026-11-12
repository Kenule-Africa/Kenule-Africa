"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import s from "./tomorrow.module.css";

export default function TomorrowMotion() {
  useLayoutEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-tomorrow-page]");
    if (!page) return;
    const root = document.documentElement;
    root.classList.add(s.tomorrowNoScrollbar);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => root.classList.remove(s.tomorrowNoScrollbar);
    }
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
    const experienceLockKey = "tomorrow-experience-scroll-state";
    const experienceEntryKey = "tomorrow-experience-entry-state";
    const saveExperienceState = (lockState: string, entryState: string) => {
      try {
        window.localStorage.setItem(experienceLockKey, lockState);
        window.localStorage.setItem(experienceEntryKey, entryState);
      } catch {
        // Keep the interaction functional when browser storage is unavailable.
      }
    };
    const clearExperienceState = () => {
      try {
        window.localStorage.removeItem(experienceLockKey);
        window.localStorage.removeItem(experienceEntryKey);
      } catch {
        // Keep the interaction functional when browser storage is unavailable.
      }
    };
    let releaseMobileExperienceForTop: (() => void) | null = null;
    const handleBackToTop = (event: Event) => {
      event.preventDefault();
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
      saveExperienceState("returning-to-top", "opening");
      releaseMobileExperienceForTop?.();
      lenis.start();
      lenis.scrollTo(0, { duration: 1.25, easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)) });
    };
    window.addEventListener("tomorrow:back-to-top", handleBackToTop);

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
              end: () => `+=${Math.round(window.innerHeight * (isMobile ? 5.8 : 7.5))}`,
              pin: experienceCanvas,
              pinType: "transform",
              pinSpacing: true,
              scrub: isMobile ? 0.08 : 0.18,
              anticipatePin: 1,
              invalidateOnRefresh: true,
          },
          });

          timeline
            .to(experienceTitle, {
              scale: isMobile ? 14 : 32,
              duration: isMobile ? 0.95 : 1.3,
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
      media.add("(max-width: 720px)", () => {
        if (!experienceCanvas || !experienceOpening || !experienceTitle || !experiencePresentation || experienceStates.length !== 5) return;

        const experienceSection = experienceCanvas.closest<HTMLElement>("section");
        const controls = experienceCanvas.querySelector<HTMLElement>("[data-mobile-experience-controls]");
        const exitButton = controls?.querySelector<HTMLButtonElement>("[data-experience-exit]");
        const nextButton = controls?.querySelector<HTMLButtonElement>("[data-experience-next]");
        const count = controls?.querySelector<HTMLElement>("[data-experience-count]");
        if (!experienceSection || !controls || !exitButton || !nextButton || !count) return;

        let activeIndex = 0;
        let locked = false;
        let complete = false;
        let returningToTop = false;
        try {
          returningToTop = window.localStorage.getItem(experienceLockKey) === "returning-to-top";
        } catch {
          returningToTop = false;
        }
        let transition: gsap.core.Timeline | undefined;
        const blockPageScroll = (event: Event) => event.preventDefault();

        const updateControls = () => {
          count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / 05`;
          exitButton.disabled = activeIndex === 0;
          exitButton.setAttribute("aria-label", activeIndex === 0 ? "No previous experience" : `Show experience ${activeIndex}`);
          nextButton.querySelector("span")!.textContent = activeIndex === experienceStates.length - 1 ? "CONTINUE" : "NEXT";
          nextButton.setAttribute("aria-label", activeIndex === experienceStates.length - 1 ? "Continue to the next page section" : `Show experience ${activeIndex + 2}`);
          controls.dataset.current = String(activeIndex + 1).padStart(2, "0");
          controls.style.setProperty("--experience-progress", `${((activeIndex + 1) / experienceStates.length) * 100}%`);
        };

        const resetPresentation = () => {
          activeIndex = 0;
          transition?.kill();
          gsap.set(experiencePresentation, { autoAlpha: 0, scale: 1.035, yPercent: 3, transformOrigin: "50% 50%" });
          gsap.set(experienceOpening, { autoAlpha: 1 });
          gsap.set(experienceTitle, { clearProps: "scale,transformOrigin", autoAlpha: 1 });
          gsap.set(experienceAsides, { autoAlpha: 1, clearProps: "y" });
          gsap.set(experienceStates, { autoAlpha: 0, y: 16, scale: 0.99 });
          gsap.set(experienceVisuals, { scale: 1.06, clearProps: "xPercent" });
          gsap.set([...experienceNumbers, ...experienceCopies], { autoAlpha: 0, clearProps: "x,y" });
          updateControls();
        };

        const enterPresentation = () => {
          if (locked || complete) return;
          returningToTop = false;
          clearExperienceState();
          locked = true;
          saveExperienceState("locked", "active");
          activeIndex = 0;
          lenis.stop();
          window.addEventListener("wheel", blockPageScroll, { passive: false, capture: true });
          window.addEventListener("touchmove", blockPageScroll, { passive: false, capture: true });
          experienceCanvas.classList.add(s.experienceMobileActive);
          gsap.set(experiencePresentation, { autoAlpha: 0, scale: 1.035, yPercent: 3, transformOrigin: "50% 50%" });
          gsap.set(experienceStates, { autoAlpha: 0, y: 16, scale: 0.99 });
          gsap.set(experienceVisuals, { scale: 1.06 });
          gsap.set(experienceTitle, { autoAlpha: 1, scale: 1, transformOrigin: "48% 54%" });
          gsap.set(experienceOpening, { autoAlpha: 1 });
          updateControls();
          transition = gsap.timeline();
          transition
            .to(experienceTitle, { scale: 18, duration: 0.82, ease: "power2.in", transformOrigin: "48% 54%" })
            .to(experienceAsides, { autoAlpha: 0, y: -8, duration: 0.25 }, "-=0.28")
            .to(experiencePresentation, { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.68, ease: "power2.out" }, "-=0.25")
            .to(experienceTitle, { autoAlpha: 0, duration: 0.05 }, "-=0.05")
            .to(experienceOpening, { autoAlpha: 0, duration: 0.08 }, "-=0.04")
            .fromTo(experienceStates[0], { autoAlpha: 0, y: 16, scale: 0.99 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }, "-=0.02")
            .fromTo(experienceVisuals[0], { scale: 1.06 }, { scale: 1, duration: 0.55, ease: "power2.out" }, "<")
            .fromTo(experienceNumbers[0], { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3 }, "<0.06")
            .fromTo(experienceCopies[0], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.35 }, "<0.04");
        };

        const unlockPresentation = (continueForward: boolean, preserveScrollPosition = false) => {
          if (!locked) return;
          locked = false;
          complete = continueForward;
          saveExperienceState(
            preserveScrollPosition && returningToTop ? "returning-to-top" : "released",
            continueForward ? "completed" : "opening",
          );
          transition?.kill();
          experienceCanvas.classList.remove(s.experienceMobileActive);
          window.removeEventListener("wheel", blockPageScroll, true);
          window.removeEventListener("touchmove", blockPageScroll, true);
          lenis.start();
          const top = experienceSection.getBoundingClientRect().top + window.scrollY;
          if (!preserveScrollPosition) {
            const target = continueForward
              ? top + experienceSection.offsetHeight + 1
              : Math.max(0, top - 2);
            requestAnimationFrame(() => lenis.scrollTo(target, { immediate: true }));
          }
        };

        releaseMobileExperienceForTop = () => {
          returningToTop = true;
          if (locked) unlockPresentation(false, true);
          complete = false;
          saveExperienceState("returning-to-top", "opening");
          resetPresentation();
        };

        const releaseWhenReturningAboveSection = () => {
          if (!locked) return;
          const sectionTop = experienceSection.getBoundingClientRect().top + window.scrollY;
          if (window.scrollY >= sectionTop - 8) return;
          returningToTop = true;
          saveExperienceState("returning-to-top", "opening");
          unlockPresentation(false, true);
          complete = false;
          resetPresentation();
        };

        const changeExperience = (direction: -1 | 1) => {
          if (!locked || transition?.isActive()) return;
          const nextIndex = activeIndex + direction;
          if (nextIndex < 0) return;
          if (nextIndex >= experienceStates.length) {
            unlockPresentation(true);
            return;
          }

          nextButton.disabled = true;
          exitButton.disabled = true;
          const outgoing = experienceStates[activeIndex];
          const incoming = experienceStates[nextIndex];
          transition = gsap.timeline({
            onComplete: () => {
              activeIndex = nextIndex;
              updateControls();
              nextButton.disabled = false;
            },
          });
          transition
            .to(outgoing, { autoAlpha: 0, y: direction > 0 ? -10 : 10, scale: 0.99, duration: 0.22, ease: "power1.inOut" })
            .fromTo(incoming, { autoAlpha: 0, y: direction > 0 ? 14 : -14, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: "power2.out" }, "<0.08")
            .fromTo(experienceVisuals[nextIndex], { scale: 1.055 }, { scale: 1, duration: 0.5, ease: "power2.out" }, "<")
            .fromTo(experienceNumbers[nextIndex], { autoAlpha: 0, y: 9 }, { autoAlpha: 1, y: 0, duration: 0.28 }, "<0.04")
            .fromTo(experienceCopies[nextIndex], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.32 }, "<0.03");
        };

        const onExit = () => changeExperience(-1);
        const onNext = () => changeExperience(1);
        const onKeyDown = (event: KeyboardEvent) => {
          if (!locked) return;
          if (event.key === "ArrowRight") changeExperience(1);
          if (event.key === "ArrowLeft") changeExperience(-1);
          if (["Escape", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key) || (event.key === " " && !(event.target instanceof HTMLButtonElement))) {
            event.preventDefault();
          }
        };
        exitButton.addEventListener("click", onExit);
        nextButton.addEventListener("click", onNext);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("scroll", releaseWhenReturningAboveSection, { passive: true });
        experienceCanvas.classList.add(s.experienceEnhanced);
        gsap.set(experiencePresentation, { autoAlpha: 0, scale: 1.035, yPercent: 3, transformOrigin: "50% 50%" });
        gsap.set(experienceStates, { autoAlpha: 0 });
        gsap.set(experienceCanvas, { clearProps: "transform" });

        const entryTrigger = ScrollTrigger.create({
          trigger: experienceCanvas,
          start: "top top",
          end: "bottom top",
          onEnter: enterPresentation,
          onEnterBack: () => {
            if (!complete && !returningToTop) enterPresentation();
          },
          onLeaveBack: () => {
            complete = false;
            returningToTop = false;
            if (locked) unlockPresentation(false, true);
            clearExperienceState();
            resetPresentation();
          },
        });

        return () => {
          releaseMobileExperienceForTop = null;
          clearExperienceState();
          if (locked) unlockPresentation(false);
          window.removeEventListener("wheel", blockPageScroll, true);
          window.removeEventListener("touchmove", blockPageScroll, true);
          entryTrigger.kill();
          transition?.kill();
          exitButton.removeEventListener("click", onExit);
          nextButton.removeEventListener("click", onNext);
          window.removeEventListener("keydown", onKeyDown);
          window.removeEventListener("scroll", releaseWhenReturningAboveSection);
          experienceCanvas.classList.remove(s.experienceEnhanced, s.experienceMobileActive);
          gsap.set([experienceCanvas, experienceOpening, experienceTitle, experiencePresentation, ...experienceStates, ...experienceVisuals, ...experienceNumbers, ...experienceCopies], { clearProps: "all" });
        };
      });

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
        const hero = page.querySelector<HTMLElement>("[data-tomorrow-hero]");
        const heroVisual = hero?.querySelector<HTMLElement>("[data-hero-visual]");
        let removePointerEffect = () => {};
        if (hero && heroVisual && window.matchMedia("(pointer: fine)").matches) {
          gsap.set(heroVisual, { transformPerspective: 1400, transformOrigin: "50% 50%", scale: 1.025, force3D: true });
          const moveX = gsap.quickTo(heroVisual, "x", { duration: 0.85, ease: "power3.out" });
          const moveY = gsap.quickTo(heroVisual, "y", { duration: 0.85, ease: "power3.out" });
          const tiltX = gsap.quickTo(heroVisual, "rotationX", { duration: 0.85, ease: "power3.out" });
          const tiltY = gsap.quickTo(heroVisual, "rotationY", { duration: 0.85, ease: "power3.out" });
          const onPointerMove = (event: PointerEvent) => {
            const bounds = hero.getBoundingClientRect();
            const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
            const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
            moveX(-horizontal * 10);
            moveY(-vertical * 7);
            tiltX(-vertical * 1.5);
            tiltY(horizontal * 2.1);
          };
          const onPointerLeave = () => {
            moveX(0);
            moveY(0);
            tiltX(0);
            tiltY(0);
          };
          hero.addEventListener("pointermove", onPointerMove, { passive: true });
          hero.addEventListener("pointerleave", onPointerLeave, { passive: true });
          removePointerEffect = () => {
            hero.removeEventListener("pointermove", onPointerMove);
            hero.removeEventListener("pointerleave", onPointerLeave);
            gsap.killTweensOf(heroVisual);
            gsap.set(heroVisual, { clearProps: "transform" });
          };
        }
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
        return removePointerEffect;
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
      window.removeEventListener("tomorrow:back-to-top", handleBackToTop);
      lenis.destroy();
      root.classList.remove(s.tomorrowNoScrollbar);
    };
  }, []);
  return null;
}
