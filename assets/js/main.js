document.addEventListener("DOMContentLoaded", () => {
  // Rotate badge text smoothly
  const badgeText = document.getElementById("badgeText");
  let rot = 0;

  function rotateBadge() {
    rot = (rot + 0.15) % 360;
    if (badgeText) {
      badgeText.setAttribute("transform", `rotate(${rot} 48 48)`);
    }
    requestAnimationFrame(rotateBadge);
  }
  requestAnimationFrame(rotateBadge);

  // Count-up stats when visible
  const counters = document.querySelectorAll(".count");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target || 0);
        const suffix = el.dataset.suffix || "";
        const duration = 900;

        const start = performance.now();
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        function animate(now) {
          const t = Math.min(1, (now - start) / duration);
          const val = Math.round(target * easeOutCubic(t));
          el.textContent = `${val}${suffix}`;
          if (t < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        io.unobserve(el);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((counter) => io.observe(counter));
});
