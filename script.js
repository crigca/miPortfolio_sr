// ==== Preferencia del usuario por menos animación ====
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ==== Typewriter para título y subtítulo (si existen en la página) ====
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.querySelector("header h1");
  const subtitleEl = document.querySelector(".subtitle");

  if (prefersReduced) {
    document.querySelectorAll("header, section").forEach((el) => el.classList.add("show"));
    return;
  }

  if (titleEl) {
    const titleText = titleEl.textContent.trim();
    titleEl.textContent = "";
    typeWriter(titleEl, titleText, 80);
  }
});

function typeWriter(el, text, speed) {
  return new Promise((resolve) => {
    let i = 0;
    (function step() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(step, speed);
      } else resolve();
    })();
  });
}

// ==== Fade-in por scroll (reutilizable en todas las páginas) ====
if (!prefersReduced && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.classList.remove("hidden");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll("header, section").forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });
} else {
  document.querySelectorAll("header, section").forEach((el) => el.classList.add("show"));
}
