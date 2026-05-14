export function initMenu() {
  const sidebar = document.querySelector(".sidebar");
  const toggle = document.getElementById("menu-toggle-mobile");
  const links = Array.from(document.querySelectorAll(".menu-link"));
  if (toggle && sidebar) toggle.addEventListener("click", () => sidebar.classList.toggle("is-open"));
  const setActive = () => {
    const y = window.scrollY + 140;
    for (const link of links) {
      const sec = document.querySelector(link.getAttribute("href"));
      if (!sec) continue;
      const active = y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight;
      link.classList.toggle("is-active", active);
    }
  };
  window.addEventListener("scroll", setActive);
  setActive();
}
