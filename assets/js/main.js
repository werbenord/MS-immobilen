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

  // Video banner modal behavior
  const videoSection = document.querySelector(".ms-video-banner");
  if (videoSection) {
    const modal = videoSection.querySelector("[data-msvb-modal]");
    const iframe = videoSection.querySelector("[data-msvb-iframe]");
    const openers = videoSection.querySelectorAll("[data-msvb-open]");
    const closer = videoSection.querySelector("[data-msvb-close]");

    // Put your embed URL here (YouTube/Vimeo)
    const VIDEO_EMBED_URL =
      "https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1&rel=0";

    const openModal = () => {
      if (!modal || !iframe) return;
      iframe.src = VIDEO_EMBED_URL;
      if (!modal.open) {
        modal.showModal();
      }
    };

    const closeModal = () => {
      if (!modal || !iframe) return;
      if (modal.open) {
        modal.close();
      }
      iframe.src = "";
    };

    openers.forEach((button) => button.addEventListener("click", openModal));
    if (closer) {
      closer.addEventListener("click", closeModal);
    }

    if (modal) {
      modal.addEventListener("click", (event) => {
        // close when clicking backdrop area
        const rect = modal.getBoundingClientRect();
        const inDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.bottom &&
          rect.left <= event.clientX &&
          event.clientX <= rect.right;

        if (!inDialog) {
          closeModal();
        }
      });

      modal.addEventListener("close", () => {
        if (iframe) {
          iframe.src = "";
        }
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal && modal.open) {
        closeModal();
      }
    });
  }

  // FAQ accordion behavior
  const faqRoot = document.querySelector(".ms-faq");
  if (faqRoot) {
    const items = Array.from(faqRoot.querySelectorAll(".ms-faq__item"));

    const plusIconSvg =
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    const minusIconSvg =
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

    const setOpen = (item, open) => {
      const button = item.querySelector(".ms-faq__q");
      const panel = item.querySelector(".ms-faq__a");
      const icon = item.querySelector(".ms-faq__icon");

      if (!button || !panel) return;

      if (open) {
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            setOpen(otherItem, false);
          }
        });

        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;

        if (icon) {
          icon.setAttribute("data-icon", "minus");
          icon.innerHTML = minusIconSvg;
        }
      } else {
        item.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        panel.hidden = true;

        if (icon) {
          icon.setAttribute("data-icon", "plus");
          icon.innerHTML = plusIconSvg;
        }
      }
    };

    items.forEach((item) => {
      const isOpen = item.classList.contains("is-open");
      const panel = item.querySelector(".ms-faq__a");
      const button = item.querySelector(".ms-faq__q");

      if (!panel || !button) return;

      button.addEventListener("click", () =>
        setOpen(item, !item.classList.contains("is-open"))
      );

      if (isOpen) {
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      } else {
        button.setAttribute("aria-expanded", "false");
        panel.hidden = true;
      }
    });
  }

  // Footer behavior
  const footerYear = document.getElementById("mf-year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  const footerForms = document.querySelectorAll(".mf-form");
  footerForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
});
