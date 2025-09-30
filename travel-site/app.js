// Utilities
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('#primary-nav');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Smooth scroll for in-page anchors
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.matches('a[href^="#"]')) {
    const href = target.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  }
});

// Simple search to filter destinations by title text
const searchForm = document.querySelector('#search');
const searchInput = document.querySelector('#q');
const filterContainer = document.querySelector('[data-filterable]');
if (searchForm && searchInput && filterContainer) {
  const cards = Array.from(filterContainer.querySelectorAll('[data-title]'));
  function applyFilter() {
    const term = searchInput.value.trim().toLowerCase();
    cards.forEach(card => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const match = title.includes(term);
      card.style.display = match ? '' : 'none';
    });
  }
  searchInput.addEventListener('input', applyFilter);
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    applyFilter();
  });
}

// Newsletter form validation + UX
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const msg = newsletterForm.querySelector('.form-msg');
  function setMessage(text, isError) {
    if (!msg) return;
    msg.textContent = text;
    msg.style.color = isError ? '#fca5a5' : '#94a3b8';
  }
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (emailInput?.value || '').trim();
    const valid = /.+@.+\..+/.test(email);
    if (!valid) {
      setMessage('Please enter a valid email address.', true);
      emailInput?.focus();
      return;
    }
    setMessage('Thanks for subscribing! Check your inbox to confirm.', false);
    newsletterForm.reset();
  });
}

// Footer year
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
