export function initCarousel() {
  const box = document.querySelector("[data-carousel]");
  if (!box) return;
  const slides = Array.from(box.querySelectorAll(".testimonial"));
  const prev = box.querySelector("[data-carousel-prev]");
  const next = box.querySelector("[data-carousel-next]");
  let idx = 0;
  const paint = () => slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
  prev?.addEventListener("click", () => { idx = (idx - 1 + slides.length) % slides.length; paint(); });
  next?.addEventListener("click", () => { idx = (idx + 1) % slides.length; paint(); });
  paint();
}
