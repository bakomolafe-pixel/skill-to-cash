// =================================================================
// SKILL TO CASH — Landing Page Interactions
// =================================================================

// ----- 1. COUNTDOWN TIMER (resets every 24h to keep urgency real) -----
function startCountdown() {
  // Set a recurring 24h window. Every visitor sees a fresh timer that
  // ends at the next midnight (local time).
  const els = [
    document.getElementById('countdown'),
    document.getElementById('countdown2')
  ].filter(Boolean);

  function tick() {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const diff = end - now;

    const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    const text = `${h}:${m}:${s}`;
    els.forEach(el => el.textContent = text);
  }
  tick();
  setInterval(tick, 1000);
}

// ----- 2. FAQ ACCORDION -----
function setupFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    // Ensure each question button has a + indicator
    if (q && !q.querySelector('span')) {
      const plus = document.createElement('span');
      plus.textContent = '+';
      q.appendChild(plus);
    }
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked (toggle)
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ----- 3. SMOOTH SCROLL for anchor links -----
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ----- 3b. MOBILE MENU TOGGLE -----
function setupMobileMenu() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  const close = () => {
    nav.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a nav link is tapped
  nav.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) close();
  });
}

// ----- 4. STICKY CTA — Hide near top, show after hero scroll -----
function setupStickyCTA() {
  const sticky = document.querySelector('.sticky-cta');
  if (!sticky) return;

  const hero = document.querySelector('.hero');
  const heroHeight = hero ? hero.offsetHeight : 600;

  window.addEventListener('scroll', () => {
    if (window.scrollY > heroHeight * 0.6) {
      sticky.style.transform = 'translateY(0)';
      sticky.style.opacity = '1';
    } else {
      sticky.style.transform = 'translateY(100%)';
      sticky.style.opacity = '0';
    }
  });
  // Initial state
  sticky.style.transition = 'all 0.3s ease';
  sticky.style.transform = 'translateY(100%)';
  sticky.style.opacity = '0';
}

// ----- 5. SCROLL REVEAL animations -----
function setupReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.pain-card, .promise-card, .inside-card, .bonus-card, .testimonial, .for-card, .trans-col'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ----- 6. SOCIAL PROOF POPUP -----
function setupSocialProof() {
  const popup = document.getElementById('spPopup');
  if (!popup) return;
  const avEl = document.getElementById('spAv');
  const nameEl = document.getElementById('spName');
  const timeEl = document.getElementById('spTime');
  const msgEl = document.getElementById('spMsg');
  const closeBtn = document.getElementById('spClose');

  const buyers = [
    { n: 'Adaeze',    c: 'Lagos' },
    { n: 'Tunde',     c: 'Ibadan' },
    { n: 'Chinwe',    c: 'Enugu' },
    { n: 'Emeka',     c: 'Port Harcourt' },
    { n: 'Fatimah',   c: 'Abuja' },
    { n: 'Seyi',      c: 'Lagos' },
    { n: 'Blessing',  c: 'Benin City' },
    { n: 'Kelechi',   c: 'Owerri' },
    { n: 'Ngozi',     c: 'Onitsha' },
    { n: 'Rotimi',    c: 'Abeokuta' },
    { n: 'Sandra',    c: 'Jos' },
    { n: 'Uche',      c: 'Kano' },
    { n: 'Precious',  c: 'Warri' },
    { n: 'Oluwaseun', c: 'Ilorin' },
    { n: 'Aisha',     c: 'Kaduna' },
    { n: 'Chidera',   c: 'Awka' },
    { n: 'Ifeoma',    c: 'Asaba' },
    { n: 'Bayo',      c: 'Lagos' },
    { n: 'Nkechi',    c: 'Aba' },
    { n: 'Yusuf',     c: 'Maiduguri' },
    { n: 'Tobi',      c: 'Lagos' },
    { n: 'Halima',    c: 'Sokoto' },
    { n: 'Ifeanyi',   c: 'Onitsha' },
    { n: 'Damola',    c: 'Akure' },
  ];
  const messages = [
    'just got <strong>Skill to Cash</strong> ✅',
    'just bought the bundle 🔥',
    'just secured access at ₦5,000 💸',
    'just downloaded their copy ✅',
    'just joined Skill to Cash 🚀',
    'paid for the bundle just now 💚',
  ];
  const timeAgos = [
    'just now',
    '1 minute ago',
    '3 minutes ago',
    '5 minutes ago',
    '7 minutes ago',
    '10 minutes ago',
    '12 minutes ago',
    '15 minutes ago',
    '18 minutes ago',
    '23 minutes ago',
    '32 minutes ago',
    '45 minutes ago',
  ];

  // Shuffle copy of buyers so each load shows a different order
  const shuffled = buyers.slice().sort(() => Math.random() - 0.5);
  let idx = 0;
  let dismissed = false;
  let hideTimer = null;

  function show() {
    if (dismissed) return;
    const b = shuffled[idx % shuffled.length];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const time = timeAgos[Math.floor(Math.random() * timeAgos.length)];
    idx++;

    avEl.textContent = b.n.charAt(0).toUpperCase();
    nameEl.textContent = `${b.n} from ${b.c}`;
    timeEl.textContent = time;
    msgEl.innerHTML = msg;

    popup.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => popup.classList.remove('show'), 5000);
  }

  closeBtn.addEventListener('click', () => {
    dismissed = true;
    popup.classList.remove('show');
    clearTimeout(hideTimer);
  });

  // First popup after 6s, then every 12s
  setTimeout(() => {
    show();
    setInterval(show, 12000);
  }, 6000);
}

// ----- 7. Init everything when DOM is ready -----
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFAQ();
  setupSmoothScroll();
  setupMobileMenu();
  setupStickyCTA();
  setupReveal();
  setupSocialProof();
});
