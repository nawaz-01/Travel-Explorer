/* ============================================================
   TRAVEL VISTA — main.js
   Contains: Navigation, Interactive Features, Footer scripts
   ============================================================ */

/* ----------------------------------------------------------
   1. NAVIGATION
   ---------------------------------------------------------- */
(function () {
  const navigation        = document.getElementById('navigation');
  const navigationToggle  = document.getElementById('navigationToggle');
  const navigationMenu    = document.getElementById('navigationMenu');
  const navigationBackdrop = document.getElementById('navigationBackdrop');
  const navigationToggleIcon = document.getElementById('navigationToggleIcon');

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      navigation.classList.add('navigation-open');
      navigationToggleIcon.innerHTML = `
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path fill='none' stroke='currentColor' stroke-linecap='round'
            stroke-linejoin='round' stroke-width='2' d='M18 6L6 18M6 6l12 12'/>
        </svg>`;
      document.body.style.overflow = 'hidden';
    } else {
      navigation.classList.remove('navigation-open');
      navigationToggleIcon.innerHTML = `
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path fill='none' stroke='currentColor' stroke-linecap='round'
            stroke-linejoin='round' stroke-width='2' d='M4 5h16M4 12h16M4 19h16'/>
        </svg>`;
      document.body.style.overflow = '';
    }
  }

  function closeMenu() {
    if (isMenuOpen) toggleMenu();
  }

  navigationToggle.addEventListener('click', toggleMenu);
  navigationBackdrop.addEventListener('click', closeMenu);

  document.querySelectorAll('.navigation-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      navigation.classList.add('navigation-scrolled');
    } else {
      navigation.classList.remove('navigation-scrolled');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isMenuOpen) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && isMenuOpen) closeMenu();
  });
})();


/* ----------------------------------------------------------
   2. TRAVEL PACKAGES — Interactive Features
   ---------------------------------------------------------- */
(function () {
  /* --- Search / booking form focus effects --- */
  document.querySelectorAll('.search-form, .quick-booking-form').forEach(form => {
    form.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('focus', () => { input.parentElement.style.transform = 'scale(1.02)'; });
      input.addEventListener('blur',  () => { input.parentElement.style.transform = 'scale(1)'; });
    });
  });

  /* --- Package card hover z-index stagger --- */
  document.querySelectorAll('.package-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      setTimeout(() => { card.style.zIndex = '10'; }, index * 50);
    });
    card.addEventListener('mouseleave', () => { card.style.zIndex = '1'; });
  });

  /* --- Budget slider --- */
  const budgetSlider = document.querySelector('.slider');
  const budgetValues = document.querySelectorAll('.budget-values span');

  if (budgetSlider) {
    budgetSlider.addEventListener('input', e => {
      const value      = e.target.value;
      const percentage = ((value - e.target.min) / (e.target.max - e.target.min)) * 100;
      e.target.style.background =
        `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%,
         var(--color-border) ${percentage}%, var(--color-border) 100%)`;
      if (budgetValues.length > 1) budgetValues[1].textContent = `$${value}+`;
    });
  }

  /* --- Filter tags toggle --- */
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('active');
      if (tag.classList.contains('active')) {
        tag.style.background  = 'var(--color-accent)';
        tag.style.color       = 'var(--color-neutral)';
        tag.style.transform   = 'translateY(-2px) scale(1.05)';
      } else {
        tag.style.background  = 'var(--color-primary)';
        tag.style.color       = 'var(--color-on-primary)';
        tag.style.transform   = 'none';
      }
    });
  });

  /* --- Intersection observer helpers --- */
  const observerOpts = { threshold: 0.3, rootMargin: '0px' };

  /* Booking steps scroll animation */
  const bookingSteps = document.querySelector('.booking-steps');
  if (bookingSteps) {
    bookingSteps.querySelectorAll('.booking-step').forEach(step => {
      step.style.opacity   = '0';
      step.style.transform = 'translateY(20px) scale(0.95)';
      step.style.transition = 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)';
    });

    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.booking-step').forEach((step, i) => {
            setTimeout(() => {
              step.style.opacity   = '1';
              step.style.transform = 'translateY(0) scale(1)';
            }, i * 200);
          });
        }
      });
    }, observerOpts).observe(bookingSteps);
  }

  /* Review cards scroll animation */
  const reviewsGrid = document.querySelector('.reviews-grid');
  if (reviewsGrid) {
    reviewsGrid.querySelectorAll('.review-card').forEach(card => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)';
    });

    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.review-card').forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity   = '1';
              card.style.transform = 'translateY(0)';
            }, i * 150);
          });
        }
      });
    }, observerOpts).observe(reviewsGrid);
  }

  /* Stats counter animation */
  const reviewsStats = document.querySelector('.reviews-stats');
  if (reviewsStats) {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-number').forEach(stat => {
            const target    = parseFloat(stat.textContent);
            const increment = target / 50;
            let current     = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                stat.textContent = target % 1 === 0 ? target : target.toFixed(1);
                clearInterval(timer);
              } else {
                stat.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
              }
            }, 40);
          });
          reviewsStatsObserver.unobserve(entry.target);
        }
      });
    }, observerOpts).observe(reviewsStats);
  }

  /* --- Booking form submit --- */
  const bookingForm = document.querySelector('.quick-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn   = bookingForm.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Processing...';
      submitBtn.disabled    = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        submitBtn.textContent       = '✓ Quote Sent!';
        submitBtn.style.background  = 'var(--color-accent)';
        submitBtn.style.color       = 'var(--color-neutral)';

        setTimeout(() => {
          submitBtn.textContent      = originalText;
          submitBtn.disabled         = false;
          submitBtn.style.opacity    = '1';
          submitBtn.style.background = '';
          submitBtn.style.color      = '';
        }, 3000);
      }, 2000);
    });
  }

  /* --- Package card price hover effect --- */
  document.querySelectorAll('.package-card').forEach(card => {
    const bookBtn = card.querySelector('.btn-primary');
    if (!bookBtn) return;

    bookBtn.addEventListener('mouseenter', () => {
      const priceEl = card.querySelector('.price');
      priceEl.style.transform = 'scale(1.1)';
      priceEl.style.color     = 'var(--color-accent)';
      setTimeout(() => {
        priceEl.textContent = priceEl.textContent.replace('From', '✨ From');
      }, 150);
    });

    bookBtn.addEventListener('mouseleave', () => {
      const priceEl = card.querySelector('.price');
      priceEl.style.transform = 'scale(1)';
      priceEl.style.color     = '';
      priceEl.textContent     = priceEl.textContent.replace('✨ ', '');
    });
  });
})();


