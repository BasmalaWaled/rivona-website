"use client";

import { useEffect, type CSSProperties } from "react";

export function KineticText({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\s+)/).map((part, index) =>
        /^\s+$/.test(part) ? (
          part
        ) : (
          <span
            className="kinetic-word"
            data-word-motion={["rise", "left", "right", "turn"][index % 4]}
            style={{ "--word-delay": `${index * 48}ms` } as CSSProperties}
            key={`${index}-${part}`}
          >
            {part}
          </span>
        ),
      )}
    </>
  );
}

const motionTargets = [
  { selector: "#home .hero-content h1, .about-quote, .services-heading h1, .portfolio-title h1, .team-title h1, .contact-heading h1", delay: 0, type: "kinetic" },
  { selector: ".philosophy-card h2", delay: 0, type: "kinetic" },
  { selector: ".site-header", delay: 0 },
  { selector: ".main-nav", delay: 100 },
  { selector: "#home .hero-label", delay: 80 },
  { selector: "#home .hero-description", delay: 410 },
  { selector: "#home .contact-details", delay: 510 },
  { selector: "#home .hero-buttons", delay: 620 },
  { selector: ".about-story > *", delay: 0, stagger: 75, type: "from-left" },
  {
    selector: ".about-visual-column > .about-image, .about-visual-column > .image-caption",
    delay: 80,
    stagger: 100,
    type: "from-right",
  },
  { selector: ".about-highlights > .highlight-card", delay: 100, stagger: 100, type: "from-bottom" },
  { selector: ".about-philosophy > .section-label", delay: 0 },
  { selector: ".philosophy-grid > .philosophy-card", delay: 100, stagger: 120, type: "from-bottom" },
  { selector: ".services-heading", delay: 0 },
  { selector: ".service-card", delay: 70, stagger: 90, type: "from-scale" },
  { selector: ".portfolio-heading", delay: 0 },
  { selector: ".portfolio-category, .portfolio-back", delay: 80, stagger: 100, type: "from-tilt" },
  { selector: ".portfolio-video-item", delay: 60, stagger: 90, type: "from-right" },
  { selector: ".portfolio-empty", delay: 0 },
  { selector: ".team-heading", delay: 0, type: "from-left" },
  { selector: ".team-card", delay: 70, stagger: 90, type: "from-bottom" },
  { selector: ".contact-heading > *", delay: 0, stagger: 90 },
  { selector: ".contact-detail", delay: 80, stagger: 90, type: "from-left" },
  { selector: ".contact-button", delay: 360 },
  { selector: ".footer-brand, .footer-nav, .footer-bottom", delay: 0, stagger: 90 },
] as const;

export default function MotionEffects() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const root = document.documentElement;
    const observed = new Set<HTMLElement>();
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-motion-visible", "true");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
    );

    const annotate = (scope: ParentNode) => {
      motionTargets.forEach((targetGroup) => {
        const matches = Array.from(scope.querySelectorAll(targetGroup.selector));

        if (scope instanceof Element && scope.matches(targetGroup.selector)) {
          matches.unshift(scope);
        }

        matches.forEach((element, index) => {
          if (!(element instanceof HTMLElement) || observed.has(element)) return;

          observed.add(element);
          const motionType = "type" in targetGroup ? targetGroup.type : "reveal";
          const stagger = "stagger" in targetGroup ? targetGroup.stagger : 0;
          element.setAttribute("data-motion", motionType);
          element.style.setProperty(
            "--motion-delay",
            `${targetGroup.delay + Math.min(index, 5) * (stagger ?? 0)}ms`,
          );

          const bounds = element.getBoundingClientRect();
          if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            element.setAttribute("data-motion-visible", "true");
          }

          revealObserver.observe(element);
        });
      });
    };

    annotate(document);
    root.dataset.motionReady = "true";

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    let activeTilt: HTMLElement | null = null;
    let scrollFrame = 0;

    const resetTilt = (element: HTMLElement) => {
      element.removeAttribute("data-tilt-active");
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
    };

    const handlePointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
      root.dataset.pointerGlow = "true";

      const target = event.target;
      const card = target instanceof Element
        ? target.closest<HTMLElement>(".service-card, .team-card, .philosophy-card, .portfolio-category")
        : null;

      if (activeTilt && activeTilt !== card) resetTilt(activeTilt);
      activeTilt = card;

      if (card) {
        const bounds = card.getBoundingClientRect();
        const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
        const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.dataset.tiltActive = "true";
        card.style.setProperty("--tilt-x", `${vertical * -5}deg`);
        card.style.setProperty("--tilt-y", `${horizontal * 5}deg`);
      }

      const button = target instanceof Element
        ? target.closest<HTMLElement>(".primary-button, .secondary-button, .header-contact")
        : null;

      if (button) {
        const bounds = button.getBoundingClientRect();
        const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
        const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
        button.dataset.magnetic = "true";
        button.style.setProperty("--magnetic-x", `${horizontal * 7}px`);
        button.style.setProperty("--magnetic-y", `${vertical * 7}px`);
      }
    };

    const handlePointerLeave = () => {
      root.removeAttribute("data-pointer-glow");
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
      if (activeTilt) resetTilt(activeTilt);
      activeTilt = null;
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((button) => {
        button.removeAttribute("data-magnetic");
        button.style.removeProperty("--magnetic-x");
        button.style.removeProperty("--magnetic-y");
      });
    };

    const updateParallax = () => {
      scrollFrame = 0;
      const viewportCenter = window.innerHeight / 2;
      document.querySelectorAll<HTMLElement>(".about-image img, .portfolio-category img").forEach((image) => {
        const bounds = image.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
        const offset = Math.max(-8, Math.min(8, (viewportCenter - (bounds.top + bounds.height / 2)) * 0.018));
        image.style.setProperty("--parallax-y", `${offset}px`);
      });
    };

    const scheduleParallax = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateParallax);
    };

    const handleMagneticLeave = (event: PointerEvent) => {
      const target = event.target;
      const button = target instanceof Element
        ? target.closest<HTMLElement>("[data-magnetic]")
        : null;
      if (!button || (event.relatedTarget instanceof Node && button.contains(event.relatedTarget))) return;
      button.removeAttribute("data-magnetic");
      button.style.removeProperty("--magnetic-x");
      button.style.removeProperty("--magnetic-y");
    };

    if (pointerQuery.matches) {
      document.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerleave", handlePointerLeave);
      document.addEventListener("pointerout", handleMagneticLeave);
    }
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    scheduleParallax();

    const contentObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) annotate(node);
        });
      });
    });
    contentObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      contentObserver.disconnect();
      revealObserver.disconnect();
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerout", handleMagneticLeave);
      window.removeEventListener("scroll", scheduleParallax);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      delete root.dataset.motionReady;
      delete root.dataset.pointerGlow;
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
      observed.forEach((element) => {
        element.removeAttribute("data-motion");
        element.removeAttribute("data-motion-visible");
        element.removeAttribute("data-magnetic");
        element.removeAttribute("data-tilt-active");
        element.style.removeProperty("--motion-delay");
        element.style.removeProperty("--magnetic-x");
        element.style.removeProperty("--magnetic-y");
        element.style.removeProperty("--tilt-x");
        element.style.removeProperty("--tilt-y");
        element.style.removeProperty("--parallax-y");
      });
    };
  }, []);

  return null;
}