/* ============================================================
   NEXAFLOW — SCRIPT.JS — INTERACTIVITY & ANIMATIONS
   ============================================================ */

'use strict';

// ============================================================
// 1. NAVBAR — SCROLL BEHAVIOUR + ACTIVE LINK TRACKING
// ============================================================
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu   = document.getElementById('nav-links');
  const overlay   = document.getElementById('mobile-overlay');

  // --- Scroll: add/remove .scrolled class ---
  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  // --- Active link based on scroll position ---
  function updateActiveLink() {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop    = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // --- Hamburger toggle ---
  function openMenu() {
    navMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


// ============================================================
// 2. SCROLL REVEAL — INTERSECTION OBSERVER
// ============================================================
(function initScrollReveal() {
  // Elements to reveal
  const revealTargets = [
    '#about-visual',
    '#about-content',
    '#feat-1', '#feat-2', '#feat-3',
    '#services-header',
    '#svc-1', '#svc-2', '#svc-3', '#svc-4', '#svc-5', '#svc-6',
    '#stats-header',
    '#stat-item-1', '#stat-item-2', '#stat-item-3', '#stat-item-4',
    '#contact-info',
    '#contact-form',
  ];

  revealTargets.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Staggered delay for grid children
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  // Add stagger delays to service & stat cards
  const staggerGroups = [
    { selector: '.service-card', base: 0, step: 100 },
    { selector: '.stat-item',   base: 0, step: 120 },
    { selector: '.feature-item', base: 0, step: 80 },
  ];

  staggerGroups.forEach(({ selector, base, step }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.dataset.delay = base + i * step;
    });
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


// ============================================================
// 3. ANIMATED COUNTER — STATS SECTION
// ============================================================
(function initCounters() {
  const counters = document.querySelectorAll('.stat-value[data-target]');

  const suffixMap = {
    'counter-1': '+',
    'counter-2': '%',
    'counter-3': '+',
    'counter-4': '+',
  };

  function animateCounter(el) {
    const target   = +el.dataset.target;
    const suffix   = suffixMap[el.id] || '';
    const duration = 2000;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
})();


// ============================================================
// 4. PARTICLES — HERO BACKGROUND
// ============================================================
(function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const NUM_PARTICLES = 35;

  function createParticle() {
    const p = document.createElement('div');
    p.classList.add('particle');

    // Random position, size, color, duration
    const x        = Math.random() * 100;
    const size     = Math.random() * 3 + 1.5;
    const duration = Math.random() * 8 + 5;
    const delay    = Math.random() * 8;
    const colors   = ['#8b5cf6','#06b6d4','#ec4899','#a78bfa','#67e8f9'];
    const color    = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      left: ${x}%;
      bottom: 0;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      box-shadow: 0 0 ${size * 3}px ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(p);
  }

  for (let i = 0; i < NUM_PARTICLES; i++) createParticle();
})();


// ============================================================
// 5. CONTACT FORM — CLIENT-SIDE VALIDATION
// ============================================================
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  if (!form) return;

  const fields  = {
    name:    { input: document.getElementById('contact-name'),         error: document.getElementById('name-error'),    min: 2 },
    email:   { input: document.getElementById('contact-email-input'),  error: document.getElementById('email-error')         },
    subject: { input: document.getElementById('contact-subject'),      error: document.getElementById('subject-error'), min: 3 },
    message: { input: document.getElementById('contact-message'),      error: document.getElementById('message-error'), min: 10 },
  };

  const successEl = document.getElementById('form-success');
  const btnText   = document.getElementById('btn-text');
  const submitBtn = document.getElementById('submit-btn');

  // --- Real-time validation ---
  function validateField(key) {
    const { input, error, min } = fields[key];
    const val = input.value.trim();
    let message = '';

    if (key === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val)               message = 'Email is required.';
      else if (!emailRegex.test(val)) message = 'Please enter a valid email address.';
    } else {
      if (!val)            message = 'This field is required.';
      else if (val.length < min) message = `Must be at least ${min} characters.`;
    }

    if (message) {
      input.classList.add('invalid');
      error.textContent = message;
      error.classList.add('show');
      return false;
    } else {
      input.classList.remove('invalid');
      error.textContent = '';
      error.classList.remove('show');
      return true;
    }
  }

  Object.keys(fields).forEach(key => {
    const { input } = fields[key];
    input.addEventListener('blur',  () => validateField(key));
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) validateField(key);
    });
  });

  // --- Submit ---
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const valid = Object.keys(fields).map(k => validateField(k)).every(Boolean);
    if (!valid) return;

    // Simulate sending
    submitBtn.disabled    = true;
    btnText.textContent   = 'Sending…';
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      submitBtn.disabled    = false;
      btnText.textContent   = 'Send Message';
      submitBtn.style.opacity = '';
      form.reset();

      successEl.textContent = '🎉 Message sent! We\'ll get back to you within 24 hours.';
      successEl.classList.add('show');

      setTimeout(() => successEl.classList.remove('show'), 5000);
    }, 1800);
  });
})();


// ============================================================
// 6. SERVICE CARDS — KEYBOARD INTERACTION (ENTER = CLICK LINK)
// ============================================================
(function initServiceCards() {
  document.querySelectorAll('.service-card[tabindex]').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const link = card.querySelector('.service-link');
        if (link) link.click();
      }
    });
  });
})();


// ============================================================
// 7. NAVBAR COLOUR CHANGE ON HOVER (font colour per item)
// ============================================================
(function initNavHoverColors() {
  const colors = {
    'nav-home':     '#a78bfa',
    'nav-about':    '#67e8f9',
    'nav-services': '#f9a8d4',
    'nav-stats':    '#6ee7b7',
    'nav-contact':  '#fcd34d',
  };

  Object.entries(colors).forEach(([id, color]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('mouseenter', () => { el.style.color = color; });
    el.addEventListener('mouseleave', () => { el.style.color = ''; });
  });
})();


// ============================================================
// 8. CURSOR GLOW EFFECT (desktop only)
// ============================================================
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  Object.assign(glow.style, {
    position: 'fixed',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '9999',
    background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
    transform: 'translate(-50%,-50%)',
    transition: 'opacity 0.3s ease',
    opacity: '0',
    top: '0', left: '0',
  });
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX  = 0, glowY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();