/* ----------------------------------------------------------
   3. FOOTER
   ---------------------------------------------------------- */
(function () {
  /* Newsletter form */
  const newsletterForm  = document.getElementById('newsletterForm');
  if (!newsletterForm) return;

  const newsletterInput = newsletterForm.querySelector('.footer-newsletter-input');
  const newsletterBtn   = newsletterForm.querySelector('.footer-newsletter-btn');

  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!newsletterInput.value.trim()) return;

    newsletterBtn.textContent = 'Subscribing...';
    newsletterBtn.disabled    = true;

    setTimeout(() => {
      newsletterBtn.textContent      = 'Subscribed!';
      newsletterBtn.style.background = 'var(--color-accent)';
      newsletterInput.value          = '';

      setTimeout(() => {
        newsletterBtn.textContent      = 'Subscribe';
        newsletterBtn.disabled         = false;
        newsletterBtn.style.background = '';
      }, 3000);
    }, 1500);
  });

  /* Contact icon hover */
  document.querySelectorAll('.footer-contact-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.querySelector('.footer-contact-icon').style.transform = 'rotate(10deg) scale(1.1)';
    });
    item.addEventListener('mouseleave', function () {
      this.querySelector('.footer-contact-icon').style.transform = 'rotate(0deg) scale(1)';
    });
  });

  /* Social link bounce animation on scroll */
  const socialLinks = document.querySelectorAll('.footer-social-link');

  const bounceStyle = document.createElement('style');
  bounceStyle.textContent = `
    @keyframes socialLinkBounce {
      0%   { opacity: 0; transform: translateY(30px) scale(0.8); }
      50%  { transform: translateY(-5px) scale(1.05); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }`;
  document.head.appendChild(bounceStyle);

  function animateSocialLinks() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    const rect = footer.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      socialLinks.forEach((link, i) => {
        setTimeout(() => {
          link.style.animation = 'socialLinkBounce 0.6s cubic-bezier(0.68,-0.55,0.265,1.55) forwards';
        }, i * 100);
      });
    }
  }

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateSocialLinks, 50);
  });
  animateSocialLinks();

  /* Footer pattern direction alternation */
  const pattern = document.querySelector('.footer-pattern');
  if (pattern) {
    let dir = 1;
    setInterval(() => {
      dir *= -1;
      pattern.style.animationDirection = dir > 0 ? 'normal' : 'reverse';
    }, 10000);
  }
})();