// Typewriter solo para el título
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.querySelector("header h1");

  if (titleEl) {
    const titleText = titleEl.textContent.trim();
    titleEl.textContent = "";
    typeWriter(titleEl, titleText, 100);
  }
});

 //Funcion que escribe el texto letra por letra
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



// Manejar formulario con Netlify
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', handleNetlifySubmit);
  }
});

async function handleNetlifySubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const button = e.target.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  
  // Estado enviando
  button.disabled = true;
  button.textContent = 'TRANSMITTING...';
  button.style.opacity = '0.7';
  
  try {
    // Enviar a Netlify
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });
    
    if (response.ok) {
      // Éxito - Mostrar notificación estilo INSIDE
      showMatrixNotification('SUCCESS', 'Message transmitted successfully');
      e.target.reset();
    } else {
      showMatrixNotification('ERROR', 'Transmission failed');
    }
  } catch (error) {
    showMatrixNotification('ERROR', 'Connection lost');
  }
  
  // Restaurar botón
  setTimeout(() => {
    button.disabled = false;
    button.textContent = originalText;
    button.style.opacity = '1';
  }, 2000);
}

// Notificación estilo Matrix/INSIDE
function showMatrixNotification(type, message) {
  // Remover notificación anterior si existe
  const existing = document.querySelector('.matrix-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'matrix-notification';
  notification.innerHTML = `
    <div class="notification-line"></div>
    <span class="notification-type">[${type}]</span>
    <span class="notification-msg">${message}</span>
  `;
  
  // Agregar clase según tipo
  notification.classList.add(type.toLowerCase());
  
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remover después de 4 segundos
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 600);
  }, 4000);

  
}
