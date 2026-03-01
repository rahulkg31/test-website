/* =============================================
   MCTC Club Website — script.js
   ============================================= */

// ─── PAGE NAVIGATION ───
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Update nav state for new page
  setTimeout(() => updateNav(), 50);
  // Close mobile nav
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  if (navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }
  // Trigger reveal for new page
  setTimeout(() => triggerReveal(), 100);
}

// ─── SCROLL TO SECTION ID ───
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close nav when overlay is clicked
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

// Escape key closes menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

// ─── SCROLL: NAV BACKGROUND + BACK-TO-TOP ───
const topnav  = document.getElementById('topnav');
const backTop = document.getElementById('backTop');

function updateNav() {
  topnav.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', updateNav);

// ─── FADE-UP ANIMATIONS (hero) ───
function triggerReveal() {
  const items = document.querySelectorAll('.page.active .fade-up');
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 120);
  });
}

// Initial trigger on load
window.addEventListener('load', () => {
  triggerReveal();
});

// ─── INTERSECTION OBSERVER: scroll reveals ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function observeRevealElements() {
  document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));
}
observeRevealElements();

// ─── FAQ ACCORDION ───
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.faq-q');
  if (!btn) return;
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  // Close all in same list
  const list = item.closest('.faq-list');
  list.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  // Toggle current
  if (!isOpen) item.classList.add('open');
});

// ─── GALLERY FILTER ───
function filterGallery(cat, btn) {
  // Update active button
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Show/hide items
  document.querySelectorAll('.gal-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ─── CONTACT FORM ───
function handleFormSubmit() {
  const success = document.getElementById('form-success');
  if (success) {
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 4000);
  }
}

// ─── SMOOTH NAV LINK CLICKS ───
// All nav menu clicks are handled via onclick attributes calling showPage()
// This ensures SPA-like navigation with no page reload.

// ─── FOOTER LINK CLICKS ───
// Already handled via onclick attributes

// ─── ROLE SCRIPT ACCORDIONS ───
function toggleScript(btn) {
  const accordion = btn.closest('.script-accordion');
  const isOpen = accordion.classList.contains('open');
  // Close all others
  document.querySelectorAll('.script-accordion.open').forEach(a => a.classList.remove('open'));
  // Toggle current
  if (!isOpen) accordion.classList.add('open');
}

// ─── INIT: Show home page on load ───
showPage('home');
updateNav();
