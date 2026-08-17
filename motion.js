/**
 * HATCIL — Motion UI
 * Corporate first, motion second.
 * Inspired by the supplied spring/crossfade reference.
 */
(function () {
  "use strict";

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => reduceMotionQuery.matches;
  const SPRING = "back.out(1.15)";
  const SOFT = "power3.out";

  // Load the visual refresh after the existing inline stylesheet so its
  // deliberate design overrides win without touching imagery or the logo.
  const refresh = document.createElement("link");
  refresh.rel = "stylesheet";
  refresh.href = "design-refresh.css";
  document.head.appendChild(refresh);

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(() => {
    if (!window.gsap) return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (reduced()) return;

    initNav();
    initHero();
    initReveals();
    initCounters();
    initCards();
    initContact();
  });

  function initNav() {
    const nav = document.querySelector("nav");
    if (!nav) return;
    let lastY = window.scrollY;

    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: () => {
          const y = window.scrollY;
          nav.classList.toggle("nav-scrolled", y > 24);
          gsap.to(nav, {
            y: y > 90 && y > lastY ? -90 : 0,
            duration: .42,
            ease: SOFT,
            overwrite: "auto"
          });
          lastY = y;
        }
      });
    }

    document.querySelectorAll(".nav-links a").forEach((link) => {
      const underline = document.createElement("span");
      underline.className = "nav-underline";
      link.appendChild(underline);
      link.addEventListener("mouseenter", () => gsap.to(underline, { scaleX: 1, duration: .32, ease: SPRING }));
      link.addEventListener("mouseleave", () => gsap.to(underline, { scaleX: 0, duration: .22, ease: SOFT }));
      link.addEventListener("focus", () => gsap.to(underline, { scaleX: 1, duration: .32, ease: SPRING }));
      link.addEventListener("blur", () => gsap.to(underline, { scaleX: 0, duration: .22, ease: SOFT }));
    });
  }

  function initHero() {
    const hero = document.querySelector(".hero");
    const text = document.querySelector(".hero-text");
    if (!hero || !text) return;

    const heading = text.querySelector("h1, h2");
    const tagline = text.querySelector(".tagline");
    const copy = text.querySelector("p");
    const buttons = text.querySelectorAll(".btn");
    const stats = document.querySelectorAll(".hero-stats .stat");
    const logo = document.querySelector(".hero-logo img");

    const tl = gsap.timeline({ defaults: { ease: SOFT } });
    if (tagline) tl.from(tagline, { y: 18, opacity: 0, duration: .5 }, 0);
    if (heading) tl.from(heading, { y: 34, opacity: 0, duration: .72, ease: SPRING }, .06);
    if (copy) tl.from(copy, { y: 18, opacity: 0, duration: .55 }, .18);
    if (buttons.length) tl.from(buttons, { y: 16, opacity: 0, stagger: .08, duration: .5, ease: SPRING }, .28);
    if (stats.length) tl.from(stats, { y: 16, opacity: 0, stagger: .07, duration: .48, ease: SPRING }, .38);
    if (logo) tl.from(logo, { scale: .92, opacity: 0, duration: .75, ease: SPRING }, .12);

    if (logo && window.matchMedia("(min-width: 769px)").matches) {
      gsap.to(logo, { y: -7, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
  }

  function reveal(elements, opts = {}) {
    if (!window.ScrollTrigger || !elements.length) return;
    gsap.from(elements, {
      scrollTrigger: { trigger: elements[0], start: opts.start || "top 86%", once: true },
      x: opts.x || 0,
      y: opts.y ?? 26,
      opacity: 0,
      duration: opts.duration || .62,
      stagger: opts.stagger || .08,
      ease: SOFT
    });
  }

  function initReveals() {
    reveal(document.querySelectorAll(".section-header"), { y: 24 });
    reveal(document.querySelectorAll(".service-card"), { y: 30, stagger: .1 });
    reveal(document.querySelectorAll(".value-card"), { y: 22, stagger: .08 });
    reveal(document.querySelectorAll(".team-card"), { y: 28, stagger: .09 });
    reveal(document.querySelectorAll(".partner-card"), { y: 20, stagger: .06 });
    reveal(document.querySelectorAll(".contact-info"), { x: -28, y: 0 });
    reveal(document.querySelectorAll(".contact-form"), { x: 28, y: 0 });
  }

  function initCounters() {
    if (!window.ScrollTrigger) return;
    document.querySelectorAll(".stat-number").forEach((el) => {
      const match = el.textContent.trim().match(/(\d+)/);
      if (!match) return;
      const target = Number(match[1]);
      const suffix = el.textContent.trim().replace(match[1], "");
      const state = { value: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(state, {
          value: target,
          duration: 1.15,
          ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(state.value) + suffix; }
        })
      });
    });
  }

  function initCards() {
    document.querySelectorAll(".service-card").forEach((card) => {
      const accent = card.querySelector(".card-accent-bar");
      const enter = () => {
        gsap.to(card, { y: -7, boxShadow: "0 22px 50px rgba(10,25,49,.13)", duration: .38, ease: SPRING });
        if (accent) gsap.to(accent, { scaleX: 1, duration: .35, ease: SPRING });
      };
      const leave = () => {
        gsap.to(card, { y: 0, boxShadow: "0 1px 2px rgba(10,25,49,.04)", duration: .35, ease: SOFT });
        if (accent) gsap.to(accent, { scaleX: 0, duration: .25, ease: SOFT });
      };
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      card.addEventListener("focusin", enter);
      card.addEventListener("focusout", leave);
    });

    document.querySelectorAll(".team-card").forEach((card) => {
      const image = card.querySelector(".team-image img");
      if (!image) return;
      card.addEventListener("mouseenter", () => gsap.to(image, { scale: 1.035, duration: .55, ease: SOFT }));
      card.addEventListener("mouseleave", () => gsap.to(image, { scale: 1, duration: .55, ease: SOFT }));
    });

    document.querySelectorAll(".partner-card").forEach((card) => {
      card.addEventListener("mouseenter", () => gsap.to(card, { y: -4, duration: .32, ease: SPRING }));
      card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, duration: .3, ease: SOFT }));
    });

    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("pointerdown", () => gsap.to(button, { scale: .97, duration: .12, ease: SOFT }));
      button.addEventListener("pointerup", () => gsap.to(button, { scale: 1, duration: .35, ease: SPRING }));
      button.addEventListener("pointerleave", () => gsap.to(button, { scale: 1, duration: .25, ease: SOFT }));
    });
  }

  function initContact() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("focus", () => gsap.to(field, { y: -1, duration: .2, ease: SPRING }));
      field.addEventListener("blur", () => gsap.to(field, { y: 0, duration: .2, ease: SOFT }));
    });

    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    const original = button.textContent.trim();
    const label = document.createElement("span");
    label.textContent = original;
    label.className = "btn-state btn-state-idle";
    button.textContent = "";
    button.appendChild(label);
  }
})();
