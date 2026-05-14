function animateCounter(el) {
  const target = Number(el.dataset.target || 0);
  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(target * p).toLocaleString("es-CO");
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initStatsCounter() {
  const counters = document.querySelectorAll(".counter");
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => obs.observe(c));
}
