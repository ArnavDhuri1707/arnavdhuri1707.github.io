// ==========================================================
// Portfolio interactivity — no frameworks, no build step.
// ==========================================================

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Nav: glassy background once you scroll ----
const nav = document.getElementById("nav");
function onScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 24);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---- Mobile menu ----
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---- Scroll spy: highlight the nav link for the section in view ----
const sections = [...document.querySelectorAll("section[id]")];
const navAnchors = [...links.querySelectorAll("a[href^='#']")];
const spyObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = entry.target.id;
      navAnchors.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === `#${id}` && !a.classList.contains("nav-cta"))
      );
    }
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spyObserver.observe(s));

// ---- Animated stat counters ----
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));
