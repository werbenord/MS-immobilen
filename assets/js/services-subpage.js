document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("service-subpage")) return;

  // Smooth scroll for in-page anchors on service pages.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
