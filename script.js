// Typewriter onluy for the title
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.querySelector("header h1");

  if (titleEl) {
    const titleText = titleEl.textContent.trim();
    titleEl.textContent = "";
    typeWriter(titleEl, titleText, 100);
  }
});

 //Function that types text letter by letter
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



// Handle form wht Netlify
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
  
  // Sending state
  button.disabled = true;
  button.textContent = 'TRANSMITTING...';
  button.style.opacity = '0.7';
  
  try {
    // Send to Netlify
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });
    
    if (response.ok) {
      showMatrixNotification('SUCCESS', 'Message transmitted successfully');
      e.target.reset();
    } else {
      showMatrixNotification('ERROR', 'Transmission failed');
    }
  } catch (error) {
    showMatrixNotification('ERROR', 'Connection lost');
  }
  
  // Restore bitton
  setTimeout(() => {
    button.disabled = false;
    button.textContent = originalText;
    button.style.opacity = '1';
  }, 2000);
}

// Matrix style notification
function showMatrixNotification(type, message) {
  
  const existing = document.querySelector('.matrix-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'matrix-notification';
  notification.innerHTML = `
    <div class="notification-line"></div>
    <span class="notification-type">[${type}]</span>
    <span class="notification-msg">${message}</span>
  `;
  
  
  notification.classList.add(type.toLowerCase());
  
  document.body.appendChild(notification);
  
 
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 600);
  }, 4000);

  
}
