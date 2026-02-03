const QUOTE_KEY = 'quote-data';

export async function displayQuote() {
  const quoteText = document.getElementById('js-exercises-quote-text');
  const quoteAuthor = document.getElementById('js-exercises-quote-author');
  
  if (!quoteText || !quoteAuthor) return;

  const data = await getQuote();
  if (data) {
    quoteText.textContent = data.quote;
    quoteAuthor.textContent = data.author;
  }
}

async function getQuote() {
  const cached = JSON.parse(localStorage.getItem(QUOTE_KEY));
  const today = new Date().toDateString();

  // Якщо цитата вже завантажена сьогодні — повертаємо її з кешу
  if (cached && cached.date === today) {
    return cached;
  }

  try {
    const response = await fetch('https://your-energy.b.goit.study/api/quote');
    const data = await response.json();
    const quoteData = { ...data, date: today };
    
    localStorage.setItem(QUOTE_KEY, JSON.stringify(quoteData));
    return quoteData;
  } catch (err) {
    console.error('Error fetching quote:', err);
    return cached; // Якщо помилка мережі, використовуємо старий кеш
  }
}