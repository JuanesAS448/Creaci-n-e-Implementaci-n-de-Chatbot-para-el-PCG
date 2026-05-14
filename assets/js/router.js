export function initRouter() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}
