// ─── NAV SCROLL ───
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('closeMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── SCROLL ANIMATIONS ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── SET ACTIVE NAV ───
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── FOOTER YEAR ───
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
