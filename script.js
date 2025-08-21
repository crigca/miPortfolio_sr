// Typewriter SOLO para el título
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.querySelector("header h1");

  if (titleEl) {
    const titleText = titleEl.textContent.trim();
    titleEl.textContent = "";
    typeWriter(titleEl, titleText, 100);
  }
});

function typeWriter(el, text, speed) {
  let i = 0;
  (function step() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    }
  })();
}
