let timeoutId = null;

export function initGlobalNotification() {
  const closeBtn = document.getElementById('js-global-notification-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideGlobalNotification);
  }
}

export function showGlobalNotification(message, type = 'success') {
  const notification = document.getElementById('js-global-notification');
  const textElem = document.getElementById('js-global-notification-text');

  if (!notification || !textElem) return;

  textElem.textContent = message;
  notification.className = `global-notification ${type}`; // додає класи success/error
  notification.classList.remove('is-hidden');

  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(hideGlobalNotification, 5000); // зникає через 5 сек
}

export function hideGlobalNotification() {
  const notification = document.getElementById('js-global-notification');
  if (notification) notification.classList.add('is-hidden');
}