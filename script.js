document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        target.classList.add("is-visible");
        obs.unobserve(target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  document.querySelectorAll("[data-animate]").forEach((el, index) => {
    if (el.dataset.animateStagger === undefined && index > 0) {
      const staggerIndex = Math.min(2, index);
      el.setAttribute("data-animate-stagger", String(staggerIndex));
    }
    observer.observe(el);
  });
});
