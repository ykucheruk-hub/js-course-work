import { showGlobalNotification } from './global-notification.js';
import { validateEmail, showFieldError, hideFieldError } from './form-validation.js';

let currentExerciseId = null;
let userRating = 0;

export function initRatingModal() {
  const form = document.getElementById('js-rating-modal-form');
  const stars = document.querySelectorAll('.rating-modal__star');

  // Обробка вибору зірок
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      userRating = index + 1;
      updateStarsUI(userRating);
      document.getElementById('js-rating-modal-value').textContent = userRating.toFixed(1);
    });
  });

  // Обробка сабміту форми
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('js-rating-modal-email');
    const commentInput = document.getElementById('js-rating-modal-comment');
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
      showFieldError(emailInput, null, 'Invalid email');
      return;
    }

    const result = await submitRating(email, commentInput.value.trim());
    if (result.success) {
      showGlobalNotification('Rating submitted!', 'success');
      closeRatingModal();
    } else {
      showGlobalNotification(result.error, 'error');
    }
  });
}

async function submitRating(email, review) {
  try {
    const response = await fetch(`https://your-energy.b.goit.study/api/exercises/${currentExerciseId}/rating`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rate: userRating, email, review })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function updateStarsUI(rating) {
  const stars = document.querySelectorAll('.rating-modal__star svg path');
  stars.forEach((star, i) => {
    star.setAttribute('fill', i < rating ? '#EEA10C' : 'none'); //
  });
}

export function openRatingModal(id) {
  currentExerciseId = id;
  const modal = document.getElementById('js-rating-modal');
  modal?.classList.remove('is-hidden');
}

export function closeRatingModal() {
  const modal = document.getElementById('js-rating-modal');
  modal?.classList.add('is-hidden');
  userRating = 0;
}