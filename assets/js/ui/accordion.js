export function initAccordion() {
  document.querySelectorAll(".accordion-item").forEach((item, idx) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");
    const panelId = `faq-panel-${idx + 1}`;
    if (panel) panel.id = panelId;
    trigger?.setAttribute("aria-controls", panelId);
    trigger?.setAttribute("aria-expanded", "false");
    trigger?.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
}
