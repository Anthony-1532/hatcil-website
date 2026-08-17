/**
 * HATCIL — Motion Layer
 * Corporate first, motion second.
 *
 * Mirrors the spring/crossfade philosophy of the supplied motion reference
 * while keeping HATCIL as a static HTML/CSS/JS project.
 */
(function () {
  "use strict";

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const prefersReduced = () => reduceMotionQuery.matches;

  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const SPRING = "back.out(1.15)";
  const SPRING_SOFT = "power3.out";
  const CROSSFADE_DURATION = 0.35;

  function whenReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  whenReady(() => {
    if (prefersReduced()) return;
    initNav();
    initHero();
    initStats();
    initServiceCards();
    initValueCards();
    initAboutReveal();
    initTeamCards();
    initPartnerCards();
    initContactForm();
  });

  function initNav() {
    const nav = document.querySelector("nav");
    const links = document.querySelectorAll(".nav-links a");
    if (!nav) return;

    let lastY = window.scrollY;
    gsap.set(nav, { y: 0 });

    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: () => {
          const y = window.scrollY;
          const goingDown = y > lastY && y > 80;
          gsap.to(nav, {
            y: goingDown ? -90 : 0,
            duration: 0.4,
            ease: SPRING_SOFT,
            overwrite: "auto",
          });
          nav.classList.toggle("nav-scrolled", y > 24);
          lastY = y;
        },
      });
    }

    links.forEach((link) => {
      const underline = document.createElement("span");
      underline.className = "nav-underline";
      link.appendChild(underline);
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(underline, { scaleX: 0 }, {
        scaleX: 1,
        duration: 0.28,
        ease: SPRING,
        transformOrigin: "left",
      });
      link.addEventListener("mouseenter", () => tl.play());
      link.addEventListener("mouseleave", () => tl.reverse());
      link.addEventListener("focus", () => tl.play());
      link.addEventListener("blur", () => tl.reverse());
    });
  }

  function initHero() {
    const heroText = document.querySelector(".hero-text");
    if (!heroText) return;
    const heading = heroText.querySelector("h1, h2");
    const sub = heroText.querySelector("p");
    const ctas = heroText.querySelectorAll(".btn");
    const stats = document.querySelectorAll(".hero-stats .stat");
    const tl = gsap.timeline({ defaults: { ease: SPRING_SOFT, duration: 0.7 } });
    if (heading) tl.from(heading, { y: 24, opacity: 0 }, 0);
    if (sub) tl.from(sub, { y: 18, opacity: 0 }, 0.1);
    if (ctas.length) tl.from(ctas, { y: 14, opacity: 0, stagger: 0.08, ease: SPRING }, 0.22);
    if (stats.length) tl.from(stats, { y: 16, opacity: 0, stagger: 0.06, ease: SPRING }, 0.32);
  }

  function reveal(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length || !window.ScrollTrigger) return;
    gsap.from(elements, {
      scrollTrigger: { trigger: elements[0], start: options.start || "top 88%", once: true },
      y: options.y ?? 24,
      x: options.x ?? 0,
      opacity: 0,
      duration: options.duration || 0.55,
      ease: SPRING_SOFT,
      stagger: options.stagger || 0.08,
    });
  }

  function initStats() {
    document.querySelectorAll(".stat").forEach((stat) => {
      if (!window.ScrollTrigger) return;
      ScrollTrigger.create({
        trigger: stat,
        start: "top 85%",
        once: true,
        onEnter: () => gsap.fromTo(stat, { scale: 0.94, opacity: 0.6 }, {
          scale: 1, opacity: 1, duration: 0.5, ease: SPRING,
        }),
      });
    });
  }

  function initServiceCards() {
    const cards = document.querySelectorAll(".service-card");
    if (!cards.length) return;
    reveal(".service-card", { y: 28, stagger: 0.1 });
    cards.forEach((card) => {
      let accent = card.querySelector(".card-accent-bar");
      if (!accent) {
        accent = document.createElement("span");
        accent.className = "card-accent-bar";
        card.prepend(accent);
      }
      const enter = () => {
        gsap.to(card, { y: -6, boxShadow: "0 18px 36px rgba(10,25,49,.14)", duration: 0.35, ease: SPRING });
        gsap.to(accent, { scaleX: 1, duration: 0.3, ease: SPRING });
      };
      const leave = () => {
        gsap.to(card, { y: 0, boxShadow: "0 1px 2px rgba(10,25,49,.06)", duration: 0.35, ease: SPRING_SOFT });
        gsap.to(accent, { scaleX: 0, duration: 0.25, ease: SPRING_SOFT });
      };
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      card.addEventListener("focusin", enter);
      card.addEventListener("focusout", leave);
    });
  }

  function initValueCards() { reveal(".value-card", { y: 20 }); }
  function initAboutReveal() { reveal(".about-content", { x: -24, y: 0, start: "top 82%" }); }

  function initTeamCards() {
    const cards = document.querySelectorAll(".team-card");
    if (!cards.length) return;
    reveal(".team-card", { y: 24, stagger: 0.1 });
    cards.forEach((card) => {
      const image = card.querySelector(".team-image");
      if (!image) return;
      card.addEventListener("mouseenter", () => gsap.to(image, { scale: 1.04, duration: 0.4, ease: SPRING }));
      card.addEventListener("mouseleave", () => gsap.to(image, { scale: 1, duration: 0.4, ease: SPRING_SOFT }));
    });
  }

  function initPartnerCards() {
    const cards = document.querySelectorAll(".partner-card");
    if (!cards.length) return;
    reveal(".partner-card", { y: 16, stagger: 0.05, start: "top 90%" });
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => gsap.to(card, { y: -4, duration: 0.3, ease: SPRING }));
      card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, duration: 0.3, ease: SPRING_SOFT }));
    });
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.querySelectorAll(".form-group input, .form-group textarea").forEach((field) => {
      const group = field.closest(".form-group");
      if (!group) return;
      field.addEventListener("focus", () => gsap.to(group, { y: -2, duration: 0.25, ease: SPRING }));
      field.addEventListener("blur", () => gsap.to(group, { y: 0, duration: 0.25, ease: SPRING_SOFT }));
    });

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    const originalLabel = submitBtn.textContent;
    submitBtn.innerHTML = "";
    submitBtn.style.position = "relative";

    const idle = document.createElement("span");
    idle.textContent = originalLabel;
    idle.className = "btn-state btn-state-idle";
    const pending = document.createElement("span");
    pending.textContent = "Sending…";
    pending.className = "btn-state btn-state-pending";
    const success = document.createElement("span");
    success.textContent = "Message Sent";
    success.className = "btn-state btn-state-success";
    submitBtn.append(idle, pending, success);
    gsap.set(pending, { opacity: 0, position: "absolute", inset: 0 });
    gsap.set(success, { opacity: 0, position: "absolute", inset: 0 });

    const crossfade = (show, hide) => {
      hide.forEach((el) => gsap.to(el, { opacity: 0, duration: CROSSFADE_DURATION, ease: SPRING_SOFT }));
      gsap.to(show, { opacity: 1, duration: CROSSFADE_DURATION, ease: SPRING_SOFT });
    };
    form.addEventListener("submit", () => {
      crossfade(pending, [idle, success]);
      gsap.to(submitBtn, { scale: 0.98, duration: 0.15, ease: SPRING_SOFT });
      window.setTimeout(() => {
        crossfade(success, [idle, pending]);
        gsap.to(submitBtn, { scale: 1, duration: 0.3, ease: SPRING });
      }, 900);
      window.setTimeout(() => crossfade(idle, [pending, success]), 3200);
    });
  }
})();
